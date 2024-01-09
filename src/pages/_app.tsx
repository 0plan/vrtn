import Footer from '@components/layouts/footer.tsx';
import { Outlet } from 'react-router-dom';
import Header from '@components/layouts/header/index.tsx';

export default function App() {
  return (
    <div>
      <Header />
      <main className="mx-auto w-full max-w-[85rem] px-4 py-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
