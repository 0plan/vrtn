import { create } from 'zustand';
import i18n from 'i18next';

type Language = {
  lang: string
  toggleLang: () => void
}

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('/public/locales/*.yml')).map(
    ([path, loadLocale]) => [path.match(/([\w-]*)\.yml$/)?.[1], loadLocale],
  ),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>;
const availableLocales = Object.keys(localesMap);

const useLanguage = create<Language>()((set) => ({
  lang: navigator.language.substring(0, 2),
  toggleLang: () => set(() => {
    const locales = availableLocales;
    const locale = i18n.language;
    i18n.changeLanguage(
      locales[(locales.indexOf(locale) + 1) % locales.length],
    );
    return {
      lang: locales[(locales.indexOf(locale) + 1) % locales.length],
    };
  }),
}));

export default useLanguage;
