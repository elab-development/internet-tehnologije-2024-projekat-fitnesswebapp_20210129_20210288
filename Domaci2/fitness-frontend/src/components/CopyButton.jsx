import { useState } from "react";

export default function CopyButton({ textToCopy, label = "Kopiraj" }) {
  // State za praćenje da li je tekst kopiran (pokazuje feedback)
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Koristi Clipboard API da kopira tekst u clipboard
      await navigator.clipboard.writeText(textToCopy);
      // Prikaži "Kopirano!" poruku
      setCopied(true);
      // Resetuj poruku posle 2 sekunde
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="btn btn-outline"
      style={{
        // Promeni boju u zeleno kada je kopirano
        backgroundColor: copied ? "#10b981" : undefined,
        color: copied ? "white" : undefined,
        borderColor: copied ? "#10b981" : undefined,
      }}
    >
      {/* Dinamički tekst dugmeta: "Kopirano!" ili custom label */}
      {copied ? "Kopirano!" : label}
    </button>
  );
}
