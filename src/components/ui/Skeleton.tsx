import { memo } from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton = memo(
  ({
    className = '',
    variant = 'rectangular',
    width,
    height,
    animation = 'pulse',
  }: SkeletonProps) => {
    const baseStyles = 'bg-gray-200 dark:bg-gray-700';

    const variantStyles = {
      text: 'rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-lg',
    };

    const animationStyles = {
      pulse: 'animate-pulse',
      wave: 'animate-[wave_1.6s_ease-in-out_infinite]',
      none: '',
    };

    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height)
      style.height = typeof height === 'number' ? `${height}px` : height;

    return (
      <div
        className={`${baseStyles} ${variantStyles[variant]} ${animationStyles[animation]} ${className}`}
        style={style}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
