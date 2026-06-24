"use client";

import { useEffect, useState } from "react";
import { RouteCard } from "@/components/route-card";
import { routes } from "@/lib/routes";

const INTRO_HOLD_MS = 2200;
const TRANSITION_MS = 900;
const LOGO = "Cityrr.";

export function LandingPage() {
  const [phase, setPhase] = useState<"intro" | "main">("intro");

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase("main"), INTRO_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const isMain = phase === "main";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-blue-light">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-30 bg-blue transition-opacity ease-out"
        style={{
          opacity: isMain ? 0 : 1,
          transitionDuration: `${TRANSITION_MS}ms`,
        }}
      />

      <div
        className="fixed z-50 ease-in-out"
        style={{
          top: isMain ? "1.5rem" : "50%",
          left: isMain ? "1.5rem" : "50%",
          transform: isMain ? "translate(0, 0)" : "translate(-50%, -50%)",
          transition: `top ${TRANSITION_MS}ms ease-in-out, left ${TRANSITION_MS}ms ease-in-out, transform ${TRANSITION_MS}ms ease-in-out`,
        }}
      >
        <h1
          className="font-display font-semibold leading-none tracking-tight transition-all ease-in-out"
          style={{
            fontSize: isMain ? "clamp(1.75rem, 5vw, 2.25rem)" : "clamp(4rem, 22vw, 11rem)",
            color: isMain ? "var(--color-orange)" : "var(--color-orange-light)",
            transitionDuration: `${TRANSITION_MS}ms`,
          }}
        >
          {LOGO}
        </h1>
      </div>

      <main
        className="relative z-10 mx-auto max-w-6xl px-6 pb-16 ease-out"
        style={{
          paddingTop: isMain ? "6.5rem" : "100vh",
          opacity: isMain ? 1 : 0,
          transition: `opacity ${TRANSITION_MS}ms ease-out ${isMain ? "200ms" : "0ms"}, padding-top ${TRANSITION_MS}ms ease-in-out`,
        }}
      >
        <header className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue">
            City runs, curated
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-blue-deep sm:text-4xl">
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
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-blue/50">Distance</span>
            {["5K", "10K", "15K", "20K"].map((band) => (
              <button
                key={band}
                type="button"
                className="rounded-full border border-blue/20 bg-white px-4 py-1.5 text-sm font-medium text-blue/70 transition-colors hover:border-orange hover:text-orange"
              >
                {band}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
