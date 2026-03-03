/**
 * Converts a date string to a relative time format (e.g., "4d ago", "5d ago")
 * @param dateString - Date string in format "YYYY-MM-DD HH:mm:ss"
 * @returns Relative time string (e.g., "4d ago", "2h ago", "30m ago")
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString.replace(' ', 'T'));
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks}w ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}mo ago`;
  } else {
    return `${diffInYears}y ago`;
  }
};

/**
 * Formats a date string to "MMM DD, YYYY, HH:MM AM/PM" format
 * @param dateString - Date string in format "YYYY-MM-DD HH:mm:ss"
 * @returns Formatted date string (e.g., "Nov 22, 2024, 09:00 AM")
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString.replace(' ', 'T'));

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  return `${month} ${day}, ${year}, ${hours}:${minutesStr} ${ampm}`;
};
