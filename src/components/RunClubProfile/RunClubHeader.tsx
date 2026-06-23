"use client";

import type { ClubProfile } from "@/types/club";

export default function RunClubHeader({ club }: { club: ClubProfile }) {
  return (
    <header className="px-5 pt-10 pb-8">

      {/* Tiny location label */}
      <p className="font-body text-[9px] tracking-[0.22em] uppercase text-[var(--color-ink-faint)] mb-7">
        {club.district} &nbsp;/&nbsp; Bangkok
      </p>

      {/* Club name — the whole hero */}
      <h1
        className="font-club leading-[0.92] tracking-[-0.03em] font-black text-[var(--color-ink)]"
        style={{
          fontFamily: "var(--club-font)",
          fontSize: "clamp(3.2rem, 16vw, 7rem)",
        }}
      >
        {club.name}
      </h1>

      {/* Tagline — italic, restrained */}
      {club.tagline && (
        <p
          className="font-display italic text-[var(--color-ink-mid)] mt-4 leading-snug"
          style={{ fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)", maxWidth: "26ch" }}
        >
          {club.tagline}
        </p>
      )}
    </header>
  );
}
