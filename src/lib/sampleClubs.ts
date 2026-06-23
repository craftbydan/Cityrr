import type { ClubProfile } from "@/types/club";

/**
 * Mock club data — mimics records returned from a database.
 * The `branding` object drives the CSS variable override engine on each profile.
 */

export const sabaiRunningClub: ClubProfile = {
  id: "sabai-bkk",
  slug: "sabai",
  name: "Sabai Running",
  shortName: "Sabai",
  tagline:
    "Slow down to speed up. Easy miles, good coffee, great people. เดิน วิ่ง กิน.",
  description:
    "Sabai Running is Bangkok's most laid-back Saturday morning crew. We meet at BTS Ekkamai, run a comfortable 5K loop through the backstreets of On Nut, and finish every session with a long brunch at a rotating café partner. No PBs required — just shoes, a smile, and an appetite.",
  district: "Watthana",
  memberCount: 312,
  foundedYear: 2021,
  instagramHandle: "sabai.running.bkk",
  stravaClubUrl: "https://www.strava.com/clubs/sabai-bkk",
  branding: {
    font: "Cormorant Garamond",
    primary: "#4ABFB8",   // light teal — readable against dark canvas
    accent:  "#2DC5B0",
  },
  featuredRoutes: [
    {
      id: "sabai-rt-01",
      name: "Ekkamai Morning Loop",
      startStation: {
        code: "E7",
        name: "Ekkamai",
        line: "BTS",
      },
      distanceKm: "5",
      elevationGainM: "18",
      endCafe: "Canvas Café",
      cafeArea: "On Nut",
      tags: ["BTS E7", "5K Loop", "Flat Route", "Beginner-Friendly", "Pet-Friendly"],
      dayOfWeek: "Saturday",
      meetTime: "07:00",
      stravaRouteUrl: "https://www.strava.com/routes/3000000001",
    },
    {
      id: "sabai-rt-02",
      name: "Thong Lo Evening 7K",
      startStation: {
        code: "E6",
        name: "Thong Lo",
        line: "BTS",
      },
      distanceKm: "7",
      elevationGainM: "22",
      endCafe: "The Brown",
      cafeArea: "Thong Lo",
      tags: ["BTS E6", "7K", "Evening Run", "Post-Work"],
      dayOfWeek: "Wednesday",
      meetTime: "18:30",
      stravaRouteUrl: "https://www.strava.com/routes/3000000002",
    },
  ],
};

export const urbanRunTribe: ClubProfile = {
  id: "urt-bkk",
  slug: "urt",
  name: "Urban Run Tribe",
  shortName: "URT",
  tagline:
    "From the underground to the streets. 6AM or nothing. Bangkok's hardest crew.",
  description:
    "Urban Run Tribe (URT) is Bangkok's most committed run collective. We run fast, run far, and eat hard. Meeting weekly at MRT Queen Sirikit National Convention Centre, our signature 10K pushes through the riverside district and ends with a proper Sri Panwa-style post-run ritual at The Father café. Come fast or come ready to get faster.",
  district: "Khlong Toei",
  memberCount: 847,
  foundedYear: 2019,
  instagramHandle: "urbanruntribe",
  stravaClubUrl: "https://www.strava.com/clubs/urt-bkk",
  branding: {
    font: "Cormorant Garamond",
    primary: "#E8500A",   // electric orange — pops on dark canvas
    accent:  "#F5A623",
  },
  featuredRoutes: [
    {
      id: "urt-rt-01",
      name: "QSNCC Riverside Burn",
      startStation: {
        code: "QSNCC",
        name: "Queen Sirikit NCC",
        line: "MRT",
      },
      distanceKm: "10",
      elevationGainM: "35",
      endCafe: "The Father",
      cafeArea: "Asok",
      tags: ["MRT QSNCC", "10K", "Riverside", "Advanced", "STRAVA KOM"],
      dayOfWeek: "Sunday",
      meetTime: "06:00",
      stravaRouteUrl: "https://www.strava.com/routes/3000000003",
    },
    {
      id: "urt-rt-02",
      name: "Asok Night Hustle",
      startStation: {
        code: "SUK",
        name: "Sukhumvit",
        line: "MRT",
      },
      distanceKm: "8",
      endCafe: "Ceresia Coffee",
      cafeArea: "Asok",
      tags: ["MRT SUK", "8K Loop", "Night Run", "Speed Work"],
      dayOfWeek: "Thursday",
      meetTime: "19:00",
      stravaRouteUrl: "https://www.strava.com/routes/3000000004",
    },
  ],
};

export const allClubs: ClubProfile[] = [sabaiRunningClub, urbanRunTribe];
