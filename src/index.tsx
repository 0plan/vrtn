import Header from "@components/Header.tsx";
import Footer from "@components/Footer.tsx";
import {Outlet} from "react-router-dom";
import { useTranslation } from "react-i18next"



export default function App() {
    const { t } = useTranslation();

    return (
        <div>
            <Header/>
            {t('Welcome to React')}
            <main className="h-96 min-h-full md:min-h-full">
                <Outlet />
            </main>
            <Footer/>
        </div>

    )
}
