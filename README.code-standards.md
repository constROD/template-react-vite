# Standards

## Naming conventions

- `kebab-case` - for all folders/files.
- `PascalCase` - for classes and types.
- `snake_case` - for database tables and columns.
- `camelCase` - for functions, zod schemas and etc.

## Folder structure

- `src` - main source code.

### Router

- `src/routes` - for tanstack router.
  - `src/routes/<route-name>.tsx` - for route page component.
  - `src/routes/<route-name>.lazy.tsx` - for lazy route page component.

### Features (Modular Approach)

- `src/features` - for feature modules. **(Only if needed)**
  - `src/features/<feature-name>` - for feature module.
    - `src/features/<feature-name>/components` - for components.
      - `src/features/<feature-name>/components/<component-name>.tsx` - for component.
    - `src/features/<feature-name>/constants` - for constants.
    - `src/features/<feature-name>/data` - for data access layer.
    - `src/features/<feature-name>/hooks` - for custom hooks, tanstack query and mutation, zustand store.
    - `src/features/<feature-name>/services` - for business logic and orchestration of data access layer.
    - `src/features/<feature-name>/types` - for types.
    - `src/features/<feature-name>/utils` - for utilities.

### Others

  - `src/assets` - for assets.
  - `src/components` - for shared components.
    - `src/components/ui/*` - for ui components (`button`, `input` & etc).
  - `src/constants` - for constants.
  - `src/data` - for data access layer. (e.g. `api`, `database`).
  - `src/hooks` - for custom hooks, tanstack query and mutation, zustand store.
    - `src/hooks/use-<hook-name>.ts` - for custom hook.
    - `src/hooks/query/use-<hook-name>-query.ts` - for `react-query` query. **(Only if needed)**
    - `src/hooks/query/use-<hook-name>-mutation.ts` - for `react-query` mutation. **(Only if needed)**
    - `src/hooks/stores/use-<hook-name>-store.ts` - for zustand stores.
  - `src/lib` - for 3rd party integrations libraries.
  - `src/services` - for business logic and orchestration of data access layer. **(Only if needed)**
  - `src/types` - for types.
  - `src/utils` - for utilities.
