import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { TransactionInput } from '@/app/lib/validations';

export type Category = "Food & Dining" | "Housing & Rent" | "Transport" | "Entertainment" | "Health & Wellness";

export interface Transaction extends TransactionInput {
  id: string;
}

export interface FinanceState {
  transactions: Transaction[];
  budgets: { category: Category; limit: number }[];
  _hasHydrated: boolean;
  addTransaction: (t: TransactionInput) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: [],
      budgets: [
        { category: 'Food & Dining', limit: 500 },
        { category: 'Housing & Rent', limit: 1200 },
        { category: 'Transport', limit: 300 },
        { category: 'Entertainment', limit: 200 },
        { category: 'Health & Wellness', limit: 150 },
      ],
      _hasHydrated: false,
      addTransaction: (t) => set((state) => ({
        transactions: [{ ...t, id: uuidv4() } as Transaction, ...state.transactions]
      })),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    { 
      name: 'flux-finance-storage',
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true)
    }
  )
);