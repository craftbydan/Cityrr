"use client";

import type { ClubProfile } from "@/types/club";

export default function RunClubHeader({ club }: { club: ClubProfile }) {
  return (
    <header className="px-5 pt-10 pb-8">

      {/* Amber metro label — district + line */}
      <p className="metro-label mb-6">
        {club.district}&nbsp;&nbsp;/&nbsp;&nbsp;Bangkok Run Club
      </p>

      {/* Club name — full metro boldness */}
      <h1
        className="font-metro font-black uppercase leading-[0.88] tracking-[-0.01em] text-[var(--color-ink)]"
        style={{ fontSize: "clamp(3.4rem, 17vw, 8rem)" }}
      >
        {club.name}
      </h1>

      {/* Tagline — Aesop italic serif, quietly below */}
      {club.tagline && (
        <p
          className="font-aesop italic text-[var(--color-ink-mid)] mt-5 leading-relaxed"
          style={{ fontSize: "clamp(1rem, 4vw, 1.2rem)", maxWidth: "28ch" }}
        >
          {club.tagline}
        </p>
      )}
    </header>
  );
}
