import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon = false, 
  className = '',
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 border border-white",
    outline: "bg-transparent text-white border border-white hover:bg-white/10",
    text: "bg-transparent text-white hover:text-gray-300 underline-offset-4 hover:underline p-0",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <ArrowRight className="ml-2 h-5 w-5" />}
    </button>
  );
};