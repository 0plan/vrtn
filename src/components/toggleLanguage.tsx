import i18n from 'i18next'
import useLocale from '~/lib/locales.ts'

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../locales/*.js'))
    .map(([path, loadLocale]) => [path.match(/([\w-]*)\.js$/)?.[1], loadLocale])
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap)
const loadedLanguages: string[] = []

function setI18nLanguage(lang: Locale) {
  console.log(lang)
  i18n.language = lang as any
  if (typeof document !== 'undefined')
    document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(lang: string): Promise<Locale> {
  // If the same language
  if (i18n.language === lang)
    return setI18nLanguage(lang)

  // If the language was already loaded
  if (loadedLanguages.includes(lang))
    return setI18nLanguage(lang)

  // If the language hasn't been loaded yet
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

export default function ToggleLanguage() {
  const locales = availableLocales
  console.log(locales)
  const {locale, toggle} = useLocale()
  console.log(locale.substring(0,2))

  return (
    <button onClick={toggle} className={`i-circle-flags:${locale.substring(0,2)} text-2xl`} />
  )
}

