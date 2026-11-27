import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import yaml from 'js-yaml';

const languages = Object.keys(import.meta.glob('/public/locales/*/common.yml'))
  .map(path => path.split('/')[3]);

i18n
  .on('languageChanged', language => {
    document.documentElement.lang = i18n.resolvedLanguage || language;
  })
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: languages,
    ns: ['common'],
    defaultNS: 'common',
    load: 'languageOnly',
    detection: { order: ['localStorage', 'navigator'] },
    fallbackLng: import.meta.env.VITE_FALLBACK_LANG,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.yml`,
      parse(data: string) {
        return yaml.load(data);
      },
    },
  });

export function toggleLanguage() {
  const current = languages.indexOf(i18n.resolvedLanguage ?? '');
  void i18n.changeLanguage(languages[(current + 1) % languages.length]);
}

export default i18n;
