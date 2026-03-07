"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useFinanceStore } from "@/app/store/useFinanceStore";
import { 
  selectTransactions, 
  selectTotalIncome, 
  selectTotalExpenses, 
  selectBalance,
  selectHydration 
} from "@/app/store/selectors";
import { StatCard } from "@/app/components/dashboard/StatCard";
import { AddTransactionForm } from "@/app/components/dashboard/AddTransactionForm";
import { BudgetInsight } from "@/app/components/dashboard/BudgetInsight";
import { History, LayoutDashboard, ReceiptText, Zap } from "lucide-react";

export default function FinanceDashboard() {
  const [mounted, setMounted] = useState(false);
  
  // Atomic Selectors for stability
  const transactions = useFinanceStore(selectTransactions);
  const totalIncome = useFinanceStore(selectTotalIncome);
  const totalExpenses = useFinanceStore(selectTotalExpenses);
  const balance = useFinanceStore(selectBalance);
  const hasHydrated = useFinanceStore(selectHydration);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Framer Motion Variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // Prevent Hydration Mismatch
  if (!mounted || !hasHydrated) return null;

  return (
    <main className="min-h-screen bg-[oklch(0.98_0.005_240)] p-4 md:p-10 lg:p-16">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 font-bold tracking-tighter text-xl">
              <Zap fill="currentColor" size={24} /> PERSONAL FINANCE
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Financial Snapshot</h1>
          </div>
        </header>

        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* COLUMN 1: Form */}
          <motion.div variants={item} className="lg:col-span-4 flex flex-col gap-6">
            <AddTransactionForm />
            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative group overflow-hidden">
              <h4 className="text-lg font-bold mb-2">2026 Strategy</h4>
              <p className="text-slate-400 text-sm">Saving momentum is high. Keep it up!</p>
              <LayoutDashboard className="absolute -right-8 -bottom-8 opacity-10" size={180} />
            </div>
          </motion.div>

          {/* COLUMN 2: Stats & History */}
          <motion.div variants={item} className="lg:col-span-5 flex flex-col gap-8">
            <StatCard label="Available Balance" value={balance} type={balance >= 0 ? 'positive' : 'negative'} />
            <div className="grid grid-cols-2 gap-6">
              <StatCard label="Inflow" value={totalIncome} />
              <StatCard label="Outflow" value={totalExpenses} type="negative" />
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex-1">
              <h3 className="text-xl font-black mb-8 flex items-center gap-2">
                <ReceiptText size={20} className="text-indigo-500" /> Recent Flows
              </h3>
              <div className="space-y-6">
                {transactions.length > 0 ? (
                  transactions.slice(0, 5).map((t) => (
                    <div key={t.id} className="flex justify-between items-center p-2 rounded-2xl hover:bg-slate-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold">
                          {t.category[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{t.description}</p>
                          <p className="text-[10px] uppercase text-slate-400">{t.category}</p>
                        </div>
                      </div>
                      <p className={`font-black ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-slate-400 italic py-10">No transactions yet.</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* COLUMN 3: Budgets */}
          <motion.div variants={item} className="lg:col-span-3">
             <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm sticky top-12">
               <BudgetInsight />
             </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}