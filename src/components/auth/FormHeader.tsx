import { memo } from 'react';
import { Link } from 'react-router-dom';

const FormHeader = memo(() => {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl lg:text-4xl font-semibold mb-5 text-gray-900 dark:text-white">
        Sign up
      </h2>
      <p className="text-base text-gray-900 dark:text-gray-300">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 font-medium transition-colors underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
});

FormHeader.displayName = 'FormHeader';

export default FormHeader;
