import { memo, useState, useMemo, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi';
import Sidebar from '../components/layout/Sidebar';
import { useSidebar } from '../contexts/SidebarContext';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import { scanDetails } from '../data/mockData';
import type { LogEntry } from '../data/mockData';
import { formatDateTime } from '../utils/dateUtils';

const ScanDetail = memo(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isCollapsed } = useSidebar();
  const [activeTab, setActiveTab] = useState<'activity' | 'verification'>(
    'activity'
  );
  const [isLoading, setIsLoading] = useState(true);

  const scan = useMemo(() => {
    return id ? scanDetails[id] : null;
  }, [id]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  if (!scan) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <main
          className={`p-8 transition-all duration-300 ${
            isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
          }`}
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Scan not found
            </h1>
            <Button onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const steps = ['Spidering', 'Mapping', 'Testing', 'Validating', 'Reporting'];
  const currentStepIndex = steps.indexOf(scan.currentStep);

  const handleStopScan = () => {
    alert('Stop Scan functionality would stop the scan here');
  };

  const handleExportReport = () => {
    alert('Export Report functionality would export the report here');
  };

  const handleTabKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    tab: 'activity' | 'verification'
  ) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveTab(tab === 'activity' ? 'verification' : 'activity');
    }
  };

  const handleBackKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate('/dashboard');
    }
  };

  const getLogLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'success':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const highlightText = (text: string) => {
    // Highlight URLs, headers, and keywords
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const headerRegex = /(Authorization|Content-Type|X-API-Key):\s*([^\n]+)/gi;
    const keywordRegex = /\b(CRITICAL|WARNING|ERROR|SUCCESS|VULNERABILITY)\b/gi;

    const highlighted = text
      .replace(urlRegex, '<span class="text-teal-400">$1</span>')
      .replace(headerRegex, '<span class="text-purple-400">$1: $2</span>')
      .replace(
        keywordRegex,
        '<span class="font-bold text-yellow-400">$1</span>'
      );

    return highlighted;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main
        className={`p-4 lg:p-8 pt-20 lg:pt10  transition-all duration-300 ${
          isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SkeletonLoader type="card" count={3} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <button
                  onClick={() => navigate('/dashboard')}
                  onKeyDown={handleBackKeyDown}
                  className="text-teal-500 hover:text-teal-600 mb-4 flex items-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded px-2 py-1 transition-colors"
                  aria-label="Navigate back to dashboard"
                >
                  <HiArrowLeft className="w-5 h-5 mr-2" />
                  Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {scan.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{scan.type}</p>
              </motion.div>

              {/* Progress Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="relative w-24 h-24 mr-6">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-gray-200 dark:text-gray-700"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${(scan.progress / 100) * 251.2} 251.2`}
                          className="text-teal-500 transition-all"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {scan.progress}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Status
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {scan.status === 'in-progress'
                          ? 'In Progress'
                          : scan.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleExportReport}
                      aria-label="Export scan report"
                    >
                      Export Report
                    </Button>
                    {scan.status === 'in-progress' && (
                      <Button
                        variant="secondary"
                        onClick={handleStopScan}
                        aria-label="Stop current scan"
                      >
                        Stop Scan
                      </Button>
                    )}
                  </div>
                </div>

                {/* Step Tracker */}
                <div className="flex flex-wrap gap-2 md:gap-4">
                  {steps.map((step, index) => (
                    <div
                      key={step}
                      className={`flex items-center ${
                        index < steps.length - 1 ? 'flex-1' : ''
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                          index <= currentStepIndex
                            ? 'bg-teal-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span
                        className={`ml-2 text-sm font-medium ${
                          index <= currentStepIndex
                            ? 'text-teal-500 dark:text-teal-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {step}
                      </span>
                      {index < steps.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 mx-2 ${
                            index < currentStepIndex
                              ? 'bg-teal-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Metadata Row */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Scan Type
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {scan.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Targets
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {scan.targets.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Started At
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDateTime(scan.startedAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Credentials
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {scan.credentials}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Files
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {scan.files}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Checklists
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {scan.checklists}
                    </p>
                  </div>
                </div>
              </div>

              {/* Two Panel Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Panel - Console */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="border-b border-gray-200 dark:border-gray-700">
                    <div
                      className="flex"
                      role="tablist"
                      aria-label="Console log tabs"
                    >
                      <button
                        onClick={() => setActiveTab('activity')}
                        onKeyDown={e => handleTabKeyDown(e, 'activity')}
                        role="tab"
                        aria-selected={activeTab === 'activity'}
                        aria-controls="activity-panel"
                        id="activity-tab"
                        className={`px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset ${
                          activeTab === 'activity'
                            ? 'text-teal-500 border-b-2 border-teal-500'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        Activity Log
                      </button>
                      <button
                        onClick={() => setActiveTab('verification')}
                        onKeyDown={e => handleTabKeyDown(e, 'verification')}
                        role="tab"
                        aria-selected={activeTab === 'verification'}
                        aria-controls="verification-panel"
                        id="verification-tab"
                        className={`px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset ${
                          activeTab === 'verification'
                            ? 'text-teal-500 border-b-2 border-teal-500'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        Verification Loops
                      </button>
                    </div>
                  </div>
                  <div
                    id={`${activeTab}-panel`}
                    role="tabpanel"
                    aria-labelledby={`${activeTab}-tab`}
                    className="p-4 bg-gray-900 dark:bg-black font-mono text-sm h-96 overflow-y-auto"
                  >
                    <div className="p-4 bg-gray-900 dark:bg-black font-mono text-sm h-96 overflow-y-auto">
                      {(activeTab === 'activity'
                        ? scan.activityLog
                        : scan.verificationLoops
                      ).map((log, index) => (
                        <div key={index} className="mb-2">
                          <span className="text-gray-500 dark:text-gray-500">
                            [{log.timestamp}]
                          </span>{' '}
                          <span className={getLogLevelColor(log.level)}>
                            [{log.level.toUpperCase()}]
                          </span>{' '}
                          <span
                            className="text-gray-300 dark:text-gray-300"
                            dangerouslySetInnerHTML={{
                              __html: highlightText(log.message),
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Panel - Findings */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Finding Log
                    </h3>
                  </div>
                  <div className="p-4 h-96 overflow-y-auto !space-y-4">
                    {scan.findings.map(finding => (
                      <motion.div
                        key={finding.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <Badge severity={finding.severity} count={1} />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {finding.timestamp}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {finding.title}
                        </h4>
                        <p className="text-sm text-teal-500 dark:text-teal-400 mb-2 font-mono">
                          {finding.endpoint}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {finding.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Sub-agents
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {scan.stats.subAgents}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Parallel Executions
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {scan.stats.parallelExecutions}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Operations
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {scan.stats.operations}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Critical
                    </p>
                    <p className="text-lg font-semibold text-red-500">
                      {scan.stats.critical}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      High
                    </p>
                    <p className="text-lg font-semibold text-orange-500">
                      {scan.stats.high}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Medium
                    </p>
                    <p className="text-lg font-semibold text-yellow-500">
                      {scan.stats.medium}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Low
                    </p>
                    <p className="text-lg font-semibold text-green-500">
                      {scan.stats.low}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
});

ScanDetail.displayName = 'ScanDetail';

export default ScanDetail;
