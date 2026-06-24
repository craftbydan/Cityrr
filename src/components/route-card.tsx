import type { Route } from "@/lib/routes";

const difficultyLabel = {
  easy: "Easy",
  moderate: "Moderate",
  hard: "Hard",
} as const;

export function RouteCard({ route }: { route: Route }) {
  return (
    <article className="group flex flex-col gap-4 rounded-2xl border border-blue/15 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-blue/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-orange/80">
            {route.city}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold leading-tight text-blue-deep group-hover:text-orange transition-colors">
            {route.name}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-orange/10 px-3 py-1 font-display text-sm font-semibold text-orange">
          {route.distanceKm}k
        </span>
      </div>

      <div className="flex flex-col gap-2 text-sm text-blue/70">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue text-[10px] font-semibold text-blue-light">
            A
          </span>
          <span>
            <span className="font-medium text-blue-deep">{route.transitStop}</span>
            <span className="text-blue/50"> · {route.transitLine}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange text-[10px] font-semibold text-white">
            B
          </span>
          <span>
            <span className="font-medium text-blue-deep">{route.breakfastSpot}</span>
            <span className="text-blue/50"> · {route.breakfastType}</span>
          </span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-blue/10 pt-4">
        <span className="text-xs font-medium uppercase tracking-wide text-blue/50">
          {difficultyLabel[route.difficulty]}
        </span>
        <span className="text-sm font-medium text-orange opacity-0 transition-opacity group-hover:opacity-100">
          View route →
        </span>
      </div>
    </article>
  );
}
