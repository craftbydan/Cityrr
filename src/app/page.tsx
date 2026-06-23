import RunClubProfile from "@/components/RunClubProfile";
import { sabaiRunningClub, urbanRunTribe } from "@/lib/sampleClubs";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--color-canvas)" }}
    >
      {/* ── Platform Nav ──────────────────────────────────────────────────── */}
      <PlatformNav />

      {/* ── Hero banner ───────────────────────────────────────────────────── */}
      <section
        className="border-b px-6 py-10 md:px-10 md:py-14"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div
            className="inline-block font-body text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 mb-5"
            style={{
              backgroundColor: "color-mix(in srgb, #0D6E6E 12%, transparent)",
              color: "#0D6E6E",
              border: "1px solid color-mix(in srgb, #0D6E6E 25%, transparent)",
            }}
          >
            Bangkok · Run Club Directory
          </div>
          <h1
            className="font-display text-[2.8rem] md:text-[4rem] leading-[1.0] tracking-[-0.03em] font-black text-[var(--color-ink)] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Find your transit-to-<br className="hidden md:block" />
            <em>breakfast</em> crew.
          </h1>
          <p className="font-body text-sm text-[var(--color-ink-muted)] leading-relaxed max-w-xl tracking-wide">
            Bangkok&apos;s run clubs, mapped from BTS & MRT station to the best
            post-run café. Pick a club, see the route, open it in Strava.
          </p>
        </div>
      </section>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="flex-1 px-6 py-10 md:px-10 md:py-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">

          {/* Section heading */}
          <div className="flex items-baseline justify-between">
            <h2
              className="font-body text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--color-ink-muted)]"
            >
              Featured Clubs
              <span
                className="ml-2 inline-block px-2 py-0.5 text-[9px]"
                style={{
                  color: "var(--color-ink-faint)",
                  border: "1px solid var(--color-border-strong)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                2 of 24
              </span>
            </h2>
            <span className="font-body text-[11px] text-[var(--color-ink-faint)] tracking-wide">
              Sorted by activity
            </span>
          </div>

          {/* ── Sabai Running Club — deep teal ──────────────────────────── */}
          <RunClubProfile club={sabaiRunningClub} variant="page" />

          {/* ── Between-card editorial break ────────────────────────────── */}
          <div
            className="flex items-center gap-4"
            aria-hidden
          >
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--color-border)" }} />
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-faint)]">
              Next Club
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--color-border)" }} />
          </div>

          {/* ── Urban Run Tribe — electric orange ───────────────────────── */}
          <RunClubProfile club={urbanRunTribe} variant="page" />

        </div>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <PlatformFooter />
    </div>
  );
}

/* ── Platform Nav ────────────────────────────────────────────────────────── */
function PlatformNav() {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 border-b"
      style={{
        backgroundColor: "var(--color-canvas)",
        borderColor: "var(--color-border)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-center gap-3">
        <LogoMark />
        <span
          className="font-display text-xl font-black tracking-[-0.04em] text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Cityrr
        </span>
        <span
          className="font-body text-[9px] tracking-[0.18em] uppercase px-1.5 py-0.5 hidden sm:inline"
          style={{
            color: "var(--color-ink-faint)",
            border: "1px solid var(--color-border-strong)",
          }}
        >
          Beta
        </span>
      </div>

      <div className="flex items-center gap-2">
        <NavPill>Map</NavPill>
        <NavPill>Clubs</NavPill>
        <NavPill highlight>Join</NavPill>
      </div>
    </nav>
  );
}

function NavPill({ children, highlight = false }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <button
      className="font-body text-[11px] font-semibold tracking-wider uppercase px-3 py-1.5 transition-colors"
      style={
        highlight
          ? {
              backgroundColor: "var(--color-ink)",
              color: "var(--color-canvas)",
              border: "1px solid var(--color-ink)",
            }
          : {
              color: "var(--color-ink-muted)",
              border: "1px solid transparent",
            }
      }
    >
      {children}
    </button>
  );
}

function LogoMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect width="32" height="32" fill="#1C1917" />
      <path
        d="M8 22 L16 10 L24 22"
        stroke="#FBF9F6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="16" cy="10" r="2.5" fill="#FBF9F6" />
    </svg>
  );
}

/* ── Platform Footer ─────────────────────────────────────────────────────── */
function PlatformFooter() {
  return (
    <footer
      className="border-t px-6 py-8 md:px-10"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span
            className="font-display text-base font-black tracking-tight text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Cityrr
          </span>
          <p className="font-body text-[11px] text-[var(--color-ink-faint)] tracking-wide mt-0.5">
            Transit-to-breakfast run club hub · Bangkok
          </p>
        </div>
        <div className="flex items-center gap-6">
          {["Clubs", "Map", "About", "Submit a Club"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-body text-[11px] text-[var(--color-ink-muted)] tracking-wider uppercase transition-colors hover:text-[var(--color-ink)]"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
