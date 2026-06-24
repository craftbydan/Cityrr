"use client";

import { useMemo, useState } from "react";
import { IconFilter } from "@/components/icons";
import { RouteList } from "@/components/route-list";
import { RouteTable } from "@/components/route-table";
import { routes, type Route, type Terrain, type TechnicalDifficulty } from "@/lib/routes";

const cities = [...new Set(routes.map((r) => r.city))].sort();
const terrains: Terrain[] = ["Flat", "Mixed", "Hilly"];
const difficulties: TechnicalDifficulty[] = ["Low", "Medium", "High"];
const distanceBands = [
  { label: "All", min: 0, max: Infinity },
  { label: "≤8", min: 0, max: 8 },
  { label: "8–12", min: 8, max: 12 },
  { label: "12–16", min: 12, max: 16 },
  { label: "16+", min: 16, max: Infinity },
];

export function Dashboard() {
  const [city, setCity] = useState<string>("All");
  const [terrain, setTerrain] = useState<string>("All");
  const [difficulty, setDifficulty] = useState<string>("All");
  const [distanceBand, setDistanceBand] = useState(0);
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

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
    return { active, caution };
  }, [filtered]);

  const activeFilterCount = [city, terrain, difficulty].filter((v) => v !== "All").length + (distanceBand > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background text-foreground pb-safe">
      <header className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur-sm pt-safe">
        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <div>
            <p className="text-sm font-semibold tracking-tight">Cityrr.</p>
            <p className="text-[10px] uppercase tracking-wider text-muted">Route Ops</p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted">
            <span className="tabular-nums text-foreground">{filtered.length}</span>
            <span className="text-border">·</span>
            <span className="tabular-nums text-emerald-400">{stats.active}</span>
            <span className="text-border">·</span>
            <span className="tabular-nums text-amber-400">{stats.caution}</span>
          </div>
        </div>

        <div className="border-t border-border px-3 py-2">
          <input
            type="search"
            placeholder="Search ID, route, city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-h-[44px] w-full border border-border bg-surface-2 px-3 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none"
            style={{ borderRadius: "6px" }}
          />
        </div>

        <div className="flex items-center gap-2 border-t border-border px-3 py-2">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 border border-border bg-surface-2 px-3 text-xs font-medium text-foreground active:bg-surface"
            style={{ borderRadius: "6px" }}
          >
            <IconFilter />
            Filters
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[10px] text-accent">
                {activeFilterCount}
              </span>
            )}
          </button>
          <div className="flex gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {distanceBands.map((band, i) => (
              <button
                key={band.label}
                type="button"
                onClick={() => setDistanceBand(i)}
                className={`shrink-0 min-h-[44px] border px-3 text-xs transition-colors ${
                  distanceBand === i
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-border bg-surface-2 text-muted"
                }`}
                style={{ borderRadius: "6px" }}
              >
                {band.label} km
              </button>
            ))}
          </div>
        </div>

        {filtersOpen && (
          <div className="grid grid-cols-1 gap-2 border-t border-border bg-surface-2/80 px-3 py-3 sm:grid-cols-3">
            <label className="flex flex-col gap-1 text-[11px] text-muted">
              City
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="min-h-[44px] border border-border bg-surface px-3 text-sm text-foreground focus:border-accent focus:outline-none"
                style={{ borderRadius: "6px" }}
              >
                <option value="All">All cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-[11px] text-muted">
              Terrain
              <select
                value={terrain}
                onChange={(e) => setTerrain(e.target.value)}
                className="min-h-[44px] border border-border bg-surface px-3 text-sm text-foreground focus:border-accent focus:outline-none"
                style={{ borderRadius: "6px" }}
              >
                <option value="All">All terrain</option>
                {terrains.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-[11px] text-muted">
              Tech difficulty
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="min-h-[44px] border border-border bg-surface px-3 text-sm text-foreground focus:border-accent focus:outline-none"
                style={{ borderRadius: "6px" }}
              >
                <option value="All">All levels</option>
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
      </header>

      <main className="px-3 py-3 lg:mx-auto lg:max-w-[1400px]">
        <p className="mb-2 text-[11px] text-muted lg:hidden">
          Tap a route for hubs, coordinates, and alerts.
        </p>

        <div className="mb-2 hidden text-[11px] text-muted lg:block">
          Showing <span className="tabular-nums text-foreground">{filtered.length}</span> of{" "}
          <span className="tabular-nums text-foreground">{routes.length}</span> routes
        </div>

        <RouteList routes={filtered} />
        <RouteTable routes={filtered} />

        {filtered.length === 0 && (
          <p className="mt-4 text-center text-sm text-muted">No routes match current filters.</p>
        )}
      </main>
    </div>
  );
}
