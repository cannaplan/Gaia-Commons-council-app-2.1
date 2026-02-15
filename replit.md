# Gaia Commons Council Dashboard

## Overview

Gaia Commons Council is a full-stack dashboard application for tracking pilot program statistics, endowment data, and strategic timeline events for the "One Vote, Forever Fed" 2026 ballot initiative. The platform serves as an analytics and management interface for educational and environmental initiatives, displaying real-time metrics for student enrollment, facility square footage, school counts, and endowment financials. Features include multi-scale deployment views (Pilot → Statewide → National → Global), interactive data visualization charts (Endowment Growth, Jobs Breakdown), and an interactive Cluster Builder tool.

**Statewide Scope**: 1,200 high school greenhouses (7,500 sqft avg, 9M sqft total), 712,500 students served (75% of 950K K-12 enrollment), 75 lb produce per student annually (53.4M lb total), $5B endowment (4.5% yield = $225M/year), 2,400 FTE jobs, 3,100+ schools with curriculum. Anti-Boundary Waters mining alternative.

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
  - **Production & distribution**: 38.4M lbs annual specialty crops — 60% to 330 school districts, 40% excess sold to stores/markets
  - **Revenue modeling**: $53.8M annual sales revenue @ $3.50/lb wholesale, $42.2M net after operations
  - **Specialty crops by community**: Mushrooms, microgreens, edible flowers, year-round strawberries, specialty melons, gourmet vegetables
  - **2,400 permanent jobs** funded by $5B endowment vs. ~1,500 temporary mining jobs (Twin Metals estimate):
    - **1,200 Greenhouses (1,800 jobs)**:
      - Greenhouse Operations: 1,440 jobs (growing, harvesting, maintenance)
      - School Greenhouse Educators: 240 jobs
      - Distribution: 360 jobs (sorting, packaging, delivery)
    - **School Staff (600 jobs)**:
      - Receiving Coordinators and Cafeteria Distribution Staff across districts
  - **Construction Phase Jobs (All Scales)**:
    - **Pilot (6 Schools)**: 76 jobs, 1-2 years, $7-13M spending
    - **Statewide (1,200 Greenhouses)**: 13,900 jobs, 4 years (2026-2029), $1.39B spending
    - **National (130K Schools)**: 1.17M jobs, 10-15 years rolling, $117B spending
    - **Global (1M Schools)**: 6.5M jobs, 20-30 years phased, $650B spending
    - **Job breakdown by trade** (consistent across all scales):
      - General Construction: 40% (carpentry, concrete, framing, site prep)
      - Electricians: 20% (grow lights, controls, school connections)
      - Plumbers: 15% (irrigation, hydroponics, water systems)
      - HVAC Technicians: 15% (climate control, ventilation, heating)
      - Greenhouse Specialists: 10% (glass, structure, educational designs)
    - **Union labor**: IBEW (electricians), UA (plumbers & pipefitters), SMART (HVAC), UBC (carpenters)
    - **Prevailing wages**: $32-35/hr depending on scale, 100% local hire priority
    - Key difference: All scales use local union labor vs. foreign contractors at mining sites
- **Endowment Model (Statewide)**: $5B principal @ 4.5% annual draw = $225M/year perpetual funding
  - Principal never touched, grows tax-free
  - After 50 years: $11.25B total draws while principal remains $5B+
  - Produce sales revenue (~$123M/year) covers operations; endowment provides additional safety buffer
- **Land & Water Conservation Fund**: 10% of annual endowment draw dedicated to purchasing and protecting Minnesota's natural resources:
  - **Financial Projections**: $22.5M/year (10% of $225M endowment draw), $1.125B total over 50 years, 375K+ acres at $3,000/acre average
  - **Acquisition Priorities**: Forests (35%), Farmland (30%), Waterways (25%), Tribal Lands (10%)
  - **Acquisition Sources**: Private landowners (60%), Federal government (25%), State & County (15%)
  - **Perpetual Protection**: All lands held in permanent land trust — never to be sold or developed
- **Cluster Builder Tool**: Added interactive 4-step wizard for students/teachers to design custom greenhouse pilot programs. Users can select schools, choose produce varieties, and generate pilot proposals with complete metrics (sqft, production, jobs, costs, environmental impact).
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
- **exceljs**: Excel export functionality

### Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Fast JavaScript bundler for server code
- **Drizzle Kit**: Database migration and schema management CLI
- **TypeScript**: Static type checking across the entire codebase

### Replit-Specific Plugins
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling (dev only)
- `@replit/vite-plugin-dev-banner`: Development environment indicator (dev only)