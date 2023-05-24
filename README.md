
# ETHIOHRI ESM

A custom microfrontend for Ethiopia's integration into OHRI built on top of OpenMRS 3.x

## Pre-requisites

- [Node v16 or higher](https://nodejs.org/en/download/)
- Yarn
- TypeScript
- Code editor (VSCode is preferred)

## Getting Started

```sh
# With SSH
git clone git@github.com:CDC-HIS/openmrs-esm-ethiohri.git

# Without SSH
git clone https://github.com/CDC-HIS/openmrs-esm-ethiohri.git

# Change directory
cd openmrs-esm-ethiohri
# Install dependencies
yarn

# Run development server on port 8080
yarn start

# OR to run on a different port for example 8090
yarn start --port 8090
```

## Running tests

### Unit tests
To run unit tests, use:

```sh
yarn test
```

### E2E tests

To run E2E tests, make sure the dev server is running by using:

```sh
yarn start
```

Then, in a separate terminal, run:

```sh
yarn test-e2e --headed
```

Please read [our e2e docs](e2e/README.md) for more information about E2E testing.
