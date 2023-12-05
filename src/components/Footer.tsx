import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import IsDarkMode from "@components/IsDarkMode.tsx";

const Footer = () => {

    return (
        <footer className="bg-white shadow dark:bg-gray-800 dark:text-slate-200">
            <nav className='flex flex-wrap justify-center gap-2 py-2.5 items-center mx-auto'>
                <IsDarkMode />
                <a>
                    <LanguageIcon/>
                </a>
                <a href="https://github.com/chlee125/vite-react-typescript-template" target='_blank'>
                    <GitHubIcon/>
                </a>
            </nav>
        </footer>
    )
}
export default Footer;
