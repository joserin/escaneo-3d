import type { InputHTMLAttributes } from 'react';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Field({ className = '', ...props }: FieldProps) {
  return <input className={`form-input ${className}`} {...props} />;
}