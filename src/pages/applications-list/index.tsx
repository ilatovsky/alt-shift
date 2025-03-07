import { FC } from "react";
import PlusIcon from "../../assets/icons/plus-icon.svg?react";
import styles from "./index.module.css";
import { ApplicationCard } from "./application-card";
import { Button } from "../../components/button";
import { APPLICATIONS_TARGET_COUNT } from "../../constants";
import { Link } from "wouter";
import { Cta } from "../../components/cta";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { nanoid } from "nanoid";
import { paths } from "../../paths";
import { inject } from "regexparam";

export const ApplicationsList: FC = () => {
  const { data: applications = [] } = useQuery({
    queryKey: ["applications"],
    queryFn: api.getApplications,
  });

  return (
    <main className={styles.container} data-empty={!applications.length}>
      <title>Alt+Shift - Your Applications</title>
      <header className={styles.header}>
        <h1>Applications</h1>
        <Link to={inject(paths.applications.view, { id: nanoid() })} asChild>
          <Button style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <PlusIcon height={20} />
            Create New
          </Button>
        </Link>
      </header>
      <div className={styles.content}>
        {!!applications.length && (
          <section className={styles["applications-grid"]}>
            {applications.map((application) => (
              <ApplicationCard key={application.id} {...application} />
            ))}
          </section>
        )}
        <Cta targetCount={APPLICATIONS_TARGET_COUNT} />
      </div>
    </main>
  );
};
