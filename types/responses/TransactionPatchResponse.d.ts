import TransactionData from "../entity/data/TransactionData";
import BaseReponse from "./BaseResponse";

export type TransactionPatchResponseErrors = {
  /**
   * An error if the payer does not have the funds to pay
   */
  amount?: string;

  paid?: string;
};

type TransactionPatchResponse = BaseReponse<
  TransactionData,
  TransactionPatchResponseErrors
>;

export default TransactionPatchResponse;
