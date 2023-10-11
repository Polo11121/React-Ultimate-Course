import { useState } from "react";
import { Step, Message, DirectionButton, HideButton } from "components";

export const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const isPrevButtonDisabled = currentStep === 0;
  const isNextButtonDisabled = currentStep === 2;

  const isActive = (step: number) => step <= currentStep;

  const nextStepHandler = () =>
    setCurrentStep((prev) => (prev < 2 ? prev + 1 : prev));

  const prevStepHandler = () =>
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));

  const toggleVisibilityHandler = () => setIsOpen((prev) => !prev);

  return (
    <>
      <HideButton onClick={toggleVisibilityHandler} />
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <Step step={0} isActive={isActive(0)} />
            <Step step={1} isActive={isActive(1)} />
            <Step step={2} isActive={isActive(2)} />
          </div>
          <Message currentStep={currentStep} />
          <div className="buttons">
            <DirectionButton
              direction="previous"
              isDisabled={isPrevButtonDisabled}
              onClick={prevStepHandler}
            />
            <DirectionButton
              direction="next"
              isDisabled={isNextButtonDisabled}
              onClick={nextStepHandler}
            />
          </div>
        </div>
      )}
    </>
  );
};
