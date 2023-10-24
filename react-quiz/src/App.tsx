import {
  Error,
  Header,
  Loader,
  Main,
  StartQuiz,
  Question,
  NextButton,
  ProgressBar,
  Finished,
  Footer,
  Timer,
} from "components";
import { useQuiz } from "hooks";

export const App = () => {
  const {
    dispatch,
    numOfPoints,
    points,
    currentQuestion,
    numOfQuestions,
    currentQuestionIndex,
    status,
    answer,
    highscore,
    secondsRemaining,
  } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartQuiz dispatch={dispatch} numOfQuestions={numOfQuestions} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              currentPoints={points}
              numOfPoints={numOfPoints}
              currentQuestionIndex={currentQuestionIndex}
              numOfQuestions={numOfQuestions}
            />
            <Question
              answer={answer}
              dispatch={dispatch}
              currentQuestion={currentQuestion}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining!} />
              {answer !== null && (
                <NextButton
                  currentQuestionIndex={currentQuestionIndex}
                  numOfQuestions={numOfQuestions}
                  dispatch={dispatch}
                />
              )}
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finished
            dispatch={dispatch}
            highscore={highscore}
            points={points}
            numOfPoints={numOfPoints}
          />
        )}
      </Main>
    </div>
  );
};
