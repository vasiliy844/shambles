// components/annoyance/useEscapeBehavior.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface EscapeState {
  offset: { x: number; y: number };
  escapes: number;
  /** Сколько раз подряд кнопка не смогла сдвинуться. */
  stuckCount: number;
  surrendered: boolean;
}

interface Options {
  maxEscapes?: number;
  radius?: number;
  jump?: number;
  margin?: number;
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Сколько «застреваний» подряд терпим, прежде чем сдаться. */
  maxStuck?: number;
}

const INITIAL: EscapeState = {
  offset: { x: 0, y: 0 },
  escapes: 0,
  stuckCount: 0,
  surrendered: false,
};

export function useEscapeBehavior(options: Options = {}) {
  const {
    maxEscapes = 100,
    radius = 80,
    jump = 120,
    margin = 16,
    containerRef,
    maxStuck = 3,
  } = options;

  const [state, setState] = useState<EscapeState>(INITIAL);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (reducedMotion) return;
      if (state.surrendered) return;

      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const distance = Math.hypot(dx, dy);

      if (distance > radius) return;

      const container = containerRef?.current ?? null;
      const bounds = container
        ? container.getBoundingClientRect()
        : {
            left: 0,
            top: 0,
            right: window.innerWidth,
            bottom: window.innerHeight,
          };

      const minX = bounds.left + margin - rect.left;
      const maxX = bounds.right - margin - rect.width - rect.left;
      const minY = bounds.top + margin - rect.top;
      const maxY = bounds.bottom - margin - rect.height - rect.top;

      const clamp = (v: number, min: number, max: number) =>
        Math.max(min, Math.min(max, v));

      // Основное направление: от курсора.
      const baseAngle = Math.atan2(dy, dx);

      // Пробуем несколько углов: основной, ±45°, ±90°, ±135°, противоположный.
      // Это даёт кнопке шанс уйти вбок, если «прямо» упёрлась в стену.
      const angles = [
        baseAngle,
        baseAngle + Math.PI / 4,
        baseAngle - Math.PI / 4,
        baseAngle + Math.PI / 2,
        baseAngle - Math.PI / 2,
        baseAngle + (3 * Math.PI) / 4,
        baseAngle - (3 * Math.PI) / 4,
        baseAngle + Math.PI,
      ];

      let chosen: { x: number; y: number } | null = null;
      let bestDistance = 0;

      for (const angle of angles) {
        const px = state.offset.x - Math.cos(angle) * jump;
        const py = state.offset.y - Math.sin(angle) * jump;
        const cxClamped = clamp(px, minX, maxX);
        const cyClamped = clamp(py, minY, maxY);
        const moved = Math.hypot(
          cxClamped - state.offset.x,
          cyClamped - state.offset.y,
        );
        // Выбираем направление, которое даёт максимальное смещение.
        if (moved > bestDistance) {
          bestDistance = moved;
          chosen = { x: cxClamped, y: cyClamped };
        }
      }

      // Если ни одно направление не дало смещения > 1px — кнопка реально загнана.
      const stuck = bestDistance < 1;
      const stuckCount = stuck ? state.stuckCount + 1 : 0;

      const escapes = state.escapes + 1;
      const surrendered =
        stuckCount >= maxStuck || escapes >= maxEscapes;

      setState({
        offset: chosen ?? state.offset,
        escapes,
        stuckCount,
        surrendered,
      });
    },
    [
      radius,
      jump,
      maxEscapes,
      maxStuck,
      margin,
      reducedMotion,
      state,
      containerRef,
    ],
  );

  useEffect(() => {
    if (state.surrendered || reducedMotion) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, state.surrendered, reducedMotion]);

  const reset = useCallback(() => setState(INITIAL), []);

  return {
    buttonRef,
    offset: state.offset,
    escapes: state.escapes,
    surrendered: state.surrendered,
    reset,
    reducedMotion,
  };
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}