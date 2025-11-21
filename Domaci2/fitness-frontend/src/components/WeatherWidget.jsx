// src/components/WeatherWidget.jsx
import { useWeather } from "../hooks/useWeather";

// Jednostavan vidžet za prikaz vremenske prognoze za dati grad
export default function WeatherWidget() {
  const {
    city,
    setCity,
    weather,
    loading,
    error,
    fetchWeather,
  } = useWeather("Belgrade");

  const handleSubmit = async (e) => {
    e?.preventDefault();
    await fetchWeather();
  };

  return (
    <section className="section container">
      <h2 style={{ marginTop: 0, marginBottom: 12 }}>Vremenska prognoza</h2>

      <form className="card" onSubmit={handleSubmit} style={{ padding: 16 }}>
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
        {error && <p style={{ color: "#ff6b6b", margin: 0 }}>{error}</p>}

        {!error && loading && <p style={{ margin: 0 }}>Učitavam…</p>}

        {!error && !loading && weather && (
          <div>
            <h3 style={{ marginTop: 0 }}>{weather.city}</h3>
            <p style={{ margin: "4px 0" }}>
              <b>Temperatura:</b> {weather.temperature}
            </p>
            <p style={{ margin: "4px 0" }}>
              <b>Vreme:</b> {weather.weather}
            </p>
            <p style={{ margin: "4px 0" }}>
              <b>Vlažnost:</b> {weather.humidity}
            </p>
            <p style={{ margin: "4px 0" }}>
              <b>Vetar:</b> {weather.wind_speed}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
