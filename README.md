# Template React Vite by bossROD

## Description

This is a template for a React project using **React**, **vite**, **Tanstack Router**, **Tanstack Query** and **Zustand**. It includes **ESLint**, **Prettier**, and **Husky** for code quality and linting.

## Rules

Please read the repo's **Project Structure & Code Organization** here [README.project-structure.md](./README.project-structure.md)

## Clone

```bash
npx degit https://github.com/constROD/template-react-vite.git
```

## Prerequisites

- Download extension [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) in your VSCode.
- Install [node](https://nodejs.org/en) using [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) (check version in [.nvmrc](./.nvmrc))
- Install [pnpm](https://pnpm.io/) (check version in [package.json](./package.json) file look for `packageManager`)
- Follow [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview) for routing.

## Installation

- Install dependencies.

```bash
pnpm i
```

**Development Mode:**

```bash
pnpm dev
```

**Production Mode:**

```bash
pnpm build
pnpm start
```


