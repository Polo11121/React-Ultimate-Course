import { ActionTypes, Dispatch } from "utils";

type StartQuizProps = {
  dispatch: Dispatch;
  numOfQuestions: number;
};

export const StartQuiz = ({ numOfQuestions, dispatch }: StartQuizProps) => {
  const startHandler = () =>
    dispatch({
      type: ActionTypes.START_QUIZ,
    });

  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numOfQuestions} questions to test your React mastery</h3>
      <button onClick={startHandler} className="btn btn-ui">
        Let's start
      </button>
    </div>
  );
};
