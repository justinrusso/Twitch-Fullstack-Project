import { createSlice, isFulfilled } from "@reduxjs/toolkit";

import SafeUserData from "../../../../types/entity/data/SafeUserData";
import { createTransfer } from "../transfers/thunks";
import {
  loginDemoUser,
  loginUser,
  logoutUser,
  restoreUserSession,
  signupUser,
} from "./thunks";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState: initialState as SafeUserData | null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, () => {
      return null;
    });

    // Update the user's balance when a bank transfer is made
    builder.addCase(createTransfer.fulfilled, (state, action) => {
      if (!state) {
        return;
      }

      const { amount, deposit } = action.payload;

      state.balance += amount * (deposit ? 1 : -1);
    });

    builder.addMatcher(
      isFulfilled(loginDemoUser, loginUser, restoreUserSession, signupUser),
      (_state, action) => {
        return action.payload;
      }
    );
  },
});

const userReducer = userSlice.reducer;

export default userReducer;
