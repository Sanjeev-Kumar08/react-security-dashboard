import { memo } from 'react';
import { HiStar } from 'react-icons/hi';

const TrustpilotRating = memo(() => {
  return (
    <>
      <div className="flex items-center gap-[2px] mb-2">
        <HiStar className="w-5 h-5 text-green-400 flex-shrink-0" />
        <div className="flex flex-col">
          <span className="text-sm lg:text-base font-medium">Trustpilot</span>
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-medium text-xl">Rated 4.5/5.0</span>
        <span className="text-sm text-gray-300">(100k+ reviews)</span>
      </div>
    </>
  );
});

TrustpilotRating.displayName = 'TrustpilotRating';

export default TrustpilotRating;
