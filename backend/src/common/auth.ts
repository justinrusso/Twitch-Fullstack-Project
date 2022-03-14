import { Response } from "express";
import { sign } from "jsonwebtoken";

import config from "../config";
import User from "../db/entities/User";

const { jwtConfig } = config;

export function setTokenCookie(res: Response, user: User) {
  const token = sign({ data: user.toJSON() }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    maxAge: jwtConfig.expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "lax",
  });

  return token;
}
