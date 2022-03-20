import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getManager } from "typeorm";

import BankTransferRequest from "../../../../types/requests/BankTransferRequest";
import BankTransferResponse from "../../../../types/responses/BankTransferResponse";
import PaymentProcessor from "../../apis/PaymentProcessor";
import {
  cancelPayUser,
  chargeUser,
  getBalance,
  payUser,
  refundUser,
} from "../../apis/stripe";
import HttpError from "../../common/HttpError";
import { requireAuth } from "../../common/middlewares/auth";
import transferValidatorMiddlewares from "../../common/middlewares/validation/transfer";
import { ResponseWithUserRequired } from "../../common/responses";
import BankTransfer from "../../db/entities/BankTransfer";

const transfersRouter = Router();

transfersRouter.post(
  "/",
  ...requireAuth,
  ...transferValidatorMiddlewares,
  expressAsyncHandler(async (req, res, next) => {
    const { amount, deposit } = req.body as BankTransferRequest;

    const user = (res as ResponseWithUserRequired).locals.user;

    // If a withdraw, ensure user has the money in the user's account to withdraw
    // as well as enough money in the stripe account
    if (!deposit && (user.balance < amount || (await getBalance()) < amount)) {
      const error = new HttpError(400);
      error.errors = {
        amount: "Insufficient funds",
      };
      return next(error);
    }

    const { id: processorsId } = await (deposit
      ? chargeUser(amount)
      : payUser(amount));

    const transfer = new BankTransfer();
    transfer.userId = user.id;
    transfer.amount = amount;
    transfer.deposit = deposit;
    transfer.processor = PaymentProcessor.Stripe;
    transfer.processorsId = processorsId;

    user.balance += amount * (deposit ? 1 : -1);

    try {
      await getManager().transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(transfer);
        await transactionalEntityManager.save(user);
      });
    } catch (error) {
      // Save failed, revert transaction
      await (deposit ? refundUser(processorsId) : cancelPayUser(processorsId));
      throw error;
    }

    const responseData: BankTransferResponse = {
      data: transfer.toJSON(),
    };

    res.json(responseData);
  })
);

export default transfersRouter;
