import { ChangeEvent, useState, useReducer } from "react";

enum ActionType {
  INCREMENT = "increment",
  DECREMENT = "decrement",
  SET_COUNT = "setCount",
  RESET = "reset",
}

type ReducerAction =
  | { type: ActionType.SET_COUNT; payload: number }
  | { type: Exclude<ActionType, ActionType.SET_COUNT> };

const reducer = (state: number, action: ReducerAction) => {
  switch (action.type) {
    case ActionType.INCREMENT:
      return state + 1;
    case ActionType.DECREMENT:
      return state - 1;
    case ActionType.SET_COUNT:
      return action.payload;
    case ActionType.RESET:
      return 0;
    default:
      return state;
  }
};

export const DateCounter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const [count, dispatch] = useReducer(reducer, 0);

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const decrementHandler = () => dispatch({ type: ActionType.DECREMENT });
  const incrementHandler = () => dispatch({ type: ActionType.INCREMENT });

  const defineCountHandler = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: ActionType.SET_COUNT,
      payload: Number(event.target.value),
    });

  const defineStepHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setStep(Number(event.target.value));

  const reset = () => {
    setCount(0);
    setStep(1);
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
