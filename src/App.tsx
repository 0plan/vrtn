import './App.css'
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

function App() {

    return (
        <div >
            <Header/>
            <main className="h-96 min-h-full md:min-h-full">
                <div>
                    <p className="underline">Hello world</p>
                </div>
            </main>
            <Footer/>
        </div>

    )
}

export default App
