import { Router } from "express";

import authRouter from "./auth";
import csrfRouter from "./csrf";

const router = Router();

router.use("/auth", authRouter);
router.use("/csrf", csrfRouter);

export default router;
