import { useDarkMode } from '~/lib/dark-mode.ts';

export default function ToggleDark() {
  const { isDarkMode, toggle } = useDarkMode();
  return (
    <button
      onClick={toggle}
      className={`text-2xl ${isDarkMode ? 'i-carbon-sun' : 'i-carbon-moon'}`}
    />
  );
}
