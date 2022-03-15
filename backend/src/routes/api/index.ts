import { Router } from "express";

import authRouter from "./auth";
import csrfRouter from "./csrf";
import transfersRouter from "./transfers";

const router = Router();

router.use("/auth", authRouter);
router.use("/csrf", csrfRouter);
router.use("/transfers", transfersRouter);

export default router;
