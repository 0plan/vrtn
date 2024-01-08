import { create } from 'zustand';

type Store = {
  count: number
  inc: () => void
  dec: () => void
}

const useCounter = create<Store>()((set) => ({
  count: 50,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
}));

export default useCounter;
