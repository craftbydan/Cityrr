import type { RouteStatus } from "@/lib/routes";

export function StatusBadge({ status }: { status: RouteStatus }) {
  const styles = {
    Active: "bg-[#00c853] text-black border-black",
    Caution: "bg-[#ffab00] text-black border-black",
    Restricted: "bg-[#ff1744] text-white border-black",
  } as const;

  return (
    <span
      className={`inline-flex shrink-0 items-center border-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${styles[status]}`}
      style={{ borderRadius: "var(--radius-sm)" }}
    >
      {status}
    </span>
  );
}

export function MetaTag({ label, value, variant = "default" }: { label: string; value: string; variant?: "default" | "blue" | "orange" }) {
  const variants = {
    default: "border-border bg-surface-2 text-foreground",
    blue: "border-blue bg-blue text-white",
    orange: "border-orange bg-orange text-black",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-1.5 border-2 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${variants[variant]}`}
      style={{ borderRadius: "var(--radius-sm)" }}
    >
      <span className={variant === "default" ? "text-muted" : "opacity-80"}>{label}</span>
      <span>{value}</span>
    </span>
  );
}
