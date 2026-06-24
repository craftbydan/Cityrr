"use client";

import { useState } from "react";
import type { Route } from "@/lib/routes";
import { IconAlert, IconDistance, IconElevation, IconTime } from "@/components/icons";
import { MetaTag, StatusBadge } from "@/components/route-ui";

const accents = ["border-l-orange bg-orange/5", "border-l-blue bg-blue/5", "border-l-foreground bg-foreground/5"];

function RouteListItem({ route, index }: { route: Route; index: number }) {
  const [open, setOpen] = useState(false);
  const accent = accents[index % accents.length];

  return (
    <article className={`border-b-2 border-border last:border-b-0 border-l-[6px] ${accent}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full min-h-[44px] flex-col gap-3 px-4 py-4 text-left active:bg-surface-2"
        aria-expanded={open}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-bright">{route.routeId}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-muted">{route.city}</span>
            </div>
            <h3 className="font-display mt-1 text-xl font-extrabold leading-[1.05] tracking-tight text-foreground">
              {route.name}
            </h3>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <StatusBadge status={route.status} />
            <span className="font-display text-3xl font-extrabold leading-none tabular-nums text-orange">
              {route.distanceKm}
              <span className="text-base">km</span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 border-2 border-border bg-surface px-2.5 py-1 text-xs font-semibold">
            <IconTime className="text-orange" />
            <span className="tabular-nums">{route.durationMin}m</span>
          </span>
          <span className="inline-flex items-center gap-1.5 border-2 border-border bg-surface px-2.5 py-1 text-xs font-semibold">
            <IconElevation className="text-blue-bright" />
            <span className="tabular-nums">+{route.elevationGainM}m</span>
          </span>
          <span className="inline-flex items-center gap-1.5 border-2 border-border bg-surface px-2.5 py-1 text-xs font-semibold">
            <IconDistance className="text-muted" />
            <span>{route.terrain}</span>
          </span>
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-orange">
          {open ? "− Close" : "+ Details"}
        </span>
      </button>

      {open && (
        <div className="space-y-4 border-t-2 border-border bg-surface px-4 py-4 text-sm">
          <div className="flex flex-wrap gap-2">
            <MetaTag label="Tech" value={route.technicalDifficulty} variant="blue" />
            <MetaTag label="Pace" value={`${route.avgPaceMinPerKm}m/km`} />
            <MetaTag label="Weather" value={route.weatherImpact} variant="orange" />
          </div>

          <div className="grid gap-3">
            <div className="border-2 border-border bg-background p-3" style={{ borderRadius: "var(--radius-md)" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-bright">Start hub</p>
              <p className="mt-1 font-semibold">{route.startHub}</p>
              <p className="text-muted">{route.startLine}</p>
              <p className="mt-1 font-mono text-xs text-muted">{route.startCoords}</p>
            </div>
            <div className="border-2 border-border bg-background p-3" style={{ borderRadius: "var(--radius-md)" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-orange">End location</p>
              <p className="mt-1 font-semibold">{route.endLocation}</p>
              <p className="font-mono text-xs text-muted">{route.endCoords}</p>
              <p className="mt-2 text-xs text-muted">
                Hub <span className="font-semibold text-foreground">{route.endTransitHub}</span> · {route.endTransitLine}
              </p>
            </div>
          </div>

          {route.constructionAlert ? (
            <div className="flex items-start gap-2 border-2 border-[#ffab00] bg-[#ffab00]/15 p-3 font-medium text-[#ffab00]">
              <IconAlert className="mt-0.5 shrink-0" />
              <span>{route.constructionAlert}</span>
            </div>
          ) : (
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">No active alerts</p>
          )}
        </div>
      )}
    </article>
  );
}

export function RouteList({ routes }: { routes: Route[] }) {
  return (
    <div className="overflow-hidden border-2 border-foreground bg-surface lg:hidden" style={{ borderRadius: "var(--radius-md)" }}>
      {routes.map((route, index) => (
        <RouteListItem key={route.id} route={route} index={index} />
      ))}
    </div>
  );
}
