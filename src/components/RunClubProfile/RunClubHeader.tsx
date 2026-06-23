"use client";

import type { ClubProfile } from "@/types/club";

interface RunClubHeaderProps {
  club: ClubProfile;
}

const TRANSIT_ICON = {
  instagram: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
};

export default function RunClubHeader({ club }: RunClubHeaderProps) {
  const { name, tagline, district, memberCount, foundedYear, instagramHandle, stravaClubUrl } = club;

  return (
    <header className="relative overflow-hidden">

      {/* ── Top rule ─────────────────────────────────────────────────────── */}
      <div
        className="h-[3px] w-full"
        style={{ backgroundColor: "var(--club-primary)" }}
        aria-hidden
      />

      {/* ── Header body ──────────────────────────────────────────────────── */}
      <div className="px-6 pt-8 pb-6 md:px-8 md:pt-10">

        {/* District / category label */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="inline-block text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 font-body"
            style={{
              backgroundColor: "var(--club-primary-fade)",
              color: "var(--club-primary)",
              border: "1px solid color-mix(in srgb, var(--club-primary) 25%, transparent)",
            }}
          >
            {district}
          </span>
          <span className="text-[11px] font-body tracking-wider text-[var(--color-ink-faint)] uppercase">
            Bangkok Run Club
          </span>
        </div>

        {/* Club name — editorial serif headline */}
        <h1
          className="font-club text-[2.6rem] leading-[1.05] tracking-[-0.025em] font-black text-[var(--color-ink)] mb-3 md:text-[3.5rem]"
          style={{ fontFamily: "var(--club-font)" }}
        >
          {name}
        </h1>

        {/* Tagline — technical mono */}
        <p className="font-body text-sm text-[var(--color-ink-muted)] tracking-[0.02em] leading-relaxed max-w-sm mb-6">
          {tagline}
        </p>

        {/* ── Stats bar ──────────────────────────────────────────────────── */}
        <div
          className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 border-t border-[var(--color-border)]"
        >
          <StatItem
            icon={<PeopleIcon />}
            value={memberCount.toLocaleString()}
            label="members"
          />
          <Divider />
          <StatItem
            icon={<CalendarIcon />}
            value={String(foundedYear)}
            label="founded"
          />
          <Divider />
          <StatItem
            icon={<PinIcon />}
            value={district}
            label="base"
          />

          {/* External links */}
          {(instagramHandle || stravaClubUrl) && (
            <>
              <Divider />
              <div className="flex items-center gap-3">
                {instagramHandle && (
                  <a
                    href={`https://instagram.com/${instagramHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[11px] tracking-wider text-[var(--color-ink-muted)] flex items-center gap-1.5 transition-colors hover:text-[var(--color-ink)] uppercase"
                    aria-label={`@${instagramHandle} on Instagram`}
                  >
                    {TRANSIT_ICON.instagram}
                    @{instagramHandle}
                  </a>
                )}
                {stravaClubUrl && (
                  <a
                    href={stravaClubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[11px] tracking-wider flex items-center gap-1.5 transition-colors uppercase font-semibold"
                    style={{ color: "var(--club-primary)" }}
                    aria-label="Strava Club"
                  >
                    <StravaIcon />
                    Strava
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────────── */

function StatItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[var(--color-ink-faint)]" aria-hidden>{icon}</span>
      <span className="font-body text-[13px] font-semibold text-[var(--color-ink)] tracking-tight">
        {value}
      </span>
      <span className="font-body text-[11px] text-[var(--color-ink-muted)] uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <span className="w-px h-3.5 bg-[var(--color-border-strong)] hidden sm:block" aria-hidden />
  );
}

function PeopleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function StravaIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
    </svg>
  );
}
