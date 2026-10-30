import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cyan' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-[15px] sm:text-[16px] gap-2",
    md: "px-6 py-3 text-[16px] sm:text-[17px] gap-2.5 shadow-sm",
    lg: "px-7 py-3.5 text-[16px] sm:text-[18px] gap-2.5 shadow-md",
  };

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 focus-visible:ring-offset-white shadow-blue-600/20",
    secondary: "bg-white text-slate-800 hover:bg-slate-50 border border-slate-300 focus-visible:ring-slate-400 focus-visible:ring-offset-white",
    outline: "bg-transparent text-blue-600 hover:bg-blue-50 border border-blue-600 focus-visible:ring-blue-500 focus-visible:ring-offset-white",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 border border-transparent focus-visible:ring-blue-500",
    cyan: "bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold shadow-md focus-visible:ring-cyan-400",
    gold: "bg-[#d99120] text-white hover:bg-[#bd7810] font-semibold shadow-md focus-visible:ring-amber-500 shadow-amber-500/20",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={combinedClasses} tabIndex={0}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};
