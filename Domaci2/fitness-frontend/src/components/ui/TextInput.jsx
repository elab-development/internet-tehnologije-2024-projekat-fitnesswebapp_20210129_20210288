// src/components/ui/TextInput.jsx
// Jedinstveno polje za unos (label + input + helper/error)
export default function TextInput({
  label,
  error,
  helper,
  type = "text",
  className = "",
  ...rest
}) {
  return (
    <label className={`field${className ? " " + className : ""}`}>
      {label && <span>{label}</span>}
      <input type={type} {...rest} />
      {error ? (
        <span style={{ color: "#ff6b6b", fontSize: 12 }}>{error}</span>
      ) : helper ? (
        <span style={{ opacity: 0.7, fontSize: 12 }}>{helper}</span>
      ) : null}
    </label>
  );
}
