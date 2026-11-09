// components/annoyance/cookieLevels.ts

export interface CookieLevel {
  /** Заголовок баннера. */
  title: string;
  /** Основной текст. */
  body: string;
  /** Текст кнопки «Принять». */
  acceptLabel: string;
  /** Текст кнопки «Отклонить». undefined — кнопки нет. */
  declineLabel?: string;
  /** Кнопка «Отклонить» ведёт на следующий уровень или закрывает. */
  declineAction: "next" | "close";
  /** Визуальный акцент: цвет фона. */
  background: string;
}

export const COOKIE_LEVELS: readonly CookieLevel[] = [
  {
    title: "Мы используем cookie",
    body: "Мы используем файлы cookie, чтобы улучшить ваш опыт. Вы можете принять все cookie или отклонить их.",
    acceptLabel: "Принять все",
    declineLabel: "Отклонить",
    declineAction: "next",
    background: "#f5f5f5",
  },
  {
    title: "Вы уверены?",
    body: "Cookie помогают нам показывать вам релевантный контент. Без них сайт будет работать некорректно.",
    acceptLabel: "Принять все",
    declineLabel: "Всё равно отклонить",
    declineAction: "next",
    background: "#fff4e5",
  },
  {
    title: "Подумайте ещё раз",
    body: "Отказ от cookie ухудшит качество сайта. Мы не сможем запомнить ваши предпочтения. Вы точно хотите продолжить?",
    acceptLabel: "Принять все",
    declineLabel: "Я согласен на худший сайт",
    declineAction: "next",
    background: "#ffe5e5",
  },
  {
    title: "Только 1% пользователей отказываются",
    body: "Большинство наших посетителей принимают cookie. Присоединяйтесь к большинству — это займёт секунду.",
    acceptLabel: "Принять все",
    declineLabel: "Присоединиться к 1%",
    declineAction: "next",
    background: "#ffd6d6",
  },
  {
    title: "Последнее предупреждение",
    body: "Продолжая пользоваться сайтом, вы соглашаетесь с использованием cookie. Это ваше окончательное решение.",
    acceptLabel: "Принять все",
    // declineLabel отсутствует — кнопки «Отклонить» больше нет
    declineAction: "close",
    background: "#ffc4c4",
  },
];