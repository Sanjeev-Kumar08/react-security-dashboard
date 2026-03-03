import { memo, useState, useMemo, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import { useSidebar } from '../contexts/SidebarContext';
import Badge from '../components/ui/Badge';
import StatusChip from '../components/ui/StatusChip';
import Button from '../components/ui/Button';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import { scans, severityStats } from '../data/mockData';
import { formatRelativeTime } from '../utils/dateUtils';

const tableColumns = [
  'Scan Name',
  'Type',
  'Status',
  'Progress',
  'Vulnerabilities',
  'Last Scan',
];

const Dashboard = memo(() => {
  const navigate = useNavigate();
  const { isCollapsed } = useSidebar();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Simulate API call delay
    return () => clearTimeout(timer);
  }, []);

  const filteredScans = useMemo(() => {
    if (!searchQuery) return scans;
    return scans.filter(
      scan =>
        scan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scan.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleScanClick = (scanId: string) => {
    navigate(`/scan/${scanId}`);
  };

  const handleScanKeyDown = (
    e: KeyboardEvent<HTMLTableRowElement>,
    scanId: string
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleScanClick(scanId);
    }
  };

  const handleNewScan = () => {
    alert('New Scan functionality would open a modal here');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main
        className={`p-4 lg:p-8 pt-20 lg:pt-10 transition-all duration-300 ${
          isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl font-bold mb-8 text-gray-900 dark:text-white"
          >
            Dashboard
          </motion.h1>

          {/* Stats Bar */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {(['critical', 'high', 'medium', 'low'] as const).map(
                  (severity, index) => {
                    const stat = severityStats[severity];
                    const isPositive = stat.change > 0;
                    return (
                      <motion.div
                        key={severity}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase">
                            {severity}
                          </h3>
                          <Badge severity={severity} count={stat.count} />
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stat.count}
                          </span>
                          <span
                            className={`ml-2 text-sm font-medium ${
                              isPositive
                                ? 'text-red-500 dark:text-red-400'
                                : 'text-green-500 dark:text-green-400'
                            }`}
                          >
                            {isPositive ? '↑' : '↓'} {Math.abs(stat.change)}%
                          </span>
                        </div>
                      </motion.div>
                    );
                  }
                )}
              </div>
            )}
          </AnimatePresence>

          {/* Toolbar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search scans..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Escape') {
                    setSearchQuery('');
                  }
                }}
                aria-label="Search scans by name or type"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" aria-label="Filter scans">
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                aria-label="Customize table columns"
              >
                Columns
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleNewScan}
                aria-label="Create new scan"
              >
                New Scan
              </Button>
            </div>
          </div>

          {/* Scan Table */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <SkeletonLoader type="dashboard" count={5} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table
                    className="w-full"
                    role="table"
                    aria-label="Security scans table"
                  >
                    <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        {tableColumns.map(column => (
                          <th
                            key={column}
                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredScans.map((scan, index) => (
                        <motion.tr
                          key={scan.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          onClick={() => handleScanClick(scan.id)}
                          onKeyDown={e => handleScanKeyDown(e, scan.id)}
                          tabIndex={0}
                          role="row"
                          aria-label={`Scan: ${scan.name}, Status: ${scan.status}, Progress: ${scan.progress}%`}
                          className="hover:bg-teal-50 dark:hover:bg-teal-900/20 cursor-pointer transition-colors group focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                              {scan.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {scan.type}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusChip status={scan.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                                <div
                                  className="bg-teal-500 h-2 rounded-full transition-all"
                                  style={{ width: `${scan.progress}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {scan.progress}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-1 flex-wrap">
                              {scan.vulnerabilities.critical > 0 && (
                                <Badge
                                  severity="critical"
                                  count={scan.vulnerabilities.critical}
                                />
                              )}
                              {scan.vulnerabilities.high > 0 && (
                                <Badge
                                  severity="high"
                                  count={scan.vulnerabilities.high}
                                />
                              )}
                              {scan.vulnerabilities.medium > 0 && (
                                <Badge
                                  severity="medium"
                                  count={scan.vulnerabilities.medium}
                                />
                              )}
                              {scan.vulnerabilities.low > 0 && (
                                <Badge
                                  severity="low"
                                  count={scan.vulnerabilities.low}
                                />
                              )}
                              {Object.values(scan.vulnerabilities).every(
                                v => v === 0
                              ) && (
                                <span className="text-sm text-gray-400">-</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {formatRelativeTime(scan.lastScanTime)}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Helper text */}
          {!isLoading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center"
            >
              💡 Click on any scan row or press Enter to view details
            </motion.p>
          )}
        </motion.div>
      </main>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
