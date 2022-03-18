import { createSlice } from "@reduxjs/toolkit";

import PublicUserData from "../../../../types/entity/data/PublicUserData";
import { getUsers } from "./thunks";

const initialState = {
  entities: {} as Record<number, PublicUserData>,
  order: [] as number[],
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    /**
     * Clears the users data
     */
    clearUsers: (state) => {
      state.entities = {};
      state.order = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      const entities: Record<number, PublicUserData> = {};
      const order: number[] = new Array(action.payload.length);

      action.payload.forEach((user, i) => {
        entities[user.id] = user;
        order[i] = user.id;
      });

      state.entities = entities;
      state.order = order;
    });
  },
});

const usersReducer = usersSlice.reducer;

export const { clearUsers } = usersSlice.actions;

export default usersReducer;
