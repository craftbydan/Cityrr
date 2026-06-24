/**
 * Executes DOM actions returned by the AI agent.
 */
(function (global) {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function dispatchPointerClick(el) {
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const opts = {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y,
      button: 0,
    };

    el.dispatchEvent(new PointerEvent("pointerdown", opts));
    el.dispatchEvent(new MouseEvent("mousedown", opts));
    el.dispatchEvent(new PointerEvent("pointerup", opts));
    el.dispatchEvent(new MouseEvent("mouseup", opts));
    el.dispatchEvent(new MouseEvent("click", opts));
  }

  async function clickRef(ref) {
    const el = global.DomSnapshot.getElementByRef(ref);
    if (!el) {
      throw new Error(`Element not found: ${ref}`);
    }
    el.scrollIntoView({ block: "center", inline: "center", behavior: "auto" });
    await sleep(100);
    el.focus({ preventScroll: true });
    if (typeof el.click === "function") {
      el.click();
    } else {
      dispatchPointerClick(el);
    }
    return { ref, tag: el.tagName.toLowerCase(), label: el.textContent?.trim().slice(0, 60) };
  }

  async function clickPoint(x, y) {
    const el = global.DomSnapshot.elementAtPoint(x, y);
    if (!el) {
      throw new Error(`No element at (${x}, ${y})`);
    }
    dispatchPointerClick(el);
    return {
      x,
      y,
      tag: el.tagName.toLowerCase(),
      label: el.textContent?.trim().slice(0, 60),
    };
  }

  async function typeRef(ref, text) {
    const el = global.DomSnapshot.getElementByRef(ref);
    if (!el) {
      throw new Error(`Element not found: ${ref}`);
    }
    el.scrollIntoView({ block: "center", inline: "center", behavior: "auto" });
    el.focus();
    el.value = text;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    return { ref, text };
  }

  async function scrollPage(direction = "down", amount = 400) {
    const delta = direction === "up" ? -amount : amount;
    window.scrollBy({ top: delta, behavior: "smooth" });
    await sleep(300);
    return { direction, amount };
  }

  async function executeStep(step) {
    switch (step.action) {
      case "click":
        if (step.ref) return clickRef(step.ref);
        if (typeof step.x === "number" && typeof step.y === "number") {
          return clickPoint(step.x, step.y);
        }
        throw new Error("click requires ref or x/y");
      case "type":
        return typeRef(step.ref, step.text ?? "");
      case "scroll":
        return scrollPage(step.direction ?? "down", step.amount ?? 400);
      case "wait":
        await sleep(step.ms ?? 500);
        return { waited: step.ms ?? 500 };
      default:
        throw new Error(`Unknown action: ${step.action}`);
    }
  }

  async function executeSteps(steps) {
    const results = [];
    for (const step of steps) {
      results.push({ step, result: await executeStep(step) });
    }
    return results;
  }

  global.DomActions = {
    executeStep,
    executeSteps,
    clickRef,
    clickPoint,
    typeRef,
    scrollPage,
  };
})(typeof window !== "undefined" ? window : self);
