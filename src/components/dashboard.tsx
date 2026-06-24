"use client";

import { useMemo, useState } from "react";
import { IconFilter } from "@/components/icons";
import { RouteTable } from "@/components/route-table";
import { routes, type Route, type Terrain, type TechnicalDifficulty } from "@/lib/routes";

const cities = [...new Set(routes.map((r) => r.city))].sort();
const terrains: Terrain[] = ["Flat", "Mixed", "Hilly"];
const difficulties: TechnicalDifficulty[] = ["Low", "Medium", "High"];
const distanceBands = [
  { label: "All", min: 0, max: Infinity },
  { label: "≤8 km", min: 0, max: 8 },
  { label: "8–12 km", min: 8, max: 12 },
  { label: "12–16 km", min: 12, max: 16 },
  { label: "16+ km", min: 16, max: Infinity },
];

export function Dashboard() {
  const [city, setCity] = useState<string>("All");
  const [terrain, setTerrain] = useState<string>("All");
  const [difficulty, setDifficulty] = useState<string>("All");
  const [distanceBand, setDistanceBand] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const band = distanceBands[distanceBand];
    const query = search.trim().toLowerCase();

    return routes.filter((route: Route) => {
      if (city !== "All" && route.city !== city) return false;
      if (terrain !== "All" && route.terrain !== terrain) return false;
      if (difficulty !== "All" && route.technicalDifficulty !== difficulty) return false;
      if (route.distanceKm < band.min || route.distanceKm > band.max) return false;
      if (
        query &&
        !route.name.toLowerCase().includes(query) &&
        !route.routeId.toLowerCase().includes(query) &&
        !route.city.toLowerCase().includes(query)
      ) {
        return false;
      }
      return true;
    });
  }, [city, terrain, difficulty, distanceBand, search]);

  const stats = useMemo(() => {
    const active = filtered.filter((r) => r.status === "Active").length;
    const caution = filtered.filter((r) => r.status === "Caution").length;
    const avgElev = filtered.length
      ? Math.round(filtered.reduce((s, r) => s + r.elevationGainM, 0) / filtered.length)
      : 0;
    return { active, caution, avgElev };
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-3 py-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-tight text-foreground">Cityrr.</span>
            <span className="hidden text-[10px] uppercase tracking-wider text-muted sm:inline">
              Route Operations
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-muted">
            <span>
              <span className="tabular-nums text-foreground">{filtered.length}</span> routes
            </span>
            <span className="text-border">|</span>
            <span>
              <span className="tabular-nums text-emerald-400">{stats.active}</span> active
            </span>
            <span className="text-border">|</span>
            <span>
              <span className="tabular-nums text-amber-400">{stats.caution}</span> caution
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-3 py-3">
        <div className="mb-3 flex flex-col gap-2 border border-border bg-surface p-2 sm:flex-row sm:items-center sm:justify-between" style={{ borderRadius: "6px" }}>
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted">
            <IconFilter />
            Filters
          </div>
          <input
            type="search"
            placeholder="Search route ID, name, city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-border bg-surface-2 px-2 py-1 text-xs text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none sm:max-w-xs"
            style={{ borderRadius: "4px" }}
          />
        </div>

        <div className="mb-3 flex flex-wrap gap-1.5">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-border bg-surface-2 px-2 py-1 text-[11px] text-foreground focus:border-accent focus:outline-none"
            style={{ borderRadius: "4px" }}
          >
            <option value="All">City: All</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                City: {c}
              </option>
            ))}
          </select>
          <select
            value={terrain}
            onChange={(e) => setTerrain(e.target.value)}
            className="border border-border bg-surface-2 px-2 py-1 text-[11px] text-foreground focus:border-accent focus:outline-none"
            style={{ borderRadius: "4px" }}
          >
            <option value="All">Terrain: All</option>
            {terrains.map((t) => (
              <option key={t} value={t}>
                Terrain: {t}
              </option>
            ))}
          </select>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border border-border bg-surface-2 px-2 py-1 text-[11px] text-foreground focus:border-accent focus:outline-none"
            style={{ borderRadius: "4px" }}
          >
            <option value="All">Tech Difficulty: All</option>
            {difficulties.map((d) => (
              <option key={d} value={d}>
                Tech: {d}
              </option>
            ))}
          </select>
          {distanceBands.map((band, i) => (
            <button
              key={band.label}
              type="button"
              onClick={() => setDistanceBand(i)}
              className={`border px-2 py-1 text-[11px] transition-colors ${
                distanceBand === i
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-border bg-surface-2 text-muted hover:text-foreground"
              }`}
              style={{ borderRadius: "4px" }}
            >
              {band.label}
            </button>
          ))}
        </div>

        <div className="mb-2 flex items-center justify-between text-[11px] text-muted">
          <span>
            Showing <span className="tabular-nums text-foreground">{filtered.length}</span> of{" "}
            <span className="tabular-nums text-foreground">{routes.length}</span> routes
            {filtered.length > 0 && (
              <>
                {" "}
                · avg elevation{" "}
                <span className="tabular-nums text-foreground">+{stats.avgElev}m</span>
              </>
            )}
          </span>
        </div>

        <RouteTable routes={filtered} />

        {filtered.length === 0 && (
          <p className="mt-3 text-center text-xs text-muted">No routes match current filters.</p>
        )}
      </main>
    </div>
  );
}
