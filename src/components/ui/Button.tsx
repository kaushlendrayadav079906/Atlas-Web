import React from 'react';
import { Link } from 'react-router-dom';

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
    primary: "bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white focus-visible:ring-[#0066CC] focus-visible:ring-offset-white shadow-md shadow-blue-500/25",
    secondary: "bg-white text-[#142B59] hover:bg-slate-50 border border-slate-300 focus-visible:ring-slate-400 focus-visible:ring-offset-white shadow-sm",
    outline: "bg-transparent text-[#0066CC] hover:bg-blue-50 border border-[#0066CC] focus-visible:ring-[#0066CC] focus-visible:ring-offset-white",
    ghost: "bg-transparent text-[#45546B] hover:bg-slate-100 border border-transparent focus-visible:ring-slate-400",
    cyan: "bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold shadow-md focus-visible:ring-cyan-400",
    gold: "bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white font-semibold shadow-md shadow-blue-500/25",
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
    if (href.startsWith('/') && !href.startsWith('//')) {
      return (
        <Link to={href} className={combinedClasses} tabIndex={0}>
          {content}
        </Link>
      );
    }
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
