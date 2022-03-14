import { createAsyncThunk } from "@reduxjs/toolkit";

import SafeUserData from "../../../../types/entity-data/SafeUserData";
import LoginRequest from "../../../../types/requests/LoginRequest";
import LoginResponse from "../../../../types/responses/LoginResponse";
import LocalAuthApi from "../../api/local/LocalAuthApi";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data: LoginRequest, thunkAPI): Promise<SafeUserData> => {
    const res = await LocalAuthApi.login(data);
    const resData: LoginResponse = await res.json();

    if (resData.errors || !resData.data) {
      throw thunkAPI.rejectWithValue(resData.errors);
    }

    return resData.data;
  }
);
