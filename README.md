[![CI](https://github.com/ttwiesal/legobrickporter/actions/workflows/ci.yml/badge.svg)](https://github.com/ttwiesal/legobrickporter/actions/workflows/ci.yml)
# legobrickporter

Converts lego order to bricklink xml import format.

## Prerequisites

- Install [nodejs](https://nodejs.org/en/)
- Get [rebrickable](https://rebrickable.com/) api key

## Usage

To run legobrickporter you need to open your lego [order](https://www.lego.com/my-account/orders) and search for the request with url `https://www.lego.com/api/graphql/OrderDetailsV2`.

Copy the response and save it to a file. This file is the input for legobrickporter.

```powershell
node .\index.js --order=.\input\order.json --output=.\output\order.xml --apiKey=<rebrickableapikey>
```

## Running unit tests

Run `npm test` to execute the unit tests via [Jest](https://jestjs.io/).

## Linting

Run `npm lint` to lint the project using [ESLint](https://eslint.org/).

## License

The project is licensed under the [MIT License](LICENSE).
