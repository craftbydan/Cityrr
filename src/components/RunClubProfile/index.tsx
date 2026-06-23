"use client";

import type { ClubProfile } from "@/types/club";
import RunClubHeader from "./RunClubHeader";
import TransitToToastCard from "./TransitToToastCard";
import StravaRouteButton from "./StravaRouteButton";

interface RunClubProfileProps {
  club: ClubProfile;
  /**
   * Layout variant.
   * - "page"   → full-page profile with section dividers (default)
   * - "card"   → compact card for directory listings
   */
  variant?: "page" | "card";
}

/**
 * RunClubProfile
 *
 * The CSS variable override engine lives here. The `--club-font`,
 * `--club-primary`, and `--club-accent` variables are applied to the root
 * wrapper element via inline `style`. Every child component references these
 * vars without needing props threading — pure CSS cascade.
 */
export default function RunClubProfile({
  club,
  variant = "page",
}: RunClubProfileProps) {
  const { branding, featuredRoutes } = club;

  const cssVariables = {
    "--club-font": `'${branding.font}', 'Playfair Display', Georgia, serif`,
    "--club-primary": branding.primary,
    "--club-accent": branding.accent,
  } as React.CSSProperties;

  if (variant === "card") {
    return (
      <div
        className="club-profile-root card-crisp overflow-hidden max-w-sm w-full"
        style={cssVariables}
      >
        <RunClubHeader club={club} />
        {featuredRoutes[0] && (
          <div className="px-5 pb-4 border-t border-[var(--color-border)]">
            <TransitToToastCard route={featuredRoutes[0]} />
          </div>
        )}
        {featuredRoutes[0] && (
          <div className="px-5 pb-5">
            <StravaRouteButton href={featuredRoutes[0].stravaRouteUrl} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="club-profile-root bg-[var(--color-surface)] border border-[var(--color-border)] w-full"
      style={cssVariables}
    >

      {/* ── Editorial header ────────────────────────────────────────────── */}
      <RunClubHeader club={club} />

      {/* ── Section divider ─────────────────────────────────────────────── */}
      <div className="h-px bg-[var(--color-border)]" aria-hidden />

      {/* ── About blurb ────────────────────────────────────────────────── */}
      <div className="px-6 py-6 md:px-8">
        <SectionLabel>About this Club</SectionLabel>
        <p className="font-body text-[13.5px] leading-relaxed text-[var(--color-ink-muted)] max-w-prose mt-2">
          {club.description}
        </p>
      </div>

      {/* ── Section divider ─────────────────────────────────────────────── */}
      <div className="h-px bg-[var(--color-border)]" aria-hidden />

      {/* ── Routes section ──────────────────────────────────────────────── */}
      <div className="px-6 py-6 md:px-8">
        <SectionLabel>
          Featured Route{featuredRoutes.length !== 1 ? "s" : ""}
          <span
            className="ml-2 font-body text-[10px] font-bold tracking-widest px-2 py-0.5"
            style={{
              color: "var(--club-primary)",
              border: "1px solid color-mix(in srgb, var(--club-primary) 30%, transparent)",
              backgroundColor: "var(--club-primary-fade)",
            }}
          >
            {featuredRoutes.length} ACTIVE
          </span>
        </SectionLabel>

        <div className="flex flex-col gap-4 mt-4">
          {featuredRoutes.map((route) => (
            <TransitToToastCard key={route.id} route={route} />
          ))}
        </div>
      </div>

      {/* ── CTA — Strava ────────────────────────────────────────────────── */}
      {featuredRoutes.length > 0 && (
        <>
          <div className="h-px bg-[var(--color-border)]" aria-hidden />
          <div className="px-6 py-6 md:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p
                className="font-club text-base font-semibold text-[var(--color-ink)] leading-tight"
                style={{ fontFamily: "var(--club-font)" }}
              >
                Ready to lace up?
              </p>
              <p className="font-body text-[12px] text-[var(--color-ink-muted)] tracking-wide mt-0.5">
                Open the GPX route in Strava and join the pack.
              </p>
            </div>
            <StravaRouteButton
              href={featuredRoutes[0].stravaRouteUrl}
              fullWidthMobile
            />
          </div>
        </>
      )}
    </div>
  );
}

/* ── Shared section heading ──────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 font-body text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--color-ink-muted)]">
      {children}
    </h2>
  );
}
