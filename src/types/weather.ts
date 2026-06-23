export interface CurrentWeather {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}

export interface WeatherSummary {
  temp: number;
  feelsLike: number;
  humidity: number;
  windKmh: number;
  label: string;
  runCondition: string;
  runConditionLevel: "good" | "ok" | "bad";
  icon: string;
}
