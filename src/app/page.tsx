import RunClubProfile from "@/components/RunClubProfile";
import { sabaiRunningClub, urbanRunTribe } from "@/lib/sampleClubs";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--color-canvas)" }}
    >
      {/* ── Nav — metro header bar ───────────────────────────────────────── */}
      <nav
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: "var(--color-rule)" }}
      >
        {/* Wordmark — Barlow Condensed, the metro font */}
        <span
          className="font-metro text-2xl font-black uppercase tracking-[-0.02em] text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-metro)" }}
        >
          Cityrr
        </span>

        {/* Location — amber small caps */}
        <span className="metro-label">Bangkok</span>
      </nav>

      {/* ── Clubs ───────────────────────────────────────────────────────── */}
      <main className="flex-1">
        <RunClubProfile club={sabaiRunningClub} />

        {/* Between-club divider — amber rule full bleed */}
        <div
          style={{ height: "1px", backgroundColor: "var(--color-rule-strong)" }}
          aria-hidden
        />

        <RunClubProfile club={urbanRunTribe} />
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer
        className="px-5 py-5 border-t"
        style={{ borderColor: "var(--color-rule)" }}
      >
        <p className="metro-label">
          Cityrr&nbsp;&nbsp;·&nbsp;&nbsp;Transit-to-Breakfast&nbsp;&nbsp;·&nbsp;&nbsp;Bangkok
        </p>
      </footer>
    </div>
  );
}
