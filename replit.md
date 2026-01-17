# Gaia Commons Council Dashboard

## Overview

Gaia Commons Council is a full-stack dashboard application for tracking pilot program statistics, endowment data, and strategic timeline events for the "One Vote, Forever Fed" 2026 ballot initiative. The platform serves as an analytics and management interface for educational and environmental initiatives, displaying real-time metrics for student enrollment, facility square footage, school counts, and endowment financials. Features include interactive maps (Minnesota greenhouse locations with 53 school district sites), multi-scale deployment views (Pilot → Statewide → National → Global), and an interactive Cluster Builder tool.

## Recent Changes (January 2026)

- **Professional Platform Enhancements**: Transformed into a professional-grade platform with:
  - **Multi-language Support (i18n)**: Added i18next with English, Spanish, Somali, and Hmong translations for Minnesota's diverse communities. Language selector in header. Translation files in `client/src/locales/`.
  - **Custom Branding & Theming**: ThemeProvider with 6 color schemes (Emerald, Forest, Ocean, Sunset, Earth, Lavender) plus dark/light mode toggle. Theme persists via localStorage.
  - **Export Functionality**: PDF export (via html2canvas + jsPDF), Excel, and CSV export utilities. Export panel component with print-optimized views.
  - **Animated Visualizations**: AnimatedCounter component for smooth number transitions.
  - **Engagement Features**: Newsletter signup, feedback form, and share link functionality in footer.
  - **Mobile Optimization**: Responsive utilities and print styles in index.css.

- **Twin Metals Mining Alternative Section (Updated)**: Comprehensive Boundary Waters protection feature with 5 Northern MN communities (Ely, Babbitt, Hibbing, Tower, Virginia). Now includes:
  - **Foreign Ownership Exposé**: Twin Metals is 100% owned by Antofagasta PLC (Chilean mining conglomerate, London HQ, controlled by Luksic billionaire family)
  - **Profit Leakage Analysis**:
    - 50% of profits → dividends to Luksic family (Chile)
    - 0.4% gross proceeds tax (vs $3.35/ton for iron mining)
    - 0% of that tax goes to State General Fund (Taconite Area rules)
    - Ore leaves state for processing elsewhere
    - Minnesota left with cleanup liability when mine closes
  - **Side-by-Side Comparison Table**: Mining vs Gaia on ownership, profits, taxes, jobs, duration, wages, resources, environment, post-closure, foreign workers
  - **Halved greenhouse sqft**: 960K total (225K Ely, 127.5K Babbitt, 375K Hibbing, 52.5K Tower, 180K Virginia)
  - **Complete financial modeling**: $85/sqft construction cost, $12/sqft/year operations, 40 lbs/sqft/year production
  - **Production & distribution**: 38.4M lbs annual specialty crops — 60% to 53 school districts, 40% excess sold to stores/markets
  - **Revenue modeling**: $53.8M annual sales revenue @ $3.50/lb wholesale, $42.2M net after operations
  - **Specialty crops by community**: Mushrooms, microgreens, edible flowers, year-round strawberries, specialty melons, gourmet vegetables
  - **1,815 permanent jobs** funded by endowment vs. ~1,500 temporary mining jobs (Twin Metals estimate):
    - **5 Northern MN Hubs (1,504 jobs)**:
      - Greenhouse Operations: 1,152 jobs (growing, harvesting, maintenance)
      - School Greenhouse Educators: 96 jobs
      - Store/Market Distribution: 104 jobs (52 sorting/packaging, 38 delivery drivers, 14 warehouse/logistics)
      - School Distribution: 152 jobs (76 sorting/packaging, 56 delivery drivers, 20 logistics coordinators)
    - **53 School Districts (311 jobs)**:
      - Receiving Coordinators: ~103 jobs (1 per 5,000 students, min 1)
      - Cafeteria Distribution Staff: ~208 jobs (1 per 3,000 students, min 1)
  - **Construction Phase Jobs (775+ skilled trades)**:
    - **Phase 1 - Northern MN Hubs (325 jobs, 2-3 year build)**:
      - General Construction: 130 (carpentry, concrete, framing)
      - Electricians: 65 (grow lights, controls, panels)
      - Plumbers: 50 (irrigation, hydroponics, water systems)
      - HVAC Technicians: 50 (climate control, ventilation)
      - Greenhouse Specialists: 30 (glass, structure, systems)
    - **Phase 2 - 53 School Greenhouses (450 jobs, rolling 3-5 year build)**:
      - General Construction: 160 (site prep, foundations)
      - Electricians: 95 (school connections, lighting)
      - Plumbers: 75 (water systems, drainage)
      - HVAC Technicians: 70 (heating, cooling)
      - Greenhouse Specialists: 50 (educational designs)
    - Key difference: 100% local union labor (IBEW, UA, UBC) vs Twin Metals foreign contractors
    - $35+/hr prevailing wage required, $81M+ construction spending stays in Minnesota
- **Land & Water Conservation Fund**: 10% of annual endowment revenue dedicated to purchasing and protecting Minnesota's natural resources:
  - **Financial Projections**: ~$6.3M/year at statewide scale, $315M total over 50 years, 100K+ acres at $3,000/acre average
  - **Acquisition Priorities**: Forests (35%), Farmland (30%), Waterways (25%), Tribal Lands (10%)
  - **Acquisition Sources**: Private landowners (60%), Federal government (25%), State & County (15%)
  - **Perpetual Protection**: All lands held in permanent land trust — never to be sold or developed
- **Cluster Builder Tool**: Added interactive 4-step wizard for students/teachers to design custom greenhouse pilot programs. Users can select schools, choose produce varieties, and generate pilot proposals with complete metrics (sqft, production, jobs, costs, environmental impact).
- **MN School Districts Map**: Added 53 Minnesota school districts with greenhouse candidate data, dual-mode toggle (active sites vs all districts), and filtering by size/south-facing score.
- **Tribal Community Priority**: Included Cass Lake-Bena, Red Lake, and Nay Ah Shing districts as High Priority for food sovereignty initiatives.

## Gaia Commons Brand Guidelines

### Color Scheme
- **Primary**: #4CAF50 (soft earthy green) - buttons, links, accents
- **Secondary**: #8BC6EC (calming blue) - supporting elements
- **Accent**: #FFE082 (vibrant yellow) - CTAs and highlights
- **Background**: #F7F7F7 (light off-white) - page background
- **Text**: #333333 (dark grey) - readable body text

### Typography
- **Primary Font**: Roboto (sans-serif) - body and headings
- **Secondary Font**: Merriweather (serif) - special accents

### Design Elements
- **Border Radius**: 0.5rem (subtle rounding)
- **Cards**: White backgrounds on light off-white page
- **Dark Mode**: Green-tinted dark background with light text

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
- **i18next / react-i18next**: Internationalization framework for multi-language support
- **html2canvas / jsPDF**: PDF export functionality
- **xlsx**: Excel export functionality

### Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Fast JavaScript bundler for server code
- **Drizzle Kit**: Database migration and schema management CLI
- **TypeScript**: Static type checking across the entire codebase

### Replit-Specific Plugins
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling (dev only)
- `@replit/vite-plugin-dev-banner`: Development environment indicator (dev only)