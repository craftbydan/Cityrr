import type { RouteStatus } from "@/lib/routes";

export function StatusBadge({ status }: { status: RouteStatus }) {
  const styles = {
    Active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Caution: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Restricted: "bg-red-500/15 text-red-400 border-red-500/30",
  } as const;

  return (
    <span
      className={`inline-flex shrink-0 items-center border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${styles[status]}`}
      style={{ borderRadius: "4px" }}
    >
      {status}
    </span>
  );
}

export function MetaTag({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 border border-border bg-surface-2 px-2 py-1 text-[11px] text-muted">
      <span className="text-muted/70">{label}</span>
      <span className="text-foreground">{value}</span>
    </span>
  );
}
