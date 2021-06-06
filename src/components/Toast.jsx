import { useEffect } from "react";
import { createPortal } from "react-dom";
import { TrackedList } from "../modules/TrackedList";

export function Toast({ children }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  const markup = (
    <div className="trackedPortal">
      {children}
      <TrackedList></TrackedList>
    </div>
  );

  const portalRoot = document.getElementById("toast");

  return createPortal(markup, portalRoot);
}
