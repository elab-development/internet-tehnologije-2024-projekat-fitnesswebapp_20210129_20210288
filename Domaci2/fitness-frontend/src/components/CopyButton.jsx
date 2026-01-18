import { useState } from "react";

export default function CopyButton({ textToCopy, label = "Kopiraj" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
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
        backgroundColor: copied ? "#10b981" : undefined,
        color: copied ? "white" : undefined,
        borderColor: copied ? "#10b981" : undefined,
      }}
    >
      {copied ? "Kopirano!" : label}
    </button>
  );
}
