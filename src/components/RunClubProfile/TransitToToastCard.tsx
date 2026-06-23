"use client";

import type { RouteData } from "@/types/club";

export default function TransitToToastCard({ route }: { route: RouteData }) {
  const {
    startStation,
    distanceKm,
    elevationGainM,
    endCafe,
    cafeArea,
    dayOfWeek,
    meetTime,
    tags,
  } = route;

  return (
    <div className="px-5 py-8">

      {/* 2-col metro departure board */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-8">

        <Cell label="Departure">
          <span className="font-metro font-bold uppercase tracking-tight text-[var(--color-ink)]"
            style={{ fontSize: "clamp(1.1rem, 5vw, 1.5rem)" }}>
            {startStation.line} {startStation.name}
          </span>
        </Cell>

        <Cell label="Distance">
          <span className="font-metro font-bold uppercase tracking-tight text-[var(--color-ink)]"
            style={{ fontSize: "clamp(1.1rem, 5vw, 1.5rem)" }}>
            {distanceKm} km
          </span>
          {elevationGainM && (
            <span className="block font-mono text-[11px] text-[var(--color-ink-mid)] mt-1">
              +{elevationGainM}m elevation
            </span>
          )}
        </Cell>

        <Cell label="Café">
          <span className="font-metro font-bold uppercase tracking-tight text-[var(--color-ink)]"
            style={{ fontSize: "clamp(1.1rem, 5vw, 1.5rem)" }}>
            {endCafe}
          </span>
          <span className="block font-mono text-[11px] text-[var(--color-ink-mid)] mt-1 normal-case">
            {cafeArea}
          </span>
        </Cell>

        <Cell label="Schedule">
          {/* Day */}
          <span className="font-metro font-bold uppercase tracking-tight text-[var(--color-ink)]"
            style={{ fontSize: "clamp(1.1rem, 5vw, 1.5rem)" }}>
            {dayOfWeek.slice(0, 3)}
          </span>
          {/* Time — the Aesop amber touch */}
          <span
            className="block font-metro font-bold text-[1.4rem] tracking-tight mt-0.5"
            style={{ color: "var(--club-primary)" }}
          >
            {meetTime}
          </span>
        </Cell>

      </div>

      {/* Tags — small amber dots */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-[0.12em] uppercase text-[var(--color-ink-faint)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="metro-label mb-2">{label}</p>
      {children}
    </div>
  );
}
