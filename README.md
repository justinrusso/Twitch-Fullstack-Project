# PayMee

PayMee is an application where users can transfer money between friends. Money must be transferred into their account from a bank before a transaction between friends can be made. At any time, a user can also withdraw money from their account back into their bank. Bank transfers are handled through Stripe's API.

[![Live Link](https://img.shields.io/badge/Live%20Link-1976d2?style=for-the-badge)](https://jrusso-paymee.herokuapp.com/)

## Documentation

- [API Routes](docs/api-routes.md)
- [Database Schema](docs/database.md)
- [Frontend Routes](docs/frontend-routes.md)

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

## Application Flow

### Home Page

![Home Page](/docs/images/home.png)

When an unauthenticated user visits the home page, they are presented with this home screen that is designed to entice the user to sign up.

### Account Home Page

![Account Home Page](/docs/images/account-home.png)

Once logged in, the user is welcomed to the account home page. Here they can view all recent transactions that have occured involving the user.

### Notifications

![Transaction Notifications](/docs/images/transaction-notifications.png)

Here the user can see any pending transaction requests.

![Friend Requests](/docs/images/friend-notifications.png)

Users can also navigate to the Friend Requests tab to see any friend requests other users have sent.

### Search

![User Search](/docs/images/user-search.png)

Users can search for friends using this page. Results display all users, but only allowing friend requests from users that a friendship does not already exist or is pending approval.

### Friends

![Friends](/docs/images/friends.png)

The user can view and manage all friends from this page.

![Sent Friend Requests](/docs/images/friends-sent-requests.png)

The user can also see any friend requests they have made that have not been accepted. This allows the user to cancel any requests.

### Manage Funds (Bank Transfers)

![Manage Funds](/docs/images/transfers.png)

This page allows the user to deposit money from their bank to their PayMee account or withdraw money from their PayMee account to their bank. Sticking with similar theme, tabs were used to simulate an input similar to a switch to toggle between the a deposit and withdraw.

### Pay or Request

![Pay or Request](/docs/images/pay-request.png)

A user can easily pay another user or request money from them.
