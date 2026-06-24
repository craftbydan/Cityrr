const apiKeyInput = document.getElementById("apiKey");
const saveKeyBtn = document.getElementById("saveKey");
const keyStatus = document.getElementById("keyStatus");
const goalInput = document.getElementById("goal");
const runBtn = document.getElementById("runBtn");
const pickBtn = document.getElementById("pickBtn");
const messagesEl = document.getElementById("messages");

function addMessage(text, role = "assistant") {
  const el = document.createElement("div");
  el.className = `msg ${role}`;
  el.textContent = text;
  messagesEl.appendChild(el);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

async function sendMessage(message) {
  return chrome.runtime.sendMessage(message);
}

async function refreshKeyStatus() {
  const res = await sendMessage({ type: "GET_API_KEY_STATUS" });
  if (res?.hasKey) {
    keyStatus.textContent = "API key saved";
    keyStatus.style.color = "#4ade80";
  } else {
    keyStatus.textContent = "API key not set";
    keyStatus.style.color = "#71717a";
  }
}

saveKeyBtn.addEventListener("click", async () => {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) return;
  await sendMessage({ type: "SAVE_API_KEY", apiKey });
  apiKeyInput.value = "";
  await refreshKeyStatus();
  addMessage("API key saved.", "system");
});

async function runAgent(goal) {
  if (!goal.trim()) return;

  runBtn.disabled = true;
  pickBtn.disabled = true;
  addMessage(goal, "user");

  try {
    const res = await sendMessage({
      type: "RUN_AGENT",
      goal: goal.trim(),
      includeScreenshot: true,
    });

    if (!res?.ok) {
      throw new Error(res?.error || "Agent failed");
    }

    addMessage(res.plan?.message || "Done.");

    if (res.plan?.steps?.length) {
      const stepSummary = res.plan.steps
        .map((s) => {
          if (s.action === "click" && s.ref) return `click ${s.ref}`;
          if (s.action === "click") return `click (${s.x}, ${s.y})`;
          if (s.action === "type") return `type into ${s.ref}`;
          return s.action;
        })
        .join(" → ");
      addMessage(`Steps: ${stepSummary}`, "system");
    }

    if (res.execution?.ok === false) {
      throw new Error(res.execution.error);
    }
  } catch (error) {
    addMessage(error.message, "error");
  } finally {
    runBtn.disabled = false;
    pickBtn.disabled = false;
    goalInput.value = "";
  }
}

runBtn.addEventListener("click", () => runAgent(goalInput.value));

goalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    runAgent(goalInput.value);
  }
});

pickBtn.addEventListener("click", async () => {
  pickBtn.disabled = true;
  addMessage("Pick mode enabled — click an element on the page.", "system");
  await sendMessage({ type: "TOGGLE_PICK_MODE", enabled: true });
  setTimeout(() => window.close(), 300);
});

async function loadLastRun() {
  const res = await sendMessage({ type: "GET_LAST_RUN" });
  if (!res?.lastRun) return;

  const { goal, plan, error, at } = res.lastRun;
  if (Date.now() - at > 60000) return;

  addMessage(goal, "user");
  if (error) {
    addMessage(error, "error");
  } else if (plan?.message) {
    addMessage(plan.message);
  }
}

refreshKeyStatus();
loadLastRun();
