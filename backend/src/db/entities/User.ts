import { compareSync, hashSync } from "bcryptjs";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import PublicUserData from "../../../../types/entity/data/PublicUserData";

import type SafeUserData from "../../../../types/entity/data/SafeUserData";
import UserId from "../../../../types/entity/ids/UserId";
import type { Mutable } from "../../common/Mutable";
import { BankTransfer } from "./BankTransfer";
import Transaction from "./Transaction";

@Entity({ name: "users" })
export default class User implements SafeUserData {
  @PrimaryGeneratedColumn({})
  id!: UserId;

  @Column({ nullable: false })
  firstName!: string;

  @Column({ nullable: false })
  lastName!: string;

  @Column({ nullable: false, length: 50 })
  username!: string;

  @Column({ nullable: false })
  readonly hashedPassword!: string;

  /**
   * Takes in a user's raw password and hashes it to be stored in the database.
   * The hashedPassword property should not be set directly!
   */
  set password(rawPassword: string) {
    (this as Mutable<typeof this>).hashedPassword = hashSync(rawPassword);
  }

  @Column({ nullable: true })
  profileImgUrl?: string;

  @Column({ nullable: false })
  balance!: number;

  /**
   * Validates if the provided password matches the one stored in the database for the user
   * @param {string} rawPassword The input to validate against
   * @returns {boolean} if the provided password matches the user's hashed password
   */
  validatePassword(rawPassword: string): boolean {
    return compareSync(rawPassword, this.hashedPassword);
  }

  toJSON(): SafeUserData {
    return {
      ...this.toPublicJSON(),
      balance: this.balance,
    };
  }

  toPublicJSON(): PublicUserData {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      profileImgUrl: this.profileImgUrl,
    };
  }

  @OneToMany(() => BankTransfer, (bankTransfer) => bankTransfer.user)
  bankTransfers?: BankTransfer[];

  /**
   * Transactions where the user was the payer
   */
  @OneToMany(() => Transaction, (transaction) => transaction.payer)
  payments?: Transaction[];

  /**
   * Transactions where the user was the recipient of a payment (payee)
   */
  @OneToMany(() => Transaction, (transaction) => transaction.payee)
  receipts?: Transaction[];

  /**
   * Transactions created by the user
   */
  @OneToMany(() => Transaction, (transaction) => transaction.creator)
  createdTransactions?: Transaction[];
}
