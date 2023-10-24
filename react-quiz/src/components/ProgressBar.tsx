type ProgressBarProps = {
  numOfQuestions: number;
  currentQuestionIndex: number;
  currentPoints: number;
  numOfPoints: number;
};

export const ProgressBar = ({
  numOfQuestions,
  currentQuestionIndex,
  currentPoints,
  numOfPoints,
}: ProgressBarProps) => (
  <header className="progress">
    <progress value={currentQuestionIndex + 1} max={numOfQuestions} />
    <p>
      Question{" "}
      <strong>
        {currentQuestionIndex + 1} / {numOfQuestions}
      </strong>
    </p>
    <p>
      <strong>{currentPoints}</strong> / {numOfPoints}
    </p>
  </header>
);
