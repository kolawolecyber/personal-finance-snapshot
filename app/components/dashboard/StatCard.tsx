// src/components/dashboard/StatCard.tsx
"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  type?: 'positive' | 'negative' | 'neutral';
  trend?: string; // e.g., "Safe to spend" or "Limit reached"
}

export const StatCard = ({ label, value, type = 'neutral', trend }: StatCardProps) => {
  // 2026 OKLCH Color logic for high-end UI
  const styles = {
    positive: "text-[oklch(0.65_0.2_150)] bg-[oklch(0.95_0.05_150)]",
    negative: "text-[oklch(0.6_0.18_25)] bg-[oklch(0.95_0.05_25)]",
    neutral: "text-slate-600 bg-slate-50",
  };

  return (
    <motion.div 
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative overflow-hidden p-6 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm transition-shadow hover:shadow-xl hover:shadow-indigo-500/5"
    >
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <div className={`p-2 rounded-xl ${styles[type]}`}>
          {type === 'positive' ? <TrendingUp size={16} /> : type === 'negative' ? <TrendingDown size={16} /> : <Wallet size={16} />}
        </div>
      </div>

      <h3 className="text-4xl font-black tracking-tighter text-slate-900 mb-4">
        ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </h3>

      {/* The "Winner" Touch: Contextual Insight */}
      {trend && (
        <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full w-fit ${styles[type]}`}>
          <Sparkles size={10} strokeWidth={3} />
          {trend}
        </div>
      )}
      
      {/* Decorative background element for 2026 aesthetic */}
      <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-slate-900 pointer-events-none">
        <Wallet size={120} />
      </div>
    </motion.div>
  );
};