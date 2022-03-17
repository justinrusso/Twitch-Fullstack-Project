import { RootState } from "..";

export const selectAllUsers = () => (state: RootState) =>
  state.users.order.map((id) => state.users.entities[id]);
