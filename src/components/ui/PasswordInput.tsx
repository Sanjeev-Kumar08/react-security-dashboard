import { memo, useState, forwardRef } from 'react';
import type { InputHTMLAttributes, KeyboardEvent } from 'react';
import { HiEye } from 'react-icons/hi';
import { RiEyeCloseLine } from 'react-icons/ri';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  'aria-label'?: string;
}

const PasswordInput = memo(
  forwardRef<HTMLInputElement, PasswordInputProps>(
    (
      {
        label,
        error,
        className = '',
        value,
        'aria-label': ariaLabel,
        ...props
      },
      ref
    ) => {
      const [showPassword, setShowPassword] = useState(false);

      // Validate password length
      const passwordValue = typeof value === 'string' ? value : '';
      const isPasswordTooShort =
        passwordValue.length > 0 && passwordValue.length < 8;
      const validationError = isPasswordTooShort
        ? 'Password must be at least 8 characters long'
        : '';
      const displayError = error || validationError;
      const inputId = props.id || `password-input-${props.name || 'default'}`;
      const labelId = label ? `${inputId}-label` : undefined;

      const handleToggleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setShowPassword(!showPassword);
        }
      };

      return (
        <div className="w-full !mb-0">
          {label && (
            <label
              htmlFor={inputId}
              id={labelId}
              className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-200"
            >
              {label}
            </label>
          )}
          <div className="relative">
            <input
              ref={ref}
              id={inputId}
              type={showPassword ? 'text' : 'password'}
              value={value}
              aria-label={ariaLabel || label}
              aria-describedby={displayError ? `${inputId}-error` : undefined}
              aria-invalid={displayError ? 'true' : undefined}
              className={`w-full font-inter font-normal px-4 py-4 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 ${className} ${
                displayError ? 'border-red-500 dark:border-red-500' : ''
              }`}
              {...props}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              onKeyDown={handleToggleKeyDown}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400 rounded p-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <RiEyeCloseLine className="w-5 h-5" />
              ) : (
                <HiEye className="w-5 h-5" />
              )}
            </button>
          </div>
          {displayError && (
            <p
              id={`${inputId}-error`}
              className="mt-1 text-sm text-red-500 dark:text-red-400"
              role="alert"
            >
              {displayError}
            </p>
          )}
        </div>
      );
    }
  )
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
