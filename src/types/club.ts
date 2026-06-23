export type TransitLine = "BTS" | "MRT" | "ARL";

export interface TransitStation {
  code: string;
  name: string;
  line: TransitLine;
}

export interface RouteData {
  id: string;
  name: string;
  startStation: TransitStation;
  /** Distance in kilometres, e.g. "5.2" */
  distanceKm: string;
  elevationGainM?: string;
  endCafe: string;
  cafeArea: string;
  tags: string[];
  dayOfWeek: string;
  meetTime: string;
  stravaRouteUrl: string;
  /** Optional: map preview image URL */
  mapImageUrl?: string;
}

/**
 * Club branding config — sourced from the database.
 * Drives the CSS variable override engine.
 */
export interface ClubBranding {
  /** Google Fonts family name used as --club-font */
  font: string;
  /** Hex colour for primary actions, route lines, and accents */
  primary: string;
  /** Hex colour for tags, micro-details, and hover states */
  accent: string;
}

export interface ClubProfile {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  tagline: string;
  description: string;
  district: string;
  memberCount: number;
  foundedYear: number;
  instagramHandle?: string;
  stravaClubUrl?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  branding: ClubBranding;
  featuredRoutes: RouteData[];
}
