"use client";

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

export const Input = forwardRef<HTMLInputElement & HTMLTextAreaElement, InputProps>(
  ({ label, error, multiline = false, rows = 4, className = "", ...props }, ref) => {
    const inputStyles = `
      w-full bg-white/10 backdrop-blur-xl border border-white/15 rounded-[20px] px-5 py-3.5 
      text-slate-900 placeholder-slate-400 dark:placeholder-slate-550 outline-none transition-all duration-200 
      focus:bg-white/20 focus:border-brand-blue/60 focus:ring-4 focus:ring-brand-blue/10
      dark:bg-slate-950/10 dark:border-white/5 dark:text-slate-100 dark:focus:bg-slate-950/20 dark:focus:border-brand-blue-accent/40
    `;

    return (
      <div className={`w-full flex flex-col gap-2 ${className}`}>
        {label && (
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
            {label}
          </label>
        )}
        {multiline ? (
          <textarea
            ref={ref}
            rows={rows}
            className={`${inputStyles} resize-none`}
            {...props}
          />
        ) : (
          <input ref={ref} className={inputStyles} {...props} />
        )}
        {error && (
          <span className="text-xs font-medium text-red-500 ml-1">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
