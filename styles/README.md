# Styles Directory

This directory contains the global styles and design system for the checkout application.

## Structure

- `_tokens.scss` - Design tokens (colors, typography, spacing, etc.)
- `_mixins.scss` - Reusable Sass mixins and functions
- `globals.scss` - Global styles and base element styles

## Usage

### In Component Styles

Import tokens and mixins in your component `.module.scss` files:

```scss
@import '@/styles/tokens';
@import '@/styles/mixins';

.myComponent {
  @include card-base;
  padding: $spacing-md;
  color: $color-text-primary;
}
```

### Design Tokens

All design tokens are available as Sass variables:

```scss
// Colors
$color-primary
$color-success
$color-error
$color-text-primary
// ... etc

// Spacing
$spacing-xs
$spacing-sm
$spacing-md
// ... etc

// Typography
$font-family-base
$font-size-base
$font-weight-medium
// ... etc
```

### Mixins

Use mixins for common patterns:

```scss
// Typography
@include font-base;
@include font-sm;
@include font-weight-semibold;

// Colors
@include text-primary;
@include text-secondary;

// Spacing (using function)
padding: spacing('md');
margin: spacing('lg');

// Borders
@include radius-md;
@include shadow-sm;

// Transitions
@include transition-base;

// Input states
@include input-base;
@include input-error;
@include input-success;

// Buttons
@include button-base;
@include button-primary;

// Cards
@include card-base;

// Responsive
@include mobile {
  // mobile styles
}
```

## Design System

The design system follows the Inspire brand guidelines with:

- Primary color: `#0094ff` (Inspire blue)
- Font: Inter (with fallbacks)
- Spacing scale: 4px base unit
- Border radius: 4px, 6px, 10px
- Shadows: 3 levels (sm, md, lg)
