# PayMee

PayMee is an application where users can transfer money between friends. Money must be transferred into their account from a bank before a transaction between friends can be made. At any time, a user can also withdraw money from their account back into their bank. Bank transfers are handled through Stripe's API.

## Documentation

[API Routes](docs/api-routes.md)
[Database Schema](docs/database.md)
[Frontend Routes](docs/frontend-routes.md)

## Development & Production Release

See [Backend README](backend/README.md) and [Frontend README](frontend/README.md) for more information about development and production.

For production, this application uses Docker. Running `docker build .` will build the container from the `Dockerfile` in the root directory. Alternatively for this repository, a release can be created and a new build & deployment GitHub action will be run.

## Achitectural Overview

### Design Pattern

PayMee utilizes the MVC design pattern. The components are represented as:

1. The `Model` is represented by the PostgreSQL database and the Redux state. All data to be rendered by the application is stored here.
2. The `View` is represented by the React frontend. React provides the user with an interface representing the information from the Model stored in Redux and allows a user to manipulate the model with interactions.
3. The `Controller` is represented by Redux's reducers. Redux's reducers act upon user interactions, directly causing manipulation of the model or creating thunks to asynchronously manipulate the PostgreSQL database, which is then reflected in the Redux store.

### Core Components

```jsx
<App /> // The React application. Defines routes and any initial on-load logic
    <RootThemeProvider /> // Provides a theme to all MUI components
        <Routes /> // The main application router. All main application routes should be defined here.
            <AuthRedirect redirectLoggedInTo="/account" /> // Authed users going to these routes will be redirected
                <HomePage />
                <LoginPage />
                <SignupPage />
            <AuthRedirect redirectLoggedOutTo="/" /> // Authed users going to these routes will be redirected
                <AccountLayout /> // A wrapper for all components nested under the `/account` route
                    <AccountHomePage />
                    <FriendsPage />
                    <NotificationsPage />
                    <NewTransactionPage />
                    <TransferPage />
```
