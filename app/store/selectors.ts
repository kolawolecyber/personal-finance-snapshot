import { FinanceState, Transaction } from "./useFinanceStore";

export const selectTransactions = (state: FinanceState) => state.transactions;
export const selectBudgets = (state: FinanceState) => state.budgets;
export const selectHydration = (state: FinanceState) => state._hasHydrated;

export const selectTotalIncome = (state: FinanceState) => 
  state.transactions
    .filter((t) => t.type === "income")
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

export const selectTotalExpenses = (state: FinanceState) => 
  state.transactions
    .filter((t) => t.type === "expense")
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

export const selectBalance = (state: FinanceState) => {
  const inc = state.transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const exp = state.transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return inc - exp;
};

export const selectCategoryTotals = (state: FinanceState) => {
  return state.transactions
    .filter((t) => t.type === "expense")
    .reduce((acc: Record<string, number>, t: Transaction) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
};