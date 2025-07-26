let translations = {};
let lang = localStorage.getItem('lang') || document.documentElement.lang || 'tr';

const CACHE_KEY_PREFIX = 'translations_';
const CACHE_VERSION = '2.0';

function buildLangCacheKey(lang) {
  return `${CACHE_KEY_PREFIX}${lang}_${CACHE_VERSION}`;
}

function fetchLangCache(lang) {
  const cached = localStorage.getItem(buildLangCacheKey(lang));
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error('Failed to parse cached translations:', e);
      return null;
    }
  }
  return null;
}

function storeLangCache(lang, translations) {
  try {
    localStorage.setItem(buildLangCacheKey(lang), JSON.stringify(translations));
  } catch (e) {
    console.error('Failed to cache translations:', e);
  }
}

export async function fetchTranslationsAsync() {
  try {
    const cachedTranslations = fetchLangCache(lang);
    if (cachedTranslations) {
      translations = cachedTranslations;
      document.documentElement.lang = lang;
      return translations;
    }

    const res = await fetch(`/locales/${lang}.json`);
    translations = await res.json();
    document.documentElement.lang = lang;

    storeLangCache(lang, translations);

    return translations;
  } catch (e) {
    console.error("Failed to load translations:", e);
    translations = {};
    return translations;
  }
}

export function translate(key) {
  return translations[key] || key;
}

export async function switchLanguage(newLang) {
  lang = newLang;
  localStorage.setItem('lang', lang);
  await fetchTranslationsAsync();
  window.dispatchEvent(new CustomEvent('language-changed', { detail: { lang } }));
  return translations;
}
