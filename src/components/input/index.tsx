import { FC, InputHTMLAttributes } from "react";
import styles from "./index.module.css";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return <input className={styles.input} {...props} />;
};
