import { Outlet } from 'react-router-dom';
import Examples from '@components/examples.tsx';

export default function Example() {
  return (
    <main className="flex">
      <Examples />
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
}
