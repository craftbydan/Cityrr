import type { ReactNode } from "react";
import type { Route } from "@/lib/routes";
import { IconAlert, IconDistance, IconElevation, IconTime } from "@/components/icons";
import { MetaTag, StatusBadge } from "@/components/route-ui";

function Metric({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted" title={label}>
      {icon}
      <span className="tabular-nums text-foreground">{value}</span>
    </span>
  );
}

export function RouteTable({ routes }: { routes: Route[] }) {
  return (
    <div
      className="hidden overflow-x-auto border border-border bg-surface lg:block"
      style={{ borderRadius: "6px" }}
    >
      <table className="w-full min-w-[1100px] border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-border bg-surface-2 text-[10px] font-medium uppercase tracking-wider text-muted">
            <th className="px-2 py-2 font-medium">Route ID</th>
            <th className="px-2 py-2 font-medium">Name / City</th>
            <th className="px-2 py-2 font-medium">Metrics</th>
            <th className="px-2 py-2 font-medium">Terrain & Elevation</th>
            <th className="px-2 py-2 font-medium">Start Hub</th>
            <th className="px-2 py-2 font-medium">End Location</th>
            <th className="px-2 py-2 font-medium">Operational</th>
            <th className="px-2 py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr
              key={route.id}
              className="border-b border-border/80 transition-colors hover:bg-surface-2/60"
            >
              <td className="px-2 py-2 align-top">
                <span className="font-mono text-[11px] text-accent">{route.routeId}</span>
              </td>
              <td className="px-2 py-2 align-top">
                <div className="font-medium text-foreground">{route.name}</div>
                <div className="mt-0.5 text-[11px] text-muted">{route.city}</div>
              </td>
              <td className="px-2 py-2 align-top">
                <div className="flex flex-col gap-1">
                  <Metric
                    icon={<IconDistance className="text-muted" />}
                    label="Distance"
                    value={`${route.distanceKm} km`}
                  />
                  <Metric
                    icon={<IconTime className="text-muted" />}
                    label="Duration"
                    value={`${route.durationMin} min`}
                  />
                  <span className="text-[11px] text-muted">
                    Pace: <span className="tabular-nums text-foreground">{route.avgPaceMinPerKm} min/km</span>
                  </span>
                </div>
              </td>
              <td className="px-2 py-2 align-top">
                <div className="flex flex-wrap gap-1">
                  <MetaTag label="Terrain" value={route.terrain} />
                  <MetaTag label="Elev" value={`+${route.elevationGainM}m`} />
                  <MetaTag label="Tech" value={route.technicalDifficulty} />
                </div>
              </td>
              <td className="px-2 py-2 align-top">
                <div className="text-foreground">{route.startHub}</div>
                <div className="mt-0.5 text-[11px] text-muted">{route.startLine}</div>
                <div className="mt-0.5 font-mono text-[10px] text-muted/80">{route.startCoords}</div>
              </td>
              <td className="px-2 py-2 align-top">
                <div className="text-foreground">{route.endLocation}</div>
                <div className="mt-0.5 font-mono text-[10px] text-muted/80">{route.endCoords}</div>
                <div className="mt-1 text-[11px] text-muted">
                  Hub: <span className="text-foreground">{route.endTransitHub}</span> ({route.endTransitLine})
                </div>
              </td>
              <td className="px-2 py-2 align-top">
                <div className="flex flex-wrap gap-1">
                  <MetaTag label="Weather" value={route.weatherImpact} />
                </div>
                {route.constructionAlert ? (
                  <div className="mt-1.5 flex items-start gap-1 text-[11px] text-amber-400/90">
                    <IconAlert className="mt-0.5 shrink-0" />
                    <span>{route.constructionAlert}</span>
                  </div>
                ) : (
                  <div className="mt-1.5 text-[11px] text-muted">No active alerts</div>
                )}
              </td>
              <td className="px-2 py-2 align-top">
                <StatusBadge status={route.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
