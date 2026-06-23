"use client";

import type { ClubProfile } from "@/types/club";
import RunClubHeader from "./RunClubHeader";
import TransitToToastCard from "./TransitToToastCard";
import StravaRouteButton from "./StravaRouteButton";

export default function RunClubProfile({ club }: { club: ClubProfile }) {
  const { branding, featuredRoutes, description } = club;

  const cssVars = {
    "--club-font":    `'Cormorant Garamond', Georgia, serif`,
    "--club-primary": branding.primary,
    "--club-accent":  branding.accent,
  } as React.CSSProperties;

  const primaryRoute = featuredRoutes[0];

  return (
    <article className="club-root" style={cssVars}>

      {/* Club-colour top stripe — 2px, the metro edge line */}
      <div
        style={{ height: "2px", backgroundColor: "var(--club-primary)", opacity: 0.9 }}
        aria-hidden
      />

      {/* Header — massive name + italic tagline */}
      <RunClubHeader club={club} />

      {/* Amber rule */}
      <div className="mx-5 amber-rule" aria-hidden />

      {/* Route — 2-col metro departure board */}
      {primaryRoute && <TransitToToastCard route={primaryRoute} />}

      {/* Amber rule */}
      <div className="mx-5 amber-rule" aria-hidden />

      {/* Club description — Cormorant italic body, apothecary tone */}
      <p
        className="font-aesop italic px-5 py-7 leading-relaxed text-[var(--color-ink-mid)]"
        style={{ fontSize: "clamp(0.95rem, 3.8vw, 1.15rem)", maxWidth: "40ch" }}
      >
        {description}
      </p>

      {/* Additional routes — metro pill list */}
      {featuredRoutes.length > 1 && (
        <div className="px-5 pb-6 flex flex-wrap gap-2">
          {featuredRoutes.slice(1).map((r) => (
            <span
              key={r.id}
              className="font-metro text-[10px] font-bold tracking-[0.14em] uppercase px-3 py-1.5 border text-[var(--color-ink-faint)]"
              style={{ borderColor: "var(--color-rule-strong)" }}
            >
              {r.name}
            </span>
          ))}
        </div>
      )}

      {/* CTA — full bleed, club primary */}
      {primaryRoute && (
        <StravaRouteButton
          href={primaryRoute.stravaRouteUrl}
          clubPrimary={branding.primary}
        />
      )}
    </article>
  );
}
