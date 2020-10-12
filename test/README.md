# https://www.cypress.io/

`npm test` in this folder will launch cypress in headless mode and run all the tests against localhost:3000 (as defined in `./cypress.json`)

alternatively, for local development, `npx cypress open` will run a local cypress client that lets you pick out individual tests and run them via a browser.

In either case, this is assuming all the installation bits are in order and you have the app running on localhost:3000. The easiest way to do this is to run `npm test` in the root of this project: that boots the app in docker + runs these tests headlessly.

For dev purposes, follow instructions under ../incident-application-form/README.md to launch the app locally, then in a separate terminal window `npx cypress open` to interact with the tests.
