"use client";

export default function StravaRouteButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-open-route"
      aria-label="Open route in Strava — opens in a new tab"
    >
      <span>Open Route in Strava</span>
      <span aria-hidden>↗</span>
    </a>
  );
}
