import { FC, TextareaHTMLAttributes } from "react";
import styles from "./index.module.css";
import { ControlBase } from "../control-base";
export const Textarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  style,
  ...props
}) => {
  return (
    <ControlBase
      className={[styles.container, className].filter(Boolean).join(" ")}
      style={style}
    >
      <textarea className={styles.textarea} {...props} />
    </ControlBase>
  );
};
