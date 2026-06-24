"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { RouteCard } from "@/components/route-card";
import { routes } from "@/lib/routes";

const INTRO_HOLD_MS = 2200;
const TRANSITION_MS = 900;
const LOGO = "Cityrr.";
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const HEADER_HEIGHT = "4.5rem";

export function LandingPage() {
  const logoRef = useRef<HTMLHeadingElement>(null);
  const firstRectRef = useRef<DOMRect | null>(null);
  const shouldAnimateRef = useRef(false);

  const [phase, setPhase] = useState<"intro" | "main">("intro");
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

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
    <div className="relative min-h-screen overflow-x-hidden bg-blue-light">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 bg-blue"
        style={{
          opacity: showSplash ? 1 : 0,
          transition: `opacity ${TRANSITION_MS}ms ${EASE}`,
        }}
      />

      {!isIntro && (
        <div
          aria-hidden
          className="fixed inset-x-0 top-0 z-40 border-b border-blue/10 bg-blue-light/95 backdrop-blur-sm"
          style={{ height: HEADER_HEIGHT }}
        />
      )}

      <h1
        ref={logoRef}
        className="fixed z-50 font-display font-semibold leading-none tracking-tight whitespace-nowrap"
        style={{
          top: isIntro ? "50%" : "1.25rem",
          left: isIntro ? "50%" : "max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))",
          fontSize: isIntro
            ? "clamp(4rem, 22vw, 11rem)"
            : "clamp(1.5rem, 4vw, 1.875rem)",
          color: isIntro ? "var(--color-orange-light)" : "var(--color-orange)",
          transform: isIntro ? "translate(-50%, -50%)" : undefined,
          willChange: !contentVisible && !isIntro ? "transform" : undefined,
        }}
      >
        {LOGO}
      </h1>

      <main
        className="relative z-10 mx-auto max-w-6xl px-6 pb-16"
        style={{
          paddingTop: isIntro ? 0 : `calc(${HEADER_HEIGHT} + 2.5rem)`,
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? "translateY(0)" : "translateY(12px)",
          transition: `opacity ${TRANSITION_MS}ms ${EASE}, transform ${TRANSITION_MS}ms ${EASE}`,
          pointerEvents: contentVisible ? "auto" : "none",
        }}
      >
        <header className="mb-10 max-w-2xl">
          <p className="text-sm font-medium text-blue/70">
            City runs, curated
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-blue-deep sm:text-[2.125rem]">
            Start on transit.
            <br />
            Finish with breakfast.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-blue/75">
            Discover urban running routes from 5K to 20K — each one begins at a
            public transport stop and ends at a great breakfast spot.
          </p>
        </header>

        <section aria-label="Running routes">
          <div className="mb-6 flex flex-wrap items-center gap-2.5">
            <span className="text-sm font-medium text-blue/50">Distance</span>
            {["5K", "10K", "15K", "20K"].map((band, i) => (
              <button
                key={band}
                type="button"
                className={`border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  i % 2 === 0
                    ? "border-blue/25 bg-blue-light/80 text-blue hover:bg-blue hover:text-white"
                    : "border-orange/25 bg-[#fff4ee] text-orange hover:bg-orange hover:text-white"
                }`}
                style={{ borderRadius: "var(--radius-btn)" }}
              >
                {band}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((route, index) => (
              <RouteCard key={route.id} route={route} index={index} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
