import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon = false, 
  className = '',
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed rounded-full";
  
  const sizeStyles = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const variants = {
    primary: "bg-white text-black hover:bg-gray-100 border border-transparent shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105",
    secondary: "bg-[#2c2c2e] text-white hover:bg-[#3a3a3c] border border-transparent",
    link: "bg-transparent text-[#2997ff] hover:text-[#4aa9ff] hover:underline underline-offset-4 p-0",
  };

  return (
    <button 
      className={`${baseStyle} ${sizeStyles[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <ArrowRight className="ml-2 h-4 w-4" />}
    </button>
  );
};