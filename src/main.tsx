import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./index.tsx"
import ErrorPage from "./error-pages/ErrorPage.tsx";
import About from "./pages/About.tsx";
import Home from './pages/Home.tsx';
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import koKR from '~/lang/koKR'
import enEN from '~/lang/enEN'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "about",
                element: <About/>
            }
        ]
    }
])

i18n.use(initReactI18next)
    .init({
        resources: {
            en: enEN,
            ko: koKR
        },
        lng: "ko",
        fallbackLng: "ko",

        interpolation: {
            escapeValue: false
        }
    });

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
