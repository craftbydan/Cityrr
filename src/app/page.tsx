import RouteCard from "@/components/RouteCard";
import { allRoutes, allClubs } from "@/lib/sampleClubs";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-canvas)" }}>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav
        className="flex items-center justify-between px-5 py-4 border-b sticky top-0 z-10"
        style={{ borderColor: "var(--color-rule)", backgroundColor: "var(--color-canvas)" }}
      >
        <span
          className="font-metro text-2xl font-black uppercase tracking-[-0.02em] text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-metro)" }}
        >
          Cityrr
        </span>
        <span className="sys-label">Bangkok</span>
      </nav>

      <main className="flex-1">

        {/* ── Routes section header ──────────────────────────────────────── */}
        <div
          className="px-5 py-4 flex items-center justify-between border-b"
          style={{ borderColor: "var(--color-rule)" }}
        >
          <span className="sys-label">
            Routes &nbsp;·&nbsp; {allRoutes.length} Active
          </span>
          <span className="font-mono text-[10px] text-[var(--color-ink-faint)] tracking-wider uppercase">
            Station → Café
          </span>
        </div>

        {/* ── Route cards — PRIMARY content ─────────────────────────────── */}
        {allRoutes.map(({ route, club }, i) => (
          <RouteCard key={route.id} route={route} club={club} index={i + 1} />
        ))}

        {/* ── Clubs — SECONDARY section ─────────────────────────────────── */}
        <div
          className="px-5 py-4 mt-1 border-t"
          style={{ borderColor: "var(--color-rule-hi)" }}
        >
          <p className="sys-label mb-5">Clubs Running These Routes</p>
          <div className="flex flex-col gap-4">
            {allClubs.map((club) => (
              <div key={club.id} className="flex items-start justify-between">
                <div>
                  <p
                    className="font-metro font-black uppercase text-[var(--color-ink)] tracking-tight"
                    style={{ fontSize: "1.1rem" }}
                  >
                    {club.name}
                  </p>
                  <p className="font-mono text-[11px] text-[var(--color-ink-mid)] mt-0.5 tracking-wider uppercase">
                    {club.district} · {club.memberCount} members · est. {club.foundedYear}
                  </p>
                </div>
                <span
                  className="font-mono text-[10px] tracking-wider uppercase text-[var(--color-ink-faint)] mt-1"
                >
                  {club.featuredRoutes.length} routes
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer
        className="px-5 py-5 border-t"
        style={{ borderColor: "var(--color-rule)" }}
      >
        <p className="sys-label">
          Cityrr&nbsp;·&nbsp;Transit-to-Breakfast&nbsp;·&nbsp;Bangkok
        </p>
      </footer>
    </div>
  );
}
