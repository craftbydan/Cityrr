import type { ReactNode } from "react";
import type { Route, RouteStatus } from "@/lib/routes";
import { IconAlert, IconDistance, IconElevation, IconTime } from "@/components/icons";

function StatusBadge({ status }: { status: RouteStatus }) {
  const styles = {
    Active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Caution: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Restricted: "bg-red-500/15 text-red-400 border-red-500/30",
  } as const;

  return (
    <span
      className={`inline-flex items-center border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${styles[status]}`}
      style={{ borderRadius: "4px" }}
    >
      {status}
    </span>
  );
}

function MetaTag({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted">
      <span className="text-muted/70">{label}:</span>
      <span className="text-foreground">{value}</span>
    </span>
  );
}

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
    <div className="overflow-x-auto border border-border bg-surface" style={{ borderRadius: "6px" }}>
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
                <div className="mt-1 flex items-center gap-1 text-[11px] text-muted">
                  <IconElevation className="shrink-0" />
                  <span className="tabular-nums">{route.elevationGainM}m gain</span>
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
