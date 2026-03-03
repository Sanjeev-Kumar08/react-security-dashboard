import { memo } from 'react';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const TermsCheckbox = memo<TermsCheckboxProps>(({ checked, onChange }) => {
  return (
    <div className="flex items-start pt-2 pb-1 !font-inter !font-semibold !text-base !text-gray-800 dark:!text-gray-200 !mb-0">
      <input
        type="checkbox"
        id="terms"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        required
        aria-label="I agree to Terms & Conditions and Privacy Policy"
        aria-required="true"
        className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600 text-teal-500 focus:ring-teal-400 focus:ring-2 focus:outline-none cursor-pointer mt-1 flex-shrink-0 bg-white dark:bg-gray-700"
      />
      <label
        htmlFor="terms"
        className="ml-3 cursor-pointer leading-relaxed text-gray-800 dark:text-gray-200"
      >
        I agree to Aps's{' '}
        <a
          href="#"
          className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors underline focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
          aria-label="Read Terms & Conditions"
        >
          Terms & Conditions
        </a>{' '}
        and acknowledge the{' '}
        <a
          href="#"
          className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-colors underline focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
          aria-label="Read Privacy Policy"
        >
          Privacy Policy
        </a>
      </label>
    </div>
  );
});

TermsCheckbox.displayName = 'TermsCheckbox';

export default TermsCheckbox;
