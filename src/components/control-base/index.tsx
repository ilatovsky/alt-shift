import { FC, HTMLAttributes, PropsWithChildren } from "react";
import styles from "./index.module.css";

export const ControlBase: FC<
  PropsWithChildren<HTMLAttributes<HTMLSpanElement>>
> = ({ children, className, ...props }) => {
  return (
    <span
      className={[styles.container, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </span>
  );
};
