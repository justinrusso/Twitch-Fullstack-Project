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
