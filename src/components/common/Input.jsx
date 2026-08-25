import React from 'react';
import { cn } from './Button';

const Input = React.forwardRef(({ className, type = 'text', label, error, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label className="text-sm font-medium opacity-80">{label}</label>}
      <input
        type={type}
        className={cn(
          "px-4 py-3 rounded bg-transparent border border-black/10 dark:border-white/10 focus:border-champagne focus:outline-none transition-colors w-full",
          error && "border-red-500 focus:border-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});
Input.displayName = 'Input';
export default Input;