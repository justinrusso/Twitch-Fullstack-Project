import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";

import SafeUserData from "../../../../types/entity-data/SafeUserData";
import config from "../../config";
import User from "../../db/entities/User";
import HttpError from "../HttpError";

const { jwtConfig } = config;

export const restoreUser: RequestHandler = (req, res, next) => {
  const { token } = req.cookies;

  return verify(token, jwtConfig.secret, {}, async (err, jwtPayload) => {
    if (err || !jwtPayload || typeof jwtPayload === "string") {
      return next();
    }

    try {
      const { id } = jwtPayload.data as SafeUserData;
      req.user = await getRepository(User).findOne(id);
    } catch (e) {
      res.clearCookie("token");
      return next();
    }

    if (!req.user) res.clearCookie("token");

    return next();
  });
};

const ensureUserExists: RequestHandler = (req, _res, next) => {
  if (req.user) return next();
  return next(new HttpError(401));
};

// If there is no current user, return an error
export const requireAuth = [restoreUser, ensureUserExists];
