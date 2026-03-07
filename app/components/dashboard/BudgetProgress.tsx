// src/components/dashboard/BudgetProgress.tsx
import { motion } from 'framer-motion';

export const BudgetProgress = ({ category, spent, limit }: { category: string, spent: number, limit: number }) => {
  const progress = Math.min((spent / limit) * 100, 100);
  
  return (
    <div className="group space-y-2 p-4 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 transition-all duration-300">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{category}</p>
          <p className="text-xl font-bold text-slate-900">${spent.toLocaleString()}</p>
        </div>
        <p className="text-sm text-slate-500 italic">of ${limit}</p>
      </div>
      
      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className={`h-full rounded-full ${
            progress > 90 ? 'bg-orange-400' : 'bg-indigo-500'
          }`}
        />
      </div>
    </div>
  );
};