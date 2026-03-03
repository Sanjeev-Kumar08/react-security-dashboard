import { memo } from 'react';
import { motion } from 'framer-motion';
import Logo from '../ui/Logo';
import FeaturesList from './FeaturesList';
import TrustpilotRating from './TrustpilotRating';

const LeftSideContent = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between text-white z-10 min-h-screen"
    >
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <Logo />
      </div>

      {/* Centered Content */}
      <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-4 lg:px-0">
        <p className="lg:text-[52px]/normal sm:text-[40px]/normal text-[28px]/normal mb-12 lg:mb-16 font-semibold">
          Expert level <span className="inline-block">Cybersecurity</span> in{' '}
          <span className="text-teal-300 font-semibold">hours</span> not weeks.
        </p>

        <FeaturesList />
      </div>

      {/* Trustpilot Rating */}
      <TrustpilotRating />
    </motion.div>
  );
});

LeftSideContent.displayName = 'LeftSideContent';

export default LeftSideContent;
