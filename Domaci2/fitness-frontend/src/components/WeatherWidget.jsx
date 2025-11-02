// src/components/WeatherWidget.jsx
import { useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { getWeather } from "../api/weather";

export default function WeatherWidget() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [wx, setWx] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(""); setWx(null);
    if (!city.trim()) return setErr("Unesi naziv grada.");
    try {
      setLoading(true);
      const data = await getWeather(city.trim());
      setWx(data);
    } catch {
      setErr("Ne mogu da dohvatim vreme. Proveri server ili naziv grada.");
    } finally {
      setLoading(false);
    }
  };

  // pokušaj da “lepo” prikažemo, a fallback je raw JSON
  const pretty = wx && (wx.main || wx.weather || wx.temp || wx.city);

  return (
    <section className="section container">
      <h2 style={{ marginTop: 0, marginBottom: 12 }}>Vremenska prognoza</h2>
      <Card>
        <form onSubmit={submit} className="form">
          <div className="contact-grid">
            <div className="field">
              <label>Grad</label>
              <input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="npr. Beograd" />
            </div>
          </div>
          {err && <p style={{ color:"#ff6b6b", marginTop: 6 }}>{err}</p>}
          <div className="form-actions">
            <Button type="submit" disabled={loading}>
              {loading ? "Učitavam..." : "Prikaži vreme"}
            </Button>
          </div>
        </form>

        {wx && (
          <div style={{ marginTop: 12 }}>
            {pretty ? (
              <>
                <p style={{ margin: 0, opacity: .85 }}>
                  <b>{wx.city ?? wx.name ?? city}</b>
                </p>
                {"temp" in wx ? <p>Temperatura: {wx.temp}°C</p> : null}
                {wx.main?.temp && <p>Temperatura: {Math.round(wx.main.temp)}°C</p>}
                {wx.weather?.[0]?.description && <p>Opis: {wx.weather[0].description}</p>}
                {wx.main?.humidity && <p>Vlažnost: {wx.main.humidity}%</p>}
              </>
            ) : (
              <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                {JSON.stringify(wx, null, 2)}
              </pre>
            )}
          </div>
        )}
      </Card>
    </section>
  );
}
