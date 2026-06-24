export type Route = {
  id: string;
  name: string;
  city: string;
  distanceKm: number;
  durationMin: number;
  difficulty: "easy" | "moderate" | "hard";
  transitStop: string;
  transitLine: string;
  breakfastSpot: string;
  breakfastType: string;
  note: string;
  bestWhen: string;
};

export const routes: Route[] = [
  {
    id: "1",
    name: "Brooklyn Bridge Sunrise",
    city: "New York",
    distanceKm: 8.2,
    durationMin: 48,
    difficulty: "moderate",
    transitStop: "High St–Brooklyn Bridge",
    transitLine: "A / C",
    breakfastSpot: "Seymour's Café",
    breakfastType: "coffee & pastries",
    note: "The bridge is quietest before 7. Worth the early alarm.",
    bestWhen: "weekday mornings",
  },
  {
    id: "2",
    name: "Embarcadero Morning",
    city: "San Francisco",
    distanceKm: 5.4,
    durationMin: 32,
    difficulty: "easy",
    transitStop: "Embarcadero Station",
    transitLine: "BART",
    breakfastSpot: "Boulevard Café",
    breakfastType: "brunch & coffee",
    note: "Flat, breezy, and hard to get lost. A good first Cityrr.",
    bestWhen: "before the fog lifts",
  },
  {
    id: "3",
    name: "Thames Riverside Loop",
    city: "London",
    distanceKm: 12.1,
    durationMin: 72,
    difficulty: "moderate",
    transitStop: "London Bridge",
    transitLine: "Jubilee / Northern",
    breakfastSpot: "Borough Market Eats",
    breakfastType: "market breakfast",
    note: "Finish hungry — the market rewards patience.",
    bestWhen: "Saturday, not too late",
  },
  {
    id: "4",
    name: "Shibuya to Yoyogi",
    city: "Tokyo",
    distanceKm: 15.6,
    durationMin: 95,
    difficulty: "hard",
    transitStop: "Shibuya Station",
    transitLine: "JR Yamanote",
    breakfastSpot: "Café Kitsuné",
    breakfastType: "Japanese café",
    note: "Long legs day. Crosswalks thin out once you leave the core.",
    bestWhen: "Sunday morning",
  },
  {
    id: "5",
    name: "Lakefront Long Run",
    city: "Chicago",
    distanceKm: 19.8,
    durationMin: 118,
    difficulty: "hard",
    transitStop: "Grand Red Line",
    transitLine: "CTA Red",
    breakfastSpot: "Wildberry Pancakes",
    breakfastType: "pancakes & eggs",
    note: "Save room. Everyone orders too much at the end.",
    bestWhen: "cooler days",
  },
  {
    id: "6",
    name: "Canal Saint-Martin",
    city: "Paris",
    distanceKm: 7.3,
    durationMin: 44,
    difficulty: "easy",
    transitStop: "République",
    transitLine: "Métro 3 / 5 / 8",
    breakfastSpot: "Ten Belles Bread",
    breakfastType: "bakery & coffee",
    note: "Slow down by the canal. It's the whole point.",
    bestWhen: "any morning, really",
  },
];
