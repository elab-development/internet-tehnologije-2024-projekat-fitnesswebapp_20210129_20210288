// Višekratno dugme – tri varijante, lepo radi sa index.css klasama.
export default function Button({
  children,
  variant = "primary",   // primary | outline | ghost
  small = false,         // ako je u navbaru, možeš staviti small
  loading = false,
  className = "",
  ...rest
}) {
  const base = variant === "outline"
    ? "btn btn-outline"
    : variant === "ghost"
    ? "btn-ghost"
    : "btn";

  const size = small ? " btn-small" : "";

  return (
    <button
      className={`${base}${size}${className ? " " + className : ""}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? "..." : children}
    </button>
  );
}
