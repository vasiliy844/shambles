// components/annoyance/EscapeButton.tsx
"use client";

import { useEscapeBehavior } from "./useEscapeBehavior";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  maxEscapes?: number;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export function EscapeButton({
  children,
  onClick,
  maxEscapes,
  containerRef,
}: Props) {
  const { buttonRef, offset, surrendered, reducedMotion } = useEscapeBehavior({
    maxEscapes,
    containerRef,
  });

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: reducedMotion ? "none" : "transform 150ms ease-out",
        opacity: surrendered ? 0.6 : 1,
        willChange: "transform",
        // Курсор меняется, когда кнопка сдалась — визуальный сигнал «теперь кликабельно».
        cursor: surrendered ? "pointer" : "default",
      }}
      aria-label={
        surrendered
          ? "Кнопка сдалась, можно нажать"
          : "Кнопка убегает, попробуйте ещё раз"
      }
      title={surrendered ? "Ладно, нажимай" : "Попробуй поймать"}
    >
      {children}
    </button>
  );
}