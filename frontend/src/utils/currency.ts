export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/**
 * A utility for formatting integer amounts provided from the API
 * @param amount An amount integer passed from the API (whole number)
 * @returns the formatted currency string
 */
export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount / 100);
}
