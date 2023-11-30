import { Link } from 'react-router-dom'
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";


const toggleDark = () => {
    // to something
}
const toggleLocales = () => {
    // do something
}
const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-white shadow dark:bg-gray-100">
            <nav className="text-xl mt-6">
                <Link className="icon-btn mx-2" to="/" >
                    <div className="i-carbon-campsite"/>
                    {t('Welcome to React')}
                </Link>
                <Button className="py-10" variant="contained">{t('hello')} world</Button>
                <button className="icon-btn mx-2 !outline-none" title="t('button.toggle_dark')" onClick={toggleDark()}>
                    <div className="i carbon-sun dark:carbon-moon"/>
                </button>
                <a className="icon-btn mx-2" title="t('button.toggle_langs')" onClick={toggleLocales()}>
                    <div className="i-carbon-language"/>
                </a>
                <Link className="icon-btn mx-2" to="/about" >
                    <div className="i-carbon-dicom-overlay"/>
                    {t('button.guide')}
                </Link>
                <a className="icon-btn mx-2" rel="noreferrer" href="https://github.com/socketbear/vue-dev-guide"
                   target="_blank" title="GitHub">
                    <div className="i-carbon-logo-github"/>
                </a>
            </nav>
        </footer>
    )
}
export default Footer;
