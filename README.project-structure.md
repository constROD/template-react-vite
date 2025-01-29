# Project Structure & Code Organization

## Naming conventions
- `kebab-case` - for all folders/files.
- `_kebab-case` - for feature and route domain's specific common modules.
- `PascalCase` - for classes and types.
- `snake_case` - for database tables and columns.
- `camelCase` - for functions, zod schemas and etc.

## Common Modules
- `assets` - for assets.
- `components` - for components.
- `constants` - for constants.
- `data` - for data access layer. (e.g. `api`, `database`).
- `hooks` - for custom hooks, tanstack query and mutation
- `lib` - for 3rd party integrations libraries.
- `services` - for business logic and orchestration of data access layer. **(Only if necessary)**
- `stores` - for stores. (e.g. `zustand`)
- `types` - for types.
- `utils` - for utilities.
  
## Domain Folders
- `src` - main source code and shared common modules.
- `src/routes` - main router folder.
- `src/features` - main features folder. **(Only if necessary)**

### Shared Modules
- `src/assets` - for shared assets module.
- `src/components` - for shared components module.
  - `src/components/ui/*` - for ui components (`button`, `input` & etc).
- `src/constants` - for shared constants module.
- `src/data` - for shared data access layer module. (e.g. `api`, `database`).
- `src/hooks` - for shared custom hooks, tanstack query and mutation
  - `src/hooks/use-<hook-name>.ts` - for shared custom hook.
  - `src/hooks/query/use-<hook-name>-query.ts` - for shared `react-query` query. **(Only if necessary)**
  - `src/hooks/query/use-<hook-name>-mutation.ts` - for shared `react-query` mutation. **(Only if necessary)**
- `src/lib` - for shared 3rd party integrations libraries.
- `src/services` - for shared business logic and orchestration of data access layer. **(Only if necessary)**
- `src/stores` - for shared stores module. (e.g. `zustand`)
- `src/types` - for shared types.
- `src/utils` - for shared utilities.

### Routes Domain
- `src/routes/<route-name>` - for route domain.
  - `src/routes/<route-name>/index.tsx` - for route's entry point.
  - `src/routes/<route-name>/_components` - for route's components module.
  - `src/routes/<route-name>/_constants` - for route's constants module.
  - `src/routes/<route-name>/_hooks` - for route's hooks module.
  - `src/routes/<route-name>/_types` - for route's types module.
  - `src/routes/<route-name>/_utils` - for route's utilities module.

### Features Domain
- `src/features/<feature-name>` - for feature.
  - `src/features/<feature-name>/index.ts` - for feature's entry point.
  - `src/features/<feature-name>/_assets` - for feature's assets. **(Only if necessary)**
  - `src/features/<feature-name>/_components` - for feature's components.
  - `src/features/<feature-name>/_constants` - for feature's constants.
  - `src/features/<feature-name>/_data` - for feature's data access layer. **(Only if necessary)**
  - `src/features/<feature-name>/_hooks` - for feature's custom hooks, tanstack query and mutation. **(Only if necessary)**
  - `src/features/<feature-name>/_lib` - for feature's 3rd party integrations libraries. **(Only if necessary)**
  - `src/features/<feature-name>/_services` - for feature's business logic and orchestration of data access layer. **(Only if necessary)**
  - `src/features/<feature-name>/_stores` - for feature's stores. (e.g. `zustand`)
  - `src/features/<feature-name>/_types` - for feature's types.
  - `src/features/<feature-name>/_utils` - for feature's utilities.