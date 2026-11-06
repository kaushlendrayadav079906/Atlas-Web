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
    primary: "bg-atlas-royal hover:bg-atlas-royalDark text-white focus-visible:ring-atlas-royal focus-visible:ring-offset-white shadow-[0_10px_24px_-12px_rgba(31,79,224,0.7)]",
    secondary: "bg-white text-atlas-navy hover:bg-atlas-mist border-[1.5px] border-atlas-navy focus-visible:ring-atlas-navy focus-visible:ring-offset-white",
    outline: "bg-transparent text-atlas-royal hover:bg-atlas-royalTint border-[1.5px] border-atlas-royal focus-visible:ring-atlas-royal focus-visible:ring-offset-white",
    ghost: "bg-transparent text-atlas-body hover:bg-atlas-mist border border-transparent focus-visible:ring-slate-400",
    cyan: "bg-atlas-gold text-atlas-navy hover:bg-[#EBB55A] font-extrabold focus-visible:ring-atlas-gold focus-visible:ring-offset-atlas-navy",
    gold: "bg-atlas-royal hover:bg-atlas-royalDark text-white focus-visible:ring-atlas-royal shadow-[0_10px_24px_-12px_rgba(31,79,224,0.7)]",
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
