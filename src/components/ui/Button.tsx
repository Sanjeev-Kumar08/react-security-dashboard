import { memo } from 'react';
import type { ButtonHTMLAttributes, ReactNode, KeyboardEvent } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  'aria-label'?: string;
}

const Button = memo(
  ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    onClick,
    'aria-label': ariaLabel,
    ...props
  }: ButtonProps) => {
    const baseStyles =
      'font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary:
        'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700',
      secondary:
        'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100',
      outline:
        'border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white focus:ring-teal-500 dark:border-teal-400 dark:text-teal-400',
      ghost:
        'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      // Allow Enter and Space to trigger click
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (onClick && !props.disabled) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick(e as any);
        }
      }
    };

    // Generate aria-label from children if not provided
    const label =
      ariaLabel || (typeof children === 'string' ? children : undefined);

    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-label={label}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
