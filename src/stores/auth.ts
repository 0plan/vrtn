import { create } from 'zustand';
import { useLocalStorage } from 'usehooks-ts';

type Auth = {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
}
const authStore = create<Auth>((set) => ({
  isAuth: true,
  setIsAuth: (isAuth: boolean) => set({ isAuth }),
}));

export default authStore;
