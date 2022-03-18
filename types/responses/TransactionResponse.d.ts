import BankTransferData from "../entity/data/BankTransferData";
import TransactionData from "../entity/data/TransactionData";
import BaseReponse from "./BaseResponse";

export type TransactionResponseErrors = {
  to?: string;
  type?: string;
  amount?: string;
  memo?: string;
};

type TransactionResponse = BaseReponse<
  TransactionData,
  TransactionResponseErrors
>;

export default TransactionResponse;
