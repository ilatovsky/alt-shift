import { FC, TextareaHTMLAttributes } from "react";
import styles from "./index.module.css";

export const Textarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  ...props
}) => {
  return <textarea className={styles.textarea} {...props} />;
};
