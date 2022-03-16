import express, { RequestHandler, Router } from "express";
import path from "path";

import apiRouter from "./api";

const router = Router();

router.use("/api", apiRouter);

// Static routes for production
if (process.env.NODE_ENV === "production") {
  /**
   * A route handler to serve the index.html from the static folder in production
   */
  const serveIndexPage: RequestHandler = (_req, res) => {
    return res.sendFile(path.resolve("./static", "index.html"));
  };

  // Serve the frontend's index.html file at the root route
  router.get("/", serveIndexPage);

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("./static")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, serveIndexPage);
}

export default router;
