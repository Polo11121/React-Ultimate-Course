type MessageProps = {
  currentStep: number;
};

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export const Message = ({ currentStep }: MessageProps) => (
  <p className="message">
    Step {currentStep + 1}:{messages[0]}
  </p>
);
