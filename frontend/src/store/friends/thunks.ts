import { createAsyncThunk } from "@reduxjs/toolkit";

import FriendData from "../../../../types/entity/data/FriendData";
import UserId from "../../../../types/entity/ids/UserId";
import FriendsQueryRequest from "../../../../types/requests/FriendsQueryRequest";
import FriendDeleteResponse from "../../../../types/responses/FriendDeleteReponse";
import FriendPatchResponse from "../../../../types/responses/FriendPatchResponse";
import FriendPostResponse from "../../../../types/responses/FriendPostResponse";
import FriendsResponse from "../../../../types/responses/FriendsResponse";
import LocalFriendsApi from "../../api/local/LocalFriendsApi";

export const acceptFriendship = createAsyncThunk(
  "friends/acceptFriendship",
  async (friendId: UserId, thunkAPI): Promise<FriendData> => {
    const res = await LocalFriendsApi.acceptFriendship(friendId);
    const resData: FriendPatchResponse = await res.json();

    if (resData.errors || !resData.data) {
      throw thunkAPI.rejectWithValue(resData.errors);
    }

    return resData.data;
  }
);

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

export const requestFriendship = createAsyncThunk(
  "friends/requestFriendship",
  async (friendId: UserId, thunkAPI): Promise<FriendData> => {
    const res = await LocalFriendsApi.requestFriendship(friendId);
    const resData: FriendPostResponse = await res.json();

    if (resData.errors || !resData.data) {
      throw thunkAPI.rejectWithValue(resData.errors);
    }

    return resData.data;
  }
);
