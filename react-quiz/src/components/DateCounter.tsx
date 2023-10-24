import { ChangeEvent, useReducer } from "react";

type InitialState = {
  step: number;
  count: number;
};

enum Action {
  INCREMENT = "increment",
  DECREMENT = "decrement",
  SET_COUNT = "setCount",
  SET_STEP = "setStep",
  RESET = "reset",
}

type ReducerAction =
  | { type: Action.SET_COUNT | Action.SET_STEP; payload: number }
  | { type: Exclude<Action, Action.SET_COUNT | Action.SET_STEP> };

const reducer = (state: InitialState, action: ReducerAction) => {
  switch (action.type) {
    case Action.INCREMENT:
      return { ...state, count: state.count + state.step };
    case Action.DECREMENT:
      return {
        ...state,
        count: state.count - +state.step,
      };
    case Action.SET_COUNT:
      return { ...state, count: action.payload };
    case Action.SET_STEP:
      return { ...state, step: action.payload };
    case Action.RESET:
      return { step: 1, count: 0 };
    default:
      return state;
  }
};

export const DateCounter = () => {
  const initialState: InitialState = {
    count: 0,
    step: 1,
  };

  const [{ count, step }, dispatch] = useReducer(reducer, initialState);

  const date = new Date("june 21 2027");

  const decrementHandler = () => dispatch({ type: Action.DECREMENT });
  const incrementHandler = () => dispatch({ type: Action.INCREMENT });

  const defineCountHandler = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: Action.SET_COUNT,
      payload: Number(event.target.value),
    });

  const defineStepHandler = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: Action.SET_STEP,
      payload: Number(event.target.value),
    });

  const reset = () => {
    dispatch({ type: Action.RESET });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStepHandler}
        />
        <span>{step}</span>
      </div>
      <div>
        <button onClick={decrementHandler}>-</button>
        <input value={count} onChange={defineCountHandler} />
        <button onClick={incrementHandler}>+</button>
      </div>
      <p>{date.toDateString()}</p>
      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};
