import TransactionRequest from "../../../../types/requests/TransactionRequest";
import { fetchApiWithCsrf, routeBuilder } from "../utils";

const buildTransactionsRoute = routeBuilder("/api/transactions");

export default class LocalTransactionsApi {
  static async createTransaction(data: TransactionRequest) {
    return fetchApiWithCsrf(buildTransactionsRoute(""), {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
