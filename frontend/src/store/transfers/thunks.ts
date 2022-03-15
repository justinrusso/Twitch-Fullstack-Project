import { createAsyncThunk } from "@reduxjs/toolkit";

import BankTransferData from "../../../../types/entity/data/BankTransferData";
import BankTransferRequest from "../../../../types/requests/BankTransferRequest";
import BankTransferResponse from "../../../../types/responses/BankTransferResponse";
import LocalTransfersApi from "../../api/local/LocalTransfersApi";

export const createTransfer = createAsyncThunk(
  "transfers/createTransfer",
  async (data: BankTransferRequest, thunkAPI): Promise<BankTransferData> => {
    const res = await LocalTransfersApi.createTransfer(data);
    const resData: BankTransferResponse = await res.json();

    if (resData.errors || !resData.data) {
      throw thunkAPI.rejectWithValue(resData.errors);
    }

    return resData.data;
  }
);
