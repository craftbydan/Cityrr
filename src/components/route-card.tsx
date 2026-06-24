import type { Route } from "@/lib/routes";

const difficultyLabel = {
  easy: "Easy going",
  moderate: "Some hills",
  hard: "A proper workout",
} as const;

const cardTilt = ["-rotate-1", "rotate-[0.6deg]", "-rotate-[0.4deg]", "rotate-1", "-rotate-[0.8deg]", "rotate-[0.3deg]"];

export function RouteCard({ route, index = 0 }: { route: Route; index?: number }) {
  const tilt = cardTilt[index % cardTilt.length];

  return (
    <article
      className={`group relative flex flex-col gap-5 bg-[#faf7f2] p-5 shadow-[0_2px_12px_rgba(15,47,85,0.06)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,47,85,0.1)] sm:p-6 ${tilt} hover:rotate-0`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent sm:inset-x-6"
      />

      <header className="space-y-2">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-blue/60">
          <span>{route.city}</span>
          <span className="text-blue/30">·</span>
          <span>about {route.distanceKm} km</span>
          <span className="text-blue/30">·</span>
          <span>~{route.durationMin} min</span>
        </div>
        <h3 className="font-display text-[1.35rem] font-semibold leading-snug text-blue-deep">
          {route.name}
        </h3>
        <p className="text-[0.95rem] leading-relaxed text-blue/75 italic">
          {route.note}
        </p>
      </header>

      <div className="space-y-3 border-l-2 border-blue/15 pl-4 text-sm leading-relaxed text-blue-deep/90">
        <p>
          <span className="block text-xs text-blue/45">Start</span>
          {route.transitStop}
          <span className="text-blue/50"> ({route.transitLine})</span>
        </p>
        <p>
          <span className="block text-xs text-blue/45">Finish</span>
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
