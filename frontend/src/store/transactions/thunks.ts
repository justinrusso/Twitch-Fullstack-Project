import { createAsyncThunk } from "@reduxjs/toolkit";

import TransactionData from "../../../../types/entity/data/TransactionData";
import TransactionRequest from "../../../../types/requests/TransactionRequest";
import TransactionResponse from "../../../../types/responses/TransactionResponse";
import LocalTransactionsApi from "../../api/local/LocalTransactionsApi";

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (data: TransactionRequest, thunkAPI): Promise<TransactionData> => {
    const res = await LocalTransactionsApi.createTransaction(data);
    const resData: TransactionResponse = await res.json();

    if (resData.errors || !resData.data) {
      throw thunkAPI.rejectWithValue(resData.errors);
    }

    return resData.data;
  }
);
