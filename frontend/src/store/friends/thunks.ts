import { createAsyncThunk } from "@reduxjs/toolkit";

import FriendData from "../../../../types/entity/data/FriendData";
import FriendsQueryRequest from "../../../../types/requests/FriendsQueryRequest";
import FriendsResponse from "../../../../types/responses/FriendsResponse";
import LocalFriendsApi from "../../api/local/LocalFriendsApi";

export const getFriends = createAsyncThunk(
  "friends/getFriends",
  async (args: FriendsQueryRequest, thunkAPI): Promise<FriendData[]> => {
    const res = await LocalFriendsApi.getFriends(args);
    const resData: FriendsResponse = await res.json();

    if (resData.errors || !resData.data) {
      throw thunkAPI.rejectWithValue(resData.errors);
    }

    return resData.data;
  }
);
