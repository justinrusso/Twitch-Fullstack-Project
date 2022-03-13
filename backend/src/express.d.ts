import type User from "./db/entities/User";

declare global {
  namespace Express {
    interface Request {
      /**
       * Store the user on the request for easy access to the
       * requester's authentication status & information
       */
      user?: User;
    }
  }
}
