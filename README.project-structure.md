# Project Structure & Code Organization

## Package Manager
- Use `pnpm` for all package installations and management

## Core Libraries and Versions
- React: ^18.x.x
- React DOM: ^18.x.x
- TypeScript: ^5.x.x
- Tailwind CSS: ^3.x.x
- shadcn/ui: Latest components
- Zod: ^3.x.x
- TanStack Router: ^1.x.x
- Tanstack Query: ^5.x.x
- Zustand: ^4.x.x

## Naming Conventions
- `kebab-case` - for all folders/files
- `_kebab-case` - for feature domain's specific common modules
- `-kebab-case` - for route domain's specific common modules
- `PascalCase` - for classes and types
- `snake_case` - for database tables and columns
- `camelCase` - for functions, zod schemas and etc.

## Common Modules
- `assets` - for assets
- `components` - for components
- `constants` - for constants
- `contexts` - for react context api
- `data` - for data access layer (e.g. `api`, `database`)
- `hooks` - for custom hooks, tanstack query and mutation
- `lib` - for 3rd party integrations libraries
- `services` - for business logic and orchestration of data access layer **(Only if necessary)**
- `stores` - for stores (e.g. `zustand`)
- `types` - for types
- `utils` - for utilities
  
## Domain Folders
- `src` - main source code and shared common modules
- `src/routes` - main router folder
- `src/features` - main features folder **(Only if necessary)**

## Shared Modules Structure
Shared modules follow this structure:

```
src/
├── assets/                 # Shared assets module
├── components/             # Shared dumb components module
│   └── ui/                 # UI components (button, input, etc.)
├── constants/              # Shared constants module
├── contexts/               # Shared react context api module
├── data/                   # Shared data access layer module (e.g. API functions, database)
├── hooks/                  # Shared custom hooks, tanstack query and mutation
│   ├── use-[custom].ts  # Shared custom hook
│   └── query/              # TanStack Query hooks
│       └── [entity]/  # TanStack Query entity folder
│           ├── use-[entity]-query.ts     # Shared react-query query
│           └── use-[entity]-mutation.ts  # Shared react-query mutation
├── lib/                    # Shared 3rd party integrations
├── services/               # Shared business logic
├── stores/                 # Shared state stores (e.g. zustand)
├── types/                  # Shared types
└── utils/                  # Shared utilities
```

## Routes Domain Structure - Default
When creating new page/route files, follow this structure:

```
src/routes/<route-name>/
├── index.tsx               # Route's index page
├── -components/            # Route's components
├── -constants/             # Route's constants
├── -contexts/              # Route's react context API
├── -hooks/                 # Route's hooks
├── -types/                 # Route's types
└── -utils/                 # Route's utilities
```

## Feature Domain Structure - Optional
When creating new feature files, follow this structure:

```
src/features/<feature-name>/
├── _assets/                # Feature's assets
├── _components/            # Feature's components
├── _constants/             # Feature's constants
├── _contexts/              # Feature's react context API
├── _data/                  # Feature's data access layer
├── _hooks/                 # Feature's custom hooks, tanstack query and mutation
├── _lib/                   # Feature's 3rd party integrations
├── _services/              # Feature's business logic
├── _stores/                # Feature's state stores (e.g. zustand)
├── _types/                 # Feature's types
└── _utils/                 # Feature's utilities
```
