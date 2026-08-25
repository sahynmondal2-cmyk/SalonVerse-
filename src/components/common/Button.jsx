import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyle = "px-6 py-3 rounded font-medium text-sm tracking-wide transition-colors duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-espresso text-cream dark:bg-cream dark:text-espresso hover:bg-surface dark:hover:bg-gray-200",
    secondary: "border border-espresso text-espresso dark:border-cream dark:text-cream hover:bg-espresso/5 dark:hover:bg-cream/10",
    ghost: "text-espresso dark:text-cream hover:bg-espresso/5 dark:hover:bg-cream/10"
  };
  
  return (
    <button className={cn(baseStyle, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
export default Button;