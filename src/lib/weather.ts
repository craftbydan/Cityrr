import type { WeatherSummary } from "@/types/weather";

/** WMO weather code → human label + icon */
function parseCode(code: number): { label: string; icon: string } {
  if (code === 0)             return { label: "Clear Sky",         icon: "☀" };
  if (code <= 2)              return { label: "Partly Cloudy",     icon: "⛅" };
  if (code === 3)             return { label: "Overcast",          icon: "☁" };
  if (code <= 48)             return { label: "Foggy",             icon: "🌫" };
  if (code <= 57)             return { label: "Drizzle",           icon: "🌦" };
  if (code <= 67)             return { label: "Rain",              icon: "🌧" };
  if (code <= 77)             return { label: "Snow",              icon: "❄" };
  if (code <= 82)             return { label: "Rain Showers",      icon: "🌦" };
  if (code <= 94)             return { label: "Hail",              icon: "🌨" };
  return                             { label: "Thunderstorm",      icon: "⛈" };
}

function runCondition(
  temp: number,
  code: number
): { text: string; level: "good" | "ok" | "bad" } {
  if (code >= 95) return { text: "Lightning risk — skip it today",    level: "bad"  };
  if (code >= 51) return { text: "Wet out — grab a poncho",          level: "bad"  };
  if (temp >= 36) return { text: "Hot — push start to before 06:30", level: "bad"  };
  if (temp >= 32) return { text: "Warm — hydrate early",             level: "ok"   };
  if (temp < 28)  return { text: "Prime running conditions",         level: "good" };
  return                  { text: "Good conditions",                  level: "good" };
}

export async function getBangkokWeather(): Promise<WeatherSummary | null> {
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast" +
      "?latitude=13.7563&longitude=100.5018" +
      "&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code" +
      "&timezone=Asia%2FBangkok&forecast_days=1";

    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) return null;

    const data = await res.json();
    const c = data.current;

    const { label, icon } = parseCode(c.weather_code);
    const { text, level } = runCondition(c.temperature_2m, c.weather_code);

    return {
      temp:             Math.round(c.temperature_2m),
      feelsLike:        Math.round(c.apparent_temperature),
      humidity:         c.relative_humidity_2m,
      windKmh:          Math.round(c.wind_speed_10m),
      label,
      icon,
      runCondition:     text,
      runConditionLevel: level,
    };
  } catch {
    return null;
  }
}
