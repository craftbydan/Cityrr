import type { ClubProfile, RouteData } from "@/types/club";
import type { WeatherSummary } from "@/types/weather";

interface Props {
  route: RouteData;
  club: ClubProfile;
  weather: WeatherSummary | null;
}

function darkText(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.45;
}

function osmUrl(lat: number, lon: number) {
  const d = 0.018;
  return (
    `https://www.openstreetmap.org/export/embed.html` +
    `?bbox=${lon - d},${lat - d},${lon + d},${lat + d}&layer=mapnik`
  );
}

export default function RouteCard({ route, club, weather }: Props) {
  const { startStation: s, distanceKm, elevationGainM, paceMinkm,
          endCafe, cafeArea, dayOfWeek, meetTime, tags, stravaRouteUrl } = route;
  const primary = club.branding.primary;
  const totalMin = Math.round(parseFloat(distanceKm) * parseFloat(paceMinkm.replace(":", ".")));

  return (
    <section
      style={{
        borderBottom: "1px solid var(--color-rule)",
        "--club-primary": primary,
      } as React.CSSProperties}
    >
      {/* colour tab */}
      <div style={{ height: 2, background: primary }} />

      {/* header */}
      <div style={{ padding: "1.25rem 1.25rem 0.5rem" }}>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
                    color: primary, fontFamily: "var(--font-sans)", fontWeight: 700, marginBottom: "0.6rem" }}>
          {s.line} {s.code} · {dayOfWeek.slice(0, 3)} {meetTime}
        </p>

        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 900, textTransform: "uppercase",
                     fontSize: "clamp(2.4rem, 12vw, 4.5rem)", lineHeight: 0.88,
                     color: "var(--color-ink)", marginBottom: "0.4rem", letterSpacing: "-0.01em" }}>
          {s.name}
        </h2>

        <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, textTransform: "uppercase",
                    fontSize: "clamp(1rem, 5vw, 1.5rem)", color: "var(--color-mid)", letterSpacing: "0.01em" }}>
          → {endCafe}
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "0.7rem",
                         color: "var(--color-faint)", marginLeft: "0.5rem", textTransform: "none",
                         letterSpacing: 0 }}>
            {cafeArea}
          </span>
        </p>
      </div>

      {/* real OSM map, dark via CSS filter */}
      <iframe
        src={osmUrl(s.lat, s.lon)}
        className="map-frame"
        title={`Map around ${s.name}`}
        loading="lazy"
        referrerPolicy="no-referrer"
      />

      {/* stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--color-rule)",
                    borderBottom: "1px solid var(--color-rule)" }}>
        {[
          ["Distance",  `${distanceKm} km`],
          ["Elevation", elevationGainM ? `+${elevationGainM}m` : "flat"],
          ["Pace",      `~${paceMinkm} /km`],
          ["Est. time", `~${totalMin} min`],
        ].map(([label, val], i) => (
          <div key={label}
            style={{ padding: "0.85rem 1.25rem",
                     borderLeft:  i % 2 === 1 ? "1px solid var(--color-rule)" : undefined,
                     borderTop:   i >= 2      ? "1px solid var(--color-rule)" : undefined }}>
            <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "var(--color-amber)", fontFamily: "var(--font-sans)", fontWeight: 700,
                        marginBottom: "0.3rem" }}>
              {label}
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 900, textTransform: "uppercase",
                        fontSize: "clamp(1.1rem, 5.5vw, 1.6rem)", color: i < 2 ? primary : "var(--color-ink)",
                        lineHeight: 1 }}>
              {val}
            </p>
          </div>
        ))}
      </div>

      {/* weather */}
      {weather && (
        <div style={{ padding: "0.85rem 1.25rem", display: "flex", alignItems: "center",
                      justifyContent: "space-between", borderBottom: "1px solid var(--color-rule)" }}>
          <div>
            <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "var(--color-amber)", fontFamily: "var(--font-sans)", fontWeight: 700,
                        marginBottom: "0.3rem" }}>
              Bangkok now
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 900, textTransform: "uppercase",
                        fontSize: "clamp(1.1rem, 5vw, 1.5rem)", color: "var(--color-ink)" }}>
              {weather.temp}°
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: "0.7rem",
                             color: "var(--color-mid)", marginLeft: "0.5rem", textTransform: "none" }}>
                feels {weather.feelsLike}° · {weather.label} · {weather.humidity}% hum
              </span>
            </p>
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", textAlign: "right",
                      color: weather.runConditionLevel === "good" ? "#5DBB8A"
                           : weather.runConditionLevel === "ok"   ? "#B5834A"
                           :                                         "#E05A4A",
                      maxWidth: "120px", lineHeight: 1.3 }}>
            {weather.runCondition}
          </p>
        </div>
      )}

      {/* tags */}
      <p style={{ padding: "0.6rem 1.25rem", fontSize: "0.6rem", letterSpacing: "0.1em",
                  color: "var(--color-faint)", textTransform: "uppercase",
                  fontFamily: "var(--font-mono)", borderBottom: "1px solid var(--color-rule)" }}>
        {tags.join(" · ")}
      </p>

      {/* CTA */}
      <a href={stravaRouteUrl} target="_blank" rel="noopener noreferrer"
         className={`btn-strava${darkText(primary) ? "" : " inv"}`}>
        <span>Open in Strava</span>
        <span>↗</span>
      </a>
    </section>
  );
}
