import { createAsyncThunk } from "@reduxjs/toolkit";

import PublicUserData from "../../../../types/entity/data/PublicUserData";
import UsersQueryRequest from "../../../../types/requests/UsersQueryRequest";
import UsersResponse from "../../../../types/responses/UsersResponse";
import LocalUsersApi from "../../api/local/LocalUsersApi";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (data: UsersQueryRequest, thunkAPI): Promise<PublicUserData[]> => {
    const res = await LocalUsersApi.getUsers(data);
    const resData: UsersResponse = await res.json();

    if (resData.errors || !resData.data) {
      throw thunkAPI.rejectWithValue(resData.errors);
    }

    return resData.data;
  }
);
