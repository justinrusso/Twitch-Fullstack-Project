import { createSlice } from "@reduxjs/toolkit";

import FriendData from "../../../../types/entity/data/FriendData";
import { addStringToSorted } from "../../utils/array";
import { getUsersFullName } from "../../utils/string";
import {
  acceptFriendship,
  getFriends,
  removeFriendship,
  requestFriendship,
} from "./thunks";

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

    builder.addCase(acceptFriendship.fulfilled, (state, action) => {
      const friendId = action.payload.friend.id;
      if (state.entities[friendId]) {
        state.entities[friendId] = action.payload;
      }
    });

    builder.addCase(removeFriendship.fulfilled, (state, action) => {
      delete state.entities[action.payload.id];
      state.order = state.order.filter((id) => id !== action.payload.id);
    });

    builder.addCase(requestFriendship.fulfilled, (state, action) => {
      const friendId = action.payload.friend.id;

      state.entities[friendId] = action.payload;
      state.order = addStringToSorted(
        state.order.map((id) => state.entities[id]),
        action.payload,
        {
          getter: (data) => getUsersFullName(data.friend),
        }
      ).map((data) => data.friend.id);
    });
  },
});

const friendsReducer = friendsSlice.reducer;

export default friendsReducer;
