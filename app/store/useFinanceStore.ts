// src/store/useFinanceStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FinanceStore, Transaction } from '@/types/finance';
import { v4 as uuidv4 } from 'uuid';

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set) => ({
      transactions: [],
      budgets: [
        { category: 'Food', limit: 500 },
        { category: 'Housing', limit: 1200 },
      ],
      addTransaction: (t) => set((state) => ({
        transactions: [{ ...t, id: uuidv4() }, ...state.transactions]
      })),
      setBudget: (category, limit) => set((state) => ({
        budgets: state.budgets.map(b => b.category === category ? { ...b, limit } : b)
      })),
    }),
    { name: 'flux-finance-storage' }
  )
);