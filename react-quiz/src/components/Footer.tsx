import { ReactNode } from "react";

type FooterProps = {
  children: ReactNode;
};

export const Footer = ({ children }: FooterProps) => (
  <footer>{children}</footer>
);
