import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './index.tsx'
import ErrorPage from './error-pages/ErrorPage.tsx'
import About from '~/pages/About.tsx'
import Home from '~/pages/Home.tsx'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import koKR from '~/locales/ko'
import enEN from '~/locales/en'
import Examples from '~/pages/examples/Home.tsx'
import StoreExample from '~/pages/examples/Store.tsx'
import RouterExample from '~/pages/examples/Router.tsx'
import '~/utils/dark-mode.ts'
import Todo from '~/pages/Todo.tsx'
// main.ts
import 'virtual:uno.css'
import { HelmetProvider } from 'react-helmet-async'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'todo',
        element: <Todo />
      },
      {
        path: 'examples',
        element: <Examples />,
        children: [
          { path: 'store-example', element: <StoreExample /> },
          { path: 'router-example', element: <RouterExample /> }
        ]
      }
    ]
  }
])

i18n.use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enEN
      },
      ko: {
        translation: koKR
      }
    },
    lng: 'ko',
    fallbackLng: import.meta.env.VITE_FALLBACK_LANG,

    interpolation: {
      escapeValue: false
    }
  })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
)
