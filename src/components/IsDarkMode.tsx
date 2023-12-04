import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {useEffect, useState} from "react";
import {setDarkTheme, setLightTheme} from "~/utils/isDark.ts";

const useLocalStorage = (key, initialState) => {
    const [state,  setState] = useState(() => window.localStorage.key || initialState)
    useEffect(() => {
        window.localStorage.setItem(key, state)
    }, [key, state])
   return [state, setState]
}


const IsDarkMode = () => {
    const [isDark, setDark] = useState(localStorage.theme)
    useEffect(() => {
        window.localStorage.setItem('theme', isDark)
    }, [isDark]);

    return (
        <>
            <p>{isDark}</p>
            <a onClick={setLightTheme}>
                <LightModeIcon/>
            </a>
            <a onClick={setDarkTheme}>
                <DarkModeIcon/>
            </a>
        </>
    )
}

export default IsDarkMode
