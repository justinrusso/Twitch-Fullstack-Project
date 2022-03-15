import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class BankTransfer1647280281950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "bank_transfers",
        columns: [
          {
            name: "id",
            type: "serial",
            isNullable: false,
            isPrimary: true,
          },
          {
            name: "userId",
            type: "integer",
            isNullable: false,
          },
          {
            name: "amount",
            type: "integer",
            isNullable: false,
          },
          {
            name: "deposit",
            type: "boolean",
            isNullable: false,
          },
          {
            name: "processor",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "processorsId",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "createdAt",
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
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("bank_transfers");
  }
}
