import useLanguage from '~/stores/language.ts';

export default function ToggleLanguage() {
  const { toggleLang } = useLanguage();
  return (
    <button onClick={toggleLang} className="i-akar-icons:language text-2xl" />
  );
}
