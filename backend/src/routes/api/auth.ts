import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getRepository } from "typeorm";

import LoginRequest from "../../../../types/requests/LoginRequest";
import LoginResponse from "../../../../types/responses/LoginResponse";
import { setTokenCookie } from "../../common/auth";
import HttpError from "../../common/HttpError";
import User from "../../db/entities/User";

const authRouter = Router();

authRouter.post(
  "/login",
  expressAsyncHandler(async (req, res, next) => {
    const { username, password } = req.body as LoginRequest;

    const user = await getRepository(User).findOne({
      where: {
        username,
      },
    });

    if (!user || !user.validatePassword(password)) {
      const error = new HttpError(401);
      error.message = "Login Failed";
      error.errors = { credentials: "The provided credentials were invalid." };
      return next(error);
    }

    setTokenCookie(res, user);

    const jsonData: LoginResponse = {
      data: user,
    };

    res.json(jsonData);
  })
);

export default authRouter;
