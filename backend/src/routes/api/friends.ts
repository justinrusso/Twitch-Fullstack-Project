import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getCustomRepository, getRepository } from "typeorm";

import FriendData from "../../../../types/entity/data/FriendData";
import UserId from "../../../../types/entity/ids/UserId";
import FriendsQueryRequest from "../../../../types/requests/FriendsQueryRequest";
import FriendDeleteResponse from "../../../../types/responses/FriendDeleteReponse";
import FriendsResponse from "../../../../types/responses/FriendsResponse";
import HttpError from "../../common/HttpError";
import { requireAuth } from "../../common/middlewares/auth";
import friendsQueryValidatorMiddlewares from "../../common/middlewares/validation/friends-query";
import { Mutable } from "../../common/Mutable";
import { ResponseWithUserRequired } from "../../common/responses";
import Friend from "../../db/entities/Friend";
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

friendsRouter.delete(
  "/:id(\\d+)",
  ...requireAuth,
  expressAsyncHandler(async (req, res, next) => {
    const user = (res as ResponseWithUserRequired).locals.user;

    const friendId = parseInt(req.params.id) as UserId;

    const friendship = await getCustomRepository(FriendRepository).find(
      user.id,
      friendId
    );

    if (!friendship) {
      const error = new HttpError(404);
      return next(error);
    }

    await getRepository(Friend).delete(friendship);

    const responseData: FriendDeleteResponse = {
      data: {
        id: friendId,
      },
    };

    res.json(responseData);
  })
);

export default friendsRouter;
