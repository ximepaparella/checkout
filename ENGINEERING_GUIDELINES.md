# 🧭 Engineering Guidelines — Next.js / React / Node.js / Go

> Drop this file at the root of your repo as `ENGINEERING_GUIDELINES.md`. It defines baseline **patterns, practices, and guardrails** for a scalable, high-performance codebase.

---

## Table of Contents

1. Principles & Quality Gates
2. Repository Layouts (Monorepo & Polyrepo)
3. Toolchain & Project Scaffolding
4. Coding Standards (All Languages)
5. Next.js & React Practices
6. Node.js API & Services
7. Go Services
8. Testing Strategy
9. Performance & Web Vitals
10. Security & Compliance
11. Observability (Logs, Metrics, Traces)
12. CI/CD Pipelines
13. Release & Versioning
14. Docs, PRs, and Review Process
15. Checklists

---

## 1) Principles & Quality Gates

- **Productivity with guardrails:** automate formatting, linting, type checks, tests on every PR.
- **Small, composable units:** components, hooks, handlers, services; single responsibility.
- **Measure first:** dashboards for Web Vitals, error budgets, API SLOs.
- **Backwards compatibility:** semver, feature flags, progressive rollout.
- **Secure by default:** least-privilege, secrets never in code, SBOMs.
- **Quality gates (block merge if failing):**
  - `npm run typecheck`, `lint`, `test`, `build` must pass.
  - Coverage threshold: **80% lines** (frontend & backend).
  - Web Vitals budgets on key pages (LCP < 2.5s, CLS < 0.1, INP < 200ms).

---

## 2) Repository Layouts

### Option A — Monorepo (recommended for multi-app/platform)

```
/apps
  /web           # Next.js app
  /admin         # Next.js admin or Vite SPA
  /bff           # Node/Go BFF
  /api           # Node/Go services
/packages
  /ui            # React component library
  /config        # shared ESLint/TS/Prettier configs
  /tsconfig      # base tsconfigs
  /utils         # shared utilities
/tools           # scripts (release, codegen)
/infra           # IaC (Terraform), k8s manifests, Helm charts
```

- **Workspaces:** `pnpm` or `yarn` + **Turborepo** for pipelines & caching.
- **Atomic publish:** each package versioned independently or via changesets.

### Option B — Polyrepo

- Mirror the same structure per repository; reuse `/packages/config` as a dedicated **config repo** installed via npm Git tags.

---

## 3) Toolchain & Project Scaffolding

- **Node LTS** (document version in `.nvmrc`), **Go 1.22+** (`go.mod`).
- **TypeScript** everywhere (strict mode).
- **Package manager:** `pnpm` (preferred) with workspaces.
- **Format & lint:** Prettier + ESLint, Stylelint (if CSS), `golangci-lint` for Go.
- **Commit style:** Conventional Commits + commitlint.
- **Git hooks:** `lefthook` or `husky` + `lint-staged`.
- **Environment:** `.env.example` with **no secrets**. Use SSM/Secrets Manager/1Password for real values.
- **Editor:** `.editorconfig`.

**Base config snippets**

`.editorconfig`

```ini
root = true
[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

`.prettierrc`

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

`package.json` (root)

```json
{
  "private": true,
  "packageManager": "pnpm@9",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev --parallel",
    "lint": "turbo run lint",
    "format": "turbo run format",
    "typecheck": "turbo run typecheck",
    "test": "turbo run test",
    "release": "changeset version && changeset publish"
  }
}
```

---

## 4) Coding Standards (All Languages)

- **Naming:** clear, intent-revealing; avoid abbreviations.
- **Errors:** never swallow; include context; prefer typed errors.
- **Dependency boundaries:** UI ↔ domain ↔ infra; no cross-layer imports.
- **Feature flags:** wrap new behavior; default off.
- **Docs:** module `README.md` + JSDoc/GoDoc on public APIs.
- **Testing pyramid:** Unit → Integration → E2E (few).

---

## 5) Next.js & React Practices

### Architecture

- Prefer **App Router** with **React Server Components** for data-heavy views.
- **Route Handlers** for server-side logic close to pages when light; otherwise BFF/API.
- **Colocate** components/hooks with their feature folder.
- **Chassis / Design System:** keep presentational components stateless; business logic in hooks/adapters.

### Performance

- Avoid `react-slick`; prefer custom sliders with requestAnimationFrame.
- Dynamic imports for heavy/optional components.
- Preload fonts & critical resources.
- Use Suspense boundaries for async.
- Measure hydration cost; minimize client bundles.

---

## 6) Node.js API & Services

- Frameworks: **Express/Fastify/Nest** depending on complexity.
- **DDD layering:** `domain/`, `application/`, `infrastructure/`.
- **Validation:** `joi` or `zod`.
- **Errors:** central error middleware + typed errors.
- **Security:** helmet, rate-limits, CSRF tokens, input sanitization.
- **Testing:** supertest for integration, Jest for unit.

---

## 7) Go Services

- **Structure:**

```
/cmd/appname     # entrypoint
/internal        # private modules
/pkg             # public reusable modules
```

- **Dependency injection:** wire or fx.
- **Logging:** zerolog or slog.
- **HTTP:** chi or gin.
- **Config:** `envconfig` or Viper.
- **Testing:** Go test + testify.
- **Error wrapping:** `%w` + `errors.Is`.

---

## 8) Testing Strategy

- **Frontend:** Jest/RTL for unit; Playwright/Cypress for E2E.
- **Backend:** unit + integration with Dockerized DB.
- **Contract tests:** pact or GraphQL introspection snapshot.
- **Coverage threshold:** 80% enforced in CI.

---

## 9) Performance & Web Vitals

- **Budgets:** LCP < 2.5s, CLS < 0.1, INP < 200ms.
- **Monitoring:** Datadog RUM, WebPageTest, Lighthouse CI.
- **Caching:** CDN (CloudFront/Fastly), Redis for hot data.
- **Code splitting:** granular chunks; avoid oversized vendors.
- **Image strategy:** srcSet + CloudFront transforms.

---

## 10) Security & Compliance

- **Secrets:** never in repo.
- **Dependencies:** renovate + `npm audit` + `govulncheck`.
- **AuthN/Z:** JWT with rotation; RBAC/ABAC enforced at middleware.
- **Transport:** TLS everywhere.
- **Compliance:** log data residency, GDPR/PII handling.

---

## 11) Observability

- **Logs:** structured JSON.
- **Metrics:** Prometheus/OpenTelemetry.
- **Tracing:** OpenTelemetry → Jaeger/Datadog.
- **Error tracking:** Sentry/Rollbar.

---

## 12) CI/CD Pipelines

- **CI:** GitHub Actions/GitLab CI.
  - jobs: `lint`, `typecheck`, `test`, `build`, `deploy-preview`.
- **CD:** ArgoCD/Flux or GH Environments.
- **Preview envs:** per PR via Vercel/Netlify or ephemeral k8s namespace.
- **Cache:** turbo/remote cache.
- **Artifact registry:** Docker Hub / ECR / GCP Artifact.

---

## 13) Release & Versioning

- **Semver:** MAJOR.MINOR.PATCH.
- **Changesets:** automatic changelog + version bump.
- **Feature flags:** decouple release from deploy.
- **Release branches:** trunk-based, short-lived feature branches.

---

## 14) Docs, PRs, and Review Process

- Every module: `README.md`.
- PR template: description, screenshots, test coverage, performance notes.
- Codeowners for critical modules.
- Reviews: 2 approvals minimum.
- Architecture docs in `/docs/architecture`.

---

## 15) Checklists

**PR Checklist**

- [ ] Lint, typecheck, tests pass.
- [ ] Added/updated unit tests.
- [ ] No secrets committed.
- [ ] Updated docs/README.
- [ ] Performance impact evaluated.

**Release Checklist**

- [ ] All quality gates passed.
- [ ] Coverage ≥ 80%.
- [ ] Changelog updated.
- [ ] Version bumped via changesets.
- [ ] Release tag created.
- [ ] Deployment verified in staging.

---
