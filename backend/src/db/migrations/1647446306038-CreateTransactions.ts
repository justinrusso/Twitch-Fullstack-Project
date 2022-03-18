import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTransactions1647446306038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "serial",
            isNullable: false,
            isPrimary: true,
          },
          {
            name: "payerId",
            type: "integer",
            isNullable: false,
          },
          {
            name: "payeeId",
            type: "integer",
            isNullable: false,
          },
          {
            name: "creatorId",
            type: "integer",
            isNullable: false,
          },
          {
            name: "amount",
            type: "integer",
            isNullable: false,
          },
          {
            name: "memo",
            type: "text",
            isNullable: false,
          },
          {
            name: "paid",
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
            columnNames: ["payerId"],
          }),
          new TableForeignKey({
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["payeeId"],
          }),
          new TableForeignKey({
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["creatorId"],
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions");
  }
}
