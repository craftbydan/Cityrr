import RouteCard from "@/components/RouteCard";
import { allRoutes, allClubs } from "@/lib/sampleClubs";
import { getBangkokWeather } from "@/lib/weather";

export default async function Home() {
  const weather = await getBangkokWeather();

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: "var(--color-bg)", minHeight: "100vh" }}>

      {/* nav */}
      <header style={{ position: "sticky", top: 0, zIndex: 10,
                       background: "var(--color-bg)", borderBottom: "1px solid var(--color-rule)",
                       padding: "0.9rem 1.25rem", display: "flex",
                       alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontWeight: 900,
                       fontSize: "1.2rem", textTransform: "uppercase",
                       letterSpacing: "-0.02em", color: "var(--color-ink)" }}>
          Cityrr
        </span>
        {weather && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                         color: "var(--color-mid)", letterSpacing: "0.05em" }}>
            {weather.temp}° · {weather.label.toLowerCase()}
          </span>
        )}
      </header>

      {/* page label */}
      <div style={{ padding: "0.6rem 1.25rem", borderBottom: "1px solid var(--color-rule)",
                    display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.55rem", fontWeight: 700,
                       letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-amber)" }}>
          {allRoutes.length} routes · Bangkok
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem",
                       color: "var(--color-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          station → café
        </span>
      </div>

      {/* routes */}
      {allRoutes.map(({ route, club }) => (
        <RouteCard key={route.id} route={route} club={club} weather={weather} />
      ))}

      {/* clubs — secondary section */}
      <section style={{ borderTop: "2px solid var(--color-rule)", padding: "1.25rem" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.55rem", fontWeight: 700,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "var(--color-amber)", marginBottom: "1.25rem" }}>
          Clubs
        </p>
        {allClubs.map((club) => (
          <div key={club.id} style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "baseline",
                          justifyContent: "space-between", marginBottom: "0.25rem" }}>
              <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 900,
                           fontSize: "1.1rem", textTransform: "uppercase",
                           color: "var(--color-ink)", letterSpacing: "-0.01em" }}>
                {club.name}
              </h3>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                             color: "var(--color-mid)" }}>
                {club.featuredRoutes.length} routes
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                        color: "var(--color-mid)", marginBottom: "0.5rem" }}>
              {club.district} · {club.memberCount.toLocaleString()} members · est. {club.foundedYear}
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              {club.instagramHandle && (
                <a href={`https://instagram.com/${club.instagramHandle}`}
                   target="_blank" rel="noopener noreferrer"
                   style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                            color: "var(--color-mid)", textDecoration: "none",
                            letterSpacing: "0.05em" }}>
                  IG @{club.instagramHandle}
                </a>
              )}
              {club.stravaClubUrl && (
                <a href={club.stravaClubUrl}
                   target="_blank" rel="noopener noreferrer"
                   style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                            color: club.branding.primary, textDecoration: "none",
                            letterSpacing: "0.05em" }}>
                  Strava ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
