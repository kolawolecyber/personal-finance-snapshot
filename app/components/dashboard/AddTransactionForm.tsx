// src/components/dashboard/AddTransactionForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { transactionSchema, TransactionInput } from "@/lib/validations";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AddTransactionForm() {
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: { type: 'expense', date: new Date().toISOString().split('T')[0] }
  });

  const onSubmit = (data: TransactionInput) => {
    addTransaction(data);
    reset(); // Clear form after success
    // Add a "Small Delight": A subtle toast notification here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">Add Transaction</h2>
        <p className="text-sm text-slate-500">Keep your snapshot up to date.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Description Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-tight text-slate-400">Description</label>
          <Input {...register("description")} placeholder="e.g., Weekly Groceries" className="rounded-xl border-slate-200" />
          {errors.description && <p className="text-xs text-orange-500">{errors.description.message}</p>}
        </div>

        {/* Amount Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-tight text-slate-400">Amount ($)</label>
          <Input type="number" step="0.01" {...register("amount")} placeholder="0.00" className="rounded-xl border-slate-200" />
          {errors.amount && <p className="text-xs text-orange-500">{errors.amount.message}</p>}
        </div>

        {/* Category Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-tight text-slate-400">Category</label>
          <Select onValueChange={(val) => setValue("category", val as any)}>
            <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Food">Food & Dining</SelectItem>
              <SelectItem value="Housing">Housing</SelectItem>
              <SelectItem value="Transport">Transport</SelectItem>
              <SelectItem value="Leisure">Entertainment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Date Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-tight text-slate-400">Date</label>
          <Input type="date" {...register("date")} className="rounded-xl border-slate-200" />
        </div>
      </div>

      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 font-medium transition-all active:scale-95">
        Save Transaction
      </Button>
    </form>
  );
}