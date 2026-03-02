# Contributing to Gaia Commons Council App

Thank you for your interest in contributing!

## Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/cannaplan/Gaia-Commons-council-app-2.1.git
   cd Gaia-Commons-council-app-2.1
   ```

2. **Install dependencies**

   ```bash
   npm ci
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in the required values:

   ```bash
   cp .env.example .env
   ```

   At minimum, `DATABASE_URL` must point to a running PostgreSQL instance.

4. **Start the development server**

   ```bash
   npm run dev
   ```

## Running Tests

The project uses [Vitest](https://vitest.dev/) for unit and integration tests.

```bash
# Run the full test suite once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

Tests cover API routes, DAO logic, and React components. Server tests mock the
database layer, so no live database connection is required to run them.

## Pull Request Workflow

1. Branch off `main`:

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes and **run the full test suite** before pushing:

   ```bash
   npm test
   ```

3. Push your branch and open a pull request targeting `main`.

4. The CI pipeline (`.github/workflows/ci.yml`) will automatically run the test
   suite on every push and pull request. All checks must pass before a PR can be
   merged.
