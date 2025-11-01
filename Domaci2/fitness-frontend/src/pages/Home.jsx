import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Card from "../components/ui/Card";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

export default function Home() {
    const { user } = useAuth();

    return (
        <div className="page">
            {/* Osnovno */}
            <header className="hero container">
                <h1>Reborn Fitness</h1>
                <p className="lead">
                    Dobrodošli u Reborn Fitness aplikaciju! Ova platforma je osmišljena da vam pomogne
                    u praćenju i planiranju vaših treninga, bilo da ste početnik ili iskusni sportista.
                    Kreirajte nalog, birajte ulogu (member/admin), ili jednostavno uđite kao <i>guest</i>
                    i istražite funkcionalnosti.
                </p>

                <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {!user ? (
                        <>
                            <Link className="btn" to="/login">Uloguj se ili nastavi kao gost</Link>
                            <a className="btn btn-outline" href="https://github.com/" target="_blank" rel="noreferrer">
                                Git repo (placeholder)
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

            {/* ŠTA APLIKACIJA RADI */}
            <section className="section container">
                <h2 style={{ marginTop: 0, marginBottom: 12 }}>Šta aplikacija radi</h2>
                <div className="grid-3">
                    <article className="card">
                        <h3>Profili i uloge</h3>
                        <p>
                            Pridružite se kao <b>član</b> ili <b>admin (trener)</b>. Guest ulaz vam omogućava
                            brz pregled aplikacije bez registracije.
                        </p>
                    </article>
                    <article className="card">
                        <h3>Planiranje treninga</h3>
                        <p>
                            Kreirajte workout sa nazivom, opisom, trajanjem i kalorijama.
                        </p>
                    </article>
                    <article className="card">
                        <h3>Fitnes dnevnik</h3>
                        <p>
                            Čuvajte sve svoje treninge na jednom mestu i pratite napredak tokom vremena.
                        </p>
                    </article>
                </div>
            </section>

            {/* KO SMO MI? */}
            <section className="section container">
                <h2 style={{ marginTop: 0, marginBottom: 12 }}>Ko smo mi?</h2>
                <div className="card">
                    <p style={{ marginTop: 0 }}>
                        <b>Reborn Labs</b> je mali tim zaljubljenika u trening i tehnologiju. Osnovani smo 2025. godine u Beogradu.
                        Naša misija je da spojimo jednostavan korisnički doživljaj sa realnim potrebama vežbača i trenera.
                        Ideja je da uz minimalan broj klikova možeš da isplaniraš trening, zabeležiš sesiju i
                        pregledaš rezultate. Ne komplikujemo — jednostavno radi!
                    </p>
                    <div className="hr" />
                    <p style={{ marginBottom: 0 }}>
                        Zašto baš mi?

                    </p>
                    <p>
                        - Zato što slušamo svoje korisnike i uvek ostavljamo prostor da prilagodiš aplikaciju svom ritmu treniranja.
                    </p>
                </div>
            </section>

            <section className="section container">
                <h2 style={{ marginTop: 0, marginBottom: 12 }}>Kontakt</h2>
                <ContactBox />
            </section>

        </div>
    );
}

function ContactBox() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  const reset = () => setErr("");

  const handleSend = (e) => {
    e.preventDefault();
    reset();

    // jednostavna validacija na frontu
    if (!name || !mail || !msg) {
      setErr("Popuni sva polja.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(mail)) {
      setErr("Email format nije dobar.");
      return;
    }

    // Nemamo backend endpoint za kontakt – ovde samo simuliramo slanje
    // i prikažemo modal kao potvrdu.
    setOk(true);
    setName("");
    setMail("");
    setMsg("");
  };

  return (
    <>
      <Card>
        <form onSubmit={handleSend}>
          <div className="form-grid">
            <TextInput
              label="Ime i prezime"
              placeholder="Vaše ime"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={reset}
              required
            />
            <TextInput
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              onFocus={reset}
              required
            />
          </div>

          <div style={{ marginTop: 10 }}>
            <TextInput
              label="Poruka"
              as="textarea"
              placeholder="Napišite nam kratak opis..."
              rows={5}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onFocus={reset}
              required
            />
          </div>

          {err && <p style={{ color: "#ff6b6b", marginTop: 8 }}>{err}</p>}

          <div style={{ marginTop: 12 }}>
            <Button type="submit">Pošalji poruku</Button>
          </div>
        </form>
      </Card>

      <Modal open={ok} onClose={() => setOk(false)} title="Hvala!">
        <p style={{ margin: 0 }}>
          Vaša poruka je zabeležena. Odgovorićemo vam na <b>{mail || "uneseni email"}</b>.
        </p>
      </Modal>
    </>
  );
}

