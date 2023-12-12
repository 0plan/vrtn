import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import EN from '~/locales/en'
import KO from '~/locales/ko'

export default i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      ko: {
        translation: KO
      },
      en: {
        translation: EN
      }
    },
    lng: navigator.language.substring(0, 2),
    fallbackLng: import.meta.env.VITE_FALLBACK_LANG,

    interpolation: {
      escapeValue: false
    }
  })
