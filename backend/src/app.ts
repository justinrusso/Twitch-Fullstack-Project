import cookieParser from "cookie-parser";
import cors from "cors";
import csurf from "csurf";
import express, { ErrorRequestHandler } from "express";
import helmet from "helmet";
import createHttpError, { HttpError } from "http-errors";
import morgan from "morgan";

import config from "./config";
import routes from "./routes";

const isProduction = config.environment === "production";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

/*
  Security Middlewares
*/
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
// Set the _csrf token and add req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "lax",
      httpOnly: true,
    },
  })
);

// All routes should be defined in the routes directory
app.use(routes);

// Use this to catch all remaining requests and respond with a 404 error
app.use((_req, _res, next) => {
  next(createHttpError(404));
});

// Disable no-unused-vars since express requires all 4 variables to exist
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(((err: HttpError, _req, res, _next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: JSON.parse(JSON.stringify(err)),
  });
}) as ErrorRequestHandler);

export default app;
