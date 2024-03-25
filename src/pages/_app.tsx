import Footer from '@/components/layouts/footer';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layouts/header/index';
import { Toaster } from '@/components/ui/toaster';

export default function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <main className="mx-auto w-full max-w-[85rem] px-4 py-5 mt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
