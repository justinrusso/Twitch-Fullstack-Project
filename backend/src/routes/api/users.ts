import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getRepository } from "typeorm";

import UsersQueryRequest from "../../../../types/requests/UsersQueryRequest";
import UsersResponse from "../../../../types/responses/UsersResponse";
import { requireAuth } from "../../common/middlewares/auth";
import usersQueryValidatorMiddlewares from "../../common/middlewares/validation/users-query";
import { ResponseWithUserRequired } from "../../common/responses";
import User from "../../db/entities/User";

const usersRouter = Router();

usersRouter.get(
  "/",
  ...requireAuth,
  ...usersQueryValidatorMiddlewares,
  expressAsyncHandler(async (req, res) => {
    const { key, ignoreSelf } = req.query as unknown as UsersQueryRequest;

    const user = (res as ResponseWithUserRequired).locals.user;

    const usersQuery = getRepository(User)
      .createQueryBuilder("users")
      .where(
        `(users."firstName" || ' ' || users."lastName" ILIKE :key OR users.username ILIKE :key)`,
        { key: `%${key}%` }
      )
      .limit(10);

    if (ignoreSelf) {
      usersQuery.andWhere("users.id != :userId", {
        userId: user.id,
      });
    }

    const users = await usersQuery.getMany();

    const responseData: UsersResponse = {
      data: users.map((user) => user.toJSON()),
    };

    res.json(responseData);
  })
);

export default usersRouter;
