import type { Route } from "@/lib/routes";

const difficultyLabel = {
  easy: "Easy",
  moderate: "Moderate",
  hard: "Hard",
} as const;

export function RouteCard({ route }: { route: Route }) {
  return (
    <article className="group flex flex-col gap-4 rounded-2xl border border-coral/15 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-coral/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-coral/70">
            {route.city}
          </p>
          <h3 className="mt-1 font-display text-xl font-black leading-tight text-ink group-hover:text-coral transition-colors">
            {route.name}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-coral/10 px-3 py-1 font-display text-sm font-bold text-coral">
          {route.distanceKm}k
        </span>
      </div>

      <div className="flex flex-col gap-2 text-sm text-ink/70">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-cream">
            A
          </span>
          <span>
            <span className="font-medium text-ink">{route.transitStop}</span>
            <span className="text-ink/50"> · {route.transitLine}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-cream">
            B
          </span>
          <span>
            <span className="font-medium text-ink">{route.breakfastSpot}</span>
            <span className="text-ink/50"> · {route.breakfastType}</span>
          </span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-coral/10 pt-4">
        <span className="text-xs font-medium uppercase tracking-wide text-ink/50">
          {difficultyLabel[route.difficulty]}
        </span>
        <span className="text-sm font-medium text-coral opacity-0 transition-opacity group-hover:opacity-100">
          View route →
        </span>
      </div>
    </article>
  );
}
