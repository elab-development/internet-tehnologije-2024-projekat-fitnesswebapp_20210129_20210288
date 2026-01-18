// CUSTOM HOOK ZA VREMENSKU PROGNOZU

// src/hooks/useWeather.js
import { useState, useCallback } from "react";
import { getWeather } from "../api/weather";

/**
 * Custom hook za rad sa vremenskom prognozom.
 * Brine o stanju: grad, rezultat, loading i error,
 * i vraća fetchWeather funkciju koju komponente mogu da pozovu.
 *
 * @param {string} initialCity - početni grad
 * @returns {{
 *   city: string,
 *   setCity: (v: string) => void,
 *   weather: null | {
 *     city: string,
 *     temperature: string,
 *     weather: string,
 *     humidity: string,
 *     wind_speed: string
 *   },
 *   loading: boolean,
 *   error: string,
 *   fetchWeather: (cityOverride?: string) => Promise<void>
 * }}
 */
export function useWeather(initialCity = "Belgrade") {
    const [city, setCity] = useState(initialCity);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchWeather = useCallback(
        async (cityOverride) => {
            const queryCity = (cityOverride ?? city ?? "").trim();

            if (!queryCity) {
                setError("Grad je obavezan.");
                setWeather(null);
                return;
            }

            setError("");
            setLoading(true);
            setWeather(null);

            try {
                const data = await getWeather(queryCity);
                setWeather(data);
            } catch (e) {
                setError("Ne mogu da dohvatim prognozu. Proveri /api/weather/{city} i CORS.");
            } finally {
                setLoading(false);
            }
        },
        [city]
    );

    return {
        city,
        setCity,
        weather,
        loading,
        error,
        fetchWeather,
    };
}
