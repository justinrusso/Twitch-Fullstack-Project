import { createAsyncThunk } from "@reduxjs/toolkit";

import SafeUserData from "../../../../types/entity-data/SafeUserData";
import LoginRequest from "../../../../types/requests/LoginRequest";
import SignupRequest from "../../../../types/requests/SignupRequest";
import LoginResponse from "../../../../types/responses/LoginResponse";
import SignupResponse from "../../../../types/responses/SignupResponse";
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

export const loginDemoUser = createAsyncThunk(
  "user/loginDemoUser",
  async (_args, thunkAPI): Promise<SafeUserData> => {
    const res = await LocalAuthApi.loginDemo();
    const resData: LoginResponse = await res.json();

    if (resData.errors || !resData.data) {
      throw thunkAPI.rejectWithValue(resData.errors);
    }

    return resData.data;
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (): Promise<void> => {
    const res = await LocalAuthApi.logout();
    if (!res.ok) {
      throw new Error("Failed to log out");
    }
  }
);

export const restoreUserSession = createAsyncThunk(
  "user/restoreUserSession",
  async (_args, thunkAPI): Promise<SafeUserData> => {
    const res = await LocalAuthApi.restoreSession();
    const resData: LoginResponse = await res.json();

    if (resData.errors || !resData.data) {
      throw thunkAPI.rejectWithValue(resData.errors);
    }

    return resData.data;
  }
);

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (data: SignupRequest, thunkAPI): Promise<SafeUserData> => {
    const res = await LocalAuthApi.signup(data);
    const resData: SignupResponse = await res.json();

    if (resData.errors || !resData.data) {
      throw thunkAPI.rejectWithValue(resData.errors);
    }

    return resData.data;
  }
);
