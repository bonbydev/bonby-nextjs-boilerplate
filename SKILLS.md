---
name: nextjs-15-engineering-rules
description: Next.js 15 engineering rules and implementation standards for AI coding agents working in this repository. Use when creating, editing, refactoring, reviewing, or generating code for this Next.js 15 App Router project. Follow these rules for architecture, file placement, imports, naming, TypeScript, server/client boundaries, authentication, styling, security, and code quality.
---

# Next.js 15 AI Agent Rules

## Objective

Produce production-ready code that matches this repository's architecture, tooling, and conventions.

Always prefer consistency with the existing codebase over personal preference.

## Tech Stack

- Next.js 15 with App Router and Turbopack
- TypeScript in strict mode
- Tailwind CSS v4
- Auth.js v5 with JWT sessions
- MongoDB with Mongoose
- TanStack Query v5
- Zod for validation
- ESLint 9 + Prettier

## Core Principles

- Write clear, minimal, maintainable code.
- Keep responsibilities small and isolated.
- Prefer server components by default.
- Use client components only when interactivity, browser APIs, or client-only hooks are required.
- Keep business logic out of route files and page files.
- Prefer composition over large monolithic components.
- Preserve strict typing. Do not use `any` unless absolutely unavoidable.
- Fail early with validation and explicit error handling.
- Optimize for readability first, then performance.
- Do not introduce abstractions before they are needed.
- Follow existing patterns before inventing new ones.

## Mandatory Rules

### 1) App Router First

- Use the App Router only.
- Put routing concerns in `app/`.
- Use `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx` only for route concerns.
- Do not place reusable business logic directly inside route files.

### 2) Server vs Client Boundaries

- Default to Server Components.
- Add `"use client"` only when needed.
- Add `"use server"` only for Server Actions.
- Never move a component to the client just for convenience.
- Keep server-only code out of client bundles.
- Never import server-only modules into client components.

### 3) Clean Architecture by Folder Responsibility

Use these folder responsibilities strictly:

- `app/`: routes, layouts, route states, route-level composition
- `app/api/`: external-facing route handlers only
- `actions/`: server mutations and write operations
- `services/`: read operations and data-fetching functions
- `components/features/`: domain-specific components
- `components/ui/`: reusable presentational primitives
- `components/providers/`: app-wide providers
- `hooks/`: reusable client hooks
- `models/`: Mongoose models and schema definitions
- `lib/`: infrastructure utilities and shared helpers
- `validators/`: Zod schemas
- `types/`: shared types and module augmentation
- `constants/`: static app-wide constants
- `config/`: validated runtime configuration

### 4) Naming Conventions

Use kebab-case for files and folders unless Next.js requires a special name.

#### File naming

- Components: `kebab-case.tsx`
- Hooks: `use-*.ts`
- Server Actions: `*.actions.ts`
- Services: `*.service.ts`
- Models: `*.model.ts`
- Types: `*.ts` or `*.d.ts`

#### Allowed Next.js exceptions

- `page.tsx`
- `layout.tsx`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`
- dynamic route segments like `[id]`
- route groups like `(auth)`
- catch-all segments like `[...nextauth]`

### 5) Component Conventions

- Prefer named exports.
- One primary component per file.
- Keep component props explicit and typed.
- Keep file-local types in the same file unless reused.
- Move shared types into `types/`.
- Keep components focused on rendering and interaction, not data orchestration when avoidable.

### 6) Import Order

Always order imports like this:

1. React and Next.js imports
2. Third-party packages
3. Internal alias imports such as `@/...`
4. Relative imports such as `./...`

Additional rules:

- Keep imports grouped.
- Remove unused imports.
- Prefer absolute alias imports for internal shared modules.
- Prefer one import path per module.
- Do not mix type and value imports carelessly; use `import type` where appropriate.

### 7) TypeScript Standards

- Use strict TypeScript-compatible patterns.
- Avoid `any`.
- Prefer `unknown` over `any` when narrowing is needed.
- Type all function inputs and outputs where it improves clarity.
- Use discriminated unions for variant logic.
- Prefer inferred types for simple local values.
- Avoid unnecessary generic complexity.
- Encode nullable and optional states explicitly.
- Do not silence type errors with unsafe assertions unless there is no better option.

### 8) Validation Rules

- Validate all external input with Zod.
- Reuse schemas across client and server when appropriate.
- Keep schemas in `validators/` when shared.
- Return field-friendly validation errors for forms.
- Never trust request payloads, search params, headers, cookies, or third-party responses without validation.

### 9) Data Access Rules

- Put write logic in Server Actions.
- Put read logic in `services/` or fetch directly in Server Components when simple.
- Keep Mongoose access centralized and predictable.
- Do not duplicate database query logic across files.
- Keep models in `models/`.
- Reuse connection utilities from `lib/`.

### 10) Authentication Rules

- Follow Auth.js v5 patterns already used in the repository.
- Use JWT session strategy.
- Respect role-based access control.
- Protect routes with middleware where appropriate.
- Do not bypass auth checks in server actions, services, or protected UI.
- Treat auth and authorization as separate checks.

### 11) Styling Rules

- Use Tailwind CSS utilities.
- Keep class lists readable.
- Prefer reusable UI primitives for repeated patterns.
- Use `cn()` or repository utility helpers for conditional class names.
- Do not introduce inline styles unless necessary.
- Respect dark mode support.
- Preserve the lime-based light and dark theme tokens already defined in `app/globals.css`.
- Keep components responsive by default.

### 12) Error Handling Rules

- Handle expected errors explicitly.
- Throw typed or standardized errors for unexpected failures.
- Avoid swallowing errors silently.
- Show safe, user-friendly feedback in UI.
- Log diagnostic details only where appropriate.

### 13) Security Rules

- Validate all inputs.
- Sanitize or safely render user-provided content.
- Never expose secrets to the client.
- Never trust client-side authorization alone.
- Respect configured security headers and existing security patterns.
- Keep rate limiting on auth-sensitive flows.
- Avoid creating API surfaces when Server Actions are sufficient.

### 14) Performance Rules

- Prefer server rendering and streaming when appropriate.
- Minimize client JavaScript.
- Avoid unnecessary state, effects, and re-renders.
- Use dynamic import only when it brings clear value.
- Keep data fetching close to where data is used.
- Do not overuse TanStack Query for data that can stay on the server.

## Project Structure Reference

```text
app/
  (auth)/
  api/
actions/
components/
  features/
  providers/
  ui/
models/
hooks/
lib/
validators/
types/
constants/
config/
services/
```

## AI Agent Decision Rules

### When adding a new feature

1. Identify whether the feature is route-level, domain-level, or infrastructure-level.
2. Place files in the correct folder based on responsibility.
3. Decide server or client boundary before writing code.
4. Add validation, auth checks, loading states, and error handling where relevant.
5. Reuse existing UI primitives, utilities, and patterns first.

### When editing existing code

1. Preserve the current architecture unless a clear issue requires refactor.
2. Refactor only as much as needed for the task.
3. Do not rename files or move folders without a strong reason.
4. Keep public interfaces backward compatible unless the task explicitly changes them.

### When creating new files

Check this order:

- Can this live in an existing file without making it too large or mixed-responsibility?
- If not, what is the single best folder based on responsibility?
- Is the name kebab-case and pattern-compliant?
- Does the file export one clear thing?

## Code Generation Patterns

### Page files

- Keep page files lean.
- Compose feature components.
- Fetch data on the server when possible.
- Do not embed large helper functions in pages.

### Server Actions

- Place mutations in `actions/`.
- Start file with `"use server"`.
- Validate input with Zod.
- Check auth and authorization.
- Return structured results for UI consumption.

### Services

- Use for read operations and reusable fetch/query logic.
- Keep them side-effect light.
- Return well-typed results.
- Do not mix UI concerns into services.

### UI components

- Keep `components/ui/` generic.
- No business logic in UI primitives.
- Accept composable props.
- Keep accessibility in mind.

### Feature components

- Keep feature-specific state and logic local.
- Use domain naming.
- Split large forms or flows into smaller subcomponents.

### Hooks

- Use hooks only for reusable client-side logic.
- Do not create hooks that are merely wrappers around one local `useState` unless reused.
- Keep hooks free from unrelated side effects.

### Models

- One model per file.
- Export model and interface/type together.
- Keep indexes and schema options close to the model.
- Avoid redefining models unsafely during hot reload.

## Code Style Rules

- Prefer early returns over deep nesting.
- Keep functions short and single-purpose.
- Avoid magic strings and duplicated constants.
- Prefer descriptive variable names.
- Prefer explicit booleans for flags.
- Avoid comments that restate obvious code.
- Add comments only for non-obvious decisions, constraints, or reasoning.
- Prefer immutable patterns unless mutation is clearer and safe.
- Remove dead code, commented-out code, and temporary logs.

## Accessibility Rules

- Use semantic HTML first.
- Label form controls correctly.
- Keep keyboard navigation working.
- Preserve focus behavior in dialogs and interactive flows.
- Use accessible names for buttons and links.

## API and Route Handler Rules

Use `app/api/` only when you truly need an HTTP endpoint.

Examples:

- third-party callbacks
- webhooks
- external consumers
- machine-readable API endpoints

Do not create route handlers for internal form mutations that fit Server Actions.

## TanStack Query Rules

- Use TanStack Query for client-side async state that benefits from caching, invalidation, or background refresh.
- Do not use it for simple server-rendered data that can stay in Server Components.
- Keep query keys stable and descriptive.
- Centralize query helpers where reuse is meaningful.

## Environment and Config Rules

- Read environment variables through validated config.
- Fail fast on invalid required env values.
- Never access secrets in client components.
- Keep environment-specific behavior explicit.

## Testing Checklist

Before finishing code changes, verify:

- types are correct
- lint should pass
- formatting should pass
- auth impact was considered
- loading and error states were considered

## Do Not Rules

- Do not use Pages Router patterns.
- Do not put business logic in `page.tsx` unless trivial.
- Do not overuse `use client`.
- Do not use `any` casually.
- Do not fetch data in the browser by default when server fetching is enough.
- Do not duplicate schemas, constants, or query logic.
- Do not create generic utility abstractions without evidence of reuse.
- Do not ignore existing middleware or auth patterns.
- Do not introduce a new library when the current stack already solves the problem.

## Preferred Output Behavior for AI Agents

When generating code for this repository, always:

1. State the files to create or update.
2. Follow the folder responsibilities in this document.
3. Use strict TypeScript-friendly code.
4. Keep imports ordered.
5. Use named exports.
6. Respect server/client boundaries.
7. Include validation and auth considerations when relevant.
8. Keep code concise and production-ready.
9. Avoid placeholder comments like `implement later`.
10. Make the result fit naturally into this codebase.

## Definition of Done

A change is complete only when it is:

- correctly placed in the project structure
- consistent with naming conventions
- strongly typed
- validated where needed
- secure by default
- clean, readable, and minimal
- aligned with Next.js 15 App Router best practices
