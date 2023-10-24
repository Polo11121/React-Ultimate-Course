import { ActionTypes, Dispatch } from "utils";

type NextButtonProps = {
  dispatch: Dispatch;
  numOfQuestions: number;
  currentQuestionIndex: number;
};

export const NextButton = ({
  dispatch,
  numOfQuestions,
  currentQuestionIndex,
}: NextButtonProps) => {
  const isLastQuestion = numOfQuestions - 1 === currentQuestionIndex;

  const nextQuestionHandler = () =>
    dispatch({
      type: isLastQuestion
        ? ActionTypes.FINISH_QUIZ
        : ActionTypes.NEXT_QUESTION,
    });

  return (
    <button className="btn btn-ui" onClick={nextQuestionHandler}>
      {isLastQuestion ? "Finish" : "Next"}
    </button>
  );
};
