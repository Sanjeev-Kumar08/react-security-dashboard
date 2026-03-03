import { memo, forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    (
      { error, className = '', label, 'aria-label': ariaLabel, ...props },
      ref
    ) => {
      const inputId = props.id || `input-${props.name || 'default'}`;
      const labelId = label ? `${inputId}-label` : undefined;

      return (
        <div className="w-full">
          {label && (
            <label
              htmlFor={inputId}
              id={labelId}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {label}
            </label>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-label={ariaLabel || label}
            aria-describedby={error ? `${inputId}-error` : undefined}
            aria-invalid={error ? 'true' : undefined}
            className={`w-full font-inter font-normal px-4 py-4 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 ${error ? 'border-red-500 dark:border-red-400' : ''} ${className}`}
            {...props}
          />
          {error && (
            <p
              id={`${inputId}-error`}
              className="mt-1 text-sm text-red-500 dark:text-red-400"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      );
    }
  )
);

Input.displayName = 'Input';

export default Input;
