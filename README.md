# CoffeeStore App - Demonstrates the use of NgRx store in an Angular application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Overview

This example will help you understand how to use the [NgRx](https://ngrx.io/) framework in tandem with your [Angular](https://angular.io/) web application. The application is a simple coffee-store that fetches data from a random API in JSON format, over HTTP and displays the paginated results on screen. It achieves state management through NgRx Store by leveraging the following capabilities:

* [@ngrx/store](https://ngrx.io/guide/store) - Central repository to store the data fetched from APIs.
* [@ngrx/effects](https://ngrx.io/guide/effects) - Listens to dispatched actions, processes response and returns new actions to the reducer.
* [Selectors](https://ngrx.io/guide/store/selectors) - Used to retrieve slices of data from the store.
* [Reducers](https://ngrx.io/guide/store/reducers) - Functions responsible for handling state changes. They respond to actions and update the store in an immutable manner.
* [Actions](https://ngrx.io/guide/store/actions) - Unique events that get passed to reducers or trigger side effects.

## What you will learn from this example

* How to use NgRx for state management.
* How to use NgRx Effects to make API calls.
* How to acheive pagination using NgRx Selectors.
* How to dispatch NgRx Actions from your Components.
* How to use NgRx Reducers to update the Store.

## Installation

#### Clone the repo
git clone https://github.com/AnoopKNarayanan/coffee-store.git

#### Change directory to repo
cd coffee-store

#### Use npm to install the dependencies
`npm install`

#### Start the server
`ng serve`

#### Browse the app
Open `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
