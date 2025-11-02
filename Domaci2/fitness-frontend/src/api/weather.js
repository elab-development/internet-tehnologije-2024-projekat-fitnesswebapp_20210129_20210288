// src/api/weather.js
import { api } from "./client";

// Backend ruta: GET /api/weather/{city}
export async function getWeather(city) {
  const c = encodeURIComponent((city || "").trim());
  if (!c) throw new Error("Grad nije prosleđen.");
  const { data } = await api.get(`/weather/${c}`);
  // Očekujemo: { city, temperature, weather, humidity, wind_speed }
  return {
    city: data.city ?? "",
    temperature: data.temperature ?? "",
    weather: data.weather ?? "",
    humidity: data.humidity ?? "",
    wind_speed: data.wind_speed ?? "",
    _raw: data, 
  };
}
