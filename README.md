# Fenrir Security Frontend Task

A production-grade React application implementing a B2B SaaS security platform with three main screens: Login, Dashboard, and Active Scan Detail. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- ✅ **Three Complete Screens**
  - Screen 1: Login/Sign-up page with split layout
  - Screen 2: Dashboard with scan list overview
  - Screen 3: Active Scan Detail with live console and finding log

- ✅ **Dark & Light Mode**
  - Fully functional theme toggle
  - Persistent theme preference (localStorage)
  - Native-feeling themes with proper color schemes

- ✅ **Responsive Design**
  - Mobile-first approach (375px+)
  - Desktop optimized (1280px+)
  - Collapsible sidebar on mobile

- ✅ **Interactive Elements**
  - Functional navigation between screens
  - Search and filter capabilities
  - Tab switching in console view
  - Button actions with feedback

- ✅ **Component Architecture**
  - Reusable, memoized components
  - Single responsibility principle
  - Type-safe with TypeScript

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library

## Getting Started

### Prerequisites

- Node.js 20+ (or 22+)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Sanjeev-Kumar08/react-security-dashboard
cd fenrirsecurity-frontend-task
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Design System

### Colors

- **Primary Accent**: Teal (#0CC8A8)
- **Severity Colors**:
  - Critical: Red
  - High: Orange
  - Medium: Yellow/Amber
  - Low: Green
- **Dark Mode**: Near-black (#0F0F0F to #1A1A1A)
- **Light Mode**: White to light gray (#F5F5F5)

### Typography

- **Font Family**: Inter (sans-serif)
- Clear hierarchy with consistent heading sizes
- Body text optimized for readability

### Components

All UI components are built with:

- Memoization (React.memo, useMemo, useCallback)
- TypeScript type safety
- Accessibility considerations
- Dark/light mode support

## Navigation Flow

1. **Login Screen** (`/login`)
   - Submit form → Navigate to Dashboard

2. **Dashboard** (`/dashboard`)
   - Click scan row → Navigate to Scan Detail
   - Sidebar navigation → Dashboard (other items for future implementation)

3. **Scan Detail** (`/scan/:id`)
   - Back button → Navigate to Dashboard

## Mock Data

The application uses realistic mock data located in `src/data/mockData.ts`:

- Organization-level severity statistics
- Scan list with various statuses
- Detailed scan information with logs and findings

## Performance Optimizations

- Component memoization to prevent unnecessary re-renders
- useMemo for expensive computations
- useCallback for event handlers
- Code splitting via Vite
- Optimized Tailwind CSS output

## Known Limitations

- Other sidebar navigation items (Projects, Schedule, etc.) currently route to Dashboard
- Social login buttons (Apple, Google, Meta) are visual only
- Export Report and Stop Scan buttons show alerts (would integrate with backend in production)

## Development

### Linting

```bash
npm run lint
npm run lint:fix
```

### Formatting

```bash
npm run format
npm run format:check
```
