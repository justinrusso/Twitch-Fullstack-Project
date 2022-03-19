import { AbstractRepository, EntityRepository, FindOneOptions } from "typeorm";

import UserId from "../../../../types/entity/ids/UserId";
import TransactionsQueryRequest from "../../../../types/requests/TransactionsQueryRequest";
import Transaction from "../entities/Transaction";

@EntityRepository(Transaction)
export default class TransactionRepository extends AbstractRepository<Transaction> {
  /**
   * Finds transactions for a given user
   * @param userId The user's id
   * @param args Additional arguments to filter the query
   * @returns an array of transactions for a user filtered by any args passed in. Sorted by in descending date order.
   */
  findUserTransactions(
    userId: UserId,
    args?: TransactionsQueryRequest
  ): Promise<Transaction[]> {
    const sharedWhereArgs: FindOneOptions<Transaction>["where"] = {};

    // To do OR we need an array, so push to array as needed based on situation
    const whereArgs: FindOneOptions<Transaction>["where"][] = [];

    if (args?.status) {
      sharedWhereArgs.paid = args?.status === "paid" ? true : false;
    }

    if (args?.type) {
      const whereArgsForType: FindOneOptions<Transaction>["where"] = {};
      if (args?.type === "payer") {
        whereArgsForType.payerId = userId;
      } else {
        whereArgsForType.payeeId = userId;
      }

      whereArgs.push({
        ...sharedWhereArgs,
        ...whereArgsForType,
      });
    } else {
      // To do payerId OR payeeID we need an array with 2 entries
      whereArgs.push({
        ...sharedWhereArgs,
        payerId: userId,
      });
      whereArgs.push({
        ...sharedWhereArgs,
        payeeId: userId,
      });
    }

    return this.repository.find({
      where: whereArgs,
      relations: ["payer", "payee", "creator"],
      order: {
        updatedAt: "DESC",
      },
    });
  }
}
