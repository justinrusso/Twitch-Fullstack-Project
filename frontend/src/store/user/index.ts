import { createSlice, isFulfilled } from "@reduxjs/toolkit";

import SafeUserData from "../../../../types/entity-data/SafeUserData";
import { loginUser, signupUser } from "./thunks";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState: initialState as SafeUserData | null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isFulfilled(loginUser, signupUser), (_state, action) => {
      return action.payload;
    });
  },
});

const userReducer = userSlice.reducer;

export default userReducer;
