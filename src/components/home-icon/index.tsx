import { FC } from "react";
import homeIconUrl from "../../assets/icons/home-icon.svg";
import styles from "./index.module.css";

export const HomeIcon: FC = () => (
  <span className={styles.container}>
    <img className={styles.icon} height={20} width={20} src={homeIconUrl} />
  </span>
);
