"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Dashboard } from "@/components/dashboard";

const INTRO_HOLD_MS = 2200;
const TRANSITION_MS = 900;
const LOGO = "Cityrr.";
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

export function LandingPage() {
  const logoRef = useRef<HTMLHeadingElement>(null);
  const firstRectRef = useRef<DOMRect | null>(null);
  const shouldAnimateRef = useRef(false);

  const [phase, setPhase] = useState<"intro" | "main">("intro");
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setPhase("main");
      setContentVisible(true);
      return;
    }

    const holdTimer = window.setTimeout(() => {
      const logo = logoRef.current;
      if (!logo) {
        setPhase("main");
        setContentVisible(true);
        return;
      }

      firstRectRef.current = logo.getBoundingClientRect();
      shouldAnimateRef.current = true;
      setPhase("main");
    }, INTRO_HOLD_MS);

    return () => window.clearTimeout(holdTimer);
  }, []);

  useLayoutEffect(() => {
    if (phase !== "main" || !shouldAnimateRef.current) return;

    const logo = logoRef.current;
    const first = firstRectRef.current;
    if (!logo || !first) return;

    shouldAnimateRef.current = false;

    const last = logo.getBoundingClientRect();
    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;
    const scaleX = first.width / last.width;
    const scaleY = first.height / last.height;

    logo.style.transformOrigin = "top left";
    logo.style.transition = "none";
    logo.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})`;

    requestAnimationFrame(() => {
      logo.style.transition = `transform ${TRANSITION_MS}ms ${EASE}, color ${TRANSITION_MS}ms ease`;
      logo.style.transform = "translate3d(0, 0, 0) scale(1)";

      window.setTimeout(() => {
        logo.style.transition = "";
        logo.style.transform = "";
        logo.style.transformOrigin = "";
        setContentVisible(true);
      }, TRANSITION_MS);
    });
  }, [phase]);

  const isIntro = phase === "intro";
  const showSplash = isIntro || !contentVisible;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 bg-navy"
        style={{
          opacity: showSplash ? 1 : 0,
          transition: `opacity ${TRANSITION_MS}ms ${EASE}`,
        }}
      />

      <h1
        ref={logoRef}
        className="fixed z-50 font-display font-semibold leading-none tracking-tight whitespace-nowrap"
        style={{
          top: isIntro ? "50%" : "calc(var(--safe-top, 0px) + 0.75rem)",
          left: isIntro ? "50%" : "1rem",
          fontSize: isIntro ? "clamp(4rem, 22vw, 11rem)" : "clamp(1.75rem, 5vw, 2rem)",
          color: isIntro ? "var(--surface)" : "var(--coral)",
          transform: isIntro ? "translate(-50%, -50%)" : undefined,
          willChange: !contentVisible && !isIntro ? "transform" : undefined,
        }}
      >
        {LOGO}
      </h1>

      <div
        className="relative z-10"
        style={{
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? "translateY(0)" : "translateY(12px)",
          transition: `opacity ${TRANSITION_MS}ms ${EASE}, transform ${TRANSITION_MS}ms ${EASE}`,
          pointerEvents: contentVisible ? "auto" : "none",
        }}
      >
        <Dashboard showLogo={false} />
      </div>
    </div>
  );
}
