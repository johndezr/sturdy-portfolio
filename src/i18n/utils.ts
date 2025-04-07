import { getCollection } from "astro:content";

// Importar traducciones
import es from "../i18n/es/common.json";
import en from "../i18n/en/common.json";

const translations = { es, en };

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return lang as keyof typeof translations;
  return "es";
}

export function useTranslations(lang: keyof typeof translations) {
  return function t(key: string) {
    return getNestedValue(translations[lang], key);
  };
}

// Función auxiliar para obtener valores anidados usando notación de puntos
function getNestedValue(obj: any, path: string) {
  return path.split(".").reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj);
}
