import { AbstractRepository, EntityRepository, FindOneOptions } from "typeorm";

import TransactionId from "../../../../types/entity/ids/TransactionId";
import UserId from "../../../../types/entity/ids/UserId";
import TransactionsQueryRequest from "../../../../types/requests/TransactionsQueryRequest";
import SetRequired from "../../common/SetRequired";
import Transaction from "../entities/Transaction";

export type TransactionWithRelations = SetRequired<
  Transaction,
  "creator" | "payer" | "payee"
>;

@EntityRepository(Transaction)
export default class TransactionRepository extends AbstractRepository<Transaction> {
  /**
   * Finds a single transaction given the id
   * @param id The id of the transaction
   * @returns The transaction if it is found
   */
  findOne(id: TransactionId): Promise<TransactionWithRelations | undefined> {
    return this.repository.findOne(id, {
      relations: ["payer", "payee", "creator"],
    }) as Promise<TransactionWithRelations | undefined>;
  }

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
