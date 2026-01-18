import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginGreeting() {
  const { user, showWelcome, setShowWelcome } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showWelcome && user) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setShowWelcome(false), 500); // Wait for fade out
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome, user, setShowWelcome]);

  if (!showWelcome || !user) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "-100px"})`,
        backgroundColor: "#10b981",
        color: "white",
        padding: "16px 32px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 9999,
        fontSize: "16px",
        fontWeight: "500",
        opacity: visible ? 1 : 0,
        transition: "all 0.5s ease-in-out",
        pointerEvents: "none",
      }}
    >
      Dobrodošli, {user.name}!
    </div>
  );
}
