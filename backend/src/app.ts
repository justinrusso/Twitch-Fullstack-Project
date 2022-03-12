import express, { ErrorRequestHandler } from "express";
import createHttpError, { HttpError } from "http-errors";
import morgan from "morgan";

import routes from "./routes";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

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
