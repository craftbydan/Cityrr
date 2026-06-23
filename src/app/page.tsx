import RunClubProfile from "@/components/RunClubProfile";
import { sabaiRunningClub, urbanRunTribe } from "@/lib/sampleClubs";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--color-canvas)" }}
    >
      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav
        className="flex items-center justify-between px-5 py-5 border-b"
        style={{ borderColor: "var(--color-rule)" }}
      >
        <span
          className="font-display text-xl font-black tracking-[-0.04em] text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Cityrr
        </span>
        <span className="font-body text-[9px] tracking-[0.22em] uppercase text-[var(--color-ink-faint)]">
          Bangkok
        </span>
      </nav>

      {/* ── Clubs ───────────────────────────────────────────────────────── */}
      <main className="flex-1">
        <RunClubProfile club={sabaiRunningClub} />

        {/* Between-club divider */}
        <div
          className="h-px mx-5 my-1"
          style={{ backgroundColor: "var(--color-rule)" }}
          aria-hidden
        />

        <RunClubProfile club={urbanRunTribe} />
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer
        className="border-t px-5 py-6"
        style={{ borderColor: "var(--color-rule)" }}
      >
        <p className="font-body text-[10px] tracking-[0.14em] uppercase text-[var(--color-ink-faint)]">
          Cityrr &nbsp;·&nbsp; Transit-to-breakfast &nbsp;·&nbsp; Bangkok
        </p>
      </footer>
    </div>
  );
}
