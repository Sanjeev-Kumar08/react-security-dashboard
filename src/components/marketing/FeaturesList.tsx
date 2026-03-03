import { memo } from 'react';

const features = [
  'Effortlessly spider and map targets to uncover hidden security flaws',
  'Deliver high-quality, validated findings in hours, not weeks.',
  'Generate professional, enterprise-grade security reports automatically.',
];

const FeaturesList = memo(() => {
  return (
    <div className="w-full max-w-xl">
      <h2 className="text-xl lg:text-2xl font-semibold mb-6 lg:mb-8">
        What's included
      </h2>
      <ul className="!space-y-5 lg:!space-y-6 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-4 text-teal-300 text-xl lg:text-2xl flex-shrink-0 mt-0.5">
              ✓
            </span>
            <span className="text-base lg:text-lg xl:text-xl leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
});

FeaturesList.displayName = 'FeaturesList';

export default FeaturesList;
