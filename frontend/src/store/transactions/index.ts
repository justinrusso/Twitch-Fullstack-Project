import { createSlice, isFulfilled } from "@reduxjs/toolkit";

import TransactionData from "../../../../types/entity/data/TransactionData";
import { TransactionsFilter } from "./helpers";
import {
  deleteTransactionRequest,
  getTransactions,
  payTransactionRequest,
} from "./thunks";

const initialState = {
  entities: {} as Record<number, TransactionData>,
  filter: TransactionsFilter.None,
  order: [] as number[],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      const entities: Record<number, TransactionData> = {};
      const order: number[] = new Array(action.payload.data.length);

      action.payload.data.forEach((transaction, i) => {
        entities[transaction.id] = transaction;
        order[i] = transaction.id;
      });

      state.entities = entities;
      state.order = order;
      state.filter = action.payload.storeFilter ?? state.filter;
    });

    builder.addMatcher(
      isFulfilled(payTransactionRequest, deleteTransactionRequest),
      (state, action) => {
        // Only handle this if we're filtering by owed payments
        if (state.filter !== TransactionsFilter.OwedPaymentRequests) {
          return;
        }
        const transactionId = action.payload.id;
        delete state.entities[transactionId];
        state.order = state.order.filter((id) => id !== transactionId);
      }
    );
  },
});

const transactionsReducer = transactionsSlice.reducer;

export default transactionsReducer;
