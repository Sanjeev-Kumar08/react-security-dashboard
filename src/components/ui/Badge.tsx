import { memo } from 'react';

type Severity = 'critical' | 'high' | 'medium' | 'low';

interface BadgeProps {
  severity: Severity;
  count: number;
  className?: string;
  'aria-label'?: string;
}

const Badge = memo(
  ({
    severity,
    count,
    className = '',
    'aria-label': ariaLabel,
  }: BadgeProps) => {
    const severityStyles = {
      critical: 'bg-red-500/20 text-red-400 border-red-500/30',
      high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-green-500/20 text-green-400 border-green-500/30',
    };

    const severityLabels = {
      critical: 'Critical',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    };

    const defaultAriaLabel =
      ariaLabel ||
      `${count} ${severityLabels[severity]} severity ${count === 1 ? 'vulnerability' : 'vulnerabilities'}`;

    return (
      <span
        className={`inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded border ${severityStyles[severity]} ${className}`}
        role="status"
        aria-label={defaultAriaLabel}
        aria-live="polite"
      >
        {count}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
