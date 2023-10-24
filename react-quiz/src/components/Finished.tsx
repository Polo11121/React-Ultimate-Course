import { ActionTypes, Dispatch } from "utils";

type FinishedProps = {
  points: number;
  numOfPoints: number;
  highscore: number;
  dispatch: Dispatch;
};

export const Finished = ({
  points,
  numOfPoints,
  highscore,
  dispatch,
}: FinishedProps) => {
  const percentage = (points / numOfPoints) * 100;
  let emoji;

  const restartQuizHandler = () =>
    dispatch({
      type: ActionTypes.RESTART_QUIZ,
    });

  if (percentage === 100) {
    emoji = "🥳";
  } else if (percentage >= 80) {
    emoji = "😎";
  } else if (percentage >= 60) {
    emoji = "😊";
  } else if (percentage >= 40) {
    emoji = "😐";
  } else {
    emoji = "😢";
  }
  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {numOfPoints} (
        {Math.ceil(percentage)})
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn btn-ui" onClick={restartQuizHandler}>
        Restart Quiz
      </button>
    </>
  );
};
