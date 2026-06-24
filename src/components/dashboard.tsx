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
      {/* Bold studio header */}
      <header className="sticky top-0 z-20 border-b-2 border-foreground bg-background pt-safe">
        <div className="border-b-2 border-border bg-blue px-4 py-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-[2.5rem] font-extrabold leading-[0.9] tracking-tight text-white">
                Cityrr.
              </h1>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                Route Operations
              </p>
            </div>
            <div className="flex gap-2">
              <div className="border-2 border-black bg-orange px-3 py-2 text-center" style={{ borderRadius: "var(--radius-sm)" }}>
                <p className="font-display text-2xl font-extrabold leading-none tabular-nums text-black">{filtered.length}</p>
                <p className="text-[9px] font-bold uppercase tracking-wider text-black/70">Routes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 border-b-2 border-border">
          <div className="border-r-2 border-border px-3 py-2.5">
            <p className="font-display text-xl font-extrabold tabular-nums text-[#00c853]">{stats.active}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-muted">Active</p>
          </div>
          <div className="border-r-2 border-border px-3 py-2.5">
            <p className="font-display text-xl font-extrabold tabular-nums text-[#ffab00]">{stats.caution}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-muted">Caution</p>
          </div>
          <div className="px-3 py-2.5">
            <p className="font-display text-xl font-extrabold tabular-nums text-foreground">{routes.length}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-muted">Total</p>
          </div>
        </div>

        <div className="px-3 py-3">
          <input
            type="search"
            placeholder="Search routes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-h-[48px] w-full border-2 border-foreground bg-surface px-4 text-sm font-medium text-foreground placeholder:text-muted focus:border-orange focus:outline-none"
            style={{ borderRadius: "var(--radius-md)" }}
          />
        </div>

        <div className="flex items-stretch gap-2 border-t-2 border-border px-3 py-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className={`inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 border-2 px-4 text-xs font-bold uppercase tracking-widest transition-colors ${
              filtersOpen
                ? "border-orange bg-orange text-black"
                : "border-foreground bg-surface text-foreground"
            }`}
            style={{ borderRadius: "var(--radius-md)" }}
          >
            <IconFilter />
            Filter
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center bg-black text-[10px] text-white" style={{ borderRadius: "var(--radius-sm)" }}>
                {activeFilterCount}
              </span>
            )}
          </button>
          <div className="flex flex-1 gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {distanceBands.map((band, i) => (
              <button
                key={band.label}
                type="button"
                onClick={() => setDistanceBand(i)}
                className={`shrink-0 min-h-[48px] border-2 px-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                  distanceBand === i
                    ? "border-blue bg-blue text-white"
                    : "border-border bg-surface-2 text-muted"
                }`}
                style={{ borderRadius: "var(--radius-md)" }}
              >
                {band.label}
              </button>
            ))}
          </div>
        </div>

        {filtersOpen && (
          <div className="grid grid-cols-1 gap-3 border-t-2 border-border bg-surface-2 px-3 py-3 sm:grid-cols-3">
            {[
              { label: "City", value: city, setter: setCity, options: ["All", ...cities] },
              { label: "Terrain", value: terrain, setter: setTerrain, options: ["All", ...terrains] },
              { label: "Difficulty", value: difficulty, setter: setDifficulty, options: ["All", ...difficulties] },
            ].map((f) => (
              <label key={f.label} className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange">{f.label}</span>
                <select
                  value={f.value}
                  onChange={(e) => f.setter(e.target.value)}
                  className="min-h-[48px] border-2 border-foreground bg-background px-3 text-sm font-semibold focus:border-blue focus:outline-none"
                  style={{ borderRadius: "var(--radius-md)" }}
                >
                  {f.options.map((o) => (
                    <option key={o} value={o}>
                      {o === "All" ? `All ${f.label.toLowerCase()}` : o}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        )}
      </header>

      <main className="px-3 py-4 lg:mx-auto lg:max-w-[1400px]">
        <RouteList routes={filtered} />
        <RouteTable routes={filtered} />

        {filtered.length === 0 && (
          <p className="mt-6 text-center font-display text-lg font-bold text-muted">No routes match.</p>
        )}
      </main>
    </div>
  );
}
