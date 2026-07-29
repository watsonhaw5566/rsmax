import { create } from '@rsmax/store';
import { persist } from '@rsmax/store/middleware';

export const counterStore = create(
  persist(
    (set, get) => ({
      count: 0,
      increment: () => set({ count: get().count + 1 }),
      decrement: () => set({ count: get().count - 1 }),
      reset: () => set({ count: 0 }),
      incrementBy: (n) => set({ count: get().count + n }),
    }),
    {
      name: 'counter-storage',
    }
  )
);
