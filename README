# Cart API

A REST API to manipulate a cart of products whose total price complies to a "buy 2 get 3" promotion.

# Table of Contents
- [Introduction](#introduction)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Developing Further](#developing-further)
- [API Documentation](#api-documentation)
- [Project discussion](#project-discussion)
- [Architectural Decisions](#architectural-decisions)

# Introduction

The application runs a web server that exposes a REST API to manipulate a cart of products, applying a promotion of "buy 2 get 3.
You will find the API endpoints and examples on http://localhost:8088/api/doc/#/ when running the application.

# Dependencies

- Docker (community edition) - https://docs.docker.com/engine/install/
- GNU `make`, for development experience and hot 
- NodeJS 20, for local testing - https://nodejs.org/en

# Installation

The steps below will create an image called `nav-challenge/cart-api` and run it on port `8088` (default, but configurable on .env file).

To install a production build, run:

```bash
docker-compose build
```

To start the build, run:

```bash
docker-compose up
```

or combine them:

```bash
docker-compose up --build
```

To close the application and remove the containers, run:

```bash
docker-compose down
```

# Configuration

The application can be configured by setting environment variables. The default values are set on the `.env.default` file, and you should modify the `.env` file to override them.

| Variable | Description | Default Value |
| --- | --- | --- |
| `NODE_ENV` | The environment the application is running on. Examples: `development`, `production` | `development` |
| `SERVER_PORT` | The port the application will be listening to. | `8088` |
| `LOG_LEVEL` | The log level of the application. Examples: `info`, `debug`, `error`, `warn` | `info` |
| `DEBUG` | All log lines that match this expression will be thrown in STDOUT (Console). | `*` |

# Developing Further

If you want to continue developing further the application, you can use the Makefile commands to make it easier.

Makefile commands:
Table of commands below:

| Command | Description |
| --- | --- |
| `make setup` | Copies .env.default to .env and check if the development build image exists. If not, then it runs docker build and creates an image called `nav-challenge/${CONTAINER_NAME}:latest` |
| `make build-docker-image` | Runs docker build command |
| `make debug` | Runs the image built, mapping the current code into the container. This allows fast development with no need to rebuild the image every time the code is updated. This will also expose a debugging port 8089, which a debugger can be attached to. |
| `make help` | Show available commands |

The .vscode/launch.json file is configured to attach to the debugging port 8089, so you can use the VSCode debugger to debug the application that is already running on a container or locally.

# API Documentation

The file `CartAPI.postman_collection.json` contains a collection of requests that can be imported into Postman.

Running the application, you can also access the Swagger documentation on http://localhost:8088/api/doc/#/

You can also render the [swagger file](./src/presentation/http/swaggerDocs.json) file on https://editor.swagger.io/ to see the documentation or any tool you'd like.

# Project discussion

## Decisions
- In a real environment, carts are usually associated with users, but for simplicity, this API assumes a single cart.
- There will be always an existing Cart, and its initial state is an empty list of products and total price of 0.
- Although not persisted in a Database, a persistence layer is added to the project
- The "buy 2 get 3" promotion is always applied to the cart. In a real environment, this would be a promotion configuration that could be applied to the cart based on a set of rules and conditions like period, item count and user profile.

- The cart total price is prone to rounding errors. In a real environment envolving multiple currencies, is is considered a bad practice to round the price in the backend, since the frontend is responsible for displaying the price. In this case, the frontend would be responsible for rounding the price, and the backend would return the price with all the decimal places. You'll notice that some tests use [toBeCloseTo](https://jest-bot.github.io/jest/docs/expect.html#tobeclosetonumber-numdigits) instead of `toEqual` to account for rounding errors.

## Improvements

Instead of TODOs, i'll leave some improvement exercises for everyone to clone this repo and some hands dirty :)
- (Exercise!) Items in the cart could have same id (or SKU) but different prices. In this case, product addition/removal would have to account for both price and id, instead of only id.
- (Exercise!) The port/adapters does not appropriately name each "interface" function. Passing a repository down a use-case (service) is not what one would expect. Instead, the use-case should have a function that is named after the action it performs, and the repository should be injected on the constructor. This would make the code more readable and easier to understand.
- (Exercise!) The product deletion endpoint always receives a quantity. Another approach would be for this route to delete ALL products of :productId and quantity be an optional query parameter passed like `?quantity=2`. This would make the API more RESTful.

# Architectural Decisions
- [Docker](https://www.docker.com/) for development and production environments, preventing every reviewer to install every dependency for every language/framework they need to test and deploy.
- [ExpressJS](https://expressjs.com/) for web server, since it has the minimum required to run a web server and is largely extended for use with middlewares and plugins (NextJS, GraphQL etc)
- [Swagger](https://swagger.io/) for API documentation, since it is compliant with OpenAPI and has good documentation and tooling for doc manipulation.
- [Jest](https://jestjs.io/) for testing, since it is the most popular testing framework for NodeJS and has good documentation and tooling for test manipulation.
- [Winston](https://github.com/winstonjs/winston) for logging, based it can be configurable to work over multiple transport layers (console, file, distributed cloud logs etc) and low latency.
- Dependency injection with [awilix](https://github.com/jeffijoe/awilix) for dependency management. It also works well with TypeScript.
- Ports and adapters ([hexagonal](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software))) -like architecture (see exercise above)

