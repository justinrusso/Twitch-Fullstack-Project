import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigration1647124446756 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "serial",
            isNullable: false,
            isPrimary: true,
          },
          {
            name: "firstName",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "lastName",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "username",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "hashedPassword",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "profileImgUrl",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "balance",
            type: "integer",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
