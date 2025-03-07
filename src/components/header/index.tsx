import { FC } from "react";
import logoUrl from "../../assets/logo.svg";
import { Link } from "wouter";
import { HomeIcon } from "../home-icon";
import styles from "./index.module.css";
import { Progress } from "./Progress";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo} title="Back to home">
          <img src={logoUrl} alt="Alt+Shift logo" />
        </Link>
        <span className={styles.actions}>
          <Progress />
          <Link href="/" title="Back to home">
            <HomeIcon />
          </Link>
        </span>
      </nav>
    </header>
  );
};
