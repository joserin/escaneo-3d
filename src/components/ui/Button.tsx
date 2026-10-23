import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'submit' | 'link' | 'menu' | 'control';
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  let baseStyles = 'button transition-all duration-180 cursor-pointer inline-flex items-center justify-center font-bold ';

  switch (variant) {
    case 'primary':
      baseStyles += 'primary-button gap-5 text-[#11161c] bg-[#ff6816] shadow-[0_10px_38px_rgba(255,104,22,0.16)] hover:bg-[#ff812f]';
      break;
    case 'secondary':
      baseStyles += 'secondary-button gap-3 border border-[#35414d] text-[#dbe1e7] bg-[rgba(15,23,33,0.6)] hover:border-[#62707e] hover:bg-[#141d26]';
      break;
    case 'submit':
      baseStyles += 'quote-submit gap-[22px] w-full min-h-[55px] text-[#101419] bg-[#ff6816] hover:bg-[#ff812f] disabled:bg-[#2a343d] disabled:text-[#707a82] disabled:cursor-not-allowed';
      break;
    case 'link':
      baseStyles += 'service-link gap-[11px] bg-transparent text-[#ff7a32] text-xs font-bold';
      break;
    case 'menu':
      baseStyles += 'menu-button w-[42px] h-[42px] border border-[#26313c] bg-transparent';
      break;
    case 'control':
      baseStyles += 'control w-[34px] h-[34px] text-[#a9b3bd] bg-transparent hover:text-[#10151a] hover:bg-[#ff6816]';
      break;
    default:
      break;
  }

  return (
    <button className={`${baseStyles} ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
}