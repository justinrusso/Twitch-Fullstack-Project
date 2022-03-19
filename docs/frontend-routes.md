# Frontend Routes

## Unauthenticated Routes

Routes accessed while a user is authenticated will cause a redirect to `/account`.

### GET /

Displays the home page for the site encouraing users to learn more and sign up.

### GET /login

Displays a login form with an option to log in as a demo user. On success, navigates the user to `/account`.

### GET /signup

Displays a sign up form. On success, navigates the user to `/account`.

## Authenticated Routes

### GET /account

Displays a history of completed transactions and bank transfers.

### GET /account/friends

Displays the friends of the authenticated user as well as any pending requests the user has sent. Users can remove friends and cancel a pending friend request on this page.

### GET /account/notifications

Displays pending friend and transaction requests. Users can decline pending friend requests as well as decline or pay pending transaction requests.

### GET /account/transfer

Allows a user to deposit or withdraw funds from their PayMee account.

### GET /account/transactions/new

Allows a user to pay or request money from a friend.
