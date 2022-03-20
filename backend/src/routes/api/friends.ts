import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getCustomRepository, getRepository } from "typeorm";

import FriendData from "../../../../types/entity/data/FriendData";
import UserId from "../../../../types/entity/ids/UserId";
import FriendPatchRequest from "../../../../types/requests/FriendPatchRequest";
import FriendsQueryRequest from "../../../../types/requests/FriendsQueryRequest";
import FriendDeleteResponse from "../../../../types/responses/FriendDeleteReponse";
import FriendPatchResponse from "../../../../types/responses/FriendPatchResponse";
import FriendsResponse from "../../../../types/responses/FriendsResponse";
import HttpError from "../../common/HttpError";
import { requireAuth } from "../../common/middlewares/auth";
import friendsQueryValidatorMiddlewares from "../../common/middlewares/validation/friends-query";
import { Mutable } from "../../common/Mutable";
import { ResponseWithUserRequired } from "../../common/responses";
import Friend from "../../db/entities/Friend";
import FriendRepository, {
  FriendWithRelations,
} from "../../db/repositories/FriendRepository";

const friendsRouter = Router();

/**
 * Converts a friendship into JSON to be sent to the client
 * @param userId The current user's Id
 * @param friendship The friendship entity to convert
 */
function convertFriendshipJSON(
  userId: UserId,
  friendship: FriendWithRelations
): FriendData {
  const json = friendship.toJSON();
  // Remove the `user` once we reassign friend to the friend of the specific user
  if (json.user.id === userId) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (json as any).user;
  } else {
    (json as Mutable<FriendData>).friend = json.user;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (json as any).user;
  }
  return json as FriendData;
}

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
      data: friends.map((friendship) =>
        convertFriendshipJSON(user.id, friendship)
      ),
    };

    res.json(responseData);
  })
);

friendsRouter.patch(
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
      error.errors = {
        id: "No friendship found for the id provided",
      };
      return next(error);
    }

    // Only the friend can modify (approve) this
    if (friendship.userId === user.id) {
      const error = new HttpError(403);
      return next(error);
    }

    if (friendship.accepted) {
      const error = new HttpError(400);
      error.errors = {
        accepted: "The friendship is already approved",
      };
      return next(error);
    }

    const { accepted } = req.body as FriendPatchRequest;

    friendship.accepted = accepted ?? friendship.accepted;
    friendship.updatedAt = new Date();

    await getRepository(Friend).save(friendship);

    const responseData: FriendPatchResponse = {
      data: convertFriendshipJSON(user.id, friendship),
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
      error.errors = {
        id: "No friendship found for the id provided",
      };
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
