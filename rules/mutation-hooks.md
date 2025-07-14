---
description: Guidelines for Mutation Hooks
globs: **/hooks/query/**/*.ts, **/_hooks/query/**/*.ts
alwaysApply: false
---
# Guidelines for Mutation Hooks

## Purpose and Overview
Mutation hooks abstract data modification operations (create, update, delete) using TanStack Query's useMutation hook. They provide loading states, error handling, and optimistic updates. These hooks connect UI components to the data access layer for write operations, keeping components focused on presentation rather than data manipulation logic.

## Structure and Organization

### Mutation Hooks Module Structure
```
src/
├── hooks/                      # Shared hooks module
│   └── query/                  # Shared query hooks (includes mutations)
│       └── [entity]/
│           ├── use-create-[entity]-mutation.ts        # Create operation
│           ├── use-update-[entity]-mutation.ts        # Update operation
│           ├── use-delete-[entity]-mutation.ts        # Delete operation
│           └── use-[specific-action]-[entity]-mutation.ts  # Other specific mutations
└── features/
    └── [feature-name]/
        └── _hooks/             # Feature-specific hooks
            └── query/          # Feature-specific query hooks (includes mutations)
                └── [entity]/
                    ├── use-create-[entity]-mutation.ts
                    ├── use-update-[entity]-mutation.ts
                    └── use-delete-[entity]-mutation.ts
```

## Naming Conventions

### Files
- `use-create-[entity]-mutation.ts`: For create operations
- `use-update-[entity]-mutation.ts`: For update operations
- `use-delete-[entity]-mutation.ts`: For delete operations
- `use-[specific-action]-[entity]-mutation.ts`: For other specific actions (e.g., `use-set-active-[entity]-mutation.ts`)

### Functions
- `useCreate[Entity]Mutation`: For create operations
- `useUpdate[Entity]Mutation`: For update operations
- `useDelete[Entity]Mutation`: For delete operations
- `use[SpecificAction][Entity]Mutation`: For other specific actions

### Types
- `UseCreate[Entity]MutationArgs`: Arguments for create mutation hook
- `UseUpdate[Entity]MutationArgs`: Arguments for update mutation hook
- `UseDelete[Entity]MutationArgs`: Arguments for delete mutation hook
- `Use[SpecificAction][Entity]MutationArgs`: Arguments for specific action mutation hook

## Implementation Guidelines

### Mutation Hooks
- Use TanStack Query's `useMutation` hook
- Import mutation functions directly from `@/data`
- Use TypeScript's `MutationOptions` type for args
- Spread args at the beginning to allow overriding any option
- Always get `queryClient` using `useQueryClient()`
- Handle cache invalidation in `onSuccess`
- Handle errors in `onError` with optional error alerting utility
- Call the provided callback after internal logic

## CRUD Mutation Examples

### 1. Create Mutation
```typescript
// use-create-[entity]-mutation.ts
import { type MutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { post[Entity]s, type Post[Entity]sData, type Post[Entity]sResponse } from '@/data';
import { alertApiError } from '@/utils/api-errors';

export type UseCreate[Entity]MutationArgs = MutationOptions<
  Post[Entity]sResponse,
  Error,
  Post[Entity]sData
>;

export function useCreate[Entity]Mutation(args: UseCreate[Entity]MutationArgs = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    ...args,
    mutationFn: post[Entity]s,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: ['GET /[entity]s'] });
      args.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      if (args?.onError) return args.onError(error, variables, context);
      alertApiError(error);
    },
  });
}
```

### 2. Update Mutation
```typescript
// use-update-[entity]-mutation.ts
import { type MutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  put[Entity]sBy[Entity]Id,
  type Put[Entity]sBy[Entity]IdData,
  type Put[Entity]sBy[Entity]IdResponse,
} from '@/data';
import { alertApiError } from '@/utils/api-errors';

export type UseUpdate[Entity]MutationArgs = MutationOptions<
  Put[Entity]sBy[Entity]IdResponse,
  Error,
  Put[Entity]sBy[Entity]IdData
>;

export function useUpdate[Entity]Mutation(args: UseUpdate[Entity]MutationArgs = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    ...args,
    mutationFn: put[Entity]sBy[Entity]Id,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: ['GET /[entity]s'] });
      args.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      if (args?.onError) return args.onError(error, variables, context);
      alertApiError(error);
    },
  });
}
```

### 3. Delete Mutation
```typescript
// use-delete-[entity]-mutation.ts
import { type MutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  delete[Entity]sBy[Entity]Id,
  type Delete[Entity]sBy[Entity]IdData,
  type Delete[Entity]sBy[Entity]IdResponse,
} from '@/data';
import { alertApiError } from '@/utils/api-errors';

export type UseDelete[Entity]MutationArgs = MutationOptions<
  Delete[Entity]sBy[Entity]IdResponse,
  Error,
  Delete[Entity]sBy[Entity]IdData
>;

export function useDelete[Entity]Mutation(args: UseDelete[Entity]MutationArgs = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    ...args,
    mutationFn: delete[Entity]sBy[Entity]Id,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: ['GET /[entity]s'] });
      args.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      if (args?.onError) return args.onError(error, variables, context);
      alertApiError(error);
    },
  });
}
```

### Complete CRUD Mutation Folder Structure Example
```
src/hooks/query/[entity]/
├── use-create-[entity]-mutation.ts    # Create
├── use-update-[entity]-mutation.ts    # Update
└── use-delete-[entity]-mutation.ts    # Delete
```

## Best Practices

### Cache Invalidation
- Implement appropriate cache invalidation in onSuccess
- Consider which queries need to be invalidated after a mutation
- Use queryClient.invalidateQueries for cache invalidation

### Error Handling
- Implement appropriate error handling strategies
- Forward errors to the consuming components
- Consider global error handling for common error scenarios

### Side Effects
- Keep side effects (like showing toast notifications) in the component using the mutation
- Use the onSuccess and onError callbacks for side effects

### Mutation States
- Expose and use mutation states (isLoading, isError, isSuccess) in UI components
- Handle different states appropriately in the UI