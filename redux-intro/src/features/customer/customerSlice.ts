import { createStore } from "redux";

type CustomerState = {
  fullName: string;
  nationalID: string;
  createdAt: string;
};

enum CustomerActionType {
  CREATE_CUSTOMER = "createCustomer",
  UPDATE_NAME = "updateName",
}

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

type Action =
  | {
      type: CustomerActionType.CREATE_CUSTOMER;
      payload: CustomerState;
    }
  | {
      type: CustomerActionType.UPDATE_NAME;
      payload: string;
    };

export const customerReducer = (
  state = initialStateCustomer,
  action: Action
) => {
  switch (action.type) {
    case CustomerActionType.CREATE_CUSTOMER:
      return { ...state, ...action.payload };
    case CustomerActionType.UPDATE_NAME:
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
};

export const customerStore = createStore(customerReducer);

export const createCustomer = (fullName: string, nationalID: string) => ({
  type: CustomerActionType.CREATE_CUSTOMER as const,
  payload: { fullName, nationalID, createdAt: new Date().toISOString() },
});

export const updateName = (fullName: string) => ({
  type: CustomerActionType.UPDATE_NAME as const,
  payload: fullName,
});
