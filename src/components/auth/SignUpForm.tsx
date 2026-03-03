import { memo } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import FormHeader from './FormHeader';
import SignUpFormFields from './SignUpFormFields';
import TermsCheckbox from './TermsCheckbox';
import SocialLoginButtons from './SocialLoginButtons';

interface SignUpFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    terms: boolean;
  };
  handleChange: (field: string, value: string | boolean) => void;
  handleSubmit: (e: FormEvent) => void;
}

const SignUpForm = memo<SignUpFormProps>(
  ({ formData, handleChange, handleSubmit }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative min-h-screen"
      >
        <div className="w-full max-w-xl">
          <div className="!p-6 lg:!p-12 !space-y-7 bg-white dark:bg-gray-800 rounded-2xl lg:p-14 border border-gray-100 dark:border-gray-700">
            <FormHeader />

            <form onSubmit={handleSubmit} className="!space-y-6">
              <SignUpFormFields
                formData={formData}
                handleChange={(field, value) => handleChange(field, value)}
              />

              <TermsCheckbox
                checked={formData.terms}
                onChange={checked => handleChange('terms', checked)}
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full text-base font-medium py-3 mt-6 rounded-full shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              >
                Create account
              </Button>
            </form>

            <SocialLoginButtons />
          </div>
        </div>
      </motion.div>
    );
  }
);

SignUpForm.displayName = 'SignUpForm';

export default SignUpForm;
