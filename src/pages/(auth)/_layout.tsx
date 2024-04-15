import { useEffect } from 'react';
import authStore from '@/stores/auth';
import { useNavigate, Outlet } from 'react-router-dom';

export default function Index() {
  const { isAuth } = authStore();
  const nav = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      nav('/', { replace: true });
    }
  }, [isAuth]);

  return (
    <main>
      <Outlet />
    </main>
  );
}
