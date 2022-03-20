import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getCustomRepository, getManager, getRepository } from "typeorm";

import TransactionId from "../../../../types/entity/ids/TransactionId";
import UserId from "../../../../types/entity/ids/UserId";
import TransactionRequest from "../../../../types/requests/TransactionRequest";
import TransactionsQueryRequest from "../../../../types/requests/TransactionsQueryRequest";
import TransactionResponse, {
  TransactionResponseErrors,
} from "../../../../types/responses/TransactionResponse";
import TransactionPatchResponse, {
  TransactionPatchResponseErrors,
} from "../../../../types/responses/TransactionPatchResponse";
import TransactionsResponse from "../../../../types/responses/TransactionsResponse";
import HttpError from "../../common/HttpError";
import { requireAuth } from "../../common/middlewares/auth";
import transactionValidatorMiddlewares from "../../common/middlewares/validation/transaction";
import transactionsQueryValidatorMiddlewares from "../../common/middlewares/validation/transactions-query";
import { ResponseWithUserRequired } from "../../common/responses";
import Transaction from "../../db/entities/Transaction";
import User from "../../db/entities/User";
import TransactionRepository from "../../db/repositories/TransactionRepository";
import transactionPatchValidatorMiddlewares from "../../common/middlewares/validation/transaction-patch";
import TransactionPatchRequest from "../../../../types/requests/TransactionPatchRequest";
import TransactionDeleteResponse, {
  TransactionDeleteResponseErrors,
} from "../../../../types/responses/TransactionDeleteResponse";

const transactionsRouter = Router();

transactionsRouter.get(
  "/",
  ...requireAuth,
  ...transactionsQueryValidatorMiddlewares,
  expressAsyncHandler(async (req, res) => {
    const { status, type } = req.query as TransactionsQueryRequest;

    const user = (res as ResponseWithUserRequired).locals.user;

    const transactions = await getCustomRepository(
      TransactionRepository
    ).findUserTransactions(user.id, { status, type });

    const responseData: TransactionsResponse = {
      data: transactions.map((transaction) => transaction.toJSON()),
    };

    res.json(responseData);
  })
);

transactionsRouter.post(
  "/",
  ...requireAuth,
  ...transactionValidatorMiddlewares,
  expressAsyncHandler(async (req, res, next) => {
    const {
      to: targetUserId,
      type,
      amount,
      memo,
    } = req.body as TransactionRequest;

    const user = (res as ResponseWithUserRequired).locals.user;

    // Define who is the payer and payee
    const payerId = type === "payment" ? user.id : targetUserId;
    const payeeId = type === "payment" ? targetUserId : user.id;

    // If the user is the payer, ensure they have enough money in account
    if (user.id === payerId && user.balance < amount) {
      const error = new HttpError(400);
      error.errors = {
        amount: "Insufficient funds",
      };
      return next(error);
    }

    const transaction = new Transaction();
    transaction.payerId = payerId as UserId;
    transaction.payeeId = payeeId as UserId;
    transaction.creatorId = user.id;
    transaction.creator = user;
    transaction.amount = amount;
    transaction.memo = memo;
    transaction.paid = type === "payment";

    const targetUser = await getRepository(User).findOne(
      transaction.paid ? payeeId : payerId
    );

    if (!targetUser) {
      const error = new HttpError<TransactionResponseErrors>(400);
      error.errors = {
        to: "Failed to find user specified",
      };
      return next(error);
    }

    // Assign users to transaction for response
    if (transaction.paid) {
      transaction.payer = user;
      transaction.payee = targetUser;
    } else {
      transaction.payer = targetUser;
      transaction.payee = user;
    }

    if (transaction.paid) {
      // Update the user's balances if this is transaction is being completed now
      transaction.payer.balance -= amount;
      transaction.payee.balance += amount;

      await getManager().transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(transaction);
        await transactionalEntityManager.save(user);
        await transactionalEntityManager.save(targetUser);
      });
    } else {
      await getRepository(Transaction).save(transaction);
    }

    const responseData: TransactionResponse = {
      data: transaction.toJSON(),
    };

    res.json(responseData);
  })
);

transactionsRouter.patch(
  "/:id(\\d+)",
  ...requireAuth,
  ...transactionPatchValidatorMiddlewares,
  expressAsyncHandler(async (req, res, next) => {
    const transactionId = parseInt(req.params.id) as TransactionId;

    const user = (res as ResponseWithUserRequired).locals.user;

    const transaction = await getCustomRepository(
      TransactionRepository
    ).findOne(transactionId);

    if (!transaction) {
      const error = new HttpError(404);
      return next(error);
    }

    // Ensure the user is the payer
    if (transaction.payerId !== user.id) {
      const error = new HttpError(403);
      return next(error);
    }

    // Only allow updates if the transaction has not been paid
    if (transaction.paid) {
      const error = new HttpError<TransactionPatchResponseErrors>(400);
      error.errors = {
        paid: "The transaction has already been paid",
      };
    }

    const { paid } = req.body as TransactionPatchRequest;
    // Check if we are attempting to pay the transaction
    const isPayment = typeof paid === "boolean" && paid && !transaction.paid;

    transaction.paid = paid ?? transaction.paid;
    transaction.updatedAt = new Date();

    if (isPayment) {
      // Ensure payer has enough money
      if (transaction.payer.balance < transaction.amount) {
        const error = new HttpError<TransactionPatchResponseErrors>(400);
        error.errors = {
          amount: "Insufficient Funds",
        };
        return next(error);
      }

      // Update the user's balances if this is transaction is being completed now
      transaction.payer.balance -= transaction.amount;
      transaction.payee.balance += transaction.amount;

      await getManager().transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(transaction);
        await transactionalEntityManager.save(transaction.payer);
        await transactionalEntityManager.save(transaction.payee);
      });
    } else {
      await getRepository(Transaction).save(transaction);
    }

    const responseData: TransactionPatchResponse = {
      data: transaction.toJSON(),
    };

    res.json(responseData);
  })
);

transactionsRouter.delete(
  "/:id(\\d+)",
  ...requireAuth,
  expressAsyncHandler(async (req, res, next) => {
    const transactionId = parseInt(req.params.id) as TransactionId;

    const user = (res as ResponseWithUserRequired).locals.user;

    const transaction = await getCustomRepository(
      TransactionRepository
    ).findOne(transactionId);

    if (!transaction) {
      const error = new HttpError(404);
      return next(error);
    }

    // Ensure the user is the payer or payee
    if (transaction.payerId !== user.id) {
      const error = new HttpError(403);
      return next(error);
    }

    // Only allow a deletion if the transaction has not been paid
    if (transaction.paid) {
      const error = new HttpError<TransactionDeleteResponseErrors>(400);
      error.errors = {
        id: "The transaction with this id has already been paid",
      };
    }

    await getRepository(Transaction).delete(transaction.id);

    const responseData: TransactionDeleteResponse = {
      data: {
        id: transactionId,
      },
    };

    res.json(responseData);
  })
);

export default transactionsRouter;
