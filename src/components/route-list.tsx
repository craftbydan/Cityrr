"use client";

import type { Route } from "@/lib/routes";

function RouteCard({ route }: { route: Route }) {
  return (
    <article
      className="overflow-hidden border border-border bg-surface shadow-[0_4px_24px_rgba(42,33,24,0.06)]"
      style={{ borderRadius: "var(--radius-lg)" }}
    >
      <div className="border-b border-border bg-surface-2 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              {route.neighborhood}
            </p>
            <h2 className="font-display mt-0.5 text-xl font-semibold leading-tight text-navy">
              {route.name}
            </h2>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-semibold leading-none tabular-nums text-coral">
              {route.distanceKm}
              <span className="text-sm font-bold">km</span>
            </p>
            <p className="mt-0.5 text-xs text-muted">~{route.durationMin} min</p>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted">
          <span>{route.terrain}</span>
          <span>·</span>
          <span>+{route.elevationGainM}m</span>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex gap-3">
          <div className="flex flex-col items-center pt-1">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-mta text-[11px] font-bold text-navy"
              aria-hidden
            >
              M
            </span>
            <div className="my-1 w-px flex-1 bg-border" />
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-coffee text-sm"
              aria-hidden
            >
              ☕
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-4 py-0.5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Get off here</p>
              <p className="mt-0.5 font-semibold text-foreground">{route.mtaStation}</p>
              <p className="text-sm text-muted">{route.mtaLines}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">You&apos;ve earned this</p>
              <p className="mt-0.5 font-semibold text-foreground">{route.finishSpot}</p>
              <p className="text-sm text-muted">{route.finishType}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function RouteList({ routes }: { routes: Route[] }) {
  return (
    <div className="flex flex-col gap-4">
      {routes.map((route) => (
        <RouteCard key={route.id} route={route} />
      ))}
    </div>
  );
}
