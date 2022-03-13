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

### GET /api/auth/logout

Logs out an authenticated user

**Valid Response**:

```ts
{
  data: {
    id: number;
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
