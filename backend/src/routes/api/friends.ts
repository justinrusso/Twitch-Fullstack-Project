import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getCustomRepository } from "typeorm";

import FriendData from "../../../../types/entity/data/FriendData";
import FriendsQueryRequest from "../../../../types/requests/FriendsQueryRequest";
import FriendsResponse from "../../../../types/responses/FriendsResponse";
import { requireAuth } from "../../common/middlewares/auth";
import friendsQueryValidatorMiddlewares from "../../common/middlewares/validation/friends-query";
import { Mutable } from "../../common/Mutable";
import { ResponseWithUserRequired } from "../../common/responses";
import FriendRepository from "../../db/repositories/FriendRepository";

const friendsRouter = Router();

friendsRouter.get(
  "/",
  ...requireAuth,
  ...friendsQueryValidatorMiddlewares,
  expressAsyncHandler(async (req, res) => {
    const { direction, status } = req.query as FriendsQueryRequest;

    const user = (res as ResponseWithUserRequired).locals.user;

    const friends = await getCustomRepository(
      FriendRepository
    ).findUserFriendships(user.id, { direction, status });

    const responseData: FriendsResponse = {
      data: friends.map((friend) => {
        const json = friend.toJSON();
        // Remove the `user` once we reassign friend to the friend of the specific user
        if (json.user.id === user.id) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          delete (json as any).user;
        } else {
          (json as Mutable<FriendData>).friend = json.user;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          delete (json as any).user;
        }
        return json as FriendData;
      }),
    };

    res.json(responseData);
  })
);

export default friendsRouter;

// Frontend has to determine who is the friend and who is the user'
