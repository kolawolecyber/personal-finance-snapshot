import { z } from "zod";

export const transactionSchema = z.object({
  description: z.string().min(2, "A short note helps you remember this!"),
  amount: z.coerce
    .number()
    .positive("Amount must be more than 0")
    .max(1000000, "Limit exceeded"),
  // UPDATED: These must match the Store exactly
  category: z.enum([
    "Food & Dining", 
    "Housing & Rent", 
    "Transport", 
    "Entertainment", 
    "Health & Wellness"
  ]),
  date: z.string().min(1, "Date is required"),
  type: z.enum(["income", "expense"]),
});

export type TransactionInput = z.infer<typeof transactionSchema>;