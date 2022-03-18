import { createSlice, isFulfilled } from "@reduxjs/toolkit";

import SafeUserData from "../../../../types/entity/data/SafeUserData";
import { createTransaction } from "../transactions/thunks";
import { createTransfer } from "../transfers/thunks";
import {
  getUserData,
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

    // Update the user's balance when a transaction is paid by the user
    builder.addCase(createTransaction.fulfilled, (state, action) => {
      if (!state) {
        return;
      }

      const { amount, payer } = action.payload;

      // Ignore transactions not made by the user
      if (payer.id !== state.id) {
        return;
      }

      state.balance -= amount;
    });

    builder.addMatcher(
      isFulfilled(
        getUserData,
        loginDemoUser,
        loginUser,
        restoreUserSession,
        signupUser
      ),
      (_state, action) => {
        return action.payload;
      }
    );
  },
});

const userReducer = userSlice.reducer;

export default userReducer;
