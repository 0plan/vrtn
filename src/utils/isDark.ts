// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}

export const setLightTheme = () => {
    localStorage.theme = 'light'
}
export const setDarkTheme = () => {
    localStorage.theme = 'dark'
}
export const setAutoTheme = () => {
    localStorage.removeItem('theme')
}



