import Footer from '@components/Footer.tsx'
import { Outlet } from 'react-router-dom'
import Header from '@components/header/index.tsx'

export default function App() {
  return (
    <div>
      <Header />
      <main className='max-w-[85rem] w-full mx-auto px-4 py-5'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
