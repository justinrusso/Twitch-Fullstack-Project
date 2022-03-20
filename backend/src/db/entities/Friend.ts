import { Column, Entity, ManyToOne, PrimaryColumn, RelationId } from "typeorm";
import FriendData from "../../../../types/entity/data/FriendData";
import PublicUserData from "../../../../types/entity/data/PublicUserData";

import UserId from "../../../../types/entity/ids/UserId";
import User from "./User";

@Entity({ name: "friends" })
export default class Friend {
  @PrimaryColumn({ nullable: false })
  @RelationId((self: Friend) => self.user)
  userId!: UserId;

  @ManyToOne(() => User, {
    onDelete: "CASCADE",
    primary: true,
  })
  user?: User;

  @PrimaryColumn({ nullable: false })
  @RelationId((self: Friend) => self.user)
  friendId!: UserId;

  @ManyToOne(() => User, {
    onDelete: "CASCADE",
    primary: true,
  })
  friend?: User;

  @Column({ nullable: false })
  accepted!: boolean;

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

  toJSON(): FriendData & { user: PublicUserData } {
    if (!this.user) {
      throw new Error("User property missing from Friend");
    }
    if (!this.friend) {
      throw new Error("Friend property missing from Friend");
    }

    return {
      user: this.user.toPublicJSON(),
      friend: this.friend.toPublicJSON(),
      accepted: this.accepted,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
