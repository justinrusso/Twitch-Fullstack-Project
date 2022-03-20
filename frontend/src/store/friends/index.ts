import { createSlice } from "@reduxjs/toolkit";

import FriendData from "../../../../types/entity/data/FriendData";
import { getUsersFullName } from "../../utils/string";
import { getFriends } from "./thunks";

const initialState = {
  entities: {} as Record<number, FriendData>,

  /**
   * Alphabetically sorted list of the ids
   */
  order: [] as number[],
};

const friendsSlice = createSlice({
  name: "friends",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFriends.fulfilled, (state, action) => {
      const entities: Record<number, FriendData> = {};
      const order: number[] = new Array(action.payload.length);

      // Sort alphabetically, then add to order and entities
      action.payload
        .sort((a, b) =>
          getUsersFullName(a.friend).localeCompare(getUsersFullName(b.friend))
        )
        .forEach((friendship, i) => {
          entities[friendship.friend.id] = friendship;
          order[i] = friendship.friend.id;
        });

      state.entities = entities;
      state.order = order;
    });
  },
});

const friendsReducer = friendsSlice.reducer;

export default friendsReducer;
