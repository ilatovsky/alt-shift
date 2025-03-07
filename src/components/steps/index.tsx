import { FC } from "react";
import styles from "./index.module.css";

interface Props {
  targetCount: number;
  currentCount: number;
  stepWidth?: number;
  stepsGap?: number;
}

export const Steps: FC<Props> = ({
  targetCount,
  currentCount,
  stepWidth = 8,
  stepsGap = 4,
}) => {
  return (
    <span className={styles.container} style={{ gap: stepsGap }}>
      {Array.from({ length: targetCount }).map((_, index) => (
        <span
          key={index}
          className={styles.step}
          style={{
            width: stepWidth,
            opacity: index < currentCount ? 1 : 0.24,
          }}
        />
      ))}
    </span>
  );
};
