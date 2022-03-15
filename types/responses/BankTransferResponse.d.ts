import BankTransferData from "../entity/data/BankTransferData";
import BaseReponse from "./BaseResponse";

export type BankTransferResponseErrors = {
  amount?: string;
  deposit?: string;
};

type BankTransferResponse = BaseReponse<
  BankTransferData,
  BankTransferResponseErrors
>;

export default BankTransferResponse;
