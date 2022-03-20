import { Router } from "express";

import authRouter from "./auth";
import csrfRouter from "./csrf";
import friendsRouter from "./friends";
import transactionsRouter from "./transactions";
import transfersRouter from "./transfers";
import usersRouter from "./users";

const router = Router();

router.use("/auth", authRouter);
router.use("/csrf", csrfRouter);
router.use("/friends", friendsRouter);
router.use("/transactions", transactionsRouter);
router.use("/transfers", transfersRouter);
router.use("/users", usersRouter);

export default router;
