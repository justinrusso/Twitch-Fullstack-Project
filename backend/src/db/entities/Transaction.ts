import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";

import TransactionData from "../../../../types/entity/data/TransactionData";
import TransactionId from "../../../../types/entity/ids/TransactionId";
import UserId from "../../../../types/entity/ids/UserId";
import User from "./User";

@Entity({ name: "transactions" })
export default class Transaction {
  @PrimaryGeneratedColumn()
  id!: TransactionId;

  @Column({ nullable: false })
  @RelationId((self: Transaction) => self.payer)
  payerId!: UserId;

  @ManyToOne(() => User, (user) => user.payments)
  payer?: User;

  @Column({ nullable: false })
  @RelationId((self: Transaction) => self.payee)
  payeeId!: UserId;

  @ManyToOne(() => User, (user) => user.receipts)
  payee?: User;

  @Column({ nullable: false })
  @RelationId((self: Transaction) => self.creator)
  creatorId!: UserId;

  @ManyToOne(() => User, (user) => user.createdTransactions)
  creator?: User;

  @Column({ nullable: false })
  amount!: number;

  @Column({ nullable: false })
  memo!: string;

  @Column({ nullable: false })
  paid!: boolean;

  @Column({
    nullable: false,
    type: "timestamp with time zone",
    default: () => "now()",
  })
  createdAt!: Date;

  @Column({
    nullable: false,
    type: "timestamp with time zone",
    default: () => "now()",
    onUpdate: "now()",
  })
  updatedAt!: Date;

  toJSON(): TransactionData {
    if (!this.payer) {
      throw new Error("Payer missing from Transaction");
    }
    if (!this.payee) {
      throw new Error("Payee missing from Transaction");
    }
    if (!this.creator) {
      throw new Error("Creator missing from Transaction");
    }

    return {
      id: this.id,
      payer: this.payer.toPublicJSON(),
      payee: this.payee.toPublicJSON(),
      creator: this.creator.toPublicJSON(),
      amount: this.amount,
      memo: this.memo,
      paid: this.paid,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
