import { create } from 'zustand';

type Auth = {
  isAuth: boolean
  login: () => void
  logout: () => void
}

const authStore = create<Auth>((set) => ({
  isAuth: localStorage.getItem('isAuth') === 'true' || false,

  login: () => set(() => {
    localStorage.setItem('isAuth', 'true');
    return { isAuth: true };
  }),

  logout: () => set(() => {
    localStorage.removeItem('isAuth');
    return { isAuth: false };
  }),

}));

export default authStore;
