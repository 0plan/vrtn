import { useDarkMode } from '~/lib/dark-mode.ts'

export default function ToggleDark() {
  const { isDarkMode, toggle } = useDarkMode()
  return (
    <>
      {isDarkMode ? (
        <button onClick={toggle} className="i-carbon-sun text-2xl" />
      ) : (
        <button onClick={toggle} className="i-carbon-moon text-2xl" />
      )}
    </>
  )
}
