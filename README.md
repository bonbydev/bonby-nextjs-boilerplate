# Bonby Next.js Boilerplate

A production-ready Next.js 15 starter with authentication, MongoDB, i18n, testing, and modern tooling.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript (strict mode)
- **Authentication:** Auth.js v5 (NextAuth) with JWT sessions
- **Database:** MongoDB with Mongoose ODM
- **Data Fetching:** TanStack Query v5 (React Query)
- **Styling:** Tailwind CSS v4
- **Internationalization:** next-intl (English, Vietnamese)
- **Testing:** Vitest + React Testing Library + Playwright (E2E)
- **Error Tracking:** Sentry
- **Validation:** Zod
- **Dark Mode:** next-themes (system + manual toggle)
- **Notifications:** react-toastify
- **Icons:** react-icons
- **Utilities:** lodash, clsx, tailwind-merge
- **Linting:** ESLint 9 (flat config) + Prettier
- **Git Hooks:** husky + lint-staged + commitlint
- **CI/CD:** GitHub Actions
- **Package Manager:** Yarn
- **Containerization:** Docker + Docker Compose

## Features

- Email/password authentication (sign up, sign in, sign out)
- Google and GitHub OAuth providers
- JWT-based sessions (no database adapter needed)
- Protected routes with middleware
- Role-based access control (USER, ADMIN)
- Server Actions for all auth operations
- Field-level form validation errors with Zod
- Rate limiting on auth endpoints (IP-based)
- Toast notifications for auth feedback
- TanStack Query for client-side data fetching
- Internationalization (i18n) with locale switcher
- Dark mode toggle (system preference + manual)
- Unit testing with Vitest + React Testing Library
- E2E testing with Playwright
- Sentry error tracking (client + server + edge)
- Security headers (HSTS, X-Frame-Options, CSP, etc.)
- Git hooks enforcing lint, format, and conventional commits
- CI/CD pipeline (GitHub Actions: lint, test, build)
- Environment-specific configuration (development, staging, production)
- Database seeding script for development
- Bundle analyzer for build inspection
- Skeleton loading states
- API documentation with Swagger UI (OpenAPI 3.1)
- Multi-stage Docker build for production
- Responsive, dark-mode-ready UI

## Prerequisites

- [Node.js](https://nodejs.org/) 22 or later
- [Yarn](https://classic.yarnpkg.com/) 1.x
- [MongoDB](https://www.mongodb.com/) (local or Atlas) **OR** [Docker](https://www.docker.com/)

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd bonby-nextjs-boilerplate
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in the values:

| Variable              | Description                                                            | Required |
| --------------------- | ---------------------------------------------------------------------- | -------- |
| `MONGODB_URI`         | MongoDB connection string                                              | Yes      |
| `AUTH_SECRET`         | Auth.js secret (min 32 chars). Generate with `openssl rand -base64 33` | Yes      |
| `AUTH_TRUST_HOST`     | Set to `"true"` when behind a reverse proxy (staging/production)       | No       |
| `AUTH_GOOGLE_ID`      | Google OAuth client ID                                                 | No       |
| `AUTH_GOOGLE_SECRET`  | Google OAuth client secret                                             | No       |
| `AUTH_GITHUB_ID`      | GitHub OAuth client ID                                                 | No       |
| `AUTH_GITHUB_SECRET`  | GitHub OAuth client secret                                             | No       |
| `NEXT_PUBLIC_APP_URL` | Your app URL                                                           | No       |
| `NEXT_PUBLIC_APP_ENV` | Environment name: `development`, `staging`, or `production`            | No       |

### 4. Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Configuration

The project supports three environments with separate configuration files:

| File               | Purpose                                       | Committed to Git |
| ------------------ | --------------------------------------------- | ---------------- |
| `.env.example`     | Template with all variables and documentation | Yes              |
| `.env.development` | Development defaults (local MongoDB, debug)   | Yes              |
| `.env.staging`     | Staging template (Atlas MongoDB, staging URL) | Yes              |
| `.env.production`  | Production template (Atlas MongoDB, prod URL) | Yes              |
| `.env.local`       | Local overrides (your actual secrets)         | No (gitignored)  |

**Loading priority** (highest to lowest):

1. `.env.local` — always loaded, gitignored
2. `.env.[environment]` — loaded based on `NODE_ENV`
3. `.env` — fallback

**Environment validation** (`config/env.ts`):

- All env vars are validated at startup using Zod
- Production builds enforce `AUTH_SECRET` minimum length of 32 characters
- Missing required variables throw immediately with descriptive errors
- Use `isDevelopment`, `isStaging`, `isProduction` helpers for conditional logic

### Switching environments

```bash
# Development (default)
yarn dev

# Production build locally
NODE_ENV=production yarn build && yarn start

# Docker with specific environment
APP_ENV=staging docker compose up -d
```

## Docker Setup

Run the entire stack (app + MongoDB) with a single command:

### 1. Set up environment

```bash
cp .env.example .env
```

Edit `.env` and set at least `AUTH_SECRET`:

```bash
openssl rand -base64 33
```

### 2. Build and start

```bash
# Build and start all services (defaults to development)
docker compose up -d

# Start with a specific environment
APP_ENV=staging docker compose up -d
APP_ENV=production docker compose up -d

# Or use the yarn script
yarn docker:up
```

The app will be available at [http://localhost:3000](http://localhost:3000) with MongoDB running on port 27017.

### 3. Stop

```bash
docker compose down

# To also remove the MongoDB data volume:
docker compose down -v
```

## Testing

The project uses [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit and component testing.

### Database seeding

Populate the database with test users for development:

```bash
yarn seed
```

This creates:

- `admin@example.com` / `admin123456` (ADMIN role)
- `user@example.com` / `user123456` (USER role)

### Running tests

```bash
# Run all tests once
yarn test

# Watch mode (re-runs on file changes)
yarn test:watch

# With coverage report
yarn test:coverage
```

### Test file conventions

- Test files live alongside source files in `__tests__/` folders
- Naming: `<module>.test.ts` or `<component>.test.tsx`
- Example structure:

```
lib/
  __tests__/
    utils.test.ts
  utils.ts
validators/
  __tests__/
    auth.test.ts
  auth.ts
hooks/
  __tests__/
    use-mounted.test.ts
  use-mounted.ts
```

### E2E tests (Playwright)

```bash
# Install browsers (first time only)
npx playwright install

# Run E2E tests
yarn test:e2e

# Run with Playwright UI
yarn test:e2e:ui
```

E2E tests live in the `e2e/` directory and test full user flows (navigation, auth pages, protected routes).

### Writing tests

```typescript
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

// Unit test
describe("myFunction", () => {
  it("does something", () => {
    expect(myFunction("input")).toBe("expected");
  });
});

// Component test
describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

## Internationalization (i18n)

The project uses [next-intl](https://next-intl.dev/) for internationalization with locale-based routing.

### Supported locales

| Locale | Language   | URL prefix           |
| ------ | ---------- | -------------------- |
| `en`   | English    | (default, no prefix) |
| `vi`   | Vietnamese | `/vi`                |

### How it works

- Default locale (`en`) has no URL prefix: `/sign-in`, `/dashboard`
- Non-default locales have a prefix: `/vi/sign-in`, `/vi/dashboard`
- Locale detection is automatic based on browser `Accept-Language` header
- Users can switch locales via the `LocaleSwitcher` component

### Translation files

Translations live in `messages/`:

```
messages/
  en.json    # English translations
  vi.json    # Vietnamese translations
```

### Adding a new locale

1. Add the locale to `i18n/config.ts`:

```typescript
export const locales = ["en", "vi", "ja"] as const;
```

2. Create the translation file `messages/ja.json` (copy structure from `en.json`)
3. That's it — routing, middleware, and static generation are automatic

### Using translations

**Server Components:**

```typescript
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("home");
  return <h1>{t("title")}</h1>;
}
```

**Client Components:**

```typescript
"use client";
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("common");
  return <p>{t("loading")}</p>;
}
```

**With parameters:**

```typescript
// In JSON: "welcome": "Welcome back, {name}!"
t("welcome", { name: "John" });
```

### Navigation

Use the i18n-aware navigation helpers instead of `next/link` and `next/navigation`:

```typescript
import { Link, redirect, usePathname, useRouter } from "@/i18n/navigation";
```

## Available Scripts

| Script               | Description                             |
| -------------------- | --------------------------------------- |
| `yarn dev`           | Start development server with Turbopack |
| `yarn build`         | Build for production                    |
| `yarn start`         | Start production server                 |
| `yarn lint`          | Run ESLint                              |
| `yarn lint:fix`      | Run ESLint and auto-fix issues          |
| `yarn format`        | Format all files with Prettier          |
| `yarn format:check`  | Check formatting without changes        |
| `yarn test`          | Run unit tests once (Vitest)            |
| `yarn test:watch`    | Run unit tests in watch mode            |
| `yarn test:coverage` | Run unit tests with coverage report     |
| `yarn test:e2e`      | Run E2E tests (Playwright)              |
| `yarn test:e2e:ui`   | Run E2E tests with Playwright UI        |
| `yarn seed`          | Seed database with test users           |
| `yarn analyze`       | Build with bundle analyzer              |
| `yarn docker:up`     | Start Docker Compose services           |
| `yarn docker:down`   | Stop Docker Compose services            |
| `yarn docker:build`  | Rebuild Docker images                   |

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (html/body + fonts)
│   ├── global-error.tsx          # Global error handler (Sentry)
│   ├── [locale]/                 # Locale-based routing segment
│   │   ├── layout.tsx            # Locale layout with providers
│   │   ├── page.tsx              # Home page
│   │   ├── loading.tsx           # Loading UI
│   │   ├── error.tsx             # Error boundary
│   │   ├── not-found.tsx         # 404 page
│   │   ├── (auth)/               # Auth pages (sign-in, sign-up)
│   │   └── (protected)/          # Protected pages (dashboard)
│   ├── api-docs/                  # Swagger UI page
│   └── api/
│       ├── auth/[...nextauth]/   # Auth.js API route
│       ├── docs/                 # OpenAPI JSON spec endpoint
│       └── health/               # Health check (with DB ping)
├── actions/                      # Server Actions
├── components/
│   ├── features/                 # Feature/domain components
│   │   ├── auth/                 # Auth components
│   │   ├── locale/               # Locale switcher
│   │   └── theme/                # Theme toggle (dark mode)
│   ├── providers/                # Context providers
│   └── ui/                       # Reusable UI components (Skeleton)
├── models/                       # Mongoose models (with indexes)
├── hooks/                        # Custom React hooks
├── lib/                          # Core utilities
│   ├── api-error.ts              # Standardized error classes + responses
│   ├── rate-limit.ts             # In-memory rate limiter
│   ├── swagger.ts                # OpenAPI 3.1 spec definition
│   ├── mongoose.ts               # Database connection
│   ├── query-client.ts           # TanStack Query client
│   └── utils.ts                  # Helper functions (cn, etc.)
├── i18n/                         # Internationalization
├── messages/                     # Translation files (en, vi)
├── e2e/                          # Playwright E2E tests
├── scripts/                      # Utility scripts (seed, etc.)
├── .github/                      # GitHub Actions CI + Dependabot
├── .husky/                       # Git hooks (pre-commit, commit-msg)
├── instrumentation.ts            # Sentry server/edge init
├── instrumentation-client.ts     # Sentry client init
├── auth.ts                       # Auth.js configuration
├── auth.config.ts                # Auth.js edge-safe config
├── middleware.ts                 # Auth + i18n middleware
├── commitlint.config.ts          # Commit message rules
├── vitest.config.ts              # Unit test configuration
├── playwright.config.ts          # E2E test configuration
├── Dockerfile                    # Multi-stage production build
└── docker-compose.yml            # App + MongoDB services
```

### Folder Conventions

| Folder                  | Purpose                                                                                                                                                                                                                                                   | Example                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `app/`                  | **Routing and pages.** Every folder with a `page.tsx` becomes a URL route. Contains layouts, loading states, error boundaries, and API routes. Only routing and page-level concerns go here -- no business logic.                                         | `app/[locale]/(auth)/sign-in/page.tsx` → `/sign-in`                     |
| `app/api/`              | **API route handlers.** REST endpoints for external consumers (webhooks, third-party integrations). For internal mutations from your own UI, prefer Server Actions in `actions/` instead.                                                                 | `app/api/health/route.ts` → `GET /api/health`                           |
| `actions/`              | **Server Actions (write operations).** Functions marked with `"use server"` that mutate data. Called directly from client components via form actions or event handlers -- no manual `fetch()` needed. Think of these as your POST/PUT/DELETE operations. | `signUpWithCredentials()`, `deletePost()`                               |
| `services/`             | **Data fetching (read operations).** Functions that query and retrieve data. Used with TanStack Query's `useQuery` on the client or called directly in Server Components. Think of these as your GET operations.                                          | `getUserById()`, `getPosts()`, `searchProducts()`                       |
| `components/`           | **Reusable UI components.** Split into `features/` (domain-specific), `ui/` (generic primitives), and `providers/` (context wrappers). Page-specific components can live next to their page in `app/`.                                                    | `SignInForm`, `UserButton`, `QueryProvider`                             |
| `components/features/`  | **Feature/domain components.** Grouped by business domain. Each subfolder contains components tied to a specific feature area. Add new subfolders as your app grows (e.g., `blog/`, `dashboard/`, `billing/`).                                            | `features/auth/sign-in-form.tsx`, `features/locale/locale-switcher.tsx` |
| `components/ui/`        | **Primitive UI components.** Generic, domain-agnostic building blocks (buttons, inputs, modals, cards). These never contain business logic and can be used anywhere.                                                                                      | `Button`, `Input`, `Dialog`, `Card`                                     |
| `components/providers/` | **React context providers.** Client-side wrappers that provide global state or third-party context to the component tree. Wired into the root `layout.tsx`.                                                                                               | `SessionProvider`, `QueryProvider`, `ToastProvider`                     |
| `models/`               | **Mongoose schemas and models.** Database model definitions with TypeScript interfaces. Each file defines one model and exports both the model and its interface type.                                                                                    | `User` model with `IUser` interface                                     |
| `hooks/`                | **Custom React hooks.** Reusable client-side logic extracted into hooks. Keep hooks focused on a single concern.                                                                                                                                          | `useCurrentUser()`, `useMounted()`                                      |
| `lib/`                  | **Core utilities and singletons.** Infrastructure code: database connections, client factories, and general-purpose helper functions. Not business logic -- just the plumbing.                                                                            | `dbConnect()`, `getQueryClient()`, `cn()`                               |
| `i18n/`                 | **Internationalization config.** Locale definitions, routing configuration, server request config, and i18n-aware navigation helpers.                                                                                                                     | `routing.ts`, `navigation.ts`                                           |
| `messages/`             | **Translation files.** JSON files with translation strings per locale. One file per locale.                                                                                                                                                               | `en.json`, `vi.json`                                                    |
| `types/`                | **Shared TypeScript types.** Type definitions, interfaces, and module augmentations used across multiple files. Types specific to a single file should stay in that file.                                                                                 | `ApiResponse<T>`, `next-auth.d.ts` augmentation                         |
| `validators/`           | **Zod validation schemas.** Input validation schemas for forms, API requests, and data parsing. Shared between client (form validation) and server (action validation) for consistent rules.                                                              | `signInSchema`, `signUpSchema`                                          |
| `constants/`            | **App-wide constants.** Static values, route paths, enum-like objects, and configuration that doesn't change at runtime. No functions -- just data.                                                                                                       | `APP_NAME`, `AUTH_ROUTES`, `PROTECTED_ROUTES`                           |
| `config/`               | **Runtime configuration.** Environment variable validation and app settings that depend on the environment. Uses Zod to validate `process.env` at startup and fail fast on missing values.                                                                | `env.ts` validates `MONGODB_URI`, `AUTH_SECRET`                         |

## Code Conventions

### File and Folder Naming

All files and folders use **kebab-case** (lowercase with hyphens). This is enforced by ESLint via `eslint-plugin-check-file`.

| Type           | Convention                 | Example                                    |
| -------------- | -------------------------- | ------------------------------------------ |
| Components     | `kebab-case.tsx`           | `sign-in-form.tsx`, `user-button.tsx`      |
| Hooks          | `use-*.ts`                 | `use-current-user.ts`, `use-mounted.ts`    |
| Server Actions | `*.actions.ts`             | `auth.actions.ts`, `post.actions.ts`       |
| Services       | `*.service.ts`             | `user.service.ts`, `post.service.ts`       |
| Models         | `*.model.ts`               | `user.model.ts`, `post.model.ts`           |
| Validators     | `*.ts` (named by domain)   | `auth.ts`, `post.ts`                       |
| Tests          | `*.test.ts` / `*.test.tsx` | `utils.test.ts`, `sign-in-form.test.tsx`   |
| Types          | `*.ts` or `*.d.ts`         | `index.ts`, `next-auth.d.ts`               |
| Folders        | `kebab-case`               | `sign-in/`, `features/`, `query-provider/` |

**Exceptions:** The `app/` directory follows Next.js conventions -- route groups `(auth)`, dynamic segments `[slug]`, catch-all `[...nextauth]`, `[locale]`, etc. Test folders use `__tests__/` convention.

### Component Conventions

| Rule                                            | Example                                 |
| ----------------------------------------------- | --------------------------------------- |
| Use **named exports** for components            | `export function SignInForm()`          |
| Client components start with `"use client"`     | Top of file                             |
| Server Actions start with `"use server"`        | Top of file                             |
| One component per file                          | `sign-in-form.tsx` exports `SignInForm` |
| Colocate types with the component unless shared | Shared types go in `types/`             |

### Import Order

Imports are auto-sorted by Prettier (`@ianvs/prettier-plugin-sort-imports`):

1. React and Next.js imports
2. Third-party packages
3. Internal aliases (`@/...`)
4. Relative imports (`./...`)

### Tailwind Class Order

CSS classes are auto-sorted by Prettier (`prettier-plugin-tailwindcss`) into canonical Tailwind order on every format.

### Git Branch Naming

Use the following branch naming convention:

| Pattern                  | Use case                   | Example                     |
| ------------------------ | -------------------------- | --------------------------- |
| `feature/<description>`  | New feature                | `feature/user-profile`      |
| `fix/<description>`      | Bug fix                    | `fix/login-redirect`        |
| `hotfix/<description>`   | Urgent production fix      | `hotfix/auth-crash`         |
| `chore/<description>`    | Maintenance, tooling, deps | `chore/update-dependencies` |
| `refactor/<description>` | Code restructuring         | `refactor/auth-flow`        |
| `docs/<description>`     | Documentation only         | `docs/api-usage`            |

Rules:

- Always branch from `main` (or `develop` if using Git Flow)
- Use **kebab-case** for the description part
- Keep descriptions short and descriptive (2-4 words)
- Delete branches after merging

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>
```

| Type       | Purpose                     |
| ---------- | --------------------------- |
| `feat`     | New feature                 |
| `fix`      | Bug fix                     |
| `docs`     | Documentation               |
| `style`    | Formatting (no code change) |
| `refactor` | Code restructuring          |
| `test`     | Adding/updating tests       |
| `chore`    | Maintenance, tooling, deps  |

Examples:

- `feat(auth): add GitHub OAuth provider`
- `fix(dashboard): resolve session redirect loop`
- `chore(deps): update next-auth to v5.1`

## Authentication

### Supported Providers

- **Credentials:** Email + password (bcrypt hashed)
- **Google:** OAuth 2.0
- **GitHub:** OAuth

### Setting Up OAuth

**Google:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create an OAuth 2.0 Client ID
3. Set authorized redirect URI to `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Secret to `.env.local`

**GitHub:**

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set authorization callback URL to `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret to `.env.local`

### How It Works

Auth.js v5 with JWT strategy (no database adapter):

1. **Sign Up:** Server Action validates input, hashes password, creates user in MongoDB via Mongoose
2. **Sign In:** Server Action validates credentials, Auth.js issues encrypted JWT cookie
3. **Session:** `auth()` decrypts JWT -- zero database hits per request
4. **OAuth:** On first OAuth sign-in, a user is created in MongoDB via the `signIn` callback
5. **Protection:** Middleware checks JWT and redirects unauthenticated users
6. **Feedback:** Toast notifications for auth errors and success events

## Security

### Headers

The following security headers are applied to all routes via `next.config.ts`:

| Header                      | Value                                          |
| --------------------------- | ---------------------------------------------- |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options`           | `SAMEORIGIN`                                   |
| `X-Content-Type-Options`    | `nosniff`                                      |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`              |
| `Permissions-Policy`        | `camera=(), microphone=(), geolocation=()`     |
| `X-DNS-Prefetch-Control`    | `on`                                           |

### Rate Limiting

Auth endpoints are rate-limited per IP address:

- **Sign in:** 5 attempts per minute
- **Sign up:** 3 attempts per minute

Implemented via an in-memory rate limiter (`lib/rate-limit.ts`). For production at scale, replace with Redis-backed rate limiting.

## Error Tracking (Sentry)

Sentry is pre-configured for client, server, and edge runtimes. To enable:

1. Create a project at [sentry.io](https://sentry.io)
2. Set `NEXT_PUBLIC_SENTRY_DSN` in your environment
3. Optionally set `SENTRY_ORG`, `SENTRY_PROJECT`, and `SENTRY_AUTH_TOKEN` for source map uploads

When `NEXT_PUBLIC_SENTRY_DSN` is empty, Sentry is disabled (zero overhead).

## API Documentation

Interactive API documentation is available via Swagger UI (OpenAPI 3.1).

- **Swagger UI page:** [/api-docs](http://localhost:3000/api-docs)
- **OpenAPI JSON spec:** [/api/docs](http://localhost:3000/api/docs)

The spec is defined in `lib/swagger.ts` and covers all REST API endpoints (health check, Auth.js routes). Server Actions (sign-in, sign-up) are not REST endpoints and are documented separately in the [Authentication](#authentication) section.

To add documentation for new endpoints, update the `paths` object in `lib/swagger.ts`. The spec is served dynamically, so changes are reflected immediately in development.

## Dark Mode

Dark mode is powered by `next-themes` with class-based toggling:

- **System preference** detected automatically on first visit
- **Manual toggle** via the `ThemeToggle` component in the header
- Dark mode classes use Tailwind's `dark:` variant

## Git Hooks

Git hooks are enforced via `husky`:

| Hook         | Tool        | Action                                               |
| ------------ | ----------- | ---------------------------------------------------- |
| `pre-commit` | lint-staged | Format (Prettier) and lint (ESLint) staged files     |
| `commit-msg` | commitlint  | Validate commit message follows Conventional Commits |

## CI/CD

GitHub Actions runs on every push to `main` and on PRs:

1. **Lint** — format check + ESLint
2. **Test** — Vitest unit tests
3. **Build** — production build (runs after lint + test pass)

Dependabot is configured to check for dependency updates weekly.

## Deployment Guide

### Option 1: Vercel (Recommended)

The easiest way to deploy a Next.js application.

**Steps:**

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com) and import your project
3. Set environment variables in the Vercel dashboard:

```
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/bonby-prod
AUTH_SECRET=<generate with: openssl rand -base64 33>
AUTH_TRUST_HOST=true
AUTH_GOOGLE_ID=<your-google-client-id>
AUTH_GOOGLE_SECRET=<your-google-client-secret>
AUTH_GITHUB_ID=<your-github-client-id>
AUTH_GITHUB_SECRET=<your-github-client-secret>
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_ENV=production
```

4. Deploy -- Vercel auto-detects Next.js and configures the build
5. Set up your custom domain in the Vercel dashboard

**Environment-specific deployments:**

- **Production:** Auto-deploys from `main` branch
- **Staging:** Create a `staging` branch; Vercel creates preview deployments with separate env vars
- **Preview:** Every PR gets a unique preview URL

### Option 2: Docker on VPS

Deploy using Docker on any VPS (DigitalOcean, AWS EC2, Hetzner, etc.).

**1. Prepare the server:**

```bash
# Install Docker and Docker Compose
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

**2. Clone and configure:**

```bash
git clone <your-repo-url>
cd bonby-nextjs-boilerplate

# Create env file with production values
cp .env.production .env
# Edit .env with your production secrets
```

**3. Build and start:**

```bash
# Production
APP_ENV=production docker compose up -d --build

# Staging
APP_ENV=staging docker compose up -d --build
```

**4. Set up a reverse proxy (nginx):**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**5. SSL with Certbot:**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Option 3: AWS (ECS / App Runner)

**AWS App Runner (simplest):**

1. Push your Docker image to ECR
2. Create an App Runner service pointing to your ECR image
3. Set environment variables in the App Runner console
4. App Runner handles scaling, load balancing, and SSL

```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker build -t bonby-app .
docker tag bonby-app:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/bonby-app:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/bonby-app:latest
```

### Option 4: Node.js Standalone

Deploy the standalone Node.js output directly (no Docker needed).

```bash
# Build
yarn build

# The output is in .next/standalone/
# Copy static files
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

# Start
cd .next/standalone
NODE_ENV=production node server.js
```

Use PM2 for process management:

```bash
npm install -g pm2
pm2 start .next/standalone/server.js --name bonby-app
pm2 save
pm2 startup
```

### Deployment Checklist

- [ ] Set `AUTH_SECRET` to a strong random value (min 32 chars)
- [ ] Set `AUTH_TRUST_HOST=true` if behind a reverse proxy
- [ ] Use a MongoDB Atlas connection string for production
- [ ] Set `NEXT_PUBLIC_APP_URL` to your actual domain
- [ ] Set `NEXT_PUBLIC_APP_ENV=production`
- [ ] Configure OAuth callback URLs for your production domain
- [ ] Set up SSL/TLS (HTTPS)
- [ ] Configure proper CORS if using external API consumers
- [ ] Set up monitoring and logging

## License

MIT
