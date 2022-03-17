import { Router } from "express";

import authRouter from "./auth";
import csrfRouter from "./csrf";
import transfersRouter from "./transfers";
import usersRouter from "./users";

const router = Router();

router.use("/auth", authRouter);
router.use("/csrf", csrfRouter);
router.use("/transfers", transfersRouter);
router.use("/users", usersRouter);

export default router;
