"use client";

import type { ClubProfile, RouteData } from "@/types/club";
import type { WeatherSummary } from "@/types/weather";
import RouteMap from "@/components/RouteMap";

interface RouteSectionProps {
  route: RouteData;
  club: ClubProfile;
  index: number;
  weather: WeatherSummary | null;
}

function needsLightText(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.45;
}

export default function RouteSection({ route, club, index, weather }: RouteSectionProps) {
  const primary = club.branding.primary;
  const accent  = club.branding.accent;
  const light   = needsLightText(primary);

  const cssVars = {
    "--club-primary": primary,
    "--club-accent":  accent,
  } as React.CSSProperties;

  return (
    <section
      className="club-root border-b"
      style={{ ...cssVars, borderColor: "var(--color-rule)" }}
    >
      {/* ── Route identity ─────────────────────────────────────────────── */}
      <div className="px-5 pt-6 pb-3 flex items-start justify-between">
        <div>
          <p className="sys-label mb-3">
            Route&nbsp;{String(index).padStart(2, "0")}
            &nbsp;·&nbsp;{route.startStation.line}
            &nbsp;·&nbsp;{route.dayOfWeek.slice(0, 3)}&nbsp;{route.meetTime}
          </p>
          {/* Station name — hero */}
          <h2
            className="font-metro font-black uppercase text-[var(--color-ink)] leading-[0.86]"
            style={{ fontSize: "clamp(2.6rem, 13vw, 5.5rem)" }}
          >
            {route.startStation.name}
          </h2>
          <p
            className="font-metro font-bold uppercase tracking-tight text-[var(--color-ink-mid)] mt-1"
            style={{ fontSize: "clamp(1rem, 5vw, 1.6rem)" }}
          >
            → {route.endCafe}
            <span className="font-mono text-xs ml-2 normal-case tracking-wider" style={{ color: "var(--color-ink-faint)" }}>
              {route.cafeArea}
            </span>
          </p>
        </div>
      </div>

      {/* ── Map ────────────────────────────────────────────────────────── */}
      <RouteMap
        routeIndex={index - 1}
        primaryColor={primary}
        accentColor={accent}
      />

      {/* ── Stats grid ─────────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 border-b"
        style={{ borderColor: "var(--color-rule)" }}
      >
        <StatCell label="Distance" value={`${route.distanceKm} km`} primary={primary} />
        <StatCell
          label="Elevation"
          value={route.elevationGainM ? `+${route.elevationGainM}m` : "Flat"}
          bordered
        />
        <StatCell label="Meet time" value={route.meetTime} primary={primary} topBorder />
        <StatCell label="Day" value={route.dayOfWeek} bordered topBorder />
      </div>

      {/* ── Weather ────────────────────────────────────────────────────── */}
      {weather ? (
        <div
          className="px-5 py-5 border-b flex items-start justify-between gap-4"
          style={{ borderColor: "var(--color-rule)" }}
        >
          <div>
            <p className="sys-label mb-3">Bangkok Now</p>
            <div className="flex items-baseline gap-3">
              <span
                className="font-metro font-black text-[var(--color-ink)]"
                style={{ fontSize: "clamp(2rem, 10vw, 3rem)" }}
              >
                {weather.temp}°
              </span>
              <span className="font-mono text-[11px] text-[var(--color-ink-mid)] uppercase tracking-wider">
                {weather.label}
              </span>
            </div>
            <div className="flex gap-4 mt-2">
              <span className="font-mono text-[10px] text-[var(--color-ink-faint)] uppercase tracking-wider">
                Humidity {weather.humidity}%
              </span>
              <span className="font-mono text-[10px] text-[var(--color-ink-faint)] uppercase tracking-wider">
                Wind {weather.windKmh} km/h
              </span>
            </div>
          </div>
          {/* Run condition assessment */}
          <div
            className="px-3 py-2 flex-shrink-0 text-right"
            style={{
              backgroundColor:
                weather.runConditionLevel === "good" ? "color-mix(in srgb, #4CAF50 12%, transparent)" :
                weather.runConditionLevel === "ok"   ? "color-mix(in srgb, #B5834A 12%, transparent)" :
                                                       "color-mix(in srgb, #E8500A 12%, transparent)",
              border: `1px solid ${
                weather.runConditionLevel === "good" ? "#4CAF5044" :
                weather.runConditionLevel === "ok"   ? "#B5834A44" :
                                                       "#E8500A44"
              }`,
            }}
          >
            <p className="font-mono text-[9px] tracking-wider uppercase"
              style={{
                color:
                  weather.runConditionLevel === "good" ? "#4CAF50" :
                  weather.runConditionLevel === "ok"   ? "#B5834A" :
                                                         "#E8500A",
              }}
            >
              {weather.runCondition}
            </p>
          </div>
        </div>
      ) : null}

      {/* ── Tags ───────────────────────────────────────────────────────── */}
      {route.tags.length > 0 && (
        <div className="px-5 py-4 flex flex-wrap gap-x-4 gap-y-1.5">
          {route.tags.map((tag) => (
            <span key={tag} className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)]">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <a
        href={route.stravaRouteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-route${light ? " light-text" : ""}`}
        aria-label={`Open ${route.name} in Strava`}
      >
        <span>Open in Strava</span>
        <span aria-hidden className="text-base leading-none">↗</span>
      </a>
    </section>
  );
}

/* ── Sub-component ───────────────────────────────────────────────────────── */
function StatCell({
  label,
  value,
  primary,
  bordered,
  topBorder,
}: {
  label: string;
  value: string;
  primary?: string;
  bordered?: boolean;
  topBorder?: boolean;
}) {
  return (
    <div
      className="px-5 py-4"
      style={{
        borderLeft:  bordered  ? "1px solid var(--color-rule)" : undefined,
        borderTop:   topBorder ? "1px solid var(--color-rule)" : undefined,
      }}
    >
      <p className="sys-label mb-1.5">{label}</p>
      <p
        className="font-metro font-black uppercase leading-tight"
        style={{
          fontSize: "clamp(1.3rem, 6vw, 2rem)",
          color: primary ?? "var(--color-ink)",
        }}
      >
        {value}
      </p>
    </div>
  );
}
