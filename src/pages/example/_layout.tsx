import { Outlet } from 'react-router-dom';
import Aside from '@/components/layouts/aside';
import { examples } from '@/data/example';

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
