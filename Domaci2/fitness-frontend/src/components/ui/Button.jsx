// src/components/ui/Button.jsx

export default function Button({
  children,
  variant = "primary",   // primary | outline | ghost
  small = false,         // true | false
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
