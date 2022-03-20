import TransactionsQueryRequest from "../../../../types/requests/TransactionsQueryRequest";

export enum TransactionsFilter {
  None = "None",
  Completed = "Completed",
  OwedPaymentRequests = "OwedPaymentRequests",
}

/**
 * A utility function to generate the query arguments based on the filter type
 * @param filter a filter used to create the query args
 */
export function getTransactionQueryArgs(
  filter: TransactionsFilter
): TransactionsQueryRequest {
  const args: TransactionsQueryRequest = {};

  switch (filter) {
    case TransactionsFilter.Completed:
      args.status = "paid";
      break;
    case TransactionsFilter.OwedPaymentRequests:
      args.status = "unpaid";
      args.type = "payer";
      break;
    default:
      break;
  }

  return args;
}
