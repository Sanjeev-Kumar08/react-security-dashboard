import { memo } from 'react';

const Logo = memo(() => {
  return (
    <div className="flex items-center gap-2 mb-8 mt-12 lg:mt-0">
      <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-white"></div>
      </div>
      <span className="text-xl font-semibold">aps</span>
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;
