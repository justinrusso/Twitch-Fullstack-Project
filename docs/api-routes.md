# API Routes

## Auth

### POST /api/login

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

### GET /api/login/demo

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
