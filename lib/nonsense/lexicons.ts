// lib/nonsense/lexicons.ts
import type { AdjectiveForms, NounForms, VerbForms, MetricType, PossessiveForms } from "./types";

export const NOUNS: readonly NounForms[] = [
  {
    gender: "f",
    singular: {
      nom: "платформа", gen: "платформы", dat: "платформе",
      acc: "платформу", ins: "платформой", prep: "платформе",
    },
    plural: {
      nom: "платформы", gen: "платформ", dat: "платформам",
      acc: "платформы", ins: "платформами", prep: "платформах",
    },
  },
  {
    gender: "n",
    singular: {
      nom: "решение", gen: "решения", dat: "решению",
      acc: "решение", ins: "решением", prep: "решении",
    },
    plural: {
      nom: "решения", gen: "решений", dat: "решениям",
      acc: "решения", ins: "решениями", prep: "решениях",
    },
  },
  {
    gender: "f",
    singular: {
      nom: "экосистема", gen: "экосистемы", dat: "экосистеме",
      acc: "экосистему", ins: "экосистемой", prep: "экосистеме",
    },
    plural: {
      nom: "экосистемы", gen: "экосистем", dat: "экосистемам",
      acc: "экосистемы", ins: "экосистемами", prep: "экосистемах",
    },
  },
  {
    gender: "m",
    singular: {
      nom: "подход", gen: "подхода", dat: "подходу",
      acc: "подход", ins: "подходом", prep: "подходе",
    },
    plural: {
      nom: "подходы", gen: "подходов", dat: "подходам",
      acc: "подходы", ins: "подходами", prep: "подходах",
    },
  },
  {
    gender: "m",
    singular: {
      nom: "процесс", gen: "процесса", dat: "процессу",
      acc: "процесс", ins: "процессом", prep: "процессе",
    },
    plural: {
      nom: "процессы", gen: "процессов", dat: "процессам",
      acc: "процессы", ins: "процессами", prep: "процессах",
    },
  },
  {
    gender: "f",
    singular: {
      nom: "инновация", gen: "инновации", dat: "инновации",
      acc: "инновацию", ins: "инновацией", prep: "инновации",
    },
    plural: {
      nom: "инновации", gen: "инноваций", dat: "инновациям",
      acc: "инновации", ins: "инновациями", prep: "инновациях",
    },
  },
];

export const ADJECTIVES: readonly AdjectiveForms[] = [
  {
    m: {
      nom: "инновационный", gen: "инновационного", dat: "инновационному",
      acc: "инновационный", ins: "инновационным", prep: "инновационном",
    },
    f: {
      nom: "инновационная", gen: "инновационной", dat: "инновационной",
      acc: "инновационную", ins: "инновационной", prep: "инновационной",
    },
    n: {
      nom: "инновационное", gen: "инновационного", dat: "инновационному",
      acc: "инновационное", ins: "инновационным", prep: "инновационном",
    },
    plural: {
      nom: "инновационные", gen: "инновационных", dat: "инновационным",
      acc: "инновационные", ins: "инновационными", prep: "инновационных",
    },
  },
  {
    m: {
      nom: "комплексный", gen: "комплексного", dat: "комплексному",
      acc: "комплексный", ins: "комплексным", prep: "комплексном",
    },
    f: {
      nom: "комплексная", gen: "комплексной", dat: "комплексной",
      acc: "комплексную", ins: "комплексной", prep: "комплексной",
    },
    n: {
      nom: "комплексное", gen: "комплексного", dat: "комплексному",
      acc: "комплексное", ins: "комплексным", prep: "комплексном",
    },
    plural: {
      nom: "комплексные", gen: "комплексных", dat: "комплексным",
      acc: "комплексные", ins: "комплексными", prep: "комплексных",
    },
  },
  {
    m: {
      nom: "прорывной", gen: "прорывного", dat: "прорывному",
      acc: "прорывной", ins: "прорывным", prep: "прорывном",
    },
    f: {
      nom: "прорывная", gen: "прорывной", dat: "прорывной",
      acc: "прорывную", ins: "прорывной", prep: "прорывной",
    },
    n: {
      nom: "прорывное", gen: "прорывного", dat: "прорывному",
      acc: "прорывное", ins: "прорывным", prep: "прорывном",
    },
    plural: {
      nom: "прорывные", gen: "прорывных", dat: "прорывным",
      acc: "прорывные", ins: "прорывными", prep: "прорывных",
    },
  },
  {
    m: {
      nom: "прозрачный", gen: "прозрачного", dat: "прозрачному",
      acc: "прозрачный", ins: "прозрачным", prep: "прозрачном",
    },
    f: {
      nom: "прозрачная", gen: "прозрачной", dat: "прозрачной",
      acc: "прозрачную", ins: "прозрачной", prep: "прозрачной",
    },
    n: {
      nom: "прозрачное", gen: "прозрачного", dat: "прозрачному",
      acc: "прозрачное", ins: "прозрачным", prep: "прозрачном",
    },
    plural: {
      nom: "прозрачные", gen: "прозрачных", dat: "прозрачным",
      acc: "прозрачные", ins: "прозрачными", prep: "прозрачных",
    },
  },
];

export const POSSESSIVES: readonly PossessiveForms[] = [
  {
    m: {
      nom: "наш", gen: "нашего", dat: "нашему",
      acc: "наш", ins: "нашим", prep: "нашем",
    },
    f: {
      nom: "наша", gen: "нашей", dat: "нашей",
      acc: "нашу", ins: "нашей", prep: "нашей",
    },
    n: {
      nom: "наше", gen: "нашего", dat: "нашему",
      acc: "наше", ins: "нашим", prep: "нашем",
    },
    plural: {
      nom: "наши", gen: "наших", dat: "нашим",
      acc: "наши", ins: "нашими", prep: "наших",
    },
  },
  {
    m: {
      nom: "ваш", gen: "вашего", dat: "вашему",
      acc: "ваш", ins: "вашим", prep: "вашем",
    },
    f: {
      nom: "ваша", gen: "вашей", dat: "вашей",
      acc: "вашу", ins: "вашей", prep: "вашей",
    },
    n: {
      nom: "ваше", gen: "вашего", dat: "вашему",
      acc: "ваше", ins: "вашим", prep: "вашем",
    },
    plural: {
      nom: "ваши", gen: "ваших", dat: "вашим",
      acc: "ваши", ins: "вашими", prep: "ваших",
    },
  },
];

export const VERBS: readonly VerbForms[] = [
  { singularPresent: "оптимизирует", pluralPresent: "оптимизируют", firstPersonPresent: "оптимизируем", singularPast: "оптимизировал", pluralPast: "оптимизировали", firstPersonPast: "оптимизировали" },
  { singularPresent: "трансформирует", pluralPresent: "трансформируют", firstPersonPresent: "трансформируем", singularPast: "трансформировал", pluralPast: "трансформировали", firstPersonPast: "трансформировали" },
  { singularPresent: "интегрирует", pluralPresent: "интегрируют", firstPersonPresent: "интегрируем", singularPast: "интегрировал", pluralPast: "интегрировали", firstPersonPast: "интегрировали" },
  { singularPresent: "переосмысляет", pluralPresent: "переосмысляют", firstPersonPresent: "переосмысляем", singularPast: "переосмыслял", pluralPast: "переосмысляли", firstPersonPast: "переосмысляли" },
  { singularPresent: "синхронизирует", pluralPresent: "синхронизируют", firstPersonPresent: "синхронизируем", singularPast: "синхронизировал", pluralPast: "синхронизировали", firstPersonPast: "синхронизировали" },
  { singularPresent: "формирует", pluralPresent: "формируют", firstPersonPresent: "формируем", singularPast: "формировал", pluralPast: "формировали", firstPersonPast: "формировали" },
  { singularPresent: "масштабирует", pluralPresent: "масштабируют", firstPersonPresent: "масштабируем", singularPast: "масштабировал", pluralPast: "масштабировали", firstPersonPast: "масштабировали" },
];

export const ADVERBS: readonly string[] = [
  "комплексно", "системно", "точечно", "проактивно",
  "бесшовно", "итеративно", "стратегически", "оперативно",
];

export const METRICS: Readonly<Record<MetricType, readonly string[]>> = {
  percentage:   ["99.9%", "150%", "47%", "99%"],
  multiplier:   ["10x", "3x", "5x", "2.5x"],
  mode:         ["24/7", "365", "24/365"],
  rank:         ["№1", "ТОП-3"],
  abbreviation: ["B2B", "B2C", "SaaS", "PaaS", "API"],
};

