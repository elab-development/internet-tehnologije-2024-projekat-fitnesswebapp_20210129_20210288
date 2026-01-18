import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginGreeting() {
  // Uzmi podatke o korisniku i showWelcome flag iz AuthContext-a
  const { user, showWelcome, setShowWelcome } = useAuth();
  // Lokalni state za animaciju (fade in/out)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showWelcome && user) {
      // Prikaži pozdravnu poruku sa animacijom
      setVisible(true);
      const timer = setTimeout(() => {
        // Pokreni fade-out animaciju posle 5 sekundi
        setVisible(false);
        // Očisti showWelcome flag nakon završetka animacije
        setTimeout(() => setShowWelcome(false), 500);
      }, 5000);
      // Cleanup: obriši timer ako se komponenta unmount-uje
      return () => clearTimeout(timer);
    }
  }, [showWelcome, user, setShowWelcome]);

  // Ne prikazuj ništa ako nema showWelcome flag-a ili korisnika
  if (!showWelcome || !user) return null;

  return (
    <div
      style={{
        position: "fixed", // Fiksiraj na vrhu ekrana
        top: "20px",
        left: "50%",
        // Centriraj horizontalno i pomeri vertikalno za animaciju
        transform: `translateX(-50%) translateY(${visible ? "0" : "-100px"})`,
        backgroundColor: "#10b981", // Zelena boja
        color: "white",
        padding: "16px 32px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 9999, // Iznad svih drugih elemenata
        fontSize: "16px",
        fontWeight: "500",
        // Kontroliši providnost za fade in/out efekat
        opacity: visible ? 1 : 0,
        transition: "all 0.5s ease-in-out", // Smooth animacija
        pointerEvents: "none", // Ne blokira klikove ispod
      }}
    >
      Dobrodošli, {user.name}!
    </div>
  );
}
