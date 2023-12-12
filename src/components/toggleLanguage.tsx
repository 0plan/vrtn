import useLanguage from '~/stores/language.ts'

export default function ToggleLanguage() {
  const { lang, toggleLang } = useLanguage()
  return (
    <button onClick={toggleLang} className={`text-2xl`}>
      {lang}
    </button>
  )
}

