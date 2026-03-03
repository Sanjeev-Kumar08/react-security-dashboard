import { memo } from 'react';
import Skeleton from './Skeleton';

interface SkeletonLoaderProps {
  type?: 'table' | 'card' | 'list' | 'dashboard';
  count?: number;
}

const SkeletonLoader = memo(
  ({ type = 'card', count = 3 }: SkeletonLoaderProps) => {
    if (type === 'table') {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Skeleton variant="text" width="200px" height="20px" />
          </div>
          <div className="p-4 space-y-4">
            {Array.from({ length: count }).map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <Skeleton variant="rectangular" width="100%" height="60px" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (type === 'card') {
      return (
        <div className="space-y-4">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <Skeleton
                variant="text"
                width="60%"
                height="24px"
                className="mb-4"
              />
              <Skeleton
                variant="text"
                width="100%"
                height="16px"
                className="mb-2"
              />
              <Skeleton variant="text" width="80%" height="16px" />
            </div>
          ))}
        </div>
      );
    }

    if (type === 'list') {
      return (
        <div className="space-y-3">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton variant="circular" width="40px" height="40px" />
              <div className="flex-1">
                <Skeleton
                  variant="text"
                  width="60%"
                  height="16px"
                  className="mb-2"
                />
                <Skeleton variant="text" width="40%" height="14px" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (type === 'dashboard') {
      return (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <Skeleton
                  variant="text"
                  width="80px"
                  height="16px"
                  className="mb-4"
                />
                <Skeleton variant="text" width="60px" height="32px" />
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <Skeleton variant="text" width="200px" height="20px" />
            </div>
            <div className="p-4 space-y-3">
              {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Skeleton variant="text" width="25%" height="20px" />
                  <Skeleton variant="text" width="15%" height="20px" />
                  <Skeleton variant="text" width="15%" height="20px" />
                  <Skeleton variant="text" width="20%" height="20px" />
                  <Skeleton variant="text" width="15%" height="20px" />
                  <Skeleton variant="text" width="10%" height="20px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
);

SkeletonLoader.displayName = 'SkeletonLoader';

export default SkeletonLoader;
