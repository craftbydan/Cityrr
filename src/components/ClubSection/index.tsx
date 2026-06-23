import type { ClubProfile } from "@/types/club";

export default function ClubSection({ clubs }: { clubs: ClubProfile[] }) {
  return (
    <section className="border-t" style={{ borderColor: "var(--color-rule-hi)" }}>

      {/* Section header */}
      <div
        className="px-5 py-4 border-b"
        style={{ borderColor: "var(--color-rule)" }}
      >
        <p className="sys-label">Clubs Running These Routes</p>
      </div>

      {/* Club list */}
      <div className="divide-y" style={{ borderColor: "var(--color-rule)" }}>
        {clubs.map((club) => (
          <div
            key={club.id}
            className="px-5 py-5"
            style={{
              borderColor: "var(--color-rule)",
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
            }}
          >
            {/* Club name */}
            <div className="flex items-start justify-between mb-3">
              <div>
                {/* Primary color accent dot */}
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: club.branding.primary }}
                    aria-hidden
                  />
                  <span className="sys-label" style={{ color: club.branding.primary }}>
                    {club.district}
                  </span>
                </div>
                <h3
                  className="font-metro font-black uppercase text-[var(--color-ink)] leading-tight"
                  style={{ fontSize: "clamp(1.4rem, 7vw, 2rem)" }}
                >
                  {club.name}
                </h3>
              </div>
              <span className="font-mono text-[10px] text-[var(--color-ink-faint)] tracking-wider uppercase mt-1">
                {club.featuredRoutes.length} routes
              </span>
            </div>

            {/* Stats row */}
            <div className="flex gap-5">
              <StatPair label="Members" value={club.memberCount.toLocaleString()} />
              <StatPair label="Est." value={String(club.foundedYear)} />
            </div>

            {/* Social */}
            {(club.instagramHandle || club.stravaClubUrl) && (
              <div className="flex gap-4 mt-4">
                {club.instagramHandle && (
                  <a
                    href={`https://instagram.com/${club.instagramHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] tracking-wider uppercase text-[var(--color-ink-mid)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    IG @{club.instagramHandle}
                  </a>
                )}
                {club.stravaClubUrl && (
                  <a
                    href={club.stravaClubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] tracking-wider uppercase transition-colors"
                    style={{ color: club.branding.primary }}
                  >
                    Strava Club ↗
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function StatPair({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="sys-label mb-0.5">{label}</p>
      <p className="font-metro font-bold uppercase text-[var(--color-ink)] text-base">
        {value}
      </p>
    </div>
  );
}
