import { ReactNode, ButtonHTMLAttributes } from "react";
import { Spinner } from "@/components";
import styles from "@/components/Button/Button.module.css";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  styleType?: "primary" | "back" | "position";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  onClick,
  styleType = "primary",
  type = "button",
  isLoading = false,
  ...props
}: ButtonProps) => (
  <div className={styles.btnContainer}>
    <button
      {...props}
      className={`${styles.btn} ${styles[styleType]}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
    {isLoading && <Spinner small />}
  </div>
);
