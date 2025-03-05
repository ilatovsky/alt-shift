import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import styles from "./index.module.css";

interface Props {
  size?: "small" | "large";
  variant?: "regular" | "outlined";
}

export const Button: FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & Props>
> = ({ children, size = "small", variant = "regular", ...props }) => {
  return (
    <button
      className={styles.container}
      data-size={size}
      data-variant={variant}
      {...props}
    >
      {children}
    </button>
  );
};
