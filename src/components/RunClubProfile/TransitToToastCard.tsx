"use client";

import type { RouteData, TransitLine } from "@/types/club";

interface TransitToToastCardProps {
  route: RouteData;
}

const LINE_LABELS: Record<TransitLine, string> = {
  BTS: "BTS Skytrain",
  MRT: "MRT Blue Line",
  ARL: "Airport Rail Link",
};

const LINE_CHIP_CLASS: Record<TransitLine, string> = {
  BTS: "chip-bts",
  MRT: "chip-mrt",
  ARL: "chip-arl",
};

export default function TransitToToastCard({ route }: TransitToToastCardProps) {
  const { startStation, distanceKm, endCafe, cafeArea, tags, dayOfWeek, meetTime } = route;

  return (
    <article className="card-crisp overflow-hidden">

      {/* ── Card header label ─────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)]"
        style={{ backgroundColor: "var(--club-primary-fade)" }}
      >
        <span
          className="font-body text-[10px] font-bold tracking-[0.16em] uppercase"
          style={{ color: "var(--club-primary)" }}
        >
          Transit-to-Toast
        </span>
        <span className="font-body text-[11px] text-[var(--color-ink-muted)] tracking-wide">
          {route.name}
        </span>
      </div>

      {/* ── Route visualization ────────────────────────────────────────── */}
      <div className="px-5 pt-6 pb-5">

        {/* Station → Distance → Café row */}
        <div className="flex items-center gap-3 mb-5">

          {/* START — transit station */}
          <div className="flex flex-col items-center flex-shrink-0 w-[88px]">
            <StationBadge
              code={startStation.code}
              line={startStation.line}
            />
            <span className="font-body text-[11px] font-semibold text-[var(--color-ink)] text-center leading-tight mt-2 tracking-tight">
              {startStation.name}
            </span>
            <span className="font-body text-[9px] text-[var(--color-ink-faint)] text-center tracking-wider uppercase mt-0.5">
              {LINE_LABELS[startStation.line]}
            </span>
          </div>

          {/* Route line with distance */}
          <div className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
            <div className="relative flex items-center w-full">
              {/* Start dot */}
              <span className="route-dot-start w-2.5 h-2.5 rounded-full flex-shrink-0 z-10" />
              {/* Dashed line */}
              <div
                className="flex-1 h-[2px] mx-1"
                style={{
                  backgroundImage: "repeating-linear-gradient(90deg, var(--club-primary) 0, var(--club-primary) 5px, transparent 5px, transparent 10px)",
                  opacity: 0.5,
                }}
                aria-hidden
              />
              {/* Distance badge */}
              <span
                className="font-body text-[11px] font-bold tracking-wide px-2 py-0.5 z-10 flex-shrink-0"
                style={{
                  color: "var(--club-primary)",
                  border: "1.5px solid var(--club-primary)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                {distanceKm}K
              </span>
              {/* Dashed line */}
              <div
                className="flex-1 h-[2px] mx-1"
                style={{
                  backgroundImage: "repeating-linear-gradient(90deg, var(--club-primary) 0, var(--club-primary) 5px, transparent 5px, transparent 10px)",
                  opacity: 0.5,
                }}
                aria-hidden
              />
              {/* End dot — filled */}
              <span
                className="route-dot-end w-2.5 h-2.5 rounded-full flex-shrink-0 z-10"
              />
            </div>
            {elevationBadge(route.elevationGainM)}
          </div>

          {/* END — café */}
          <div className="flex flex-col items-center flex-shrink-0 w-[88px]">
            <CafeIcon />
            <span className="font-body text-[11px] font-semibold text-[var(--color-ink)] text-center leading-tight mt-2 tracking-tight">
              {endCafe}
            </span>
            <span className="font-body text-[9px] text-[var(--color-ink-faint)] text-center tracking-wider uppercase mt-0.5">
              {cafeArea}
            </span>
          </div>
        </div>

        {/* ── Schedule line ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 mb-4">
          <ClockIcon />
          <span className="font-body text-[12px] text-[var(--color-ink-muted)] tracking-wide">
            <span className="text-[var(--color-ink)] font-semibold">{dayOfWeek}</span>
            {" · "}
            <span style={{ color: "var(--club-primary)", fontWeight: 600 }}>{meetTime}</span>
            {" · Meet at station exit"}
          </span>
        </div>

        {/* ── Tag pills ──────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="tag-club font-body text-[10px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Subtle footer with transit line color accent ───────────────── */}
      <div
        className="h-[3px] w-full"
        style={{ backgroundColor: "var(--club-primary)", opacity: 0.2 }}
        aria-hidden
      />
    </article>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────────── */

function StationBadge({ code, line }: { code: string; line: TransitLine }) {
  return (
    <div className={`${LINE_CHIP_CLASS[line]} inline-flex items-center justify-center font-body text-[11px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-sm`}>
      <span className="mr-1 opacity-75 text-[9px]">{line}</span>
      {code}
    </div>
  );
}

function elevationBadge(elevationGainM?: string) {
  if (!elevationGainM) return null;
  return (
    <span className="font-body text-[9px] text-[var(--color-ink-faint)] tracking-wider uppercase flex items-center gap-1">
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
      +{elevationGainM}m elev
    </span>
  );
}

function CafeIcon() {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center border-2"
      style={{
        borderColor: "var(--club-accent)",
        backgroundColor: "var(--club-accent-fade)",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--club-accent)" }} aria-hidden>
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" y1="2" x2="6" y2="4" />
        <line x1="10" y1="2" x2="10" y2="4" />
        <line x1="14" y1="2" x2="14" y2="4" />
      </svg>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: "var(--color-ink-faint)", flexShrink: 0 }} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
