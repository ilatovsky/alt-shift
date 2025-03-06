import { FC, Fragment } from "react";
import { Link } from "wouter";
import TrashIcon from "../../../assets/icons/trash-icon.svg?react";
import { Application } from "../../../types";
import styles from "./index.module.css";
import { TextButton } from "../../../components/text-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api";
import { CopyToClipboardButton } from "../../../components/CopyToClipboardButton";
type Props = Pick<
  Application,
  "id" | "jobTitle" | "companyName" | "applicationText"
>;

export const ApplicationCard: FC<Props> = ({
  id,
  jobTitle,
  companyName,
  applicationText,
}) => {
  const queryClient = useQueryClient();
  const { mutate: deleteApplication } = useMutation({
    mutationFn: api.deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["applicationIdsList"],
      });
    },
  });
  return (
    <article className={styles["application-card"]}>
      <Link
        href={`/applications/${id}`}
        // @ts-expect-error Link component unreasonably complains about the alt
        alt={`Application for ${jobTitle} at ${companyName}`}
      >
        <p>
          {applicationText
            .split("\n")
            .filter(Boolean)
            .map((paragraph, index) => (
              <Fragment key={index}>
                {index !== 0 ? <span /> : null}
                {paragraph}
              </Fragment>
            ))}
        </p>
      </Link>
      <span className={styles.actions}>
        <TextButton
          onClick={() => {
            deleteApplication(id);
          }}
        >
          <TrashIcon height={20} />
          Delete
        </TextButton>
        <CopyToClipboardButton text={applicationText} />
      </span>
    </article>
  );
};
