import TransactionData from "../entity/data/TransactionData";
import BaseReponse from "./BaseResponse";

export type TransactionsResponseErrors = {
  status?: string;
  type?: string;
};

type TransactionsResponse = BaseReponse<
  TransactionData[],
  TransactionsResponseErrors
>;

export default TransactionsResponse;
