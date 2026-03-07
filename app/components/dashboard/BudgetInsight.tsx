"use client";

import { useFinanceStore } from "@/app/store/useFinanceStore";
import { selectBudgets, selectCategoryTotals } from "@/app/store/selectors";
import { useShallow } from "zustand/react/shallow";
import { motion, AnimatePresence } from "framer-motion";
import { Target, AlertCircle, CheckCircle2, Zap } from "lucide-react";

export const BudgetInsight = () => {
  const budgets = useFinanceStore(useShallow(selectBudgets));
  const categoryTotals = useFinanceStore(useShallow(selectCategoryTotals));

  const totalBudgetLimit = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = Object.values(categoryTotals).reduce((acc, val) => acc + val, 0);
  const overallUsage = totalBudgetLimit > 0 ? Math.round((totalSpent / totalBudgetLimit) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 px-2">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-lg"><Target size={20} /></div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white">Budget Goals</h3>
      </div>

      <div className="grid gap-6">
        <AnimatePresence>
          {budgets.map((budget, idx) => {
            const spent = categoryTotals[budget.category] || 0;
            const percent = Math.min((spent / budget.limit) * 100, 100);
            const isOver = spent > budget.limit;

            return (
              <motion.div key={budget.category} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-black uppercase text-slate-400">{budget.category}</span>
                  <div className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase border ${isOver ? "bg-red-50 text-red-600 border-red-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}>
                    {isOver ? "Alert" : "Safe"}
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} className={`h-full ${isOver ? "bg-red-500" : "bg-indigo-600"}`} />
                </div>
                <div className="flex justify-between mt-1 text-[10px] font-bold text-slate-500">
                  <span>${spent.toLocaleString()}</span>
                  <span>Goal: ${budget.limit}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};