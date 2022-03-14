import { Response } from "express";

import User from "../db/entities/User";

export type ResponseWithUserRequired<
  ResBody = unknown,
  Locals extends Record<string, unknown> = Record<string, unknown>
> = Response<
  ResBody,
  {
    user: User;
  } & Locals
>;

export type ResponseWithUser<
  ResBody = unknown,
  Locals extends Record<string, unknown> = Record<string, unknown>
> = Response<
  ResBody,
  {
    user?: User;
  } & Locals
>;
