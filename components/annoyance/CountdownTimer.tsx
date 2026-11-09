// components/annoyance/CountdownTimer.tsx
"use client";

import { useEffect, useState } from "react";

const INITIAL_SECONDS = 10 * 60; // 10 минут

export function CountdownTimer() {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [visible, setVisible] = useState(false);

  // Показываем таймер через 5 секунд после загрузки страницы
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Логика отсчета
  useEffect(() => {
    if (!visible) return;
    
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Когда время вышло — сбрасываем на 10 минут.
          // Это сатира: акция никогда не заканчивается.
          return INITIAL_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 80, // Чуть выше cookie-баннера
        right: 16,
        background: "#d32f2f",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 9998,
        fontFamily: "monospace",
        border: "2px solid #fff",
      }}
      role="timer"
      aria-live="polite"
    >
      <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, opacity: 0.9 }}>
        Горячее предложение!
      </div>
      <div style={{ fontSize: 28, fontWeight: "bold", margin: "4px 0" }}>
        {formatted}
      </div>
      <div style={{ fontSize: 11, textAlign: "center", maxWidth: 140, opacity: 0.8 }}>
        Успейте оформить заявку!
      </div>
    </div>
  );
}