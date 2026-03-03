import { memo } from 'react';
import { MdLightMode } from 'react-icons/md';
import { MdDarkMode } from 'react-icons/md';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = memo(() => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-gray-300 dark:bg-gray-800 transition-colors rounded-full  cursor-pointer relative !z-50"
      aria-label="Toggle theme"
      type="button"
    >
      {theme === 'dark' ? (
        <MdLightMode className="w-5 h-5 text-yellow-400" />
      ) : (
        <MdDarkMode className="w-5 h-5 text-black" />
      )}
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;
