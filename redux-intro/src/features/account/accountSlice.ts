type State = { balance: number; loan: number; loanPurpose: string };

enum ActionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  REQUEST_LOAN = "requestLoan",
  PAY_LOAN = "payLoan",
}

type Action =
  | {
      type: Exclude<ActionType, ActionType.PAY_LOAN | ActionType.REQUEST_LOAN>;
      payload: number;
    }
  | {
      type: ActionType.REQUEST_LOAN;
      payload: {
        amount: number;
        purpose: string;
      };
    }
  | { type: ActionType.PAY_LOAN };

const initialState: State = { balance: 0, loan: 0, loanPurpose: "" };

export const accountReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.DEPOSIT:
      return { ...state, balance: state.balance + action.payload };
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
    default:
      return state;
  }
};

export const deposit = (amount: number) => ({
  type: ActionType.DEPOSIT as const,
  payload: amount,
});

export const withdraw = (amount: number) => ({
  type: ActionType.WITHDRAW as const,
  payload: amount,
});

export const requestLoan = (amount: number, purpose: string) => ({
  type: ActionType.REQUEST_LOAN as const,
  payload: { amount, purpose },
});

export const payLoan = () => ({ type: ActionType.PAY_LOAN as const });
