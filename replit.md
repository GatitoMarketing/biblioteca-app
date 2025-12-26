# Biblioteca Gnóstica - Digital Library with EPUB Reader

## Overview

This is a full-stack web application for a digital library (Biblioteca Gnóstica) that allows users to browse, search, and read EPUB books online. The application features a mystical/esoteric theme focused on gnostic literature, with a modern React frontend and Express.js backend.

## User Preferences

Preferred communication style: Simple, everyday language.
Code preference: JavaScript (JS) instead of TypeScript - user specifically requested JavaScript implementation.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Tailwind CSS with custom mystical theme colors (cosmic, sacred, parchment color palette)
- **Component Library**: Shadcn/ui components built on Radix UI primitives
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)

### Key Design Decisions
- **Monorepo Structure**: Single repository with shared schema and types between client/server
- **Type Safety**: Full TypeScript coverage with shared types via `@shared` namespace
- **Development Experience**: Hot reload with Vite, runtime error overlays, and Replit integration

## Key Components

### Data Models (shared/schema.ts)
- **Books**: Core book metadata including title, author, description, cover image, EPUB path, reading metrics
- **User Progress**: Tracks reading progress per user per book (current page, percentage complete)
- **Bookmarks**: User-created bookmarks with optional notes

### Frontend Components
- **BookCarousel**: 3D carousel display for featured books with mystical styling
- **BookGrid**: Grid layout for book browsing with search functionality
- **BookModal**: Detailed book information modal with reading options
- **EpubViewer**: Full-screen EPUB reading interface with navigation and settings
- **SettingsPanel**: Reading customization (font size, theme, line height, auto-scroll)

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **Book Management**: CRUD operations for books with search capabilities
- **Progress Tracking**: User reading progress persistence
- **File Serving**: Static file serving for EPUB files and cover images

## Data Flow

1. **Book Discovery**: Users browse featured books via carousel or search all books via grid
2. **Book Selection**: Clicking a book opens a modal with detailed information and reading options
3. **Reading Experience**: "Read Now" launches the EPUB viewer with full-screen reading interface
4. **Progress Tracking**: Reading progress is automatically saved as users navigate through books
5. **Customization**: Users can adjust reading settings (font size, themes, etc.) via settings panel

## External Dependencies

### Core Libraries
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database ORM with PostgreSQL support
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **@radix-ui/***: Accessible component primitives for UI elements
- **wouter**: Lightweight routing solution for React

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error reporting in development
- **@replit/vite-plugin-cartographer**: Development tooling for Replit environment

### Planned Integrations
- **EPUB.js**: JavaScript library for parsing and rendering EPUB files (currently mocked)
- **Font Awesome**: Icon library for mystical/esoteric iconography

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with Express API proxy
- **Hot Reload**: Full stack hot reload with Vite and tsx
- **Database**: Drizzle push for schema migrations during development

### Production
- **Build Process**: Vite builds the frontend, esbuild bundles the backend
- **Static Assets**: Frontend built to `dist/public`, served by Express
- **Database**: PostgreSQL via Neon with connection pooling
- **Deployment**: Single Node.js server serving both API and static files

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment flag for development/production behavior
- **Session Management**: Secure session configuration for production

The application is designed to be deployed as a single server instance that serves both the React frontend and Express API, with PostgreSQL as the persistent data store for books, user progress, and bookmarks.

## Recent Changes

- Created complete JavaScript/HTML/CSS library with separated files:
  - index.html: Main HTML structure with semantic sections
  - styles.css: Complete responsive CSS with 3D carousel and mystical theme
  - script.js: Pure JavaScript for all functionality including EPUB viewer
- Implemented functional EPUB reader using EPUB.js library
- Added responsive design for mobile, tablet and desktop
- Created advanced search functionality with dynamic filtering
- Added auto-rotation carousel with pause on hover
- Implemented keyboard navigation throughout the application
- Added modal system for book information and direct reading access