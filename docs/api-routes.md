# API Routes

## Auth

### GET /api/auth

**Valid Response**:
_Will respond with a valid response only if a token cookie is provided with the request_

```ts
{
  data: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    profileImgUrl?: string;
    balance: number;
  }
}
```

### DELETE /api/auth

Logs out an authenticated user

**Valid Response**:

```ts
{
  data: {
    id: number;
  }
}
```

### POST /api/auth/login

**Request**:

```ts
{
  username: string;
  password: string;
}
```

**Valid Response**:

```ts
{
  data: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    profileImgUrl?: string;
    balance: number;
  }
}
```

**Invalid Response**:

```ts
{
  errors: {
    credentials: string;
  }
}
```

### GET /api/auth/login/demo

Logs in a guest as a demo user

**Valid Response**:

```ts
{
  data: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    profileImgUrl?: string;
    balance: number;
  }
}
```

### POST /api/auth/signup

**Request**:

```ts
{
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  profileImageUrl?: string;
}
```

**Valid Response**:

```ts
{
  data: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    profileImgUrl?: string;
    balance: number;
  }
}
```

**Invalid Response**:

```ts
{
  errors: {
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    profileImageUrl?: string;
  }
}
```

## Friends

### GET /api/friends

_Note: A user must be authenticated to access this API endpoint_

**Query Parameters**:

```ts
{
  /**
   * Searches for friends based on the status provided.
   * If omitted, friendships regardless of status are returned.
   */
  status?: "accepted" | "pending";

  /**
   * **Required if status is pending.**
   * Used to determine which pending friendships to return.
   */
  direction?: "received" | "sent";
}
```

**Valid Response**:

Returns all results from the query

```ts
{
  data: {
    friend: PublicUserData;
    accepted: boolean;

    /**
     * A timestamp with timezone string
     */
    createdAt: string;
    /**
     * A timestamp with timezone string
     */
    updatedAt: string;
  }
  [];
}
```

**Invalid Response**:

```ts
{
  errors: {
    direction?: string;
    status?: string;
  }
}
```

### POST /api/friends

_Note: A user must be authenticated to access this API endpoint_

Creates a new friend request.

**Request**:

```ts
{
  /**
   * The ID of the user to send the request to
   */
  id: UserId;
}
```

**Valid Response**:

```ts
{
  data: {
    friend: PublicUserData;
    accepted: boolean;

    /**
     * A timestamp with timezone string
     */
    createdAt: string;
    /**
     * A timestamp with timezone string
     */
    updatedAt: string;
  }
}
```

**Invalid Response**:

```ts
{
  errors: {
    id?: string;
  }
}
```

### PUT /api/friends/:id

_Note: A user must be authenticated to access this API endpoint_

Accepts a friend request given the user's ID.

**Request**:

```ts
{
  accepted: boolean;
}
```

**Valid Response**:

```ts
{
  data: {
    friend: PublicUserData;
    accepted: boolean;

    /**
     * A timestamp with timezone string
     */
    createdAt: string;
    /**
     * A timestamp with timezone string
     */
    updatedAt: string;
  }
}
```

**Invalid Response**:

```ts
{
  errors: {
    accepted?: string;
    id?: string;
  }
}
```

### DELETE /api/friends/:id

_Note: A user must be authenticated to access this API endpoint_

Deletes a friendship or cancels a pending friend request.

**Valid Response**:

```ts
{
  data: {
    id: UserId;
  }
}
```

**Invalid Response**:

```ts
{
  errors: {
    id?: string;
  }
}
```

## Transactions

### GET /api/transactions

_Note: A user must be authenticated to access this API endpoint_

**Query Parameters**:

```ts
{
  /**
   * Filters the the status of the transaction.
   * Selects any status if omitted
   */
  status?: "paid" | "unpaid";

  /**
   * Filters between transactions where the user is the payer or the payee.
   * Selects both types if omitted
   */
  type?: "payer" | "payee";
}
```

**Valid Response**:

Returns all results from the query

```ts
{
  data: {
    id: TransactionId;
    payer: PublicUserData;
    payee: PublicUserData;
    creator: PublicUserData;
    amount: number;
    memo: string;
    paid: boolean;

    /**
     * A timestamp with timezone string
     */
    createdAt: string;
    /**
     * A timestamp with timezone string
     */
    updatedAt: string;
  }
  [];
}
```

**Invalid Response**:

```ts
{
  errors: {
    status?: string;
    type?: string;
  }
}
```

### POST /api/transactions

_Note: A user must be authenticated to access this API endpoint_

**Request**:

```ts
{
  /**
   * The user to pay or request
   */
  to: UserId;

  /**
   * The type or transaction request
   */
  type: "payment" | "request";

  /**
   * A whole number greater than 50
   */
  amount: number;

  /**
   * A note to go along with the payment / request
   */
  memo: string;
}
```

**Valid Response**:

```ts
{
  data: {
    id: TransactionId;
    payer: PublicUserData;
    payee: PublicUserData;
    creator: PublicUserData;
    amount: number;
    memo: string;
    paid: boolean;

    /**
     * A timestamp with timezone string
     */
    createdAt: string;
    /**
     * A timestamp with timezone string
     */
    updatedAt: string;
  }
}
```

**Invalid Response**:

```ts
{
  errors: {
    to?: string;
    type?: string;
    amount?: string;
    memo?: string;
  }
}
```

### PATCH /api/transactions/:id

_Note: A user must be authenticated to access this API endpoint_

**Request**:

```ts
{
  paid: boolean;
}
```

**Valid Response**:

```ts
{
  data: {
    id: TransactionId;
    payer: PublicUserData;
    payee: PublicUserData;
    creator: PublicUserData;
    amount: number;
    memo: string;
    paid: boolean;

    /**
     * A timestamp with timezone string
     */
    createdAt: string;
    /**
     * A timestamp with timezone string
     */
    updatedAt: string;
  }
}
```

**Invalid Response**:

```ts
{
  errors: {
    /**
     * An error if the payer does not have the funds to pay
     */
    amount?: string;
    paid?: string;
  }
}
```

### DELETE /api/transactions/:id

_Note: A user must be authenticated to access this API endpoint_

**Valid Response**:

```ts
{
  data: {
    id: TransactionId;
  }
}
```

**Invalid Response**:

```ts
{
  errors: {
    id?: TransactionId;
  }
}
```

## Transfers

### POST /api/transfers

_Note: A user must be authenticated to access this API endpoint_

**Request**:

```ts
{
  /**
   * A whole number greater than 0
   */
  amount: number;

  /**
   * Determines if the transfer is a deposit or withdraw
   */
  deposit: boolean;
}
```

**Valid Response**:

```ts
{
  data: {
    id: number;
    amount: number;
    deposit: boolean;

    /**
     * A timestamp string
     */
    createdAt: string;
  }
}
```

**Invalid Response**:

```ts
{
  errors: {
    amount?: string;
    deposit?: string;
  }
}
```

## Users

### GET /api/users

_Note: A user must be authenticated to access this API endpoint_

**Query Parameters**:

```ts
{
  /**
   * A string to use for searching.
   * At least one character must be sent.
   * Searches the username and the first + ' ' + last name
   */
  key: string;
}
```

**Valid Response**:

Returns the first 10 results from the query

```ts
{
  data: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    profileImgUrl?: string;
  }[];
}
```

**Invalid Response**:

```ts
{
  errors: {
    key?: string;
  }
}
```
