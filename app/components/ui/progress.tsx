// src/components/ui/progress.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps {
  value: number; // 0 to 100
  className?: string;
  indicatorClassName?: string;
}

const Progress = ({ value, className, indicatorClassName }: ProgressProps) => {
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-slate-100", className)}>
      <div
        className={cn("h-full w-full flex-1 transition-all duration-500 ease-in-out", indicatorClassName)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
}

export { Progress }