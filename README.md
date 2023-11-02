# playwright-express
PlayWright e2e test tool

Inside that directory, you can run several commands:

  ## yarn playwright test
    Runs the end-to-end tests.

  ## yarn playwright test --ui
    Starts the interactive UI mode.

  ## yarn playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  ## yarn playwright test example
    Runs the tests in a specific file.

  ## yarn playwright test --debug
    Runs the tests in debug mode.

  ## yarn playwright codegen
    Auto generate tests with Codegen.

## We suggest that you begin by typing:

    yarn playwright test

## And check out the following files:
  - .\tests\example.spec.ts - Example end-to-end test
  - .\tests-examples\demo-todo-app.spec.ts - Demo Todo App end-to-end tests
  - .\playwright.config.ts - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

## How do I prepare the web environment?

access `../apps/web` and run `yarn install` or `npm install`

## How do I prepare the api environment??

access `../apps/api` and run `yarn install` or `npm install`

## How do I run local database?

access `../apps/api` and run `yarn db:init` or `npm run db:init`

## How do I run web app?

access `../apps/web` and run `yarn dev` or `npm run dev`

## How do I run api app?

access `../apps/api` and run `yarn dev` or `npm run dev`