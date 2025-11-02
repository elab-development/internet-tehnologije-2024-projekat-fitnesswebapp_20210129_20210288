// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/ui/Modal";

export default function Home() {
  const { user } = useAuth();

  /* ---------- Welcome modal (po želji prikaz na svakom ulazu) ---------- */
  const [showWelcome, setShowWelcome] = useState(true);

  /* ---------- Kontakt forma ----------- */
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // modali za kontakt
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // helper - ciscenje forme
  const resetContact = () => {
    setFullName("");
    setEmail("");
    setMessage("");
  };

  // submit forme => ne šaljemo na backend, otvaramo confirm modal / NIJE POVEZANO SA BACKENDOM
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  // klik na “Da, pošalji”
  const confirmSend = () => {
    setShowConfirm(false);
    resetContact();
    setShowSuccess(true);
  };

  // klik na “Ne, odustani”
  const cancelSend = () => {
    setShowConfirm(false);
    resetContact();
  };

  return (
    <div className="page">
      {/* ---------- WELCOME MODAL ---------- */}
      <Modal open={showWelcome} title="PAŽNJA!" onClose={() => setShowWelcome(false)}>
        <p>
          Zbog radova na održavanju sajta, neke funkcionalnosti možda neće raditi ispravno.
          Hvala na razumevanju!
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
          <button className="btn" onClick={() => setShowWelcome(false)}>OK</button>
        </div>
      </Modal>

      {/* ---------- CONFIRM MODAL ZA KONTAKT ---------- */}
      <Modal
        open={showConfirm}
        title="Potvrda slanja poruke"
        onClose={() => setShowConfirm(false)}
      >
        <div className="card" style={{ padding: 12, marginBottom: 12 }}>
          <p style={{ margin: 0, opacity: 0.85 }}>
            Molimo proverite podatke pre slanja:
          </p>
          <div className="hr" />
          <p style={{ margin: "6px 0" }}>
            <b>Ime i prezime:</b> {fullName || <i>(nije uneto)</i>}
          </p>
          <p style={{ margin: "6px 0" }}>
            <b>Email:</b> {email || <i>(nije uneto)</i>}
          </p>
          <p style={{ margin: "6px 0" }}>
            <b>Poruka:</b> {message || <i>(nije uneto)</i>}
          </p>
        </div>

        <p style={{ marginTop: 0 }}>Da li želite da pošaljete ove podatke?</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button className="btn btn-outline" onClick={cancelSend}>Ne, odustani</button>
          <button className="btn" onClick={confirmSend}>Da, pošalji</button>
        </div>
      </Modal>

      {/* ---------- SUCCESS MODAL ZA KONTAKT ---------- */}
      <Modal
        open={showSuccess}
        title="Poruka poslata"
        onClose={() => setShowSuccess(false)}
      >
        <p>Vaša poruka je uspešno prosleđena našem timu. Odgovorićemo u najkraćem roku.</p>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
          <button className="btn" onClick={() => setShowSuccess(false)}>Super, hvala</button>
        </div>
      </Modal>

      {/* ---------- UVOD CONTAINER ---------- */}
      <header className="intro container">
        <h1>Rebel Fitness</h1>
        <p className="lead">
          Dobrodošli u Rebel Fitness aplikaciju! Ova platforma je osmišljena da vam pomogne
          u praćenju i planiranju vaših treninga, bilo da ste početnik ili iskusni sportista.
          Kreirajte nalog, birajte ulogu (member/admin), ili jednostavno uđite kao <i>gost</i> i istražite funkcionalnosti.
        </p>

        <div className="hero-actions">
          {!user ? (
            <>
              <Link className="btn" to="/login">Uloguj se ili nastavi kao gost</Link>
              <a
                className="btn btn-outline"
                href="https://github.com/elab-development/internet-tehnologije-2024-projekat-fitnesswebapp_20210129_20210288"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </>
          ) : (
            <>
              <Link className="btn" to="/profile">Moj profil</Link>
              <Link className="btn btn-outline" to="/workouts/new">Dodaj workout</Link>
            </>
          )}
        </div>
      </header>

      {/* ---------- ŠTA APLIKACIJA RADI ---------- */}
      <section className="section container">
        <h2 style={{ marginTop: 0, marginBottom: 12 }}>Šta aplikacija radi</h2>
        <div className="grid-3">
          <article className="card">
            <h3>Profili i uloge</h3>
            <p>Pridružite se kao <b>član</b> ili <b>admin (trener)</b>. Guest ulaz omogućava brz pregled bez registracije.</p>
          </article>
          <article className="card">
            <h3>Planiranje treninga</h3>
            <p>Kreirajte workout sa nazivom, opisom, trajanjem i kalorijama.</p>
          </article>
          <article className="card">
            <h3>Fitnes dnevnik</h3>
            <p>Čuvajte sve svoje treninge na jednom mestu i pratite napredak tokom vremena.</p>
          </article>
        </div>
      </section>

      {/* ---------- KO SMO MI ---------- */}
      <section className="section container">
        <h2 style={{ marginTop: 0, marginBottom: 12 }}>Ko smo mi?</h2>
        <div className="card">
          <p style={{ marginTop: 0 }}>
            <b>Rebel Labs</b> je mali tim zaljubljenika u trening i tehnologiju. Osnovani smo 2025. godine u Beogradu.
            Naša misija je da spojimo jednostavan korisnički doživljaj sa realnim potrebama vežbača i trenera.
          </p>
          <div className="hr" />
          <p style={{ marginBottom: 0 }}>
            Zašto baš mi? Slušamo korisnike i pravimo alat koji ne komplikuje — već <b>radi</b>.
          </p>
        </div>
      </section>

      {/* ---------- KONTAKT (DEMO) ---------- */}
      <section className="section container">
        <h2 style={{ marginTop: 0, marginBottom: 12 }}>Kontakt</h2>

        <form className="form card" onSubmit={handleContactSubmit}>
          <div className="contact-grid">
            <div className="field">
              <label htmlFor="fullName">Ime i prezime</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Vaše ime"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="message">Poruka</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Napišite nam kratak opis..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn">Pošalji poruku</button>
          </div>
        </form>
      </section>
    </div>
  );
}
