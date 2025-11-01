import { useEffect } from "react";

export default function SetTitle({ title }) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} – REBEL Fitness` : "REBEL Fitness";
    return () => { document.title = prev; }; 
  }, [title]);
  return null;
}
