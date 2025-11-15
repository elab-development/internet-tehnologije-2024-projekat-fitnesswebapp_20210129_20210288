// src/components/ui/SelectInput.jsx
// Jednostavan <select> sa label-om, za role itd.
export default function SelectInput({ label, options = [], className = "", ...rest }) {
  return (
    <label className={`field${className ? " " + className : ""}`}>
      {label && <span>{label}</span>}
      <select
        {...rest}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "var(--fg)",
          padding: "10px 12px",
          borderRadius: 10,
          outline: "none",
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ color: "#111" }}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
