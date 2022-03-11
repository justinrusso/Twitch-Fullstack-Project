## Important Notes

- Money data stored in the databse should be stored as integers. Values will be considered as cents and will be converted to decimal amounts in the front-end.
- Due to Sequelize's limitations, composite keys can not be used.

## Users Table

The `users` table stores data about a user. This includes the user's `balance` which should be safely updated every time a new bank tansfer is made.

| Column Name    | Data Type   | Attributes  |
|----------------|-------------|-------------|
| id             | serial      | PK NOT NULL |
| firstName      | varchar     | NOT NULL    |
| lastName       | varchar     | NOT NULL    |
| username       | varchar(50) | NOT NULL    |
| hashedPassword | varchar     | NOT NULL    |
| profileImg     | varchar     |             |
| balance        | integer     | NOT NULL    |

## Bank Transfers Table

The `bank_transfers` table stores historical data about deposits to a user's account from their bank, or widthdraws from the user's account to their bank.

| Column Name | Data Type | Attributes                        |
|-------------|-----------|-----------------------------------|
| id          | serial    | PK NOT NULL                       |
| userId      | integer   | FK NOT NULL (references users.id) |
| amount      | integer   | NOT NULL                          |
| deposit     | boolean   | NOT NULL                          |
| createdAt   | timestamp | NOT NULL                          |

## Transactions Table

The `transactions` table stores historical data about the transactions between users on the website.

The `creatorId` references the user who initiated the request. If the `creatorId` is not the payer, then `paid` will be `false` until the payee has paid.

| Column Name | Data Type | Attributes                        |
|-------------|-----------|-----------------------------------|
| id          | serial    | PK NOT NULL                       |
| payerId     | integer   | FK NOT NULL (references users.id) |
| payeeId     | integer   | FK NOT NULL (references users.id) |
| creatorId   | integer   | FK NOT NULL (references users.id) |
| amount      | integer   | NOT NULL                          |
| memo        | text      | NOT NULL                          |
| paid        | boolean   | NOT NULL                          |
| createdAt   | timestamp | NOT NULL                          |
| updatedAt   | timestamp | NOT NULL                          |

## Friends Table

The `friends` table stores friend relationships. This includes pending friend requests incicated by the `accepted` boolean.

Due to limitations with the Sequelize ORM, a composite primary key is not being used.

| Column Name | Data Type | Attributes                        |
|-------------|-----------|-----------------------------------|
| id          | serial    | PK NOT NULL                       |
| userId      | integer   | FK NOT NULL (references users.id) |
| friendId    | integer   | FK NOT NULL (references users.id) |
| accepted    | boolean   | NOT NULL                          |
| createdAt   | timestamp | NOT NULL                          |
| updatedAt   | timestamp | NOT NULL                          |
