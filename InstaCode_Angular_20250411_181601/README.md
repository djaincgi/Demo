# Starter Design System Angular

This project is a git repository to begin developments with Michelin Design System.

You can visit the demo site [HERE](https://designsystem.michelin.com/).

**Requirements:**

- Install [NodeJS > 14.20.x](https://nodejs.org/en/download/)
- Install [Git](https://git-scm.com/downloads)
- Install [Angular CLI](https://github.com/angular/angular-cli)

Run `npm install -g @angular/cli` to install angular CLI globally

**This project use:**

- [TypeScript](https://www.typescriptlang.org/)
- [Angular 15](https://angular.io/)
- [RXJS 6+](https://rxjs-dev.firebaseapp.com/)
- [Angular Material](https://material.angular.io/)

## Packages

| Name        | NPM repository          | Docs                                                                                                      |
| ----------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| Theme       | `@michelin/theme`       | [README](https://gitlab.michelin.com/design-system/libraries/blob/develop/packages/theme/README.md)       |
| Charts      | `@michelin/charts`      | [README](https://gitlab.michelin.com/design-system/libraries/blob/develop/packages/charts/README.md)      |
| Maps        | `@michelin/maps`        | [README](https://gitlab.michelin.com/design-system/libraries/blob/develop/packages/maps/README.md)        |
| Around tire | `@michelin/around-tire` | [README](https://gitlab.michelin.com/design-system/libraries/blob/develop/packages/around-tire/README.md) |

## Installation

Here are the steps to add packages from this repository to a application :

- Run `npm i @michelin/theme`
- Run `npm i @michelin/charts`, if necessary
- Run `npm i @michelin/maps`, if necessary
- Run `npm i @michelin/around-tire`, if necessary

## Development

### Installation

- Make this respository the current working directory.
- Install `node` and `npm` (LTS). Visit the [website](https://nodejs.org/en/download/) if needed.
- Run `npm install` to install the dependencies of the packages and the development tools.
- Run `npm run start` to launch the development server. It is possible to set the angular serve options as follow `npm run start -- --port 8000 [...OPTIONS]`
- With default start, navigate to `http://localhost:4200/`. The app will automatically reload if any change on the source files.

## Unit tests

Run `ng test --watch=false --code-coverage` to launch tests with an headless chrome.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
