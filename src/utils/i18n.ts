import en from "../locales/en.json";
import es from "../locales/es.json";

const languages = { en, es };

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as keyof typeof languages;
  return "es";
}

export function getTranslation(lang: keyof typeof languages) {
  return languages[lang] || languages["es"];
}