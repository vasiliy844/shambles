import { describe, it, expect } from "vitest";
import { TEMPLATES } from "../grammar";
import { generateSentence } from "../generator";

describe("TEMPLATES", () => {
  it("не пустой", () => {
    expect(TEMPLATES.length).toBeGreaterThan(0);
  });

  it("каждый шаблон содержит хотя бы один слот-подлежащее или глагол", () => {
    for (const template of TEMPLATES) {
      const hasVerb = template.some((p) => p.kind === "verb");
      expect(hasVerb).toBe(true);
    }
  });

  it("каждый шаблон заканчивается точкой", () => {
    for (const template of TEMPLATES) {
      const last = template[template.length - 1];
      expect(last).toBeDefined();
      if (last?.kind !== "literal") {
        throw new Error("Шаблон не заканчивается литералом");
      }
      expect(last.value.endsWith(".")).toBe(true);
    }
  });

  it("в каждом шаблоне есть хотя бы один noun", () => {
    for (const template of TEMPLATES) {
      const hasNoun = template.some((p) => p.kind === "noun");
      expect(hasNoun).toBe(true);
    }
  });
});

describe("грамматика сгенерированных предложений", () => {
  it("начинается с заглавной буквы", () => {
    for (let i = 0; i < 200; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i * 13 });
      expect(text[0]).toBe(text[0]?.toUpperCase());
    }
  });

  it("содержит ровно одну точку в конце", () => {
    for (let i = 0; i < 200; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i * 17 });
      expect(text.endsWith(".")).toBe(true);
      expect(text.endsWith("..")).toBe(false);
    }
  });

  it("не содержит двойных пробелов и пробелов перед точкой", () => {
    for (let i = 0; i < 200; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i * 19 });
      expect(text).not.toMatch(/\s{2,}/);
      expect(text).not.toMatch(/\s\./);
    }
  });

  it("каждое слово после первого — либо строчное, либо метрика", () => {
    for (let i = 0; i < 200; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i * 23 });
      const words = text.split(/\s+/).slice(1);
      for (const w of words) {
        const clean = w.replace(/[.,]/g, "");
        if (!clean) continue;
        if (/[A-Za-z]/.test(clean)) continue;
        expect(clean[0]).toBe(clean[0]?.toLowerCase());
      }
    }
  });

  it("одинаковый seed даёт одинаковую грамматику", () => {
    for (let i = 0; i < 50; i++) {
      const a = generateSentence(i % TEMPLATES.length, { seed: 777 });
      const b = generateSentence(i % TEMPLATES.length, { seed: 777 });
      expect(a.text).toBe(b.text);
    }
  });
});

describe("согласование подлежащего и глагола", () => {
  it("глагол в единственном числе, если подлежащее единственное", () => {
    // находим seed, где подлежащее единственного числа, и проверяем глагол
    // (для простоты — прогоняем много seed-ов и смотрим, что нет «платформа оптимизируют»)
    const badPatterns = [
      /\b(платформа|экосистема|синергия|возможность|компетенция|инновация|инфраструктура)\s+оптимизируют\b/,
      /\b(платформа|экосистема|синергия|возможность|компетенция|инновация|инфраструктура)\s+трансформируют\b/,
    ];
    for (let i = 0; i < 500; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i * 31 });
      for (const pattern of badPatterns) {
        expect(text).not.toMatch(pattern);
      }
    }
  });

  it("прилагательное согласуется с родом подлежащего (нет «платформа инновационный»)", () => {
    const badPatterns = [
      /\bплатформа\s+инновационный\b/,
      /\bплатформа\s+комплексный\b/,
      /\bсинергия\s+гибкий\b/,
      /\bрешение\s+инновационная\b/,  // решение — ср. род
    ];
    for (let i = 0; i < 500; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i * 37 });
      for (const pattern of badPatterns) {
        expect(text).not.toMatch(pattern);
      }
    }
  });
});

describe("согласование прилагательного и существительного", () => {
  /**
   * Ловит случаи, когда прилагательное во множественном числе
   * примыкает к существительному в единственном (и наоборот).
   */
  const MISMATCHES: readonly RegExp[] = [
    // мн. прил. + ед. сущ.
    /\b(комплексные|инновационные|гибкие|прозрачные|устойчивые|прорывные|масштабируемые|клиентоориентированные)\s+(инфраструктура|платформа|экосистема|синергия|возможность|компетенция|инновация|решение|подход|процесс|опыт|вектор)\b/,
    // ед. прил. + мн. сущ.
    /\b(комплексная|инновационная|гибкая|прозрачная|устойчивая|прорывная|масштабируемая|клиентоориентированная|комплексный|инновационный|гибкий|прозрачный|устойчивый|прорывной|масштабируемый|клиентоориентированный|комплексное|инновационное|гибкое|прозрачное|устойчивое|прорывное|масштабируемое|клиентоориентированное)\s+(решения|платформы|экосистемы|подходы|процессы|синергии|возможности|компетенции|инновации|инфраструктуры|опыты|векторы)\b/,
  ];

  it("нет рассогласования числа между прилагательным и существительным", () => {
    for (let i = 0; i < 500; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i * 41 });
      for (const pattern of MISMATCHES) {
        expect(text).not.toMatch(pattern);
      }
    }
  });

  it("нет рассогласования рода: прилагательное ж.р. при сущ. м.р. и наоборот", () => {
    const badPatterns: readonly RegExp[] = [
      // ж.р. прил. + м.р. сущ.
      /\b(комплексная|инновационная|гибкая|прозрачная|устойчивая|прорывная|масштабируемая|клиентоориентированная)\s+(подход|процесс|опыт|вектор|решение)\b/,
      // м.р. прил. + ж.р. сущ.
      /\b(комплексный|инновационный|гибкий|прозрачный|устойчивый|прорывной|масштабируемый|клиентоориентированный)\s+(платформа|экосистема|синергия|возможность|компетенция|инновация|инфраструктура)\b/,
      // ср.р. прил. + ж.р./м.р. сущ.
      /\b(комплексное|инновационное|гибкое|прозрачное|устойчивое|прорывное|масштабируемое|клиентоориентированное)\s+(платформа|подход|процесс|вектор|инфраструктура)\b/,
    ];
    for (let i = 0; i < 500; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i * 43 });
      for (const pattern of badPatterns) {
        expect(text).not.toMatch(pattern);
      }
    }
  });

  it("согласование стабильно на большом количестве seed-ов", () => {
    // Проверяем 2000 итераций — если баг вероятностный, он всплывёт.
    for (let i = 0; i < 2000; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i * 7919 });
      for (const pattern of MISMATCHES) {
        expect(text).not.toMatch(pattern);
      }
    }
  });
});

describe("падежи", () => {
  it("объект всегда в винительном падеже", () => {
    // Если объект в винительном, форма должна совпадать с ожидаемой.
    // Проверяем через конкретные примеры: «формируем платформу», не «формируем платформа».
    const badPatterns = [
      /\b(формируем|оптимизируем|трансформируем|интегрируем|переосмысляем|синхронизируем|масштабируем)\s+платформа\b/,
      /\b(формирует|оптимизирует|трансформирует|интегрирует|переосмысляет|синхронизирует|масштабирует)\s+платформа\b/,
      /\bформируем\s+инновация\b/,
      /\bоптимизируем\s+инновация\b/,
    ];
    for (let i = 0; i < 500; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i * 53 });
      for (const pattern of badPatterns) {
        expect(text).not.toMatch(pattern);
      }
    }
  });

  it("подлежащее всегда в именительном падеже", () => {
    // «Наша платформа», не «Наша платформы» или «Наша платформу».
    const badPatterns = [
      /\bНаша\s+(платформы|платформу|платформой|платформе)\b/,
    ];
    for (let i = 0; i < 500; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i * 59 });
      for (const pattern of badPatterns) {
        expect(text).not.toMatch(pattern);
      }
    }
  });

  it("глагол в 1-м лице при местоимении «мы»", () => {
    const badPatterns = [
      /\bМы\s+(формирует|оптимизирует|трансформирует|интегрирует|переосмысляет|синхронизирует|масштабирует)\b/,
      /\bМы\s+(формируют|оптимизируют|трансформируют|интегрируют|переосмысляют|синхронизируют|масштабируют)\b/,
    ];
    for (let i = 0; i < 500; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i * 61 });
      for (const pattern of badPatterns) {
        expect(text).not.toMatch(pattern);
      }
    }
  });
});

describe("согласование притяжательного местоимения с подлежащим", () => {
  /**
   * Притяжательное должно совпадать с подлежащим по роду и числу:
   *   наша платформа, наше решение, наш подход, наши платформы.
   *
   * Ловим:
   *   - ж.р. при м./ср. сущ.   («наша решение», «наша подход»)
   *   - м.р. при ж./ср. сущ.   («наш платформа», «наш решение»)
   *   - ср.р. при ж./м. сущ.   («наше платформа», «наше подход»)
   *   - мн. при ед. сущ.       («наши платформа»)
   *   - ед. при мн. сущ.       («наша платформы», «наше решения», «наш подходы»)
   */
  const MISMATCHES: readonly RegExp[] = [
    // ж.р. при м./ср.
    /\bНаша\s+(решение|подход|процесс|вектор|опыт)\b/,
    // м.р. при ж./ср.
    /\bНаш\s+(платформа|экосистема|инновация|инфраструктура|решение)\b/,
    // ср.р. при ж./м.
    /\bНаше\s+(платформа|экосистема|инновация|инфраструктура|подход|процесс|вектор|опыт)\b/,
    // мн. при ед.
    /\bНаши\s+(платформа|экосистема|инновация|инфраструктура|решение|подход|процесс|вектор|опыт)\b/,
    // ед. при мн. (все три рода)
    /\b(Наша|Наш|Наше)\s+(платформы|экосистемы|инновации|инфраструктуры|решения|подходы|процессы|векторы|опыты)\b/,
  ];

  it("притяжательное согласовано с подлежащим по роду и числу", () => {
    for (let i = 0; i < 500; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i * 67 });
      for (const pattern of MISMATCHES) {
        expect(text).not.toMatch(pattern);
      }
    }
  });

  it("согласование притяжательного стабильно на большом количестве seed-ов", () => {
    for (let i = 0; i < 2000; i++) {
      const { text } = generateSentence(i % TEMPLATES.length, { seed: i * 7919 });
      for (const pattern of MISMATCHES) {
        expect(text).not.toMatch(pattern);
      }
    }
  });
});