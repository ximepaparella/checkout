# Architecture & Folder Structure

## Overview

This project follows a **feature-based architecture** with clear separation between shared code and feature-specific code.

## Folder Structure

```
/app                    # Next.js App Router (pages, layouts, route handlers)
/features               # Feature modules (self-contained)
  /checkout
    /components         # Feature-specific components
    /hooks              # Feature-specific hooks
    /lib                # Feature-specific utilities
    /types              # Feature-specific types
    /__tests__          # Feature-specific tests
/shared                 # Shared code (used across multiple features)
  /ui                   # Design system / Chassis components
  /hooks                # Shared React hooks
  /lib                  # Shared utilities
  /types                # Shared TypeScript types
  /constants            # Shared constants
/styles                 # Global styles
/__tests__              # Test utilities and setup
```

## Principles

### 1. Feature-Based Architecture

- Each feature in `/features/[feature-name]` is **self-contained**
- Features can have their own: `components/`, `hooks/`, `lib/`, `types/`, `__tests__/`
- Features should **not** import from other features directly
- Features can import from `/shared` and `/app`

### 2. Shared Code (`/shared`)

- **`/shared/ui`**: Design system components (Button, Input, Card, etc.)
  - Stateless, presentational components
  - Reusable across all features
- **`/shared/hooks`**: Shared React hooks (useLocalStorage, useDebounce, etc.)
- **`/shared/lib`**: Shared utilities (formatters, validators, etc.)
- **`/shared/types`**: Shared TypeScript types and interfaces
- **`/shared/constants`**: Shared constants and configuration

### 3. Dependency Boundaries

```
Feature → Shared ✅
Feature → App ✅
Feature → Feature ❌ (use shared instead)
Shared → Feature ❌
App → Feature ✅
App → Shared ✅
```

### 4. Colocation

- Keep related code together
- Components, hooks, and utilities used by a single feature should live within that feature
- Only move to `/shared` when code is used by **multiple features**

## Example Feature Structure

```
/features/checkout
  /components
    CheckoutForm.tsx
    DeliveryOptions.tsx
    PaymentSummary.tsx
  /hooks
    useCheckout.ts
    useDeliveryOptions.ts
  /lib
    checkoutValidators.ts
    checkoutFormatters.ts
  /types
    checkout.types.ts
  /__tests__
    CheckoutForm.test.tsx
    useCheckout.test.ts
```

## When to Use `/shared` vs Feature-Specific

### Use `/shared` when:

- Code is used by **2+ features**
- It's a design system component (Button, Input, Modal)
- It's a generic utility (date formatters, validators)
- It's a shared hook (useLocalStorage, useDebounce)

### Keep in feature when:

- Code is only used by **one feature**
- It contains business logic specific to that feature
- It's tightly coupled to the feature's domain

## Import Paths

Use TypeScript path aliases for clean imports:

```typescript
// From shared
import { Button } from '@/shared/ui/Button';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { formatCurrency } from '@/shared/lib/formatters';

// From feature
import { CheckoutForm } from '@/features/checkout/components/CheckoutForm';
import { useCheckout } from '@/features/checkout/hooks/useCheckout';

// From app
import { Layout } from '@/app/components/Layout';
```
