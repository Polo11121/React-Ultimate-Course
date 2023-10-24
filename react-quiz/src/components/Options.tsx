import { Dispatch, ActionTypes } from "utils";

type OptionsProps = {
  answer: number | null;
  options: string[];
  correctAnswer: number;
  dispatch: Dispatch;
};

export const Options = ({
  options,
  dispatch,
  answer,
  correctAnswer,
}: OptionsProps) => (
  <div className="options">
    {options.map((option, index) => {
      const hasAnswered = answer !== null;

      const selectAnswerHandler = () =>
        dispatch({
          type: ActionTypes.NEW_ANSWER,
          payload: index,
        });

      return (
        <button
          key={option}
          onClick={selectAnswerHandler}
          disabled={hasAnswered}
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswered ? (correctAnswer === index ? "correct" : "wrong") : ""
          }`}
        >
          {option}
        </button>
      );
    })}
  </div>
);
