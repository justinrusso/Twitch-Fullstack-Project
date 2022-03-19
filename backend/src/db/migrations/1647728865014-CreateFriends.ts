import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateFriends1647728865014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "friends",
        columns: [
          {
            name: "userId",
            type: "integer",
            isNullable: false,
            isPrimary: true,
          },
          {
            name: "friendId",
            type: "integer",
            isNullable: false,
            isPrimary: true,
          },
          {
            name: "accepted",
            type: "boolean",
            isNullable: false,
          },
          {
            name: "createdAt",
            type: "timestamp with time zone",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updatedAt",
            type: "timestamp with time zone",
            default: "now()",
            isNullable: false,
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["userId"],
            onDelete: "CASCADE",
          }),
          new TableForeignKey({
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["friendId"],
            onDelete: "CASCADE",
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("friends");
  }
}
