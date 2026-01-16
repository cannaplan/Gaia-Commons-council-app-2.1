# Gaia Commons Council Dashboard

## Overview

Gaia Commons Council is a full-stack dashboard application for tracking pilot program statistics, endowment data, and strategic timeline events for the "One Vote, Forever Fed" 2026 ballot initiative. The platform serves as an analytics and management interface for educational and environmental initiatives, displaying real-time metrics for student enrollment, facility square footage, school counts, and endowment financials. Features include interactive maps (Minnesota greenhouse locations with 53 school district sites), multi-scale deployment views (Pilot → Statewide → National → Global), and an interactive Cluster Builder tool.

## Recent Changes (January 2026)

- **Cluster Builder Tool**: Added interactive 4-step wizard for students/teachers to design custom greenhouse pilot programs. Users can select schools, choose produce varieties, and generate pilot proposals with complete metrics (sqft, production, jobs, costs, environmental impact).
- **MN School Districts Map**: Added 53 Minnesota school districts with greenhouse candidate data, dual-mode toggle (active sites vs all districts), and filtering by size/south-facing score.
- **Tribal Community Priority**: Included Cass Lake-Bena, Red Lake, and Nay Ah Shing districts as High Priority for food sovereignty initiatives.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Animations**: Framer Motion for smooth UI transitions
- **Icons**: Lucide React

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/`
- Reusable components in `client/src/components/`
- Custom hooks in `client/src/hooks/`
- shadcn/ui primitives in `client/src/components/ui/`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

The server uses a storage abstraction pattern (`IStorage` interface) in `server/storage.ts` that wraps database operations, making it easier to test and swap implementations.

### Data Layer
- **Database**: PostgreSQL (configured via `DATABASE_URL` environment variable)
- **Schema**: Defined in `shared/schema.ts` using Drizzle ORM
- **Tables**: 
  - `pilot_stats` - Student counts, square footage, school numbers, status
  - `endowment_stats` - Financial size, annual figures, greenhouse counts
  - `timeline_events` - Year and event descriptions for strategic planning
- **Migrations**: Managed via Drizzle Kit (`drizzle-kit push`)

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts` - Database schema definitions and Zod insert schemas
- `routes.ts` - API contract definitions with paths, methods, and validation schemas

### Build System
- **Development**: Vite dev server with HMR, proxied through Express
- **Production Build**: 
  - Frontend: Vite builds to `dist/public/`
  - Backend: esbuild bundles server to `dist/index.cjs`
- **Build Script**: Custom `script/build.ts` handles both builds

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database toolkit for TypeScript with type-safe queries
- **connect-pg-simple**: PostgreSQL session store (available but session management not currently active)

### Frontend Libraries
- **@tanstack/react-query**: Async state management and data fetching
- **Radix UI**: Accessible UI primitives (dialog, dropdown, tooltip, etc.)
- **Framer Motion**: Animation library for React
- **Zod**: Runtime type validation shared between client and server

### Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Fast JavaScript bundler for server code
- **Drizzle Kit**: Database migration and schema management CLI
- **TypeScript**: Static type checking across the entire codebase

### Replit-Specific Plugins
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling (dev only)
- `@replit/vite-plugin-dev-banner`: Development environment indicator (dev only)