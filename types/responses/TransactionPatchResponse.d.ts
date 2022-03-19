import TransactionData from "../entity/data/TransactionData";
import BaseReponse from "./BaseResponse";

export type TransactionPatchResponseErrors = {
  paid?: string;
};

type TransactionPatchResponse = BaseReponse<
  TransactionData,
  TransactionPatchResponseErrors
>;

export default TransactionPatchResponse;
