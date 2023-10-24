import { useEffect } from "react";
import { ActionTypes, Dispatch } from "utils";

type TimerProps = {
  secondsRemaining: number;
  dispatch: Dispatch;
};

export const Timer = ({ secondsRemaining, dispatch }: TimerProps) => {
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(() => {
    const interval = setInterval(
      () => dispatch({ type: ActionTypes.TICK }),
      1000
    );

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="timer">
      {secondsRemaining > 0
        ? `Time remaining: ${mins}:${secs < 10 ? `0${secs}` : secs}`
        : "Time's up!"}
    </div>
  );
};
