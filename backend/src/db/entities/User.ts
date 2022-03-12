import { compareSync, hashSync } from "bcryptjs";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import type SafeUserData from "../../../../types/entity-data/SafeUserData";
import type { Mutable } from "../../common/Mutable";

@Entity({ name: "users" })
export default class User implements SafeUserData {
  @PrimaryGeneratedColumn({})
  id!: number;

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
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      profileImgUrl: this.profileImgUrl,
      balance: this.balance,
    };
  }
}
