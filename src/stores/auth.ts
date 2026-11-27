import { create } from 'zustand';
import { clearWorkspace } from '@/console/browser-workspace';

export const demoAccount = { email: 'demo@example.com', password: 'traffic-demo' };
const sessionKey = 'vrtn.demo-session';

type Auth = {
  isAuth: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const authStore = create<Auth>((set) => ({
  isAuth: sessionStorage.getItem(sessionKey) === demoAccount.email,
  login: (email, password) => {
    if (email.trim().toLowerCase() !== demoAccount.email || password !== demoAccount.password) return false;

    sessionStorage.setItem(sessionKey, demoAccount.email);
    set({ isAuth: true });
    return true;
  },
  logout: () => {
    clearWorkspace();
    sessionStorage.removeItem(sessionKey);
    set({ isAuth: false });
  },
}));

export default authStore;
