"use client";

/** Decide whether to use dark or light label based on club primary luminance */
function needsLightText(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // Perceived luminance
  const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return l < 0.45;
}

export default function StravaRouteButton({
  href,
  clubPrimary = "#B5834A",
}: {
  href: string;
  clubPrimary?: string;
}) {
  const lightText = needsLightText(clubPrimary);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-route${lightText ? " light-text" : ""}`}
      aria-label="Open route in Strava"
    >
      <span>Open Route in Strava</span>
      <span aria-hidden className="text-lg leading-none">↗</span>
    </a>
  );
}
