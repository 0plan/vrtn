import { Outlet } from 'react-router-dom';
import Aside from '@/components/layouts/aside.tsx';

export default function Example() {
  return (
    <div className="flex">
      <Aside />
      <main className="container">
        <h1 className="text-2xl">Title</h1>
        <Outlet />
      </main>
    </div>
  );
}
