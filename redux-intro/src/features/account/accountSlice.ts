import { AppDispatch } from "store";

type State = {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
};

enum ActionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  REQUEST_LOAN = "requestLoan",
  PAY_LOAN = "payLoan",
  START_LOADING = "startLoading",
}

type Action =
  | {
      type: Exclude<
        ActionType,
        ActionType.PAY_LOAN | ActionType.REQUEST_LOAN | ActionType.START_LOADING
      >;
      payload: number;
    }
  | {
      type: ActionType.REQUEST_LOAN;
      payload: {
        amount: number;
        purpose: string;
      };
    }
  | { type: ActionType.PAY_LOAN }
  | { type: ActionType.START_LOADING };

const initialState: State = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export const accountReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.DEPOSIT:
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case ActionType.WITHDRAW:
      return { ...state, balance: state.balance - action.payload };
    case ActionType.REQUEST_LOAN:
      return state.loan > 0
        ? state
        : {
            ...state,
            loan: action.payload.amount,
            loanPurpose: action.payload.purpose,
            balance: state.balance + action.payload.amount,
          };
    case ActionType.PAY_LOAN:
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case ActionType.START_LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export const deposit = (amount: number, currency: string) => {
  if (currency === "USD") {
    return {
      type: ActionType.DEPOSIT as const,
      payload: amount,
    };
  }

  return async (dispatch: AppDispatch) => {
    dispatch({
      type: ActionType.START_LOADING as const,
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
        type: ActionType.DEPOSIT as const,
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
      type: ActionType.DEPOSIT as const,
      payload: 0,
    });
  };
};

export const withdraw = (amount: number) => ({
  type: ActionType.WITHDRAW as const,
  payload: amount,
});

export const requestLoan = (amount: number, purpose: string) => ({
  type: ActionType.REQUEST_LOAN as const,
  payload: { amount, purpose },
});

export const payLoan = () => ({ type: ActionType.PAY_LOAN as const });
