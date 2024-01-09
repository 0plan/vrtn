import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import yaml from 'js-yaml';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: navigator.language.substring(0, 2),
    fallbackLng: import.meta.env.VITE_FALLBACK_LANG,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}.yml',
      parse(data: string) {
        return yaml.load(data);
      },
    },
  });

export default i18n;
