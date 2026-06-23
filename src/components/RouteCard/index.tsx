"use client";

import type { ClubProfile, RouteData } from "@/types/club";

interface RouteCardProps {
  route: RouteData;
  club: ClubProfile;
  index: number;
}

function needsLightText(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.45;
}

export default function RouteCard({ route, club, index }: RouteCardProps) {
  const { startStation, distanceKm, elevationGainM, endCafe, cafeArea, dayOfWeek, meetTime, stravaRouteUrl } = route;
  const { branding } = club;
  const primary = branding.primary;
  const lightText = needsLightText(primary);

  const cssVars = {
    "--club-primary": primary,
    "--club-accent":  branding.accent,
  } as React.CSSProperties;

  return (
    <article
      className="club-root border-b"
      style={{ ...cssVars, borderColor: "var(--color-rule)" }}
    >
      {/* ── Top bar: route number + transit line + club ──────────────────── */}
      <div
        className="flex items-center justify-between px-5 pt-5 pb-0"
      >
        <div className="flex items-center gap-3">
          {/* Route number pill */}
          <span
            className="font-metro text-[9px] font-900 tracking-[0.18em] uppercase px-2 py-1"
            style={{
              backgroundColor: "var(--club-primary-faint)",
              color: "var(--club-primary)",
              border: "1px solid color-mix(in srgb, var(--club-primary) 25%, transparent)",
            }}
          >
            {String(index).padStart(2, "0")}
          </span>

          {/* Transit line + schedule */}
          <span className="sys-label">
            {startStation.line}&nbsp;·&nbsp;{dayOfWeek.slice(0, 3)}&nbsp;·&nbsp;{meetTime}
          </span>
        </div>

        {/* Club — secondary, right-aligned */}
        <span
          className="font-metro text-[9px] font-bold tracking-[0.14em] uppercase text-[var(--color-ink-mid)]"
        >
          {club.shortName ?? club.name.split(" ")[0]}
        </span>
      </div>

      {/* ── Station name — the HERO ─────────────────────────────────────── */}
      <div className="px-5 pt-3 pb-2">
        <h2
          className="font-metro font-black uppercase text-[var(--color-ink)] leading-[0.86]"
          style={{ fontSize: "clamp(3rem, 16vw, 7rem)" }}
        >
          {startStation.name}
        </h2>
      </div>

      {/* ── Distance + elevation row ─────────────────────────────────────── */}
      <div className="px-5 py-3 flex items-baseline gap-3">
        <span
          className="font-metro font-black uppercase"
          style={{ fontSize: "clamp(1.1rem, 5vw, 1.8rem)", color: "var(--club-primary)" }}
        >
          {distanceKm} km
        </span>
        {elevationGainM && (
          <span className="font-mono text-[11px] text-[var(--color-ink-mid)]">
            +{elevationGainM}m
          </span>
        )}
        <span className="font-mono text-[11px] text-[var(--color-ink-faint)]">
          {route.tags.slice(0, 2).join(" · ")}
        </span>
      </div>

      {/* ── Café — secondary destination ────────────────────────────────── */}
      <div className="px-5 pb-6">
        <p
          className="font-metro font-bold uppercase tracking-tight leading-tight text-[var(--color-ink)]"
          style={{ fontSize: "clamp(1.4rem, 7vw, 2.4rem)" }}
        >
          {endCafe}
        </p>
        <p className="font-mono text-[11px] text-[var(--color-ink-mid)] mt-1 tracking-wider uppercase">
          {cafeArea}
        </p>
      </div>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <a
        href={stravaRouteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-route${lightText ? " light-text" : ""}`}
        aria-label={`Open ${route.name} in Strava`}
      >
        <span>Open in Strava</span>
        <span aria-hidden className="text-base leading-none">↗</span>
      </a>
    </article>
  );
}
