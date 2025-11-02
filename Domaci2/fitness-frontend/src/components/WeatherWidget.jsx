// src/components/WeatherWidget.jsx
import { useState } from "react";
import { getWeather } from "../api/weather";

export default function WeatherWidget() {
  const [city, setCity] = useState("Belgrade");
  const [w, setW] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchWeather = async (e) => {
    e?.preventDefault();
    setErr("");
    setLoading(true);
    setW(null);
    try {
      const data = await getWeather(city);
      setW(data);
    } catch (e) {
      setErr("Ne mogu da dohvatim prognozu. Proveri /api/weather/{city} i CORS.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section container">
      <h2 style={{ marginTop: 0, marginBottom: 12 }}>Vremenska prognoza</h2>

      <form className="card" onSubmit={fetchWeather} style={{ padding: 16 }}>
        <div className="field">
          <label>Grad</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="npr. Belgrade"
          />
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Učitavam..." : "Prikaži vreme"}
        </button>
      </form>

      <div className="card" style={{ padding: 16, marginTop: 12 }}>
        {err && <p style={{ color: "#ff6b6b", margin: 0 }}>{err}</p>}

        {!err && loading && <p style={{ margin: 0 }}>Učitavam…</p>}

        {!err && !loading && w && (
          <div>
            <h3 style={{ marginTop: 0 }}>{w.city}</h3>
            <p style={{ margin: "4px 0" }}>
              <b>Temperatura:</b> {w.temperature}
            </p>
            <p style={{ margin: "4px 0" }}>
              <b>Vreme:</b> {w.weather}
            </p>
            <p style={{ margin: "4px 0" }}>
              <b>Vlažnost:</b> {w.humidity}
            </p>
            <p style={{ margin: "4px 0" }}>
              <b>Vetar:</b> {w.wind_speed}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
