import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cyan';
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
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5 shadow-md",
  };

  const variantStyles = {
    primary: "bg-brand-600 text-white hover:bg-brand-500 shadow-md shadow-brand-900/30 border border-brand-500/30 focus-visible:ring-brand-400 focus-visible:ring-offset-navy-950",
    secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700/80 focus-visible:ring-slate-400 focus-visible:ring-offset-navy-950",
    outline: "bg-transparent text-slate-700 hover:bg-slate-100 border border-slate-300 focus-visible:ring-brand-500 focus-visible:ring-offset-white",
    ghost: "bg-transparent text-slate-300 hover:bg-white/10 hover:text-white border border-transparent focus-visible:ring-cyan-400",
    cyan: "bg-accent-cyan text-navy-950 hover:bg-cyan-300 font-bold shadow-lg shadow-cyan-500/20 focus-visible:ring-cyan-400 focus-visible:ring-offset-navy-950",
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

