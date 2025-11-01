// Skelet za modal
// TRENUTNO NIJE U UPOTREBI

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
      <div className="w-[min(520px,95vw)] rounded-xl bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold">{title}</h4>
          <button onClick={onClose} aria-label="Close">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
