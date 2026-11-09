// lib/nonsense/generator.ts
import { NOUNS, ADJECTIVES, VERBS, ADVERBS, METRICS, POSSESSIVES } from "./lexicons";
import { TEMPLATES } from "./grammar";
import { createRng, pick, hashString } from "./rng";

import type {
  GeneratedSentence,
  GenerateOptions,
  RenderContext,
  Template,
  TemplatePart,
  NounForms,
  Pronoun,
  Gender,
  Case,
  AdjectiveForms,
  PossessiveForms,
  CaseForms 
} from "./types";

interface Prepared {
  readonly ctx: RenderContext;
  readonly subject: NounForms | null;
}

function pronounContext(person: Pronoun): {
  plural: boolean;
  gender: Gender;
  subjectPerson: "first" | "third";
} {
  switch (person) {
    case "we":   return { plural: true,  gender: "m", subjectPerson: "first" };
    case "they": return { plural: true,  gender: "m", subjectPerson: "third" };
    case "it":   return { plural: false, gender: "n", subjectPerson: "third" };
  }
}

/** Выбрать форму прилагательного по роду/числу/падежу. */
function declineAdjective(
  adj: AdjectiveForms,
  plural: boolean,
  gender: Gender,
  c: Case,
): string {
  if (plural) return adj.plural[c];
  switch (gender) {
    case "m": return adj.m[c];
    case "f": return adj.f[c];
    case "n": return adj.n[c];
  }
}

/** Выбрать форму существительного по числу/падежу. */
function declineNoun(noun: NounForms, plural: boolean, c: Case): string {
  return plural ? noun.plural[c] : noun.singular[c];
}

function prepare(template: Template, rng: () => number): Prepared {
  // Местоимение-подлежащее задаёт контекст.
  const pronounSlot = template.find(
    (p): p is Extract<TemplatePart, { kind: "pronoun" }> => p.kind === "pronoun",
  );
  if (pronounSlot) {
    const { plural, gender, subjectPerson } = pronounContext(pronounSlot.person);
    return {
      ctx: { subjectPlural: plural, subjectGender: gender, subjectPerson },
      subject: null,
    };
  }

  // Иначе — noun-subject.
  const subjectSlot = template.find(
    (p): p is Extract<TemplatePart, { kind: "noun" }> =>
      p.kind === "noun" && p.role === "subject",
  );
  if (!subjectSlot) {
    return {
      ctx: { subjectPlural: false, subjectGender: "m", subjectPerson: "third" },
      subject: null,
    };
  }

  const subject = pick(rng, NOUNS);
  const plural = rng() < 0.2;
  return {
    ctx: { subjectPlural: plural, subjectGender: subject.gender, subjectPerson: "third" },
    subject,
  };
}

export function generateSentence(
  templateIndex: number,
  options: GenerateOptions = {},
): GeneratedSentence {
  const seed =
    options.seed ??
    (options.seedKey ? hashString(options.seedKey) : Math.floor(Math.random() * 2 ** 32));
  const rng = createRng(seed);

  const template = TEMPLATES[templateIndex];
  if (!template) {
    throw new RangeError(`Нет шаблона с индексом ${templateIndex}`);
  }

  const prepared = prepare(template, rng);
  const parts: string[] = [];

  for (let i = 0; i < template.length; i++) {
    const part = template[i]!;

    if (part.kind === "adjective") {
      const next = template[i + 1];
      if (next && next.kind === "noun") {
        // Прилагательное согласуется с ЭТИМ существительным по роду/числу/падежу.
        const noun = pick(rng, NOUNS);
        const plural = rng() < 0.4;
        const adj = pick(rng, ADJECTIVES);
        parts.push(declineAdjective(adj, plural, noun.gender, next.case));
        parts.push(" ");
        parts.push(declineNoun(noun, plural, next.case));
        i++;
        continue;
      }
      // Прилагательное без существительного — согласуем с подлежащим (редкий случай).
      const adj = pick(rng, ADJECTIVES);
      parts.push(declineAdjective(adj, prepared.ctx.subjectPlural, prepared.ctx.subjectGender, "nom"));
      continue;
    }

    parts.push(renderPart(part, rng, prepared));
  }

  const raw = parts
    .join("")
    .replace(/\s+/g, " ")
    .replace(/\s+\./g, ".")
    .trim();

  const text = raw.charAt(0).toUpperCase() + raw.slice(1);

  return { text, templateId: `t${templateIndex}`, seed };
}

function renderPart(
  part: TemplatePart,
  rng: () => number,
  prepared: Prepared,
): string {
  const { ctx, subject } = prepared;

  switch (part.kind) {
    case "literal":
      return part.value;
    
    // В renderPart, ветка possessive:
    case "possessive": {
        const p = pick(rng, POSSESSIVES);
        return declinePossessive(p, ctx.subjectPlural, ctx.subjectGender, "nom");
      }

    case "pronoun":
      switch (part.person) {
        case "we":   return "Мы";
        case "they": return "Они";
        case "it":   return "Это";
      }

    case "adverb":
      return pick(rng, ADVERBS);

    case "metric":
      return pick(rng, METRICS[part.type]);

    case "adjective":
      // Сюда попадаем только если следующего noun нет — обработано выше.
      return "";

    case "noun": {
      if (part.role === "subject" && subject) {
        return declineNoun(subject, ctx.subjectPlural, part.case);
      }
      const noun = pick(rng, NOUNS);
      const plural = rng() < 0.4;
      return declineNoun(noun, plural, part.case);
    }

    case "verb": {
      const verb = pick(rng, VERBS);
      // 1-е лицо: «мы делаем».
      if (ctx.subjectPerson === "first") {
        return part.tense === "past" ? verb.firstPersonPast : verb.firstPersonPresent;
      }
      // 3-е лицо.
      if (part.tense === "past") {
        return ctx.subjectPlural ? verb.pluralPast : verb.singularPast;
      }
      return ctx.subjectPlural ? verb.pluralPresent : verb.singularPresent;
    }

    default: {
      const _exhaustive: never = part;
      return _exhaustive;
    }
  }
}
function declinePossessive(
  p: PossessiveForms,
  plural: boolean,
  gender: Gender,
  c: Case,
): string {
  if (plural) return p.plural[c];
  switch (gender) {
    case "m": return p.m[c];
    case "f": return p.f[c];
    case "n": return p.n[c];
  }
}

export function generateParagraph(
  count: number,
  options: GenerateOptions = {},
): readonly GeneratedSentence[] {
  const baseSeed =
    options.seed ??
    (options.seedKey ? hashString(options.seedKey) : Math.floor(Math.random() * 2 ** 32));

  return Array.from({ length: count }, (_, i) =>
    generateSentence(i % TEMPLATES.length, { seed: baseSeed ^ (i * 2654435761) }),
  );
}
