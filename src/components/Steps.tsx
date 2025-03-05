import { FC } from "react";

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
    <span style={{ display: "inline-flex", gap: stepsGap }}>
      {Array.from({ length: targetCount }).map((_, index) => (
        <span
          key={index}
          style={{
            height: 8,
            width: stepWidth,
            borderRadius: 8,
            backgroundColor: "#101828",
            opacity: index < currentCount ? 1 : 0.24,
          }}
        />
      ))}
    </span>
  );
};
