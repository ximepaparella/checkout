# Checkout Frontend

A scalable Next.js checkout application built with TypeScript, Sass, and feature-based architecture.

## Prerequisites

- Node.js 20 (use `nvm use` to switch to the correct version)
- pnpm 9

## Setup

1. **Install Node.js version**

   ```bash
   nvm use
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

   ⚠️ **Important**: This project uses **pnpm**, not npm. Using `npm install` will cause issues and may not respect the `packageManager` field.

3. **Set up Git hooks**

   ```bash
   pnpm lefthook install
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Workflow

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm test` - Run tests once
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report

### Code Quality

This project enforces code quality through:

- **Pre-commit hooks** (via lefthook): Automatically runs lint, format check, and typecheck before commits
- **ESLint**: Code linting with Next.js and TypeScript rules
- **Prettier**: Code formatting (single quotes, trailing commas, 100 char width)
- **TypeScript**: Strict mode enabled for type safety

### Project Structure

```
/app                    # Next.js App Router (pages, layouts, route handlers)
/features               # Feature modules (self-contained)
  /checkout            # Example: checkout feature
    /components        # Feature-specific components
    /hooks             # Feature-specific hooks
    /lib               # Feature-specific utilities
    /types             # Feature-specific types
    /__tests__         # Feature-specific tests
/shared                 # Shared code (used across multiple features)
  /ui                  # Design system / Chassis components
  /hooks               # Shared React hooks
  /lib                 # Shared utilities
  /types               # Shared TypeScript types
  /constants           # Shared constants
/styles                 # Global Sass files
/__tests__             # Test utilities and setup
```

### Feature-Based Architecture

Features are organized in the `/features` directory. Each feature is **self-contained** with:

- Components specific to that feature
- Hooks and utilities
- Types and interfaces
- Tests

**Shared code** (used by 2+ features) goes in `/shared`:

- `/shared/ui` - Design system components (Button, Input, etc.)
- `/shared/hooks` - Shared React hooks
- `/shared/lib` - Shared utilities
- `/shared/types` - Shared TypeScript types

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture guidelines.

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Test Coverage

The project enforces **80% coverage threshold** for:

- Lines
- Functions
- Branches
- Statements

Coverage reports are generated in the `/coverage` directory.

### Writing Tests

Tests should be colocated with the code they test:

- Component tests: `ComponentName.test.tsx`
- Hook tests: `useHookName.test.ts`
- Utility tests: `utilityName.test.ts`

Use React Testing Library for component tests and Vitest for all testing.

## CI/CD

### GitHub Actions

The project includes two GitHub Actions workflows:

1. **CI Workflow** (`.github/workflows/ci.yml`)
   - Runs on every PR and push to main
   - Executes: lint, format check, typecheck, tests, coverage check, build
   - **Quality gates**: All checks must pass before merge

2. **Lighthouse CI** (`.github/workflows/lighthouse.yml`)
   - Runs on every PR and push to main
   - Measures Web Vitals and performance metrics
   - **Web Vitals budgets**:
     - LCP (Largest Contentful Paint): < 2.5s
     - CLS (Cumulative Layout Shift): < 0.1
     - INP (Interaction to Next Paint): < 200ms
   - Performance, Accessibility, Best Practices, SEO scores: ≥ 90%

### Lighthouse CI Setup

To enable Lighthouse CI reporting, set the `LHCI_GITHUB_APP_TOKEN` secret in your GitHub repository settings.

## Styling

This project uses **Sass** (not Tailwind) for styling:

- Global styles: `/styles/globals.scss`
- Component-scoped styles: Use Sass modules (`.module.scss`)
- Import paths: Configured in `next.config.js` for easy imports

Example component with Sass module:

```tsx
import styles from './Component.module.scss';

export function Component() {
  return <div className={styles.container}>Content</div>;
}
```

## Quality Gates

The following quality gates are enforced:

- ✅ TypeScript strict mode
- ✅ ESLint + Prettier on pre-commit
- ✅ 80% test coverage threshold
- ✅ Lighthouse Web Vitals budgets
- ✅ All CI checks must pass before merge

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all quality gates pass:
   - `pnpm lint`
   - `pnpm format:check`
   - `pnpm typecheck`
   - `pnpm test:coverage`
   - `pnpm build`
4. Commit your changes (pre-commit hooks will run automatically)
5. Push and create a PR

## Engineering Guidelines

This project follows the guidelines defined in `ENGINEERING_GUIDELINES.md`. Key principles:

- Small, composable units
- Feature-based architecture
- 80% test coverage
- Performance-first (Web Vitals budgets)
- Secure by default
- Backwards compatibility
