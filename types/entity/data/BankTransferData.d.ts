type BankTransferData = {
  readonly id: number;
  readonly amount: number;
  readonly deposit: boolean;

  /**
   * A timestamp string
   */
  readonly createdAt: string;
};

export default BankTransferData;
