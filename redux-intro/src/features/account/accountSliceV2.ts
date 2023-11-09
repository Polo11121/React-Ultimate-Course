import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "storeV2";

type State = {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
};

const initialState: State = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action: { payload: number }) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action: { payload: number }) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount: number, purpose: string) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action: { payload: { amount: number; purpose: string } }) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    startLoading(state) {
      state.isLoading = true;
    },
  },
});

export const deposit = (amount: number, currency: string) => {
  if (currency === "USD") {
    return {
      type: "account/deposit" as const,
      payload: amount,
    };
  }

  return async (dispatch: AppDispatch) => {
    dispatch({
      type: "account/startLoading" as const,
    });
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      const convertedAmount = data.rates.USD as number;

      return dispatch({
        type: "account/deposit" as const,
        payload: convertedAmount,
      });
    } catch (error) {
      let message = "Unknown Error";

      if (error instanceof Error) {
        message = error.message;
      }

      console.error(message);
    }

    return dispatch({
      type: "account/deposit" as const,
      payload: 0,
    });
  };
};

export const { withdraw, requestLoan, payLoan, startLoading } =
  accountSlice.actions;

export const accountReducer = accountSlice.reducer;
