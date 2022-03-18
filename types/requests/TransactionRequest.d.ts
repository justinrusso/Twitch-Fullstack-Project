import UserId from "../entity/ids/UserId";

type TransactionRequest = {
  to: UserId;
  type: "payment" | "request";
  amount: number;
  memo: string;
};

export default TransactionRequest;
