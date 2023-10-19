import { ReactNode } from "react";
import { ErrorMessage } from "components";

type WithErrorProps = {
  errorMessage: string;
  children: ReactNode;
};

export const WithError = ({ errorMessage, children }: WithErrorProps) => (
  <>{errorMessage ? <ErrorMessage message={errorMessage} /> : children}</>
);
