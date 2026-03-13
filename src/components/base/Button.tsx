import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'whitespace-nowrap font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#FF385C] text-white hover:bg-[#E31C5F] active:scale-95',
    secondary: 'bg-[#222222] text-white hover:bg-[#000000] active:scale-95',
    outline: 'border-2 border-[#222222] text-[#222222] hover:bg-[#222222] hover:text-white active:scale-95',
    ghost: 'text-[#222222] hover:bg-[#F7F7F7] active:scale-95',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <i className="ri-loader-4-line animate-spin"></i>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}