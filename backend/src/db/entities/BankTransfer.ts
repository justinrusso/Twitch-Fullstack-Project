import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";

import BankTransferData from "../../../../types/entity/data/BankTransferData";
import BankTransferId from "../../../../types/entity/ids/BankTransferId";
import UserId from "../../../../types/entity/ids/UserId";
import PaymentProcessor from "../../apis/PaymentProcessor";
import User from "./User";

@Entity({ name: "bank_transfers" })
export class BankTransfer implements Omit<BankTransferData, "createdAt"> {
  @PrimaryGeneratedColumn()
  id!: BankTransferId;

  @Column({ nullable: false })
  @RelationId((self: BankTransfer) => self.user)
  userId!: UserId;

  @ManyToOne(() => User, (user) => user.bankTransfers, { onDelete: "CASCADE" })
  user?: User;

  @Column({ nullable: false })
  amount!: number;

  /**
   * If this transfer is a deposit. If false, it is a withdraw
   */
  @Column({ nullable: false })
  deposit!: boolean;

  @Column({ nullable: false })
  processor!: PaymentProcessor;

  /**
   * The id provided from the payment processor for reference later if necessary.
   */
  @Column({ nullable: false })
  processorsId!: string;

  @Column({
    nullable: false,
    type: "timestamp with time zone",
    default: () => "now()",
  })
  createdAt!: Date;

  toJSON(): BankTransferData {
    return {
      id: this.id,
      amount: this.amount,
      deposit: this.deposit,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
