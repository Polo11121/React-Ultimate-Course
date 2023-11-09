type State = {
  fullName: string;
  nationalID: string;
  createdAt: string;
};

enum ActionType {
  CREATE_CUSTOMER = "createCustomer",
  UPDATE_NAME = "updateName",
}

const initialState: State = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

type Action =
  | {
      type: ActionType.CREATE_CUSTOMER;
      payload: State;
    }
  | {
      type: ActionType.UPDATE_NAME;
      payload: string;
    };

export const customerReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.CREATE_CUSTOMER:
      return { ...state, ...action.payload };
    case ActionType.UPDATE_NAME:
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
};

export const createCustomer = (fullName: string, nationalID: string) => ({
  type: ActionType.CREATE_CUSTOMER as const,
  payload: { fullName, nationalID, createdAt: new Date().toISOString() },
});

export const updateName = (fullName: string) => ({
  type: ActionType.UPDATE_NAME as const,
  payload: fullName,
});
