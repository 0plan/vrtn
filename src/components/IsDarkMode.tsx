import { useDarkMode } from '~/utils/dark-mode.ts'

export default function IsDarkMode() {
  const { isDarkMode, toggle } = useDarkMode()
  return (
    <>
      {
        isDarkMode ?
          <button onClick={toggle} className='text-2xl i-carbon-sun' />
          : <button onClick={toggle} className='text-2xl i-carbon-moon' />
      }
    </>
  )
}

