type StepProps = {
  isActive: boolean;
  step: number;
};

export const Step = ({ isActive, step }: StepProps) => (
  <div className={isActive ? "active" : ""}>{step}</div>
);
