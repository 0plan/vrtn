import Footer from '@/components/layouts/footer';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/layouts/header/index';
import { Toaster } from '@/components/ui/toaster';

export default function App() {
  const location = useLocation();
  const isExamplePath = location.pathname.startsWith('/example');

  if (isExamplePath) {
    return (
      <div className="min-h-screen flex flex-col">
        <Toaster />
        <div className="flex-1">
           <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Header />
      <main className="mx-auto w-full max-w-[85rem] px-4 py-5 mt-[72px] flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
