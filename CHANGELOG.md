# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2025-03-07

### Added

- Next.js 15 with App Router and TypeScript
- Auth.js v5 with JWT sessions (credentials, Google, GitHub OAuth)
- MongoDB with Mongoose ODM
- TanStack Query v5 for data fetching
- Tailwind CSS v4 with dark mode toggle (next-themes)
- Internationalization with next-intl (English, Vietnamese)
- Environment-specific configuration (development, staging, production)
- Unit testing with Vitest + React Testing Library
- E2E testing with Playwright
- ESLint 9 flat config + Prettier with import sorting
- Git hooks with husky + lint-staged + commitlint
- CI/CD with GitHub Actions (lint, test, build)
- Sentry error tracking integration
- Rate limiting on auth endpoints
- Security headers (HSTS, X-Frame-Options, CSP, etc.)
- Multi-stage Docker build + docker-compose
- Database seeding script
- Bundle analyzer
- Skeleton loading states
- Field-level form validation with Zod
- Standardized API error handling
- Deployment guide (Vercel, Docker/VPS, AWS, standalone)
