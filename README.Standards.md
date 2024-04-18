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

### Features

- `src/features` - for feature modules.
  - `src/features/<feature-name>` - for feature module.
    - `src/features/<feature-name>/components` - for components.
    - `src/features/<feature-name>/constants` - for constants.
    - `src/features/<feature-name>/utils` - for utilities.

### Shared

- `src/shared` - shared modules.
  - `src/shared/assets` - for shared assets.
  - `src/shared/components` - for shared components.
    - `src/shared/components/ui/*` - for shared ui components (`button`, `input` & etc).
  - `src/shared/constants` - for shared constants.
  - `src/shared/data` - for data access layer. (e.g. `api`, `database`).
  - `src/shared/mutation` - for shared `react-query` mutation.
  - `src/shared/query` - for shared `react-query` query. 
  - `src/shared/stores` - for shared zustand stores.
  - `src/shared/types` - for shared types.
  - `src/shared/utils` - for shared utilities.
