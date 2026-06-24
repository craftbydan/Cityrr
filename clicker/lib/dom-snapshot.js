/**
 * Builds a compact, AI-friendly snapshot of interactive DOM elements.
 */
(function (global) {
  const INTERACTIVE_SELECTOR = [
    "a[href]",
    "button",
    "input",
    "select",
    "textarea",
    "[role='button']",
    "[role='link']",
    "[role='menuitem']",
    "[role='tab']",
    "[role='checkbox']",
    "[role='radio']",
    "[role='switch']",
    "[role='combobox']",
    "[role='textbox']",
    "[onclick]",
    "[tabindex]:not([tabindex='-1'])",
    "summary",
    "label[for]",
  ].join(",");

  function isVisible(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
    const style = window.getComputedStyle(el);
    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      style.opacity === "0"
    ) {
      return false;
    }
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function getLabel(el) {
    const parts = [];
    const aria = el.getAttribute("aria-label");
    const title = el.getAttribute("title");
    const placeholder = el.getAttribute("placeholder");
    const alt = el.getAttribute("alt");
    const name = el.getAttribute("name");
    const value =
      el.tagName === "INPUT" || el.tagName === "TEXTAREA"
        ? el.value
        : el.textContent;

    if (aria) parts.push(aria);
    if (title) parts.push(title);
    if (placeholder) parts.push(placeholder);
    if (alt) parts.push(alt);
    if (name) parts.push(`name=${name}`);
    if (value) parts.push(value.trim().slice(0, 80));

    const text = parts.filter(Boolean).join(" | ").replace(/\s+/g, " ").trim();
    return text.slice(0, 120) || el.tagName.toLowerCase();
  }

  function describeElement(el, ref) {
    const rect = el.getBoundingClientRect();
    return {
      ref,
      tag: el.tagName.toLowerCase(),
      type: el.getAttribute("type") || undefined,
      role: el.getAttribute("role") || undefined,
      label: getLabel(el),
      href: el.tagName === "A" ? el.getAttribute("href")?.slice(0, 120) : undefined,
      disabled: Boolean(el.disabled || el.getAttribute("aria-disabled") === "true"),
      checked: el.checked ?? undefined,
      bounds: {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        w: Math.round(rect.width),
        h: Math.round(rect.height),
      },
    };
  }

  function buildDomSnapshot(options = {}) {
    const maxElements = options.maxElements ?? 120;
    const elements = [];
    const refMap = new Map();

    document.querySelectorAll(INTERACTIVE_SELECTOR).forEach((el) => {
      if (!isVisible(el)) return;
      if (elements.length >= maxElements) return;

      const ref = `e${elements.length + 1}`;
      el.setAttribute("data-dom-ai-ref", ref);
      refMap.set(ref, el);
      elements.push(describeElement(el, ref));
    });

    return {
      url: window.location.href,
      title: document.title,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        scrollX: Math.round(window.scrollX),
        scrollY: Math.round(window.scrollY),
      },
      elements,
      refMap,
      textSummary: elements
        .map((e) => `${e.ref}: <${e.tag}> "${e.label}" @(${e.bounds.x},${e.bounds.y})`)
        .join("\n"),
    };
  }

  function getElementByRef(ref) {
    return document.querySelector(`[data-dom-ai-ref="${ref}"]`);
  }

  function clearRefs() {
    document.querySelectorAll("[data-dom-ai-ref]").forEach((el) => {
      el.removeAttribute("data-dom-ai-ref");
    });
  }

  function elementAtPoint(x, y) {
    const stack = document.elementsFromPoint(x, y);
    for (const el of stack) {
      if (el.matches(INTERACTIVE_SELECTOR) && isVisible(el)) {
        return el;
      }
      const interactive = el.closest(INTERACTIVE_SELECTOR);
      if (interactive && isVisible(interactive)) {
        return interactive;
      }
    }
    return stack[0] || null;
  }

  global.DomSnapshot = {
    buildDomSnapshot,
    getElementByRef,
    clearRefs,
    elementAtPoint,
    isVisible,
  };
})(typeof window !== "undefined" ? window : self);
