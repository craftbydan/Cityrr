"use client";

import type { RouteData } from "@/types/club";

export default function TransitToToastCard({ route }: { route: RouteData }) {
  const { startStation, distanceKm, elevationGainM, endCafe, cafeArea, dayOfWeek, meetTime, tags } = route;

  return (
    <div className="px-5 py-8 space-y-7">

      <Row label="Departure">
        {startStation.line}&nbsp;{startStation.name}
      </Row>

      <Row label="Run">
        {distanceKm} km
        {elevationGainM && (
          <span className="text-[var(--color-ink-faint)]"> · +{elevationGainM}m</span>
        )}
      </Row>

      <Row label="Café">
        {endCafe}
        <span className="text-[var(--color-ink-faint)]"> · {cafeArea}</span>
      </Row>

      <Row label="Schedule">
        {dayOfWeek}
        <span className="text-[var(--color-ink-faint)]"> · </span>
        <span style={{ color: "var(--club-primary)" }}>{meetTime}</span>
      </Row>

      {tags.length > 0 && (
        <p className="font-body text-[10px] tracking-[0.1em] text-[var(--color-ink-faint)] uppercase leading-relaxed">
          {tags.join(" · ")}
        </p>
      )}
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-body text-[9px] tracking-[0.2em] uppercase text-[var(--color-ink-faint)] mb-1.5">
        {label}
      </p>
      <p className="font-body text-[1.05rem] font-medium text-[var(--color-ink)] leading-tight">
        {children}
      </p>
    </div>
  );
}
