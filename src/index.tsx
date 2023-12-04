import Header from "@components/Header.tsx";
import Footer from "@components/Footer.tsx";
import {Outlet} from "react-router-dom";

export default function App() {
    return (
        <div>
            <Header/>
            <main className="h-96 min-h-full md:min-h-full">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}
