// components/annoyance/EscapeModal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { EscapeButton } from "./EscapeButton";

export function EscapeModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setOpen(false)}
      style={{
        border: "none",
        borderRadius: 8,
        padding: 0,           // ← padding убираем с dialog
        maxWidth: 400,
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        // Явно ограничиваем overflow, чтобы кнопка не создавала скролл.
        overflow: "hidden",
      }}
      aria-labelledby="escape-modal-title"
    >
      {/* Внутренний контейнер с padding — он и будет границей для кнопки. */}
      <div
        ref={contentRef}
        style={{
          position: "relative",  // ← чтобы transform кнопки считался от него
          padding: 24,
        }}
      >
        <h2 id="escape-modal-title" style={{ marginTop: 0 }}>
          Подпишитесь на рассылку!
        </h2>
        <p>Мы будем присылать вам что-то. Регулярно.</p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "flex-end",
          }}
        >
          <EscapeButton
            onClick={() => setOpen(false)}
            maxEscapes={5}
            containerRef={contentRef}
          >
            Закрыть
          </EscapeButton>
          <button type="button" onClick={() => setOpen(false)}>
            Подписаться
          </button>
        </div>
      </div>
    </dialog>
  );
}