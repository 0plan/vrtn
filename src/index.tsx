import Header from "@components/Header.tsx";
import Footer from "@components/Footer.tsx";
import {Outlet} from "react-router-dom";

export default function App() {
    return (
        <div >
            <Header/>
            <main className={'bg-white border-gray-200 px-6 py-2.5 dark:bg-neutral-700 dark:text-slate-200'}>
                <div className={'flex flex-wrap justify-between items-center mx-auto'}>

                <Outlet/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}
