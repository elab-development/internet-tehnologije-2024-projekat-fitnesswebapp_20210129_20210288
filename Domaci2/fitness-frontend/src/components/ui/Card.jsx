// Generička kartica za grupisanje sadržaja (naslovi, forme, listovi...)

export default function Card({ title, children, className = "" }) {
  return (
    <div className={`rounded-xl border border-gray-200 p-5 shadow-sm bg-white ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      {children}
    </div>
  );
}
