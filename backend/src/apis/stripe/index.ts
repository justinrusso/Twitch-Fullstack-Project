import Stripe from "stripe";
import config from "../../config";

const stripe = new Stripe(config.stripe.apiKey, {
  apiVersion: "2020-08-27",
});

export default stripe;

/**
 * Gets the USD balance in the account attached to the api key.
 * Returns 0 if the amount can't be found
 */
export async function getBalance() {
  const res = await stripe.balance.retrieve();
  return (
    res.available.find((account) => account.currency === "usd")?.amount || 0
  );
}

/**
 * Deposits money into a user's account
 * @param {number} amount the amount to charge the user in cents
 * @returns The stripe response object
 */
export async function chargeUser(amount: number) {
  const res = await stripe.charges.create({
    amount,
    description: `Transfer to ${config.appName}`,
    source: "tok_bypassPending",
    currency: "usd",
  });

  return res;
}

/**
 * Refunds the user
 * @param {string} id the id of the charge from stripe
 * @returns The stripe response object
 */
export async function refundUser(id: string) {
  const res = await stripe.refunds.create({
    charge: id,
  });
  return res;
}

/**
 * Withdraws money from a user's account
 * NOTE: This currently just transfers the money into the bank account attached to the Stripe account linked to the API key.
 * @param {number} amount the amount to remove from the user's account in cents
 * @returns The stripe response object
 */
export async function payUser(amount: number) {
  const res = await stripe.payouts.create({
    amount,
    description: `Transfer from ${config.appName}`,
    currency: "usd",
  });

  return res;
}

/**
 * Cancels the payout of a user
 * @param {string} id the id of the payout from stripe
 * @returns The stripe response object
 */
export async function cancelPayUser(id: string) {
  const res = await stripe.payouts.cancel(id);
  return res;
}
