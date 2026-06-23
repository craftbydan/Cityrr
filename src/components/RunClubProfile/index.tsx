"use client";

import type { ClubProfile } from "@/types/club";
import RunClubHeader from "./RunClubHeader";
import TransitToToastCard from "./TransitToToastCard";
import StravaRouteButton from "./StravaRouteButton";

export default function RunClubProfile({ club }: { club: ClubProfile }) {
  const { branding, featuredRoutes } = club;

  const cssVars = {
    "--club-font":    `'${branding.font}', 'Playfair Display', Georgia, serif`,
    "--club-primary": branding.primary,
    "--club-accent":  branding.accent,
  } as React.CSSProperties;

  const primaryRoute = featuredRoutes[0];

  return (
    <article className="club-root" style={cssVars}>

      {/* Club-colour top stripe */}
      <div
        className="w-full"
        style={{ height: "3px", backgroundColor: "var(--club-primary)" }}
        aria-hidden
      />

      {/* Club name + tagline */}
      <RunClubHeader club={club} />

      {/* Thin rule */}
      <div className="mx-5 h-px bg-[var(--color-rule)]" aria-hidden />

      {/* Route details */}
      {primaryRoute && <TransitToToastCard route={primaryRoute} />}

      {/* Additional routes — minimal pill list */}
      {featuredRoutes.length > 1 && (
        <div className="px-5 pb-6 flex flex-wrap gap-2">
          {featuredRoutes.slice(1).map((r) => (
            <span
              key={r.id}
              className="font-body text-[10px] tracking-wider uppercase px-2.5 py-1.5 border border-[var(--color-rule)] text-[var(--color-ink-faint)]"
            >
              {r.name}
            </span>
          ))}
        </div>
      )}

      {/* Thin rule */}
      <div className="mx-5 h-px bg-[var(--color-rule)]" aria-hidden />

      {/* About — one sentence, no heading */}
      <p className="font-display italic text-[0.9rem] leading-relaxed text-[var(--color-ink-mid)] px-5 py-6 max-w-prose">
        {club.description}
      </p>

      {/* CTA — full bleed */}
      {primaryRoute && <StravaRouteButton href={primaryRoute.stravaRouteUrl} />}
    </article>
  );
}
