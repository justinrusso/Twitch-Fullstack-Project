import { createSlice, isFulfilled } from "@reduxjs/toolkit";

import SafeUserData from "../../../../types/entity/data/SafeUserData";
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
