"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { transactionSchema, TransactionInput } from "@/app/lib/validations";
import { useFinanceStore } from "@/app/store/useFinanceStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  PlusCircle, 
  Utensils, 
  Home, 
  Car, 
  Ticket, 
  HeartPulse, 
  Calendar as CalendarIcon,
  DollarSign
} from "lucide-react";

export function AddTransactionForm() {
  const addTransaction = useFinanceStore((state) => state.addTransaction);

  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema) as any, 
    defaultValues: {
      description: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      category: 'Food & Dining',
      type: 'expense'
    }
  });

  const onSubmit = (data: TransactionInput) => {
    addTransaction({ ...data, amount: Number(data.amount) });
    reset();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-slate-100 dark:border-zinc-800 shadow-2xl overflow-hidden"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* HEADER WITH INTEGRATED TYPE TOGGLE */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">New Entry</h2>
            <div className="h-1 w-8 bg-indigo-500 rounded-full mt-1" />
          </div>

          {/* PREMIUM SEGMENTED TOGGLE */}
          <Controller 
            name="type" 
            control={control} 
            render={({ field }) => (
              <div className="flex p-1 bg-slate-100 dark:bg-zinc-800 rounded-2xl w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => field.onChange('expense')}
                  className={`flex-1 sm:px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    field.value === 'expense' 
                    ? 'bg-white dark:bg-zinc-700 text-rose-500 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => field.onChange('income')}
                  className={`flex-1 sm:px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    field.value === 'income' 
                    ? 'bg-white dark:bg-zinc-700 text-emerald-500 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Income
                </button>
              </div>
            )} 
          />
        </header>

        <div className="space-y-5">
          {/* DESCRIPTION: Full Width */}
          <div className="group space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Label</label>
            <div className="relative">
              <Input 
                {...register("description")} 
                placeholder="Where did it go?" 
                className="h-14 rounded-2xl bg-slate-50 dark:bg-zinc-800 border-none px-6 focus-visible:ring-2 focus-visible:ring-indigo-500/20 font-medium" 
              />
            </div>
          </div>

          {/* AMOUNT & DATE: Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Amount</label>
              <div className="relative">
                <DollarSign size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input 
                  type="number" step="0.01" 
                  {...register("amount", { valueAsNumber: true })} 
                  className="h-14 rounded-2xl bg-slate-50 dark:bg-zinc-800 border-none pl-10 pr-6 font-bold text-lg" 
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Date</label>
              <div className="relative">
                <CalendarIcon size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <Input 
                  type="date" 
                  {...register("date")} 
                  className="h-14 rounded-2xl bg-slate-50 dark:bg-zinc-800 border-none pl-12 pr-6 text-xs font-bold uppercase [color-scheme:dark]" 
                />
              </div>
            </div>
          </div>

          {/* CLASSIFICATION: Full Width & Professional */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Classification</label>
            <Controller name="category" control={control} render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-14 rounded-2xl bg-slate-50 dark:bg-zinc-800 border-none px-6 text-xs font-black uppercase tracking-tighter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-none shadow-2xl dark:bg-zinc-800 p-2">
                  <SelectItem value="Food & Dining" className="rounded-xl py-3 focus:bg-indigo-50 dark:focus:bg-indigo-500/10">
                    <div className="flex items-center gap-3"><Utensils size={14}/> Food & Dining</div>
                  </SelectItem>
                  <SelectItem value="Housing & Rent" className="rounded-xl py-3 focus:bg-indigo-50 dark:focus:bg-indigo-500/10">
                    <div className="flex items-center gap-3"><Home size={14}/> Housing & Rent</div>
                  </SelectItem>
                  <SelectItem value="Transport" className="rounded-xl py-3 focus:bg-indigo-50 dark:focus:bg-indigo-500/10">
                    <div className="flex items-center gap-3"><Car size={14}/> Transport</div>
                  </SelectItem>
                  <SelectItem value="Entertainment" className="rounded-xl py-3 focus:bg-indigo-50 dark:focus:bg-indigo-500/10">
                    <div className="flex items-center gap-3"><Ticket size={14}/> Entertainment</div>
                  </SelectItem>
                  <SelectItem value="Health & Wellness" className="rounded-xl py-3 focus:bg-indigo-50 dark:focus:bg-indigo-500/10">
                    <div className="flex items-center gap-3"><HeartPulse size={14}/> Health & Wellness</div>
                  </SelectItem>
                </SelectContent>
              </Select>
            )} />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full h-16 rounded-2xl bg-zinc-900 dark:bg-indigo-600 hover:bg-zinc-800 dark:hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-3 group"
        >
          {isSubmitting ? "SYNCING..." : (
            <>
              <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-500" />
              Finalize Entry
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}