import { memo, forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
}

const Checkbox = memo(
  forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className = '', id, 'aria-label': ariaLabel, ...props }, ref) => {
      const generatedId = useId();
      const checkboxId = id || `checkbox-${generatedId}`;
      const labelId = label ? `${checkboxId}-label` : undefined;

      return (
        <div className="flex items-center">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            aria-label={
              ariaLabel || (typeof label === 'string' ? label : undefined)
            }
            aria-labelledby={label ? labelId : undefined}
            className={`w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-teal-500 focus:ring-teal-500 focus:ring-2 cursor-pointer focus:outline-none ${className}`}
            {...props}
          />
          {label && (
            <label
              id={labelId}
              htmlFor={checkboxId}
              className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              {label}
            </label>
          )}
        </div>
      );
    }
  )
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
