import { createSlice } from "@reduxjs/toolkit";

type State = {
  fullName: string;
  nationalID: string;
  createdAt: string;
};

const initialState: State = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName: string, nationalID: string) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action: { payload: State }) {
        return { ...state, ...action.payload };
      },
    },
    updateName(state, action: { payload: string }) {
      return { ...state, fullName: action.payload };
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export const customerReducer = customerSlice.reducer;
