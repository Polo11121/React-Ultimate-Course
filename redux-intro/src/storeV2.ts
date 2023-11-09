import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "features/account";
import { customerReducer } from "features/customer";

const rootReducer = combineReducers({
  customer: customerReducer,
  account: accountReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
