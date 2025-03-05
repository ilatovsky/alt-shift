import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import styles from "./index.module.css";

export const TextButton: FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
> = ({ children, ...props }) => {
  return (
    <button className={styles.container} {...props}>
      {children}
    </button>
  );
};
