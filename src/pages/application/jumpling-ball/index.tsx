import React from "react";
import jumpingCircle from "../../../assets/jumping-circle.svg";
import styles from "./index.module.css";

export const JumpingCircle: React.FC = () => {
  return (
    <div className={styles.container}>
      <img src={jumpingCircle} alt="Jumping Circle" className={styles.circle} />
    </div>
  );
};
