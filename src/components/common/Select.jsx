import React from 'react';
import { cn } from './Button';

const Select = React.forwardRef(({ className, label, options, error, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label className="text-sm font-medium opacity-80">{label}</label>}
      <select
        className={cn(
          "px-4 py-3 rounded bg-transparent border border-black/10 dark:border-white/10 focus:border-champagne focus:outline-none transition-colors w-full appearance-none",
          error && "border-red-500 focus:border-red-500",
          className
        )}
        ref={ref}
        {...props}
      >
        <option value="" disabled className="text-gray-500">Select an option</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.value} className="bg-cream dark:bg-espresso text-espresso dark:text-cream">{opt.label}</option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});
Select.displayName = 'Select';
export default Select;