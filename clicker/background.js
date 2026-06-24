const MODEL = "gpt-5.4-nano";

const SYSTEM_PROMPT = `You are DOM AI, a browser automation agent. You receive a snapshot of interactive page elements with refs (e1, e2, ...) and screen coordinates.

Return ONLY valid JSON with this shape:
{
  "message": "brief explanation of what you will do",
  "steps": [
    { "action": "click", "ref": "e3" },
    { "action": "click", "x": 120, "y": 340 },
    { "action": "type", "ref": "e5", "text": "hello" },
    { "action": "scroll", "direction": "down", "amount": 400 },
    { "action": "wait", "ms": 500 }
  ],
  "done": true
}

Rules:
- Prefer ref-based clicks over x/y coordinates when a matching element exists.
- Use x/y only when no suitable ref exists.
- Keep steps minimal (1-5 steps).
- If the goal cannot be achieved, return empty steps and explain in message.
- Never invent refs that are not in the snapshot.`;

async function getApiKey() {
  const { openaiApiKey } = await chrome.storage.sync.get("openaiApiKey");
  return openaiApiKey || null;
}

async function captureTabScreenshot(tabId) {
  try {
    const dataUrl = await chrome.tabs.captureVisibleTab(null, {
      format: "jpeg",
      quality: 60,
    });
    return dataUrl;
  } catch {
    return null;
  }
}

async function callOpenAI({ apiKey, userGoal, snapshot, screenshot, history = [] }) {
  const userContent = [
    {
      type: "text",
      text: [
        `Page: ${snapshot.title}`,
        `URL: ${snapshot.url}`,
        `Viewport: ${snapshot.viewport.width}x${snapshot.viewport.height}`,
        "",
        "Interactive elements:",
        snapshot.textSummary,
        "",
        `User goal: ${userGoal}`,
      ].join("\n"),
    },
  ];

  if (screenshot) {
    userContent.push({
      type: "image_url",
      image_url: { url: screenshot, detail: "low" },
    });
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: userContent },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      response_format: { type: "json_object" },
      max_completion_tokens: 1024,
      reasoning_effort: "low",
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${err}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from model");
  }

  return JSON.parse(content);
}

async function sendToContentScript(tabId, message) {
  return chrome.tabs.sendMessage(tabId, message);
}

async function runAgent({ tabId, goal, includeScreenshot = true }) {
  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error("OpenAI API key not set. Add it in the extension popup.");
  }

  const snapshotResponse = await sendToContentScript(tabId, {
    type: "GET_SNAPSHOT",
    options: { maxElements: 120 },
  });

  if (!snapshotResponse?.ok) {
    throw new Error(snapshotResponse?.error || "Failed to capture DOM snapshot");
  }

  let screenshot = null;
  if (includeScreenshot) {
    screenshot = await captureTabScreenshot(tabId);
  }

  const plan = await callOpenAI({
    apiKey,
    userGoal: goal,
    snapshot: snapshotResponse.snapshot,
    screenshot,
  });

  let execution = null;
  if (plan.steps?.length) {
    execution = await sendToContentScript(tabId, {
      type: "EXECUTE_STEPS",
      steps: plan.steps,
    });
  }

  return { plan, execution, snapshot: snapshotResponse.snapshot };
}

async function handlePickResult(message, sender) {
  const tabId = sender.tab?.id;
  if (!tabId) return;

  const label = message.label || message.tag || "element";
  const goal = message.ref
    ? `Click the element ${message.ref} (${message.tag}: "${label}")`
    : `Click at screen position (${message.x}, ${message.y}) on the ${message.tag} element "${label}"`;

  try {
    const result = await runAgent({ tabId, goal, includeScreenshot: true });
    await chrome.storage.session.set({
      lastRun: {
        goal,
        plan: result.plan,
        execution: result.execution,
        at: Date.now(),
      },
    });
    chrome.action.setBadgeText({ text: "✓", tabId });
    chrome.action.setBadgeBackgroundColor({ color: "#22c55e", tabId });
  } catch (error) {
    await chrome.storage.session.set({
      lastRun: { goal, error: error.message, at: Date.now() },
    });
    chrome.action.setBadgeText({ text: "!", tabId });
    chrome.action.setBadgeBackgroundColor({ color: "#ef4444", tabId });
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  (async () => {
    try {
      switch (message.type) {
        case "PICK_RESULT": {
          await handlePickResult(message, sender);
          sendResponse({ ok: true });
          break;
        }

        case "GET_LAST_RUN": {
          const { lastRun } = await chrome.storage.session.get("lastRun");
          sendResponse({ ok: true, lastRun: lastRun || null });
          break;
        }
        case "SAVE_API_KEY": {
          await chrome.storage.sync.set({ openaiApiKey: message.apiKey });
          sendResponse({ ok: true });
          break;
        }

        case "GET_API_KEY_STATUS": {
          const key = await getApiKey();
          sendResponse({ ok: true, hasKey: Boolean(key) });
          break;
        }

        case "RUN_AGENT": {
          const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
          });
          if (!tab?.id) throw new Error("No active tab");

          const result = await runAgent({
            tabId: tab.id,
            goal: message.goal,
            includeScreenshot: message.includeScreenshot !== false,
          });
          sendResponse({ ok: true, ...result });
          break;
        }

        case "CLICK_AT": {
          const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
          });
          if (!tab?.id) throw new Error("No active tab");

          const result = await sendToContentScript(tab.id, {
            type: "CLICK_POINT",
            x: message.x,
            y: message.y,
          });
          sendResponse(result);
          break;
        }

        case "TOGGLE_PICK_MODE": {
          const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
          });
          if (!tab?.id) throw new Error("No active tab");

          const result = await sendToContentScript(tab.id, {
            type: "SET_PICK_MODE",
            enabled: message.enabled,
          });
          sendResponse(result);
          break;
        }

        default:
          sendResponse({ ok: false, error: "Unknown message" });
      }
    } catch (error) {
      sendResponse({ ok: false, error: error.message });
    }
  })();

  return true;
});
