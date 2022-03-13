import { Router } from "express";
import config from "../../config";

const csrfRouter = Router();

// Add a way to add xsrf-token cookie in development
if (config.environment === "development") {
  csrfRouter.get("/restore", (req, res) => {
    res.cookie("xsrf-token", req.csrfToken());
    return res.status(201).json({});
  });
}

export default csrfRouter;
