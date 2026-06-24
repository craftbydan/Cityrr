"use client";

import { useMemo, useState } from "react";
import { RouteList } from "@/components/route-list";
import { routes, type Route, type Terrain } from "@/lib/routes";

const terrains: Terrain[] = ["Flat", "Mixed", "Hilly"];
const distanceBands = [
  { label: "All", min: 0, max: Infinity },
  { label: "5K", min: 0, max: 6 },
  { label: "10K", min: 6, max: 11 },
  { label: "15K", min: 11, max: 16 },
  { label: "20K", min: 16, max: Infinity },
];

export function Dashboard() {
  const [terrain, setTerrain] = useState<string>("All");
  const [distanceBand, setDistanceBand] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const band = distanceBands[distanceBand];
    const query = search.trim().toLowerCase();

    return routes.filter((route: Route) => {
      if (terrain !== "All" && route.terrain !== terrain) return false;
      if (route.distanceKm < band.min || route.distanceKm > band.max) return false;
      if (
        query &&
        !route.name.toLowerCase().includes(query) &&
        !route.neighborhood.toLowerCase().includes(query) &&
        !route.finishSpot.toLowerCase().includes(query) &&
        !route.mtaStation.toLowerCase().includes(query)
      ) {
        return false;
      }
      return true;
    });
  }, [terrain, distanceBand, search]);

  return (
    <div className="min-h-screen bg-background pb-safe">
      <header className="sticky top-0 z-20 bg-background/90 pt-safe backdrop-blur-md">
        <div className="border-b border-border px-4 pb-4 pt-3">
          <h1 className="font-display text-[2rem] font-semibold leading-none tracking-tight text-coral">
            Cityrr.
          </h1>
          <p className="mt-2 max-w-[280px] text-sm leading-snug text-muted">
            Swipe your MetroCard. Run the city. Finish with coffee.
          </p>
        </div>

        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="shrink-0 rounded-md bg-mta px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-navy">
            MTA
          </span>
          <span className="text-muted">→</span>
          <span className="shrink-0 rounded-md bg-navy px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-surface">
            Run
          </span>
          <span className="text-muted">→</span>
          <span className="shrink-0 rounded-md bg-coffee px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-surface">
            Coffee
          </span>
        </div>

        <div className="space-y-3 px-4 py-3">
          <input
            type="search"
            placeholder="Search neighborhood, café, station…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-h-[48px] w-full border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted/70 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
            style={{ borderRadius: "var(--radius-md)" }}
          />

          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {distanceBands.map((band, i) => (
              <button
                key={band.label}
                type="button"
                onClick={() => setDistanceBand(i)}
                className={`shrink-0 min-h-[40px] px-4 text-sm font-semibold transition-colors ${
                  distanceBand === i
                    ? "bg-navy text-surface"
                    : "bg-surface-2 text-muted"
                }`}
                style={{ borderRadius: "var(--radius-sm)" }}
              >
                {band.label}
              </button>
            ))}
            <select
              value={terrain}
              onChange={(e) => setTerrain(e.target.value)}
              className="min-h-[40px] shrink-0 border border-border bg-surface px-3 text-sm font-medium text-foreground focus:border-coral focus:outline-none"
              style={{ borderRadius: "var(--radius-sm)" }}
            >
              <option value="All">All terrain</option>
              {terrains.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="px-4 py-2">
        <p className="mb-3 text-xs text-muted">
          {filtered.length} run{filtered.length === 1 ? "" : "s"} in New York
        </p>

        <RouteList routes={filtered} />

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted">No routes match — try another filter.</p>
        )}
      </main>
    </div>
  );
}
