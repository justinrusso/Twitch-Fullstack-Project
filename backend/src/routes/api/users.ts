import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getRepository } from "typeorm";

import UsersQueryRequest from "../../../../types/requests/UsersQueryRequest";
import UsersResponse from "../../../../types/responses/UsersResponse";
import { requireAuth } from "../../common/middlewares/auth";
import usersQueryValidatorMiddlewares from "../../common/middlewares/validation/users-query";
import User from "../../db/entities/User";

const usersRouter = Router();

usersRouter.get(
  "/",
  ...requireAuth,
  ...usersQueryValidatorMiddlewares,
  expressAsyncHandler(async (req, res) => {
    const { key } = req.query as UsersQueryRequest;

    const users = await getRepository(User)
      .createQueryBuilder("users")
      .where(
        `users."firstName" || ' ' || users."lastName" ILIKE :key OR users.username ILIKE :key`,
        { key: `%${key}%` }
      )
      .limit(10)
      .getMany();

    const responseData: UsersResponse = {
      data: users.map((user) => user.toPublicJSON()),
    };

    res.json(responseData);
  })
);

export default usersRouter;
