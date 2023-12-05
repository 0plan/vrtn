import Menu from "@components/Menu.tsx";
import { Link } from "react-router-dom";
import {t} from "i18next";

const Header = () => {
    return (
        <header>
            <nav className="bg-white border-gray-200 px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto">
                    <Link to={'/'} className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            {t('projectName')}
                        </span>
                    </Link>

                    <Menu />
                </div>
            </nav>
        </header>
    )
}

export default Header
