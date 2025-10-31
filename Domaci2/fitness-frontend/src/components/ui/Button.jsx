// Minimalni, višekratni <Button />
// - varijante: primary, outline, ghost
// - prima disabled, loading i bilo koji onClick/onSubmit props

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition";
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed",
    outline:
      "border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
    ghost:
      "hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? "..." : children}
    </button>
  );
}
