import { FC, PropsWithChildren, CSSProperties } from "react";
import styles from "./index.module.css";
interface Props {
  label: string;
  style?: CSSProperties;
  hint?: string;
  error?: string;
}

export const FormControl: FC<PropsWithChildren<Props>> = ({
  label,
  children,
  style,
  hint,
  error,
}) => {
  return (
    <label className={styles.container} style={style} data-error={!!error}>
      {label}
      {children}
      {hint && <span className={styles.hint}>{hint}</span>}
    </label>
  );
};
