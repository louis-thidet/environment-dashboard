# Description

This program works with a component acting as a single page (TemperatureChartComponent) and a service doing http requests (EnvironmentService). It displays data gathered from Sierra Octave's REST API. To use it, you have to put the proper IDs from your Octave account in the environment.service.ts file (Stream ID, authentification token and username).

I called this program Environment Dashboard because I created it to display some enviromnent observations with my MangOH Yellow (Temperature, pressure, humidity and IAQ);

# Libraries used

- Angular Material
- Chart.js

# Favicon source

https://www.flaticon.com/free-icon/line-chart_893216?term=line+chart&page=1&position=15&origin=tag&related_id=893216

# Environmnent Dashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
