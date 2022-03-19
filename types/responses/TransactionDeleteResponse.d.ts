import TransactionId from "../entity/ids/TransactionId";
import BaseReponse from "./BaseResponse";

export type TransactionDeleteResponseErrors = {
  id?: string;
};

type TransactionDeleteResponse = BaseReponse<
  { id: TransactionId },
  TransactionDeleteResponseErrors
>;

export default TransactionDeleteResponse;
