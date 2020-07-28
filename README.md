## Next.js E2E Testing with Cypress.io

This is an example Next.js application that uses Cypress for E2E testing.
We build this app as a part of [this live stream](https://www.youtube.com/watch?v=6udU0T6AZK4&feature=youtu.be). Watch that if you need to learn about details.

### Test Results

* This is running tests [inside a GitHub action](https://github.com/arunoda/nextjs-e2e-demo/runs/920711967)
* This is how to view a test session [inside Cypress.io](https://dashboard.cypress.io/projects/y2s3h2/runs/9/specs)

### Run it locally

* [Install & Run MongoDB](https://docs.mongodb.com/manual/administration/install-community/) in your machine
* Run the app with the following commands:

```
cd app
yarn
NODE_ENV=test yarn dev
```

* Run tests in the CLI with

```
cd e2e
yarn
yarn test
```

* Run tests in the Dev mode

```
cd e2e
yarn
yarn dev
```