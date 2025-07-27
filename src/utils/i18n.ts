interface Translations {
  [key: string]: string;
}

let translations: Translations = {};
let currentLang = "tr";

export const fetchTranslationsAsync = async (): Promise<void> => {
  try {
    const lang = localStorage.getItem("lang") || "tr";
    currentLang = lang;

    const res = await fetch(`/src/locales/${lang}.json`);
    translations = await res.json();
    document.documentElement.lang = lang;
  } catch (error) {
    console.error("Failed to load translations:", error);
  }
};

export const translate = (key: string): string => {
  return translations[key] || key;
};

export const switchLanguage = async (lang: string): Promise<void> => {
  try {
    currentLang = lang;
    localStorage.setItem("lang", lang);

    const res = await fetch(`/src/locales/${lang}.json`);
    translations = await res.json();
    document.documentElement.lang = lang;

    window.dispatchEvent(new CustomEvent("language-changed"));
  } catch (error) {
    console.error("Failed to switch language:", error);
  }
};

export const getCurrentLanguage = (): string => {
  return currentLang;
};
