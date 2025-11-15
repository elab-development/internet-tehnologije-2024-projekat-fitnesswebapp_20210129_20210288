// src/components/ui/Card.jsx

export default function Card({ title, children, style, className = "" }) {
    return (
        <div className={`card${className ? " " + className : ""}`} style={style}>
            {title && <h3 style={{ marginTop: 0, marginBottom: 8 }}>{title}</h3>}
            {children}
        </div>
    );
}
