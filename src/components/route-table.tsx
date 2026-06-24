import type { ReactNode } from "react";
import type { Route } from "@/lib/routes";
import { IconAlert, IconDistance, IconElevation, IconTime } from "@/components/icons";
import { MetaTag, StatusBadge } from "@/components/route-ui";

function Metric({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold">
      {icon}
      <span className="tabular-nums">{value}</span>
    </span>
  );
}

export function RouteTable({ routes }: { routes: Route[] }) {
  return (
    <div
      className="hidden overflow-x-auto border-2 border-foreground bg-surface lg:block"
      style={{ borderRadius: "var(--radius-md)" }}
    >
      <table className="w-full min-w-[1100px] border-collapse text-left text-xs">
        <thead>
          <tr className="border-b-2 border-foreground bg-blue text-[10px] font-bold uppercase tracking-widest text-white">
            <th className="px-3 py-2.5">Route ID</th>
            <th className="px-3 py-2.5">Name / City</th>
            <th className="px-3 py-2.5">Metrics</th>
            <th className="px-3 py-2.5">Terrain</th>
            <th className="px-3 py-2.5">Start Hub</th>
            <th className="px-3 py-2.5">End Location</th>
            <th className="px-3 py-2.5">Operational</th>
            <th className="px-3 py-2.5">Status</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route, i) => (
            <tr
              key={route.id}
              className={`border-b border-border transition-colors hover:bg-surface-2 ${i % 2 === 0 ? "bg-background" : "bg-surface"}`}
            >
              <td className="px-3 py-2.5 align-top">
                <span className="font-mono text-xs font-bold text-blue-bright">{route.routeId}</span>
              </td>
              <td className="px-3 py-2.5 align-top">
                <div className="font-display text-sm font-extrabold">{route.name}</div>
                <div className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-muted">{route.city}</div>
              </td>
              <td className="px-3 py-2.5 align-top">
                <div className="flex flex-col gap-1">
                  <Metric icon={<IconDistance className="text-orange" />} value={`${route.distanceKm} km`} />
                  <Metric icon={<IconTime className="text-blue-bright" />} value={`${route.durationMin} min`} />
                  <span className="text-[11px] text-muted">
                    Pace <span className="font-semibold text-foreground">{route.avgPaceMinPerKm} min/km</span>
                  </span>
                </div>
              </td>
              <td className="px-3 py-2.5 align-top">
                <div className="flex flex-wrap gap-1">
                  <MetaTag label="Terrain" value={route.terrain} variant="blue" />
                  <MetaTag label="Elev" value={`+${route.elevationGainM}m`} />
                  <MetaTag label="Tech" value={route.technicalDifficulty} variant="orange" />
                </div>
              </td>
              <td className="px-3 py-2.5 align-top">
                <div className="font-semibold">{route.startHub}</div>
                <div className="text-muted">{route.startLine}</div>
                <div className="mt-0.5 font-mono text-[10px] text-muted">{route.startCoords}</div>
              </td>
              <td className="px-3 py-2.5 align-top">
                <div className="font-semibold">{route.endLocation}</div>
                <div className="font-mono text-[10px] text-muted">{route.endCoords}</div>
                <div className="mt-1 text-muted">
                  <span className="font-semibold text-foreground">{route.endTransitHub}</span> · {route.endTransitLine}
                </div>
              </td>
              <td className="px-3 py-2.5 align-top">
                <MetaTag label="Weather" value={route.weatherImpact} />
                {route.constructionAlert ? (
                  <div className="mt-1.5 flex items-start gap-1 font-medium text-[#ffab00]">
                    <IconAlert className="mt-0.5 shrink-0" />
                    <span>{route.constructionAlert}</span>
                  </div>
                ) : (
                  <div className="mt-1.5 text-muted">Clear</div>
                )}
              </td>
              <td className="px-3 py-2.5 align-top">
                <StatusBadge status={route.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
