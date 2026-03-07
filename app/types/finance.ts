// src/types/finance.ts

export type TransactionCategory = 'Housing' | 'Food' | 'Transport' | 'Leisure' | 'Health';

export interface Transaction {
  id: string;
  amount: number;
  category: TransactionCategory;
  description: string;
  date: string; // ISO format
  type: 'income' | 'expense';
}

export interface BudgetGoal {
  category: TransactionCategory;
  limit: number;
}

export interface FinanceStore {
  transactions: Transaction[];
  budgets: BudgetGoal[];
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  setBudget: (category: TransactionCategory, limit: number) => void;
}