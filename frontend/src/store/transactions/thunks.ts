import { createAsyncThunk } from "@reduxjs/toolkit";

import TransactionData from "../../../../types/entity/data/TransactionData";
import TransactionId from "../../../../types/entity/ids/TransactionId";
import TransactionRequest from "../../../../types/requests/TransactionRequest";
import TransactionDeleteResponse from "../../../../types/responses/TransactionDeleteResponse";
import TransactionPatchResponse from "../../../../types/responses/TransactionPatchResponse";
import TransactionResponse from "../../../../types/responses/TransactionResponse";
import TransactionsResponse from "../../../../types/responses/TransactionsResponse";
import LocalTransactionsApi from "../../api/local/LocalTransactionsApi";
import { getTransactionQueryArgs, TransactionsFilter } from "./helpers";

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

export const deleteTransactionRequest = createAsyncThunk(
  "transactions/deleteTransactionRequest",
  async (
    transactionId: TransactionId,
    thunkAPI
  ): Promise<{ id: TransactionId }> => {
    const res = await LocalTransactionsApi.deleteTransactionRequest(
      transactionId
    );
    const resData: TransactionDeleteResponse = await res.json();

    if (resData.errors || !resData.data) {
      throw thunkAPI.rejectWithValue(resData.errors);
    }

    return resData.data;
  }
);

type GetTransactionsReturnType = {
  storeFilter: TransactionsFilter;
  data: TransactionData[];
};

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (
    filter: TransactionsFilter,
    thunkAPI
  ): Promise<GetTransactionsReturnType> => {
    const res = await LocalTransactionsApi.getTransactions(
      getTransactionQueryArgs(filter)
    );
    const resData: TransactionsResponse = await res.json();

    if (resData.errors || !resData.data) {
      throw thunkAPI.rejectWithValue(resData.errors);
    }

    return {
      storeFilter: filter,
      data: resData.data,
    };
  }
);

export const payTransactionRequest = createAsyncThunk(
  "transactions/payTransactionRequest",
  async (transactionId: TransactionId, thunkAPI): Promise<TransactionData> => {
    const res = await LocalTransactionsApi.payTransactionRequest(transactionId);
    const resData: TransactionPatchResponse = await res.json();

    if (resData.errors || !resData.data) {
      throw thunkAPI.rejectWithValue(resData.errors);
    }

    return resData.data;
  }
);
