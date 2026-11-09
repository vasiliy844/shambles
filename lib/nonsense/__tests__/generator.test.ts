import { describe, it, expect } from "vitest";
import { generateSentence, generateParagraph } from "../generator";
import { TEMPLATES } from "../grammar";

describe("generateSentence", () => {
  it("детерминирован при одинаковом seed", () => {
    const a = generateSentence(0, { seed: 42 });
    const b = generateSentence(0, { seed: 42 });
    expect(a.text).toBe(b.text);
    expect(a.seed).toBe(b.seed);
  });

  it("различается при разных seed", () => {
    const a = generateSentence(0, { seed: 1 });
    const b = generateSentence(0, { seed: 2 });
    expect(a.text).not.toBe(b.text);
  });

  it("не содержит двойных пробелов и пустых предложений", () => {
    for (let i = 0; i < 200; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i });
      expect(text).not.toMatch(/\s{2,}/);
      expect(text.length).toBeGreaterThan(0);
    }
  });

  it("всегда заканчивается точкой", () => {
    for (let i = 0; i < 100; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i * 7 });
      expect(text.endsWith(".")).toBe(true);
    }
  });

  it("не содержит латиницы в русских шаблонах (кроме метрик)", () => {
    const allowed = /^(99\.9%|10x|24\/7|№1|360°|B2B|B2C|SaaS)$/;
    for (let i = 0; i < 100; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i });
      const words = text.split(/\s+/);
      for (const w of words) {
        const clean = w.replace(/[.,]/g, "");
        if (/[A-Za-z]/.test(clean) && !allowed.test(clean)) {
          throw new Error(`Латиница вне метрик: "${clean}" в "${text}"`);
        }
      }
    }
  });
});

describe("generateParagraph", () => {
  it("возвращает ровно N предложений", () => {
    expect(generateParagraph(5, { seed: 1 })).toHaveLength(5);
  });

  it("детерминирован", () => {
    const a = generateParagraph(5, { seed: 99 }).map((s) => s.text);
    const b = generateParagraph(5, { seed: 99 }).map((s) => s.text);
    expect(a).toEqual(b);
  });
});