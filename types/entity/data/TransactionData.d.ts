import TransactionId from "../ids/TransactionId";
import PublicUserData from "./PublicUserData";

type TransactionData = {
  readonly id: TransactionId;
  readonly payer: PublicUserData;
  readonly payee: PublicUserData;
  readonly creator: PublicUserData;
  readonly amount: number;
  readonly memo: string;
  readonly paid: boolean;

  /**
   * A timestamp with timezone string
   */
  readonly createdAt: string;
  /**
   * A timestamp with timezone string
   */
  readonly updatedAt: string;
};

export default TransactionData;
