type BankTransferRequest = {
  /**
   * A whole number greater than 0
   */
  amount: number;

  /**
   * Determines if the transfer is a deposit or withdraw
   */
  deposit: boolean;
};

export default BankTransferRequest;
