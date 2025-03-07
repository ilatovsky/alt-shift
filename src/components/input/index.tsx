import { FC, InputHTMLAttributes } from "react";
import styles from "./index.module.css";
import { ControlBase } from "../control-base";
export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  style,
  ...props
}) => {
  return (
    <ControlBase
      className={[styles.container, className].filter(Boolean).join(" ")}
      style={style}
    >
      <input className={styles.input} {...props} />
    </ControlBase>
  );
};
