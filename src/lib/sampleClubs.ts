import type { ClubProfile } from "@/types/club";

export const sabaiRunningClub: ClubProfile = {
  id: "sabai-bkk",
  slug: "sabai",
  name: "Sabai Running",
  shortName: "Sabai",
  tagline: "Slow down to speed up. เดิน วิ่ง กิน.",
  description:
    "Easy Saturday crew out of Ekkamai. 5K loop through the On Nut backstreets, long brunch after. No PBs, no pressure.",
  district: "Watthana",
  memberCount: 312,
  foundedYear: 2021,
  instagramHandle: "sabai.running.bkk",
  stravaClubUrl: "https://www.strava.com/clubs/sabai-bkk",
  branding: {
    font: "Cormorant Garamond",
    primary: "#4ABFB8",
    accent: "#2DC5B0",
  },
  featuredRoutes: [
    {
      id: "sabai-rt-01",
      name: "Ekkamai Morning Loop",
      startStation: {
        code: "E7",
        name: "Ekkamai",
        line: "BTS",
        lat: 13.7222,
        lon: 100.5847,
      },
      distanceKm: "5",
      elevationGainM: "18",
      paceMinkm: "6:30",
      endCafe: "Canvas Café",
      cafeArea: "On Nut / Suk 77",
      tags: ["flat", "beginner ok", "dog-friendly"],
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
        lat: 13.7259,
        lon: 100.5805,
      },
      distanceKm: "7",
      elevationGainM: "22",
      paceMinkm: "6:00",
      endCafe: "The Brown",
      cafeArea: "Thong Lo / Suk 55",
      tags: ["hilly sois", "post-work", "street food after"],
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
  tagline: "6AM or nothing. Bangkok's hardest crew.",
  description:
    "QSNCC to riverside and back. 10K with actual elevation. If you can keep up, you're in. If you can't, we'll see you at the café anyway.",
  district: "Khlong Toei",
  memberCount: 847,
  foundedYear: 2019,
  instagramHandle: "urbanruntribe",
  stravaClubUrl: "https://www.strava.com/clubs/urt-bkk",
  branding: {
    font: "Cormorant Garamond",
    primary: "#E8500A",
    accent: "#F5A623",
  },
  featuredRoutes: [
    {
      id: "urt-rt-01",
      name: "QSNCC Riverside Burn",
      startStation: {
        code: "MRT QSNCC",
        name: "Queen Sirikit NCC",
        line: "MRT",
        lat: 13.7232,
        lon: 100.5601,
      },
      distanceKm: "10",
      elevationGainM: "35",
      paceMinkm: "5:30",
      endCafe: "The Father",
      cafeArea: "Asok / Suk 21",
      tags: ["hills", "advanced", "river views", "KOM segment"],
      dayOfWeek: "Sunday",
      meetTime: "06:00",
      stravaRouteUrl: "https://www.strava.com/routes/3000000003",
    },
    {
      id: "urt-rt-02",
      name: "Asok Night Hustle",
      startStation: {
        code: "MRT SUK",
        name: "Sukhumvit",
        line: "MRT",
        lat: 13.7378,
        lon: 100.5603,
      },
      distanceKm: "8",
      paceMinkm: "5:45",
      endCafe: "Ceresia Coffee",
      cafeArea: "Asok",
      tags: ["night run", "speed work", "CBD loop"],
      dayOfWeek: "Thursday",
      meetTime: "19:00",
      stravaRouteUrl: "https://www.strava.com/routes/3000000004",
    },
  ],
};

export const allClubs: ClubProfile[] = [sabaiRunningClub, urbanRunTribe];

export const allRoutes = [
  ...sabaiRunningClub.featuredRoutes.map((r) => ({ route: r, club: sabaiRunningClub })),
  ...urbanRunTribe.featuredRoutes.map((r) => ({ route: r, club: urbanRunTribe })),
];
