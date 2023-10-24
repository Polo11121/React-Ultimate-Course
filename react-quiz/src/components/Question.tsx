import { Question as QuestionType, Dispatch } from "utils";
import { Options } from "components";

type QuestionProps = {
  answer: number | null;
  currentQuestion: QuestionType;
  dispatch: Dispatch;
};

export const Question = ({
  currentQuestion: { question, options, correctOption },
  answer,
  dispatch,
}: QuestionProps) => (
  <div>
    <h4>{question}</h4>
    <Options
      correctAnswer={correctOption}
      answer={answer}
      options={options}
      dispatch={dispatch}
    />
  </div>
);
