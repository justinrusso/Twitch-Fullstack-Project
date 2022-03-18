import UserId from "../entity/ids/UserId";

type TransactionRequest = {
  /**
   * The user to pay or request
   */
  to: UserId;

  /**
   * The type or transaction request
   */
  type: "payment" | "request";

  /**
   * A whole number greater than 50
   */
  amount: number;

  /**
   * A note to go along with the payment / request
   */
  memo: string;
};

export default TransactionRequest;
