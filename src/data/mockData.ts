export interface Scan {
  id: string;
  name: string;
  type: string;
  status: 'completed' | 'scheduled' | 'failed' | 'in-progress';
  progress: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  lastScanTime: string;
}

export interface SeverityStats {
  critical: { count: number; change: number };
  high: { count: number; change: number };
  medium: { count: number; change: number };
  low: { count: number; change: number };
}

export interface ScanDetail {
  id: string;
  name: string;
  type: string;
  status: 'in-progress' | 'completed' | 'failed';
  progress: number;
  currentStep: 'Spidering' | 'Mapping' | 'Testing' | 'Validating' | 'Reporting';
  targets: string[];
  startedAt: string;
  credentials: number;
  files: number;
  checklists: number;
  activityLog: LogEntry[];
  verificationLoops: LogEntry[];
  findings: Finding[];
  stats: {
    subAgents: number;
    parallelExecutions: number;
    operations: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

export interface Finding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
  title: string;
  endpoint: string;
  description: string;
}

export const severityStats: SeverityStats = {
  critical: { count: 24, change: 12.5 },
  high: { count: 156, change: -8.3 },
  medium: { count: 342, change: 5.2 },
  low: { count: 89, change: -2.1 },
};

export const scans: Scan[] = [
  {
    id: '1',
    name: 'Production API Security Scan',
    type: 'Web Application',
    status: 'completed',
    progress: 100,
    vulnerabilities: { critical: 3, high: 12, medium: 28, low: 5 },
    lastScanTime: '2024-03-15 14:30:00',
  },
  {
    id: '2',
    name: 'Staging Environment Scan',
    type: 'Network',
    status: 'in-progress',
    progress: 65,
    vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
    lastScanTime: '2024-03-15 16:45:00',
  },
  {
    id: '3',
    name: 'Mobile App Security Audit',
    type: 'Mobile Application',
    status: 'scheduled',
    progress: 0,
    vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
    lastScanTime: '2024-03-14 10:15:00',
  },
  {
    id: '4',
    name: 'Cloud Infrastructure Scan',
    type: 'Cloud',
    status: 'completed',
    progress: 100,
    vulnerabilities: { critical: 1, high: 8, medium: 15, low: 3 },
    lastScanTime: '2024-03-15 09:20:00',
  },
  {
    id: '5',
    name: 'Database Security Assessment',
    type: 'Database',
    status: 'failed',
    progress: 45,
    vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
    lastScanTime: '2024-03-15 11:00:00',
  },
  {
    id: '6',
    name: 'API Endpoint Validation',
    type: 'Web Application',
    status: 'completed',
    progress: 100,
    vulnerabilities: { critical: 2, high: 5, medium: 12, low: 2 },
    lastScanTime: '2024-03-15 13:00:00',
  },
];

export const scanDetails: Record<string, ScanDetail> = {
  '1': {
    id: '1',
    name: 'Production API Security Scan',
    type: 'Web Application',
    status: 'completed',
    progress: 100,
    currentStep: 'Reporting',
    targets: ['https://api.example.com', 'https://api2.example.com'],
    startedAt: '2024-03-15 14:00:00',
    credentials: 3,
    files: 1247,
    checklists: 8,
    activityLog: [
      {
        timestamp: '14:00:15',
        level: 'info',
        message: 'Starting scan on target: https://api.example.com',
      },
      {
        timestamp: '14:00:32',
        level: 'info',
        message: 'Spidering phase initiated. Found 45 endpoints.',
      },
      {
        timestamp: '14:01:18',
        level: 'success',
        message: 'Mapping complete. Identified 12 authentication endpoints.',
      },
      {
        timestamp: '14:02:45',
        level: 'warning',
        message: 'Potential SQL injection detected at /api/users?id=',
      },
      {
        timestamp: '14:03:12',
        level: 'info',
        message: 'Testing phase: 67% complete. Testing XSS vulnerabilities.',
      },
      {
        timestamp: '14:04:30',
        level: 'error',
        message:
          'Critical: Authentication bypass vulnerability found at /api/auth/login',
      },
      {
        timestamp: '14:05:00',
        level: 'info',
        message: 'Validation phase started. Verifying findings...',
      },
    ],
    verificationLoops: [
      {
        timestamp: '14:05:15',
        level: 'info',
        message: 'Verification loop 1: Confirming SQL injection vulnerability',
      },
      {
        timestamp: '14:05:32',
        level: 'success',
        message: 'Verification loop 1: Vulnerability confirmed',
      },
      {
        timestamp: '14:05:48',
        level: 'info',
        message: 'Verification loop 2: Testing authentication bypass',
      },
    ],
    findings: [
      {
        id: 'f1',
        severity: 'critical',
        timestamp: '14:04:30',
        title: 'Authentication Bypass Vulnerability',
        endpoint: '/api/auth/login',
        description:
          'The login endpoint allows authentication bypass through parameter manipulation.',
      },
      {
        id: 'f2',
        severity: 'high',
        timestamp: '14:02:45',
        title: 'SQL Injection in User Query',
        endpoint: '/api/users?id=',
        description:
          'User input is directly concatenated into SQL queries without sanitization.',
      },
      {
        id: 'f3',
        severity: 'high',
        timestamp: '14:03:45',
        title: 'Missing Rate Limiting',
        endpoint: '/api/auth/login',
        description:
          'Login endpoint lacks rate limiting, allowing brute force attacks.',
      },
      {
        id: 'f4',
        severity: 'medium',
        timestamp: '14:04:15',
        title: 'XSS Vulnerability in Search',
        endpoint: '/api/search?q=',
        description: 'Search results are rendered without proper escaping.',
      },
      {
        id: 'f5',
        severity: 'medium',
        timestamp: '14:04:50',
        title: 'Insecure Direct Object Reference',
        endpoint: '/api/users/{id}',
        description:
          'User IDs can be accessed without proper authorization checks.',
      },
    ],
    stats: {
      subAgents: 8,
      parallelExecutions: 24,
      operations: 1247,
      critical: 1,
      high: 2,
      medium: 2,
      low: 0,
    },
  },
  '2': {
    id: '2',
    name: 'Staging Environment Scan',
    type: 'Network',
    status: 'in-progress',
    progress: 65,
    currentStep: 'Testing',
    targets: ['192.168.1.0/24', '10.0.0.0/16'],
    startedAt: '2024-03-15 16:30:00',
    credentials: 2,
    files: 856,
    checklists: 5,
    activityLog: [
      {
        timestamp: '16:30:00',
        level: 'info',
        message: 'Network scan initiated on subnet 192.168.1.0/24',
      },
      {
        timestamp: '16:30:45',
        level: 'info',
        message: 'Spidering phase: Discovered 23 active hosts',
      },
      {
        timestamp: '16:31:20',
        level: 'success',
        message: 'Mapping complete. Identified 45 open ports across hosts.',
      },
      {
        timestamp: '16:32:10',
        level: 'info',
        message: 'Testing phase: Scanning for vulnerabilities on port 443',
      },
      {
        timestamp: '16:33:00',
        level: 'warning',
        message: 'Outdated SSL/TLS configuration detected on host 192.168.1.15',
      },
    ],
    verificationLoops: [
      {
        timestamp: '16:33:15',
        level: 'info',
        message: 'Verification loop 1: Confirming SSL configuration issue',
      },
    ],
    findings: [
      {
        id: 'f6',
        severity: 'medium',
        timestamp: '16:33:00',
        title: 'Outdated SSL/TLS Configuration',
        endpoint: '192.168.1.15:443',
        description:
          'Server is using TLS 1.0 which is deprecated and insecure.',
      },
    ],
    stats: {
      subAgents: 6,
      parallelExecutions: 18,
      operations: 856,
      critical: 0,
      high: 0,
      medium: 1,
      low: 0,
    },
  },
};
