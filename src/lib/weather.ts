import type { WeatherSummary } from "@/types/weather";

function parseCode(code: number): { label: string } {
  if (code === 0)   return { label: "Clear" };
  if (code <= 2)    return { label: "Partly cloudy" };
  if (code === 3)   return { label: "Overcast" };
  if (code <= 48)   return { label: "Foggy" };
  if (code <= 57)   return { label: "Drizzle" };
  if (code <= 67)   return { label: "Rain" };
  if (code <= 82)   return { label: "Showers" };
  if (code >= 95)   return { label: "Thunderstorm" };
  return              { label: "Mixed" };
}

/** Steadman heat index, returns °C */
function heatIndex(tempC: number, rh: number): number {
  const T = tempC * 9 / 5 + 32;
  const HI =
    -42.379 + 2.04901523 * T + 10.14333127 * rh
    - 0.22475541 * T * rh - 0.00683783 * T * T
    - 0.05481717 * rh * rh + 0.00122874 * T * T * rh
    + 0.00085282 * T * rh * rh - 0.00000199 * T * T * rh * rh;
  return Math.round((HI - 32) * 5 / 9);
}

function runCondition(
  tempC: number,
  feelsLike: number,
  code: number
): { text: string; level: "good" | "ok" | "bad" } {
  if (code >= 95) return { text: "Lightning — skip it",         level: "bad"  };
  if (code >= 51) return { text: "Wet — poncho or treadmill",   level: "bad"  };
  if (feelsLike >= 40) return { text: "Dangerous heat — wait",  level: "bad"  };
  if (tempC >= 34) return { text: "Hot — before 07:00 only",    level: "ok"   };
  if (tempC >= 30) return { text: "Warm — hydrate early",       level: "ok"   };
  return                  { text: "Good window",                 level: "good" };
}

export async function getBangkokWeather(): Promise<WeatherSummary | null> {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast" +
      "?latitude=13.7563&longitude=100.5018" +
      "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code" +
      "&timezone=Asia%2FBangkok&forecast_days=1",
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const c = data.current;

    const temp      = Math.round(c.temperature_2m);
    const humidity  = c.relative_humidity_2m;
    const feelsLike = heatIndex(temp, humidity);
    const { label } = parseCode(c.weather_code);
    const { text, level } = runCondition(temp, feelsLike, c.weather_code);

    return {
      temp,
      feelsLike,
      humidity,
      windKmh:          Math.round(c.wind_speed_10m),
      label,
      icon:             "",
      runCondition:     text,
      runConditionLevel: level,
    };
  } catch {
    return null;
  }
}
