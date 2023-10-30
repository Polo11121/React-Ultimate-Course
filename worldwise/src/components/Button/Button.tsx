import { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "@/components/Button/Button.module.css";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  styleType?: "primary" | "back";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  onClick,
  styleType = "primary",
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    {...props}
    className={`${styles.btn} ${styles[styleType]}`}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);
