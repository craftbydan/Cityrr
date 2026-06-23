export type Route = {
  id: string;
  name: string;
  city: string;
  distanceKm: number;
  difficulty: "easy" | "moderate" | "hard";
  transitStop: string;
  transitLine: string;
  breakfastSpot: string;
  breakfastType: string;
};

export const routes: Route[] = [
  {
    id: "1",
    name: "Brooklyn Bridge Sunrise",
    city: "New York",
    distanceKm: 8.2,
    difficulty: "moderate",
    transitStop: "High St–Brooklyn Bridge",
    transitLine: "A / C",
    breakfastSpot: "Seymour's Café",
    breakfastType: "Coffee & pastries",
  },
  {
    id: "2",
    name: "Embarcadero Morning",
    city: "San Francisco",
    distanceKm: 5.4,
    difficulty: "easy",
    transitStop: "Embarcadero Station",
    transitLine: "BART",
    breakfastSpot: "Boulevard Café",
    breakfastType: "Brunch & coffee",
  },
  {
    id: "3",
    name: "Thames Riverside Loop",
    city: "London",
    distanceKm: 12.1,
    difficulty: "moderate",
    transitStop: "London Bridge",
    transitLine: "Jubilee / Northern",
    breakfastSpot: "Borough Market Eats",
    breakfastType: "Market breakfast",
  },
  {
    id: "4",
    name: "Shibuya to Yoyogi",
    city: "Tokyo",
    distanceKm: 15.6,
    difficulty: "hard",
    transitStop: "Shibuya Station",
    transitLine: "JR Yamanote",
    breakfastSpot: "Café Kitsuné",
    breakfastType: "Japanese café",
  },
  {
    id: "5",
    name: "Lakefront Long Run",
    city: "Chicago",
    distanceKm: 19.8,
    difficulty: "hard",
    transitStop: "Grand Red Line",
    transitLine: "CTA Red",
    breakfastSpot: "Wildberry Pancakes",
    breakfastType: "Pancakes & eggs",
  },
  {
    id: "6",
    name: "Canal Saint-Martin",
    city: "Paris",
    distanceKm: 7.3,
    difficulty: "easy",
    transitStop: "République",
    transitLine: "Métro 3 / 5 / 8",
    breakfastSpot: "Ten Belles Bread",
    breakfastType: "Bakery & coffee",
  },
];
