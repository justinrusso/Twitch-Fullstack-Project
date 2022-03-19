type TransactionsQueryRequest = {
  /**
   * Filters the the status of the transaction.
   * Selects any status if omitted
   */
  status?: "paid" | "unpaid";

  /**
   * Filters between transactions where the user is the payer or the payee.
   * Selects both types if omitted
   */
  type?: "payer" | "payee";
};

export default TransactionsQueryRequest;
