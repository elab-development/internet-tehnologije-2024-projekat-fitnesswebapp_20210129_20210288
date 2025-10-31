// Jedno polje za unos koje koristimo svuda (email, password, number, text...)
// - prikazuje label i helper/error poruku
// - prosleđujemo sve klasične props (value, onChange, type, placeholder...)

export default function TextInput({
  label,
  error,
  helper,
  className = "",
  ...rest
}) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="block mb-1 text-sm text-gray-700">{label}</span>
      )}
      <input
        className={`w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500`}
        {...rest}
      />
      {error ? (
        <span className="block mt-1 text-xs text-red-600">{error}</span>
      ) : helper ? (
        <span className="block mt-1 text-xs text-gray-500">{helper}</span>
      ) : null}
    </label>
  );
}
