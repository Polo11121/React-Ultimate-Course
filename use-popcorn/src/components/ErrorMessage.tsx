type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p className="error">
    <span>🛑</span> {message}
  </p>
);
