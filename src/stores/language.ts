import { create } from 'zustand'

type Language = {
  lang: string
  toggleLang: () => void
}

const useLanguage = create<Language>()((set) => ({
  lang: 'ko',
  toggleLang: () => set((state) => ({ lang: state.lang === 'ko' ? 'en' : 'ko' }))
}))

export default useLanguage
