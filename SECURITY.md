# Security Policy

## Supported Versions

The Gaia Commons Council Dashboard follows a rolling-release model. Only the latest version on the `main` branch receives security updates.

| Version         | Supported          |
| --------------- | ------------------ |
| `main` (latest) | :white_check_mark: |
| Older commits   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a vulnerability in the Gaia Commons Council Dashboard, please report it responsibly.

### How to Report

1. **DO NOT** open a public GitHub issue for security vulnerabilities.
2. Email your report to the repository maintainers via the contact information on the [GitHub organization profile](https://github.com/cannaplan).
3. Alternatively, use [GitHub's private vulnerability reporting](https://github.com/cannaplan/Gaia-Commons-council-app-2.1/security/advisories/new) to submit a confidential advisory.

### What to Include

- A description of the vulnerability and its potential impact
- Steps to reproduce the issue
- Any relevant logs, screenshots, or proof-of-concept code
- Your suggested fix (if applicable)

### What to Expect

- **Acknowledgement**: We will acknowledge receipt of your report within **48 hours**.
- **Assessment**: We aim to assess the severity and validity within **5 business days**.
- **Resolution**: Critical vulnerabilities will be patched as quickly as possible. We will coordinate with you on disclosure timing.
- **Credit**: We are happy to credit security researchers in our release notes (unless you prefer to remain anonymous).

## Security Measures

This project employs the following security practices:

- **CodeQL static analysis** on every push and pull request (SQL injection, XSS, path traversal, etc.)
- **Dependency review** on pull requests to block vulnerable or incompatible dependencies
- **Dependabot** for automated dependency updates with security patches
- **Express rate limiting** to prevent abuse of API endpoints
- **Zod validation** on all API inputs via shared schemas
- **TypeScript strict mode** for type safety across the full stack
- **Passport.js** for authentication with session management
- **Least-privilege GitHub Actions permissions** across all CI/CD workflows
