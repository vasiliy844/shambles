// lib/nonsense/types.ts

export type Gender = "m" | "f" | "n";

export type Case = "nom" | "gen" | "dat" | "acc" | "ins" | "prep";

export type Number = "singular" | "plural";

/** Формы слова по падежам. Все шесть — обязательны, если слово используется во всех падежах. */
export interface CaseForms {
  readonly nom: string;
  readonly gen: string;
  readonly dat: string;
  readonly acc: string;
  readonly ins: string;
  readonly prep: string;
}

/** Существительное: формы по числам, каждая — по падежам. */
export interface NounForms {
  readonly gender: Gender;
  readonly singular: CaseForms;
  readonly plural: CaseForms;
}

/** Притяжательное местоимение. */
export interface PossessiveForms {
  readonly m: CaseForms;      // наш
  readonly f: CaseForms;      // наша
  readonly n: CaseForms;      // наше
  readonly plural: CaseForms; // наши
}


/** Прилагательное: формы по родам и числам, каждая — по падежам. */
export interface AdjectiveForms {
  readonly m: CaseForms;
  readonly f: CaseForms;
  readonly n: CaseForms;
  readonly plural: CaseForms;
}

export interface VerbForms {
  readonly singularPresent: string;
  readonly pluralPresent: string;
  readonly firstPersonPresent: string; // ← для «мы делаем»
  readonly singularPast: string;
  readonly pluralPast: string;
  readonly firstPersonPast: string;
}

export type MetricType =
  | "percentage"
  | "multiplier"
  | "mode"
  | "rank"
  | "abbreviation";

export type Pronoun = "we" | "they" | "it";

export type TemplatePart =
  | { kind: "literal"; value: string }
  | { kind: "pronoun"; person: Pronoun }
  | { kind: "possessive" }     // ← новый слот
  | { kind: "noun"; role: "subject" | "object" | "instrument"; case: Case }
  | { kind: "adjective" }
  | { kind: "verb"; tense: "present" | "past" }
  | { kind: "adverb" }
  | { kind: "metric"; type: MetricType };

export type Template = readonly TemplatePart[];

export interface RenderContext {
  readonly subjectPlural: boolean;
  readonly subjectGender: Gender;
  readonly subjectPerson: "first" | "third"; // ← для согласования глагола
}

export interface GeneratedSentence {
  readonly text: string;
  readonly templateId: string;
  readonly seed: number;
}

export interface GenerateOptions {
  seed?: number;
  seedKey?: string;
}

