import { createAsyncThunk } from "@reduxjs/toolkit";

import FriendData from "../../../../types/entity/data/FriendData";
import UserId from "../../../../types/entity/ids/UserId";
import FriendsQueryRequest from "../../../../types/requests/FriendsQueryRequest";
import FriendDeleteResponse from "../../../../types/responses/FriendDeleteReponse";
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

export const removeFriendship = createAsyncThunk(
  "friends/removeFriendship",
  async (friendId: UserId, thunkAPI): Promise<{ id: UserId }> => {
    const res = await LocalFriendsApi.removeFriendship(friendId);
    const resData: FriendDeleteResponse = await res.json();

    if (resData.errors || !resData.data) {
      throw thunkAPI.rejectWithValue(resData.errors);
    }

    return resData.data;
  }
);
