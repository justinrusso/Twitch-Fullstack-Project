import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler } from "express";
import morgan from "morgan";

import HttpError from "./common/HttpError";
import securityMiddlewares from "./common/middlewares/security";
import config from "./config";
import routes from "./routes";

const isProduction = config.environment === "production";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Add all security middlewares
app.use(securityMiddlewares);

// All routes should be defined in the routes directory
app.use(routes);

// Use this to catch all remaining requests and respond with a 404 error
app.use((_req, _res, next) => {
  next(new HttpError(404));
});

// Disable no-unused-vars since express requires all 4 variables to exist
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(((err: HttpError, _req, res, _next) => {
  res.status(err.status || 500);

  if (config.environment !== "test") {
    console.error(err);
  }

  res.json({
    errors: err.errors,
    errorStack: isProduction ? undefined : err.stack,
  });
}) as ErrorRequestHandler);

export default app;
