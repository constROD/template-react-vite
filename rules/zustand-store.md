---
description: # Guidelines for Zustand Store
globs: **/stores/**/*.ts, **/_stores/**/*.ts
alwaysApply: false
---
# Guidelines for Zustand Stores

## Purpose and Overview
Zustand stores provide centralized state management with a simple API that doesn't require providers or complex setup. They are used to manage application state that needs to be accessed by multiple components, especially across different parts of the component tree. The stores in this project follow a consistent pattern using immer middleware for immutable state updates.

## Structure and Organization

### Store Module Structure
```
src/
├── stores/                 # Shared stores module
│   └── use-[entity]-store.ts  # Store for specific entity
└── features/
    └── [feature-name]/
        └── _stores/        # Feature-specific stores
            └── use-[entity]-store.ts  # Feature-specific store
```

## Naming Conventions

### Files
- `use-[entity]-store.ts`: For store files, use kebab-case

### Types
- `[Entity]StoreState`: Type for store state
- `[Entity]StoreActions`: Type for store actions
- `[Entity]Store`: Combined type for state and actions
- `DEFAULT_[ENTITY]_STORE_STATE`: Constant for default store state

### Functions
- `use[Entity]Store`: The zustand hook for accessing the store

## Implementation Guidelines

### Store Creation
- Use zustand with immer middleware for immutable updates
- Separate state and actions with explicit types
- Define a default state constant
- Export the combined store type and hook

### State Management
- Keep state minimal and focused on a specific domain
- Use immer's state mutation syntax in actions
- Avoid storing derived state that can be computed

### Example Store Implementation
```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Define the state type
export type CounterStoreState = {
  count: number;
};

// Define the actions type
export type CounterStoreActions = {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
};

// Default state constant
export const DEFAULT_COUNTER_STORE_STATE: CounterStoreState = {
  count: 0,
};

// Combined store type
export type CounterStore = CounterStoreState & CounterStoreActions;

// Create and export the store hook
export const useCounterStore = create(
  immer<CounterStore>(set => ({
    ...DEFAULT_COUNTER_STORE_STATE,

    /* Actions */
    increment: () => {
      set(state => {
        state.count += 1;
      });
    },
    decrement: () => {
      set(state => {
        state.count -= 1;
      });
    },
    reset: () => {
      set(state => {
        state.count = DEFAULT_COUNTER_STORE_STATE.count;
      });
    },
    setCount: (count) => {
      set(state => {
        state.count = count;
      });
    },
  }))
);
```

### Example Store Test
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { useCounterStore, DEFAULT_COUNTER_STORE_STATE } from './use-counter-store';

describe('useCounterStore', () => {
  beforeEach(() => {
    useCounterStore.setState(DEFAULT_COUNTER_STORE_STATE);
  });

  it('should initialize with default state', () => {
    expect(useCounterStore.getState().count).toBe(0);
  });

  it('should increment the count', () => {
    useCounterStore.getState().increment();
    expect(useCounterStore.getState().count).toBe(1);
  });

  it('should decrement the count', () => {
    useCounterStore.getState().increment();
    useCounterStore.getState().decrement();
    expect(useCounterStore.getState().count).toBe(0);
  });

  it('should reset the count', () => {
    useCounterStore.getState().increment();
    useCounterStore.getState().reset();
    expect(useCounterStore.getState().count).toBe(0);
  });

  it('should set the count to a specific value', () => {
    useCounterStore.getState().setCount(10);
    expect(useCounterStore.getState().count).toBe(10);
  });
});
```

## Best Practices

### Performance Considerations
- Use selectors when accessing store values to prevent unnecessary re-renders
- Keep the state structure flat when possible
- Use multiple small, focused stores instead of one large store

### Accessing Stores in Components
- Use selectors to extract only the state needed by a component
```typescript
// Good: Using a selector
const count = useCounterStore(state => state.count);

// Avoid: Grabbing the entire state
const { count } = useCounterStore();
```

### Store Composition
- For complex state management, consider composing multiple stores
- Use separate stores for unrelated parts of the application state
- Consider creating a store factory for related but separate instances

### Persistence
- For persistent state, consider using zustand/middleware/persist
- Define clear strategies for state rehydration
- Handle loading states during rehydration

### TypeScript Integration
- Always define explicit types for state and actions
- Use discriminated unions for complex state transitions
- Leverage TypeScript to ensure type safety throughout the application