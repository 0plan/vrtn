import { Outlet } from 'react-router-dom';
import Aside from '@/components/layouts/aside.tsx';
import { examples } from '@/data/example.ts';

export default function Example() {
  return (
    <div className="flex">
      <Aside examples={examples} />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
