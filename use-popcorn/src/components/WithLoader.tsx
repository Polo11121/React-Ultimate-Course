import { ReactNode } from "react";

type WithLoaderProps = {
  isLoading: boolean;
  Loader: ReactNode;
  children: ReactNode;
};

export const WithLoader = ({
  isLoading,
  Loader,
  children,
}: WithLoaderProps) => <>{isLoading ? Loader : children}</>;
