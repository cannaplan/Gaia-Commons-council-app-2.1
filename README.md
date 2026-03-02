# Gaia Commons Council Dashboard

[![CI](https://github.com/cannaplan/Gaia-Commons-council-app-2.1/actions/workflows/ci.yml/badge.svg)](https://github.com/cannaplan/Gaia-Commons-council-app-2.1/actions/workflows/ci.yml)
[![CD](https://github.com/cannaplan/Gaia-Commons-council-app-2.1/actions/workflows/cd.yml/badge.svg)](https://github.com/cannaplan/Gaia-Commons-council-app-2.1/actions/workflows/cd.yml)

**"One Vote, Forever Fed" -- 2026 Minnesota Ballot Initiative**

A full-stack analytics and management dashboard for Minnesota's statewide school greenhouse program, tracking pilot statistics, endowment data, funding sources, and strategic timeline events.

## What Is This?

The Gaia Commons Council is building a program to place 1,200 greenhouses at Minnesota schools with proper infrastructure and space, feeding 900,000 students year-round fresh produce. Funded by a $5 billion perpetual endowment generating $225 million per year, the program creates 2,400 permanent jobs and eliminates 6,553 metric tons of CO2 emissions annually from reduced food transportation.

## Key Features

- **Multi-Scale Dashboard**: View metrics across Pilot (6 schools), Statewide (1,200 greenhouses), National (130K schools), and Global (1M schools) scales
- **Funding Calculator**: Interactive breakdown of $8.65B funding sources with adjustable contribution rates
- **Endowment Modeling**: $5B perpetual endowment at 4.5% annual draw = $225M/year forever
- **Climate Impact Metrics**: Conservative, research-backed numbers (EPA methodology) for CO2 avoided, water saved, and truck-miles eliminated
- **Cluster Builder**: Interactive 4-step wizard for designing custom greenhouse pilot programs
- **Twin Metals Mining Alternative**: Side-by-side comparison of permanent greenhouse jobs vs. temporary foreign-owned mining jobs near the Boundary Waters
- **Growth Pathway**: Detailed scaling projections from 6 pilot schools to 1 million globally
- **Multi-Language Support**: English, Spanish, Somali, and Hmong translations
- **Export Options**: PDF, Excel, and CSV export functionality
- **Ballot Presentation Mode**: Full-screen presentation slides for public events

## Statewide Numbers (Minnesota)

| Metric | Value |
|--------|-------|
| Total Schools | ~3,100 |
| Schools with Greenhouses | 1,200 |
| Greenhouse Size (avg) | 10,000 sqft |
| Total Greenhouse Space | 12,000,000 sqft |
| Hydro Towers | 8,400,000 sqft (150,000 units) |
| Soil Beds | 3,600,000 sqft (112,500 beds) |
| Students Served | 900,000 |
| Permanent Jobs | 2,400 |
| Capex | $926,000,000 |
| Annual Revenue | $1,610,000,000 |
| Endowment | $5B @ 4.5% = $225M/year |
| CO2 Avoided | 6,553 metric tons/year |
| Water Saved | 567M gallons/year |
| Truck-Miles Eliminated | 2.025M/year |

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Charts**: Recharts
- **i18n**: i18next (EN, ES, SO, HMN)

## Getting Started

```bash
npm install
npm run dev
```

The app runs on port 5000.

## Funding Sources ($8.65B Total)

- Top 20 Local Corporations (0.4%) -- $1.0B
- Pro Sports Franchises (5%) -- $100M
- Local Medical/Insurance (0.4%) -- $600M
- Out-of-State Corp/Med/Ins (0.45%) -- $3.15B
- Data/Online Retail (2.5%) -- $2.62B
- Out-of-Country Mining (10%) -- $1.0B
- Federal Government -- $500M
- Local Billionaires -- $200M

## License

This project is for the benefit of Minnesota students and communities.
