import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getRepository } from "typeorm";

import LoginRequest from "../../../../types/requests/LoginRequest";
import SignupRequest from "../../../../types/requests/SignupRequest";
import LoginResponse from "../../../../types/responses/LoginResponse";
import LogoutResponse from "../../../../types/responses/LogoutResponse";
import SignupResponse from "../../../../types/responses/SignupResponse";
import { setTokenCookie } from "../../common/auth";
import HttpError from "../../common/HttpError";
import { requireAuth } from "../../common/middlewares/auth";
import loginValidationMiddlewares from "../../common/middlewares/validation/login";
import signupValidatorMiddlewares from "../../common/middlewares/validation/signup";
import { ResponseWithUserRequired } from "../../common/responses";
import User from "../../db/entities/User";

const authRouter = Router();

// Get the current user from the session and return their data
authRouter.get("/", ...requireAuth, (_req, res: ResponseWithUserRequired) => {
  const user = res.locals.user;

  const jsonData: LoginResponse = {
    data: user,
  };

  return res.json(jsonData);
});

authRouter.delete(
  "/",
  ...requireAuth,
  (_req, res: ResponseWithUserRequired) => {
    res.clearCookie("token");

    const responseData: LogoutResponse = {
      data: {
        id: res.locals.user.id,
      },
    };
    return res.json(responseData);
  }
);

authRouter.post(
  "/login",
  ...loginValidationMiddlewares,
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

authRouter.get(
  "/login/demo",
  expressAsyncHandler(async (_req, res, next) => {
    const user = await getRepository(User).findOne({
      where: {
        username: "demouser",
      },
    });

    if (!user) {
      const error = new HttpError(500);
      error.message = "Demo Login Failed";
      return next(error);
    }

    setTokenCookie(res, user);

    const jsonData: LoginResponse = {
      data: user,
    };

    res.json(jsonData);
  })
);

authRouter.post(
  "/signup",
  ...signupValidatorMiddlewares,
  expressAsyncHandler(async (req, res) => {
    const { firstName, lastName, username, password } =
      req.body as SignupRequest;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.password = password;
    user.balance = 0;

    await getRepository(User).save(user);

    setTokenCookie(res, user);

    const jsonData: SignupResponse = {
      data: user,
    };

    res.json(jsonData);
  })
);

export default authRouter;
