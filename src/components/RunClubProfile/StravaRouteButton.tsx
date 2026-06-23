"use client";

interface StravaRouteButtonProps {
  href: string;
  /** Override button label text */
  label?: string;
  /** Full width on mobile */
  fullWidthMobile?: boolean;
}

export default function StravaRouteButton({
  href,
  label = "Open Route in Strava",
  fullWidthMobile = true,
}: StravaRouteButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-hype group ${fullWidthMobile ? "w-full sm:w-auto" : ""}`}
      aria-label={`${label} — opens in Strava`}
    >
      {/* Strava flame logo */}
      <span className="relative flex-shrink-0" aria-hidden>
        <StravaWordmark />
      </span>

      <span className="flex-1 text-center sm:flex-none sm:text-left">
        {label}
      </span>

      {/* Arrow — shifts right on hover via CSS group */}
      <span
        className="flex-shrink-0 transition-transform duration-75 group-hover:translate-x-0.5"
        aria-hidden
      >
        <ArrowIcon />
      </span>
    </a>
  );
}

/* ── Strava logo ─────────────────────────────────────────────────────────── */
function StravaWordmark() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
