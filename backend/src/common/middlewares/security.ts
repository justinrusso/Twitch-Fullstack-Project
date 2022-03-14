import cors from "cors";
import csurf from "csurf";
import { Router } from "express";
import helmet from "helmet";

import config from "../../config";

const isProduction = config.environment === "production";

const securityMiddlewares = Router();

if (isProduction) {
  // Redirect to HTTPS in production
  securityMiddlewares.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect(301, `https://${req.headers.host + req.url}`);
    }
    next();
  });
} else {
  // enable cors if not production
  securityMiddlewares.use(cors());
}

securityMiddlewares.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Set the _csrf token and add req.csrfToken method
securityMiddlewares.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "lax",
      httpOnly: true,
    },
  })
);

// Add the xsrf-token to the cookie for non-api GET requests
securityMiddlewares.use(/^(?!\/?api).*/, (req, res, next) => {
  if (req.method.toUpperCase() === "GET") {
    res.cookie("xsrf-token", req.csrfToken());
  }
  next();
});

export default securityMiddlewares;
