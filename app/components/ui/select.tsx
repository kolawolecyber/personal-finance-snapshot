// src/components/ui/select.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative group">
        <select
          ref={ref}
          className={cn(
            "flex h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:opacity-50",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {/* Custom Chevron for that 2026 Polish */}
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400 group-hover:text-slate-600 transition-colors">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 4.5 3 3 3-3"/>
          </svg>
        </div>
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }