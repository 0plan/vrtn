import {useTranslation} from "react-i18next";
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IsDarkMode from "@components/IsDarkMode.tsx";

const Footer = () => {
    const {t} = useTranslation();

    return (
        <footer className="bg-white shadow dark:bg-gray-800 dark:text-slate-200">
            <nav className="text-lg flex flex-auto justify-center">
                <IsDarkMode />
                <a>
                    <LanguageIcon/>
                </a>
                <a href="https://github.com/chlee125/vite-react-typescript-template">
                    <GitHubIcon/>
                </a>
            </nav>
        </footer>
    )
}
export default Footer;
