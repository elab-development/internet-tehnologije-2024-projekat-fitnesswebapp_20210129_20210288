// src/components/ui/Modal.jsx

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-panel">
        <div className="modal-head">
          <h4>{title}</h4>
          <button className="modal-close" onClick={onClose} aria-label="Zatvori">✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
