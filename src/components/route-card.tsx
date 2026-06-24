import type { Route } from "@/lib/routes";

const difficultyLabel = {
  easy: "Easy going",
  moderate: "Some hills",
  hard: "A proper workout",
} as const;

const cardPalette = [
  {
    surface: "bg-white",
    stripe: "bg-blue",
    city: "text-blue",
    detail: "bg-blue-light/70 border-blue/15",
    start: "text-blue",
    finish: "text-orange",
  },
  {
    surface: "bg-[#fff7f2]",
    stripe: "bg-orange",
    city: "text-orange",
    detail: "bg-orange/10 border-orange/20",
    start: "text-blue",
    finish: "text-orange",
  },
  {
    surface: "bg-[#f0f6fc]",
    stripe: "bg-blue-deep",
    city: "text-blue-deep",
    detail: "bg-white/80 border-blue/15",
    start: "text-blue",
    finish: "text-orange",
  },
] as const;

export function RouteCard({ route, index = 0 }: { route: Route; index?: number }) {
  const palette = cardPalette[index % cardPalette.length];

  return (
    <article
      className={`group relative flex flex-col gap-5 overflow-hidden p-5 shadow-[0_2px_12px_rgba(15,47,85,0.07)] transition-shadow duration-300 hover:shadow-[0_6px_20px_rgba(15,47,85,0.11)] sm:p-6 ${palette.surface}`}
      style={{ borderRadius: "var(--radius-card)" }}
    >
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 ${palette.stripe}`}
      />

      <header className="space-y-2 pt-1">
        <div className={`flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm ${palette.city}`}>
          <span className="font-medium">{route.city}</span>
          <span className="opacity-35">·</span>
          <span className="text-blue-deep/65">about {route.distanceKm} km</span>
          <span className="opacity-35">·</span>
          <span className="text-blue-deep/65">~{route.durationMin} min</span>
        </div>
        <h3 className="font-display text-[1.35rem] font-semibold leading-snug text-blue-deep">
          {route.name}
        </h3>
        <p className="text-[0.95rem] leading-relaxed text-blue/75 italic">
          {route.note}
        </p>
      </header>

      <div
        className={`space-y-3 border p-4 text-sm leading-relaxed text-blue-deep/90 ${palette.detail}`}
        style={{ borderRadius: "calc(var(--radius-card) - 3px)" }}
      >
        <p>
          <span className={`block text-xs font-medium ${palette.start}`}>Start</span>
          {route.transitStop}
          <span className="text-blue/50"> ({route.transitLine})</span>
        </p>
        <p>
          <span className={`block text-xs font-medium ${palette.finish}`}>Finish</span>
          {route.breakfastSpot}
          <span className="text-blue/50"> — {route.breakfastType}</span>
        </p>
      </div>

      <footer className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-blue/10 pt-4 text-xs text-blue/55">
        <span>{difficultyLabel[route.difficulty]}</span>
        <span className="text-blue/25">·</span>
        <span>best {route.bestWhen}</span>
      </footer>
    </article>
  );
}
