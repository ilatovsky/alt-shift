import { FC } from "react";
import HomeIconSvg from "../../assets/icons/home-icon.svg?react";
import styles from "./index.module.css";

export const HomeIcon: FC = () => (
  <span className={styles.container}>
    <HomeIconSvg height={20} />
  </span>
);
