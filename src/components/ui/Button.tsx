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
  const baseStyles = "group atlas-sheen inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed select-none whitespace-nowrap";

  const sizeStyles = {
    sm: "px-4 py-2 text-[14px] sm:text-[15px] gap-2",
    md: "px-6 py-3 text-[15px] sm:text-[16px] gap-2.5",
    lg: "px-7 py-4 text-[16px] gap-2.5",
  };

  const variantStyles = {
    primary: "bg-[#E0A33B] hover:bg-[#D4972F] text-atlas-navy font-bold focus-visible:ring-[#E0A33B] focus-visible:ring-offset-white shadow-[0_4px_14px_rgba(224,163,59,0.35)]",
    secondary: "bg-white text-atlas-navy hover:bg-atlas-mist border-[1.5px] border-atlas-lineStrong hover:border-[#E0A33B] focus-visible:ring-[#E0A33B] focus-visible:ring-offset-white",
    outline: "bg-transparent text-atlas-navy hover:bg-atlas-goldTint border-[1.5px] border-[#E0A33B] focus-visible:ring-[#E0A33B] focus-visible:ring-offset-white",
    ghost: "bg-transparent text-atlas-body hover:bg-atlas-mist border border-transparent focus-visible:ring-slate-400",
    cyan: "bg-[#E0A33B] hover:bg-[#D4972F] text-atlas-navy font-extrabold focus-visible:ring-[#E0A33B] shadow-[0_4px_14px_rgba(224,163,59,0.35)]",
    gold: "bg-[#E0A33B] hover:bg-[#D4972F] text-atlas-navy font-bold focus-visible:ring-[#E0A33B] shadow-[0_4px_14px_rgba(224,163,59,0.35)]",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0 relative z-[2]">{icon}</span>}
      <span className="relative z-[2]">{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0 relative z-[2] transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
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
