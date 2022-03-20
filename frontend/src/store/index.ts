import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { Middleware } from "redux";

import friendsReducer from "./friends";
import transactionsReducer from "./transactions";
import userReducer from "./user";
import usersReducer from "./users";

const isDev = process.env.NODE_ENV !== "production";

const rootReducer = combineReducers({
  friends: friendsReducer,
  transactions: transactionsReducer,
  user: userReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  devTools: isDev,
  middleware: (getDefaultMiddleware) => {
    if (isDev) {
      const logger = require("redux-logger").default;
      return getDefaultMiddleware().concat(
        logger as Middleware<any, RootState>
      );
    }
    return getDefaultMiddleware();
  },
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;
