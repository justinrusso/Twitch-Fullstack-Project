# PayMee

PayMee is an application where users can transfer money between friends. Money must be transferred into their account from a bank before a transaction between friends can be made. At any time, a user can also withdraw money from their account back into their bank. Bank transfers are handled through Stripe's API.

## Documentation

[API Routes](docs/api-routes.md)
[Database Schema](docs/database.md)
[Frontend Routes](docs/frontend-routes.md)

## Development & Production Release

See [Backend README](backend/README.md) and [Frontend README](frontend/README.md) for more information about development and production.

For production, this application uses Docker. Running `docker build .` will build the container from the `Dockerfile` in the root directory. Alternatively for this repository, a release can be created and a new build & deployment GitHub action will be run.
