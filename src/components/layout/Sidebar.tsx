import { memo, useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import {
  HiOutlineViewGrid,
  HiOutlineFolder,
  HiOutlineCalendar,
  HiOutlineBell,
  HiOutlineCog,
  HiOutlineChatAlt2,
} from 'react-icons/hi';
import { useSidebar } from '../../contexts/SidebarContext';
import type { ReactNode } from 'react';

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <HiOutlineViewGrid className="w-5 h-5" />,
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: <HiOutlineFolder className="w-5 h-5" />,
  },
  {
    label: 'Scan',
    path: '/scan/1',
    icon: <HiOutlineFolder className="w-5 h-5" />,
  },
  {
    label: 'Schedule',
    path: '/schedule',
    icon: <HiOutlineCalendar className="w-5 h-5" />,
  },
  {
    label: 'Notifications',
    path: '/notifications',
    icon: <HiOutlineBell className="w-5 h-5" />,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: <HiOutlineCog className="w-5 h-5" />,
  },
  {
    label: 'Support',
    path: '/support',
    icon: <HiOutlineChatAlt2 className="w-5 h-5" />,
  },
];

const Sidebar = memo(() => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isCollapsed, setIsCollapsed } = useSidebar();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint in Tailwind
    };

    // Check on mount
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Mobile menu button */}
      <AnimatePresence>
        {!isMobileOpen && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => {
              setIsCollapsed(!isCollapsed);
              setIsMobileOpen(!isMobileOpen);
            }}
            onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsCollapsed(!isCollapsed);
                setIsMobileOpen(!isMobileOpen);
              }
            }}
            className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
          >
            <FaAngleDoubleRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`absolute lg:fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 transform transition-all duration-300 ${
          isMobileOpen
            ? 'translate-x-0 w-[80%] sm:w-64'
            : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        <div className={`flex flex-col h-full ${isCollapsed ? 'p-4' : 'p-6'}`}>
          {/* Header with Close Button and Logo */}
          <div
            className={`flex items-start mb-8 ${isCollapsed ? 'flex-col items-center gap-3' : 'justify-between'}`}
          >
            {/* Close/Collapse Button - Inside Sidebar */}
            <button
              onClick={() => {
                setIsCollapsed(!isCollapsed);
                setIsMobileOpen(false);
              }}
              onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsCollapsed(!isCollapsed);
                  setIsMobileOpen(false);
                }
              }}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!isCollapsed}
            >
              {isCollapsed ? (
                <FaAngleDoubleRight className="lg:block hidden w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <FaAngleDoubleLeft className="lg:block hidden w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
              <FaAngleDoubleLeft className="lg:hidden block w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Logo */}
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">
              FS
            </div>
          </div>

          {/* Navigation */}
          <nav
            className="flex-1 !space-y-2"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset ${
                    isCollapsed
                      ? 'lg:justify-center lg:px-2 lg:py-2 px-4 py-3'
                      : 'px-4 py-3'
                  } ${
                    isActive(item.path)
                      ? 'bg-teal-500/10 text-teal-500 dark:bg-teal-500/20 dark:text-teal-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                  aria-label={item.label}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  <span
                    className={`${isCollapsed ? 'lg:mr-0 mr-3' : 'mr-3'} flex items-center justify-center text-current`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`font-medium ${isCollapsed ? 'lg:hidden' : ''}`}
                  >
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* User Profile */}
          <div className="mt-auto">
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                isCollapsed && !isMobile
                  ? 'justify-center px-2'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                JD
              </div>
              {(!isCollapsed || isMobile) && (
                <div className={`${!isMobile ? 'ml-3' : ''} flex-1`}>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    john@example.com
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
