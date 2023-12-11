import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enEN from '~/locales/en'
import koKR from '~/locales/ko'
import {  useUpdateEffect } from 'usehooks-ts'
import { useState } from 'react'

export default function useLocale() {
  const [locale, setLocale] = useState(navigator.language)
  console.log(locale)

  useUpdateEffect(() => {
    setLocale(navigator.language)
  }, [navigator.language])

  i18n.use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: enEN
        },
        'ko-KR': {
          translation: koKR
        }
      },
      lng: locale,
      fallbackLng: import.meta.env.VITE_FALLBACK_LANG,

      interpolation: {
        escapeValue: false
      }
    })

  return {
    locale, toggle: () => setLocale(lang => lang === 'ko-KR' ? 'us' : 'ko-KR')
  }
}
