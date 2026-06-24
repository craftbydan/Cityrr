const overlayState = {
  pickMode: false,
  highlights: [],
};

function createOverlay() {
  let root = document.getElementById("dom-ai-overlay-root");
  if (root) return root;

  root = document.createElement("div");
  root.id = "dom-ai-overlay-root";
  document.documentElement.appendChild(root);
  return root;
}

function clearHighlights() {
  overlayState.highlights.forEach((el) => el.remove());
  overlayState.highlights = [];
}

function highlightElement(el, color = "#6366f1") {
  const rect = el.getBoundingClientRect();
  const box = document.createElement("div");
  box.className = "dom-ai-highlight";
  box.style.left = `${rect.x + window.scrollX}px`;
  box.style.top = `${rect.y + window.scrollY}px`;
  box.style.width = `${rect.width}px`;
  box.style.height = `${rect.height}px`;
  box.style.borderColor = color;
  createOverlay().appendChild(box);
  overlayState.highlights.push(box);
  return box;
}

function highlightRef(ref) {
  const el = DomSnapshot.getElementByRef(ref);
  if (el) highlightElement(el);
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "dom-ai-toast";
  toast.textContent = message;
  createOverlay().appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function setPickMode(enabled) {
  overlayState.pickMode = enabled;
  document.body.classList.toggle("dom-ai-pick-mode", enabled);
  if (enabled) {
    showToast("Pick mode: click any element on the page");
  }
}

async function handlePickClick(event) {
  if (!overlayState.pickMode) return;

  event.preventDefault();
  event.stopPropagation();

  const x = event.clientX;
  const y = event.clientY;
  const el = DomSnapshot.elementAtPoint(x, y);

  setPickMode(false);
  clearHighlights();

  if (!el) {
    chrome.runtime.sendMessage({
      type: "PICK_RESULT",
      error: "No element at click position",
      x,
      y,
    });
    return;
  }

  highlightElement(el, "#22c55e");

  const snapshot = DomSnapshot.buildDomSnapshot();
  const ref = el.getAttribute("data-dom-ai-ref");

  chrome.runtime.sendMessage({
    type: "PICK_RESULT",
    x,
    y,
    ref,
    tag: el.tagName.toLowerCase(),
    label: el.textContent?.trim().slice(0, 120) || el.getAttribute("aria-label"),
    snapshot: {
      url: snapshot.url,
      title: snapshot.title,
      viewport: snapshot.viewport,
      elements: snapshot.elements,
      textSummary: snapshot.textSummary,
    },
  });
}

document.addEventListener(
  "click",
  handlePickClick,
  true
);

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  (async () => {
    try {
      switch (message.type) {
        case "GET_SNAPSHOT": {
          DomSnapshot.clearRefs();
          const snapshot = DomSnapshot.buildDomSnapshot(message.options);
          snapshot.elements.forEach((item) => highlightRef(item.ref));
          sendResponse({
            ok: true,
            snapshot: {
              url: snapshot.url,
              title: snapshot.title,
              viewport: snapshot.viewport,
              elements: snapshot.elements,
              textSummary: snapshot.textSummary,
            },
          });
          break;
        }

        case "EXECUTE_STEPS": {
          clearHighlights();
          const results = await DomActions.executeSteps(message.steps);
          results.forEach(({ step }) => {
            if (step.ref) highlightRef(step.ref);
          });
          sendResponse({ ok: true, results });
          break;
        }

        case "CLICK_POINT": {
          clearHighlights();
          const result = await DomActions.clickPoint(message.x, message.y);
          const el = DomSnapshot.elementAtPoint(message.x, message.y);
          if (el) highlightElement(el, "#22c55e");
          sendResponse({ ok: true, result });
          break;
        }

        case "SET_PICK_MODE": {
          setPickMode(Boolean(message.enabled));
          sendResponse({ ok: true, pickMode: overlayState.pickMode });
          break;
        }

        case "CLEAR_OVERLAY": {
          clearHighlights();
          setPickMode(false);
          DomSnapshot.clearRefs();
          sendResponse({ ok: true });
          break;
        }

        default:
          sendResponse({ ok: false, error: "Unknown message type" });
      }
    } catch (error) {
      sendResponse({ ok: false, error: error.message });
    }
  })();

  return true;
});
