import { combineReducers, createStore } from "redux";
import { accountReducer } from "features/account";
import { customerReducer } from "features/customer";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
