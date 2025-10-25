# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **pnpm monorepo** using **Turborepo** for task orchestration. The project is a shadcn/ui template for building modern Next.js applications with a shared UI component library.

**Tech Stack:**
- Next.js 15 (with Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui components
- Radix UI primitives
- pnpm workspaces
- Turborepo

## Project Structure

```
├── apps/
│   └── web/              # Next.js application (main app)
├── packages/
│   ├── ui/               # Shared shadcn/ui components library
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
```

### Key Architecture Points

**Monorepo Design:**
- The `@workspace/ui` package is a shared component library consumed by apps
- Components are placed in `packages/ui/src/components/` and exported via package.json exports
- All shadcn/ui components should be added to the `packages/ui` directory, not directly in apps
- The web app transpiles the UI package via `transpilePackages: ["@workspace/ui"]` in next.config.mjs

**Import Aliases:**
- Use `@workspace/ui/components/*` to import UI components
- Use `@workspace/ui/lib/utils` for utility functions like `cn()`
- Use `@workspace/ui/globals.css` for global styles
- Use `@/components/*`, `@/hooks/*`, `@/lib/*` for app-specific code in the web app

**Styling:**
- Tailwind CSS is configured in the UI package
- Global styles are in `packages/ui/src/styles/globals.css`
- Components use the "new-york" shadcn/ui style with CSS variables for theming
- Uses `next-themes` for dark mode support

## Common Development Commands

### Development
```bash
# Start all apps in development mode
pnpm dev

# Start only the web app
pnpm --filter web dev

# Build all packages and apps
pnpm build

# Build only the web app
pnpm --filter web build
```

### Linting and Type Checking
```bash
# Lint all packages
pnpm lint

# Lint and fix issues in web app
pnpm --filter web lint:fix

# Type check the web app
pnpm --filter web typecheck
```

### Adding shadcn/ui Components
```bash
# Add a shadcn component (run from repo root)
pnpm dlx shadcn@latest add <component-name> -c apps/web

# Example: Add a card component
pnpm dlx shadcn@latest add card -c apps/web
```

**Important:** Components will be automatically placed in `packages/ui/src/components/` due to the configuration in `apps/web/components.json`.

### Testing
No test framework is currently configured. Before adding tests, check with the project owner about preferred testing setup (Jest, Vitest, Playwright, etc.).

## Development Guidelines

### Adding New Components
1. Use the shadcn CLI to add components (they go into `packages/ui/src/components/`)
2. Components are automatically exported from `@workspace/ui/components/*`
3. Import in the web app using: `import { Button } from "@workspace/ui/components/button"`

### Working with the UI Package
- All UI components should use the `cn()` utility from `@workspace/ui/lib/utils` for className merging
- Components should follow shadcn/ui patterns with `class-variance-authority` for variants
- Components should be exported with their variant types (e.g., `buttonVariants`)

### Workspace Dependencies
When adding a dependency:
- Add to the specific package that needs it
- Use `pnpm add <package> --filter <workspace>` to add to a specific workspace
- Shared dependencies between workspaces should use `workspace:*` protocol

### Turbo Tasks
The following tasks are configured with Turborepo:
- `build`: Builds with dependency ordering (depends on `^build`)
- `lint`: Lints with dependency ordering
- `check-types`: Type checks with dependency ordering
- `dev`: Runs in watch mode (not cached)

## Code Style

- ESLint is configured to show warnings only (via `eslint-plugin-only-warn`)
- Prettier formatting is available via `pnpm format`
- TypeScript strict mode is enabled
- Use flat config format for ESLint (eslint.config.js)

## Requirements

- Node.js >= 20
- pnpm 10.4.1 (managed by packageManager field)
