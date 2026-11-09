// lib/nonsense/grammar.ts
import type { Template } from "./types";

export const TEMPLATES: readonly Template[] = [
  // «Мы оптимизируем комплексные решения проактивно.»
  [
    { kind: "pronoun", person: "we" },
    { kind: "literal", value: " " },
    { kind: "verb", tense: "present" },
    { kind: "literal", value: " " },
    { kind: "adjective" },
    { kind: "noun", role: "object", case: "acc" },
    { kind: "literal", value: " " },
    { kind: "adverb" },
    { kind: "literal", value: "." },
  ],

  // «Наша платформа комплексно трансформирует подходы.»
  [
    { kind: "possessive" },
    { kind: "literal", value: " " },
    { kind: "noun", role: "subject", case: "nom" },
    { kind: "literal", value: " " },
    { kind: "adverb" },
    { kind: "literal", value: " " },
    { kind: "verb", tense: "present" },
    { kind: "literal", value: " " },
    { kind: "noun", role: "object", case: "acc" },
    { kind: "literal", value: "." },
  ],

  // «Мы проактивно переосмысляем компетенции.»
  [
    { kind: "pronoun", person: "we" },
    { kind: "literal", value: " " },
    { kind: "adverb" },
    { kind: "literal", value: " " },
    { kind: "verb", tense: "present" },
    { kind: "literal", value: " " },
    { kind: "noun", role: "object", case: "acc" },
    { kind: "literal", value: "." },
  ],

  // «Наша платформа оптимизирует прорывные решения с эффективностью 99.9%.»
  [
    { kind: "possessive" },
    { kind: "literal", value: " " },
    { kind: "noun", role: "subject", case: "nom" },
    { kind: "literal", value: " " },
    { kind: "verb", tense: "present" },
    { kind: "literal", value: " " },
    { kind: "adjective" },
    { kind: "noun", role: "object", case: "acc" },
    { kind: "literal", value: " с эффективностью " },
    { kind: "metric", type: "percentage" },
    { kind: "literal", value: "." },
  ],

  // «Мы интегрируем прорывные решения в режиме 24/7.»
  [
    { kind: "pronoun", person: "we" },
    { kind: "literal", value: " " },
    { kind: "verb", tense: "present" },
    { kind: "literal", value: " " },
    { kind: "adjective" },
    { kind: "noun", role: "object", case: "acc" },
    { kind: "literal", value: " в режиме " },
    { kind: "metric", type: "mode" },
    { kind: "literal", value: "." },
  ],
];