import { RootState } from "..";

export const selectAllTransactions = () => (state: RootState) =>
  state.transactions.order.map((id) => state.transactions.entities[id]);
