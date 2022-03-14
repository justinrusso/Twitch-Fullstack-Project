# Backend

## Development

### Database

The backend utilizes TypeORM to map entities with the database. In addition, there are some useful commands to assist in the creation of `entities`, `migrations`, and `subscribers`.

To generate a file for `entities`, `migrations`, or `subscribers`, follow the documentation provided by TypeORM:

- [Create a new Entity](https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md#create-a-new-entity)
- [Create a new subscriber](https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md#create-a-new-subscriber)
- [Create a new migration](https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md#create-a-new-migration)

Seed files can also be created using `typeorm-seeding`. Seed files can utilize a `Factory` to assist in generating random data using `Faker`. _Seeder files are run alphabetically, so ensure the files are named accordingly!_

- [Basic Seeder](https://github.com/w3tecch/typeorm-seeding#-basic-seeder)
- [Using Entity Factory](https://github.com/w3tecch/typeorm-seeding#-using-entity-factory)

#### Running Database Commands

Scripts have been created in the `project.json` to simplify the process. These scripts also utilize the `NODE_ENV` environment variable to determine the location to look for relevant files. This prevents the need to compile the migration files in development.

- `db:migration:revert`: Reverts the latest migration
- `db:migration:run`: Runs all pending migrations in sequence ordered by the timestamps
- `db:schema:drop`: Drops the database schema, removing all data in the process. The database itself will remain.
- `db:seed:run`: Runs all seed files. _Running this more than once on a file will cause additional data to be seeded!_

## Production

To run migrations, seeds, or other CLI commands relevant to TypeORM for the database, see [Running Database Commands](#running-database-commands).
