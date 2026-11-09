// components/annoyance/CookieBanner.tsx
"use client";

import { useEffect, useState } from "react";
import { COOKIE_LEVELS } from "./cookieLevels";

interface Props {
  /** Задержка перед показом первого баннера, мс. По умолчанию 1500. */
  delay?: number;
  /** Колбэк, когда пользователь принял. */
  onAccept?: (level: number) => void;
  /** Колбэк, когда баннер закрылся. */
  onClose?: () => void;
}

export function CookieBanner({ delay = 1500, onAccept, onClose }: Props) {
  const [level, setLevel] = useState(0);
  const [visible, setVisible] = useState(false);

  // Показываем первый баннер с задержкой, если пользователь ещё не принял.
  // localStorage доступен только в браузере, поэтому проверка — внутри useEffect.
  useEffect(() => {
    const saved = localStorage.getItem("cookie-consent");
    if (saved === "accepted") {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const current = COOKIE_LEVELS[level];
  if (!visible || !current) return null;

  const handleAccept = () => {
    // Сохраняем согласие. Отказ — НЕ сохраняем. Это сатира:
    // сайты «уважают» выбор, но запоминают только согласие.
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
    onAccept?.(level);
    onClose?.();
  };

  const handleDecline = () => {
    if (current.declineAction === "close") {
      setVisible(false);
      onClose?.();
      return;
    }
    // Переход на следующий уровень.
    setLevel((prev) => Math.min(prev + 1, COOKIE_LEVELS.length - 1));
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: current.background,
        borderTop: "2px solid #ccc",
        padding: "16px 24px",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
        transition: "background 300ms ease-out",
      }}
    >
      <div style={{ flex: "1 1 400px" }}>
        <strong
          id="cookie-banner-title"
          style={{ display: "block", marginBottom: 4 }}
        >
          {current.title}
        </strong>
        <span style={{ fontSize: 14, color: "#333" }}>{current.body}</span>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {current.declineLabel && (
          <button
            type="button"
            onClick={handleDecline}
            style={{
              padding: "8px 16px",
              border: "1px solid #999",
              background: "transparent",
              cursor: "pointer",
              borderRadius: 4,
            }}
          >
            {current.declineLabel}
          </button>
        )}
        <button
          type="button"
          onClick={handleAccept}
          style={{
            padding: "8px 16px",
            border: "none",
            background: "#0066cc",
            color: "white",
            cursor: "pointer",
            borderRadius: 4,
            fontWeight: 500,
          }}
        >
          {current.acceptLabel}
        </button>
      </div>
    </div>
  );
}