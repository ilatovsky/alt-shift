import { FC } from "react";
import { Link } from "wouter";
import { Button } from "../button";
import { Steps } from "../steps";
import styles from "./index.module.css";
import PlusIcon from "../../assets/icons/plus-icon.svg?react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { paths } from "../../paths";
import { nanoid } from "nanoid";
import { inject } from "regexparam";

interface Props {
  targetCount: number;
}

export const Cta: FC<Props> = ({ targetCount }) => {
  const { data: applicationsCount = 0 } = useQuery({
    queryKey: ["applicationIdsList"],
    queryFn: api.getApplicationIdsList,
    select: (data) => data.length,
  });

  if (applicationsCount >= targetCount) {
    return null;
  }

  return (
    <section className={styles["cta-wrapper"]}>
      <div className={styles.cta}>
        <div className={styles["cta-content"]}>
          <h2>Hit your goal</h2>
          <p>
            Generate and send out couple more job applications today to get
            hired faster
          </p>
          <Link to={inject(paths.applications.view, { id: nanoid() })} asChild>
            <Button size="large">
              <PlusIcon height={24} />
              Create New
            </Button>
          </Link>
        </div>
        <div className={styles["cta-progress"]}>
          <Steps
            targetCount={targetCount}
            currentCount={applicationsCount}
            stepWidth={32}
            stepsGap={8}
          />
          <p>
            {applicationsCount} out of {targetCount}
          </p>
        </div>
      </div>
    </section>
  );
};
