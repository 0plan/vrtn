import { Navigate } from 'react-router-dom';
import authStore from '@/stores/auth';

export default function Index() {
  const isAuth = authStore(state => state.isAuth);
  return <Navigate to={isAuth ? '/dashboard' : '/login'} replace />;
}
