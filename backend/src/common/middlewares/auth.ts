import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";

import SafeUserData from "../../../../types/entity/data/SafeUserData";
import config from "../../config";
import User from "../../db/entities/User";
import HttpError from "../HttpError";
import { ResponseWithUser } from "../responses";

const { jwtConfig } = config;

export const restoreUser: RequestHandler = (
  req,
  res: ResponseWithUser,
  next
) => {
  const { token } = req.cookies;

  return verify(token, jwtConfig.secret, {}, async (err, jwtPayload) => {
    if (err || !jwtPayload || typeof jwtPayload === "string") {
      return next();
    }

    try {
      const { id } = jwtPayload.data as SafeUserData;
      res.locals.user = await getRepository(User).findOne(id);
    } catch (e) {
      res.clearCookie("token");
      return next();
    }

    if (!res.locals.user) res.clearCookie("token");

    return next();
  });
};

const ensureUserExists: RequestHandler = (
  _req,
  res: ResponseWithUser,
  next
) => {
  if (res.locals.user) return next();
  return next(new HttpError(401));
};

// If there is no current user, return an error
export const requireAuth = [restoreUser, ensureUserExists];
