---
description: # Guidelines for Styling
globs: 
alwaysApply: true
---
# Guidelines for Styling

## Purpose and Overview
These styling guidelines ensure consistency, readability, and maintainability across the project's components. By following these conventions, we maintain a clean and organized codebase that's easier to understand and modify.

## Tailwind CSS Usage

### Class Organization
When using the `cn()` utility function to combine Tailwind classes, group related classes on separate lines by their purpose:

NOTE: Only group the classes if there's a psuedo classes involve

```tsx
className={cn(
  // Layout and dimensions
  'box-border h-[44px] w-full md:w-full',
  // Borders and corners
  'rounded-2xl border border-base-400',
  // Spacing and padding
  'px-3 md:px-4',
  // Typography and colors
  'placeholder:text-base-400',
  // States (focus, hover, active)
  'focus:border-[2px] focus:border-primary-focus focus:outline-none focus:ring-0',
  // Conditional states (disabled, checked, etc.)
  'disabled:border-base-400 disabled:bg-white disabled:text-base-400',
  // External classes passed as props
  className
)}
```

### Grouping Principles
Group Tailwind classes by these categories:
1. **Layout & Sizing**: `flex`, `grid`, `w-`, `h-`, `max-w-`, etc.
2. **Positioning**: `relative`, `absolute`, `inset-`, etc.
3. **Borders & Corners**: `border-`, `rounded-`, etc.
4. **Spacing**: `p-`, `m-`, `gap-`, etc.
5. **Typography**: `text-`, `font-`, etc.
6. **Colors & Backgrounds**: `bg-`, `text-color`, etc.
7. **State Variants**: `hover:`, `focus:`, `active:`, etc.
8. **Conditional Variants**: `disabled:`, `dark:`, etc.
9. **External Classes**: Always include the `className` prop last

## Responsive Design Approach

### Mobile-First Design
Follow a mobile-first approach with responsive breakpoints:

```tsx
className={cn(
  // Mobile (default)
  'w-full p-2 text-sm',
  // Medium screens (md)
  'md:w-auto md:p-4 md:text-base',
  // Large screens (lg)
  'lg:p-6 lg:text-lg'
)}
```

### Media Query Grouping
Group responsive classes by breakpoint rather than by property type for complex components. This improves readability by making it easy to see all styles that apply at each breakpoint:

```tsx
className={cn(
  // Base styles (mobile)
  'flex flex-col w-full p-4 text-sm rounded-md bg-white',
  // Small screens (sm)
  'sm:flex-row sm:gap-4 sm:p-5 sm:text-base',
  // Medium screens (md)
  'md:gap-6 md:p-6 md:rounded-lg',
  // Large screens (lg)
  'lg:max-w-5xl lg:p-8 lg:gap-8',
  // Larger screens (lg)
  'xl:max-w-full xl:p-10 xl:gap-8',
  // External classes
  className
)}
```

## Implementation Examples

### Button Component Example
```tsx
<button
  className={cn(
    // Base styles
    'inline-flex items-center justify-center',
    'h-10 px-4 py-2',
    'rounded-md text-sm font-medium',
    'transition-colors focus-visible:outline-none focus-visible:ring-2',
    // Variant styles
    variant === 'default' && 'bg-primary text-white hover:bg-primary-focus',
    variant === 'outline' && 'border border-base-400 hover:bg-base-100',
    // Size styles
    size === 'sm' && 'h-8 px-3 text-xs',
    size === 'lg' && 'h-12 px-6 text-base',
    // Responsive styles
    'w-full sm:w-auto',
    'text-sm md:text-base',
    // Disabled state
    disabled && 'opacity-50 cursor-not-allowed',
    // External classes
    className
  )}
>
  {children}
</button>
```

### Card Component Example
```tsx
<div
  className={cn(
    // Base layout and spacing
    'w-full p-4',
    // Responsive layout
    'md:p-6 lg:p-8',
    'sm:flex sm:gap-4 md:gap-6',
    // Borders and shadows
    'rounded-lg border border-base-200 shadow-sm',
    // Background and text colors
    'bg-white text-base-900',
    // Hover state
    'hover:shadow-md transition-shadow duration-200',
    // External classes
    className
  )}
>
  {children}
</div>
``` 