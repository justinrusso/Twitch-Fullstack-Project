import { AbstractRepository, EntityRepository, FindOneOptions } from "typeorm";

import UserId from "../../../../types/entity/ids/UserId";
import FriendsQueryRequest from "../../../../types/requests/FriendsQueryRequest";
import SetRequired from "../../common/SetRequired";
import Friend from "../entities/Friend";

export type FriendWithRelations = SetRequired<Friend, "friend" | "user">;

@EntityRepository(Friend)
export default class FriendRepository extends AbstractRepository<Friend> {
  /**
   * Finds the friendship between two users
   * @param user1 The first user's id
   * @param user2 The second user's id
   */
  find(user1: UserId, user2: UserId): Promise<FriendWithRelations | undefined> {
    return this.repository.findOne({
      where: [
        { userId: user1, friendId: user2 },
        { userId: user2, friendId: user1 },
      ],
      relations: ["friend", "user"],
    }) as Promise<FriendWithRelations | undefined>;
  }

  /**
   * Finds friendships for a given user.
   * @param userId The user's id
   * @param args Additional arguments to filter the query
   * @returns an array of friendships for a user filtered by any args passed in.
   */
  findUserFriendships(
    userId: UserId,
    args?: FriendsQueryRequest
  ): Promise<FriendWithRelations[]> {
    const sharedWhereArgs: FindOneOptions<Friend>["where"] = {};

    if (args?.status) {
      sharedWhereArgs.accepted = args?.status === "accepted" ? true : false;
    }

    return this.repository.find({
      where: [
        !args?.direction || args.direction === "sent"
          ? { ...sharedWhereArgs, userId: userId }
          : undefined,
        !args?.direction || args.direction === "received"
          ? { ...sharedWhereArgs, friendId: userId }
          : undefined,
      ].filter(Boolean),
      relations: ["friend", "user"],
    }) as Promise<FriendWithRelations[]>;
  }
}
