import { memo } from 'react';

type Status = 'completed' | 'scheduled' | 'failed' | 'in-progress';

interface StatusChipProps {
  status: Status;
  className?: string;
  'aria-label'?: string;
}

const StatusChip = memo(
  ({ status, className = '', 'aria-label': ariaLabel }: StatusChipProps) => {
    const statusStyles = {
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      scheduled: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      failed: 'bg-red-500/20 text-red-400 border-red-500/30',
      'in-progress': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    };

    const statusLabels = {
      completed: 'Completed',
      scheduled: 'Scheduled',
      failed: 'Failed',
      'in-progress': 'In Progress',
    };

    const statusDescriptions = {
      completed: 'Scan status: Completed',
      scheduled: 'Scan status: Scheduled',
      failed: 'Scan status: Failed',
      'in-progress': 'Scan status: In Progress',
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${statusStyles[status]} ${className}`}
        role="status"
        aria-label={ariaLabel || statusDescriptions[status]}
        aria-live="polite"
      >
        {statusLabels[status]}
      </span>
    );
  }
);

StatusChip.displayName = 'StatusChip';

export default StatusChip;
