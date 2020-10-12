# End to end testing using Cypress

1) `npm test` in the root project is your entry point. Doing that triggers all the npm-installs etc. Go no further until you've seen that run cleanly.

2) in this folder: `npm test` executes the cypress tests headlessly - marginally quicker than executing the tests and rendering the pixels... `npx cypress open` launches a cypress app locally that lets you pick out individual tests and watch them play out in a browser. ("npx" is telling node to use one of the dependencies we've set up in package.json; it's shorthand for "./node_modules/.bin/cypress run")

3) in either case, configuration lives in ./cypress.json and the tests themselves live in ./integration/*.spec

* Cypress: https://www.cypress.io/

* Quick start to writing tests: https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Can-Be-Simple-Sometimes & https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Writing-tests

* Quick start to interacting with cypress from commandline: https://docs.cypress.io/guides/guides/command-line.html#How-to-run-commands
