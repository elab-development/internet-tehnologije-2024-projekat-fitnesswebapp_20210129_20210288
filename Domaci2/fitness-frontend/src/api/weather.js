import { api } from "./client";

export async function getWeather(city) {
  const { data } = await api.get(`/weather/${encodeURIComponent(city)}`);
  return data;
}