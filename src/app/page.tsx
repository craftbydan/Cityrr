import RouteSection from "@/components/RouteSection";
import ClubSection from "@/components/ClubSection";
import { allRoutes, allClubs } from "@/lib/sampleClubs";
import { getBangkokWeather } from "@/lib/weather";

export default async function Home() {
  const weather = await getBangkokWeather();

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto"
      style={{ backgroundColor: "var(--color-canvas)" }}
    >

      {/* ── Sticky nav ──────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 border-b"
        style={{
          borderColor: "var(--color-rule)",
          backgroundColor: "var(--color-canvas)",
        }}
      >
        <span
          className="font-metro text-2xl font-black uppercase tracking-[-0.02em] text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-metro)" }}
        >
          Cityrr
        </span>

        {/* Live weather in nav — quick glance */}
        {weather && (
          <div className="flex items-center gap-2">
            <span className="font-metro font-bold text-base text-[var(--color-ink)]">
              {weather.temp}°
            </span>
            <span className="sys-label" style={{ fontSize: "0.55rem" }}>
              {weather.label}
            </span>
          </div>
        )}
      </header>

      <main className="flex-1">

        {/* ── Page label ──────────────────────────────────────────────────── */}
        <div
          className="px-5 py-3 border-b flex items-center justify-between"
          style={{ borderColor: "var(--color-rule)" }}
        >
          <span className="sys-label">
            {allRoutes.length} Routes Active · Bangkok
          </span>
          <span className="font-mono text-[9px] tracking-wider uppercase text-[var(--color-ink-faint)]">
            Station → Café
          </span>
        </div>

        {/* ── Route sections — the primary product ────────────────────────── */}
        {allRoutes.map(({ route, club }, i) => (
          <RouteSection
            key={route.id}
            route={route}
            club={club}
            index={i + 1}
            weather={weather}
          />
        ))}

        {/* ── Club section — secondary, after all routes ─────────────────── */}
        <ClubSection clubs={allClubs} />

      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer
        className="px-5 py-5 border-t"
        style={{ borderColor: "var(--color-rule)" }}
      >
        <p className="sys-label">
          Cityrr · Transit-to-Breakfast · Bangkok
        </p>
      </footer>

    </div>
  );
}
