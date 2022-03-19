import TransactionId from "../../../../types/entity/ids/TransactionId";
import TransactionRequest from "../../../../types/requests/TransactionRequest";
import TransactionsQueryRequest from "../../../../types/requests/TransactionsQueryRequest";
import { fetchApiWithCsrf, routeBuilder } from "../utils";

const buildTransactionsRoute = routeBuilder("/api/transactions");

export default class LocalTransactionsApi {
  static async createTransaction(data: TransactionRequest) {
    return fetchApiWithCsrf(buildTransactionsRoute(""), {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async getTransactions(queryParams?: TransactionsQueryRequest) {
    const params = new URLSearchParams(queryParams);
    return fetchApiWithCsrf(buildTransactionsRoute(`?${params.toString()}`));
  }

  static async payTransactionRequest(transactionId: TransactionId) {
    return fetchApiWithCsrf(buildTransactionsRoute(`/${transactionId}`), {
      method: "PATCH",
      body: JSON.stringify({
        paid: true,
      }),
    });
  }

  static async deleteTransactionRequest(transactionId: TransactionId) {
    return fetchApiWithCsrf(buildTransactionsRoute(`/${transactionId}`), {
      method: "DELETE",
    });
  }
}
