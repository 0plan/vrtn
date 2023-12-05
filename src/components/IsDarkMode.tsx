import {useDarkMode} from "~/utils/isDark.ts";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function IsDarkMode() {
    const {isDarkMode, toggle} = useDarkMode()
    return (
        <>
            {
                isDarkMode ? <button onClick={toggle}><LightModeIcon/></button> :
                    <button onClick={toggle}><DarkModeIcon/></button>

            }
        </>
    )
}
