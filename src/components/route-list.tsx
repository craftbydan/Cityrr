"use client";

import { useState } from "react";
import type { Route } from "@/lib/routes";
import { IconAlert, IconDistance, IconElevation, IconTime } from "@/components/icons";
import { MetaTag, StatusBadge } from "@/components/route-ui";

function RouteListItem({ route }: { route: Route }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="border-b border-border bg-surface last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full min-h-[44px] flex-col gap-2 px-3 py-3 text-left active:bg-surface-2"
        aria-expanded={open}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-accent">{route.routeId}</span>
              <span className="truncate text-[11px] text-muted">{route.city}</span>
            </div>
            <h3 className="mt-0.5 text-sm font-medium leading-snug text-foreground">
              {route.name}
            </h3>
          </div>
          <StatusBadge status={route.status} />
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <IconDistance />
            <span className="tabular-nums text-foreground">{route.distanceKm} km</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <IconTime />
            <span className="tabular-nums text-foreground">{route.durationMin} min</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <IconElevation />
            <span className="tabular-nums text-foreground">+{route.elevationGainM}m</span>
          </span>
          <span className="text-foreground/80">{route.terrain}</span>
        </div>

        <span className="text-[11px] text-muted">
          {open ? "Hide details" : "Show details"}
        </span>
      </button>

      {open && (
        <div className="space-y-3 border-t border-border bg-surface-2/50 px-3 py-3 text-xs">
          <div className="flex flex-wrap gap-1.5">
            <MetaTag label="Tech" value={route.technicalDifficulty} />
            <MetaTag label="Pace" value={`${route.avgPaceMinPerKm} min/km`} />
            <MetaTag label="Weather" value={route.weatherImpact} />
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Start hub</p>
            <p className="mt-0.5 text-foreground">{route.startHub}</p>
            <p className="text-muted">{route.startLine}</p>
            <p className="mt-0.5 font-mono text-[10px] text-muted/80">{route.startCoords}</p>
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">End location</p>
            <p className="mt-0.5 text-foreground">{route.endLocation}</p>
            <p className="font-mono text-[10px] text-muted/80">{route.endCoords}</p>
            <p className="mt-1 text-muted">
              Hub: <span className="text-foreground">{route.endTransitHub}</span> ({route.endTransitLine})
            </p>
          </div>

          {route.constructionAlert ? (
            <div className="flex items-start gap-2 rounded border border-amber-500/30 bg-amber-500/10 p-2 text-amber-400/95">
              <IconAlert className="mt-0.5 shrink-0" />
              <span>{route.constructionAlert}</span>
            </div>
          ) : (
            <p className="text-muted">No active construction alerts</p>
          )}
        </div>
      )}
    </article>
  );
}

export function RouteList({ routes }: { routes: Route[] }) {
  return (
    <div className="overflow-hidden border border-border bg-surface lg:hidden" style={{ borderRadius: "6px" }}>
      {routes.map((route) => (
        <RouteListItem key={route.id} route={route} />
      ))}
    </div>
  );
}
