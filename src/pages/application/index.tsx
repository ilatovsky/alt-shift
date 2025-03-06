import { FC, useEffect, useState } from "react";
import { useParams } from "wouter";
import { paths } from "../../paths";
import { Cta } from "../../components/cta";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Application as ApplicationType } from "../../types";
import styles from "./index.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { APPLICATIONS_TARGET_COUNT } from "../../constants";
import { ApplicationForm } from "./ApplicationForm";
import { JumpingCircle } from "./jumpling-ball";
import { CopyToClipboardButton } from "../../components/CopyToClipboardButton";

export const Application: FC = () => {
  const { id } = useParams<typeof paths.applications.view>();
  const queryClient = useQueryClient();
  const [applicationTitle, setApplicationTitle] = useState("");
  const form = useForm<ApplicationType>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: async () => {
      const application = await queryClient.fetchQuery({
        queryKey: ["application", id] as const,
        queryFn: ({ queryKey }) => api.getApplication(queryKey[1]),
      });
      setApplicationTitle(
        [application?.jobTitle, application?.companyName]
          .filter(Boolean)
          .join(", "),
      );
      return (
        application ?? {
          id,
          jobTitle: "",
          companyName: "",
          goodAt: "",
          additionalDetails: "",
          applicationText: "",
        }
      );
    },
  });

  useEffect(() => {
    if (id) {
      form.reset({
        id,
        jobTitle: "",
        companyName: "",
        goodAt: "",
        additionalDetails: "",
        applicationText: "",
      });
      setApplicationTitle("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, form.reset]);
  const applicationText = useWatch({
    control: form.control,
    name: "applicationText",
  });

  const pageTitle = `Alt+Shift - ${applicationTitle || "New application"}`;

  const { mutateAsync: retainApplication } = useMutation({
    mutationFn: (data: ApplicationType) => api.retainApplication(data),
  });

  const { mutateAsync: generateApplicationText } = useMutation({
    mutationFn: (data: ApplicationType) => api.generateApplicationText(data),
  });

  return (
    <main className={styles.container}>
      <title>{pageTitle}</title>
      <section className={styles.application}>
        <div className={styles["application-form"]}>
          <h2
            className={styles.heading}
            data-type={applicationTitle ? undefined : "placeholder"}
          >
            {applicationTitle || "New application"}
          </h2>
          {!form.formState.isLoading && (
            <FormProvider {...form}>
              <ApplicationForm
                onSubmit={async (data) => {
                  const applicationText = await generateApplicationText(data);
                  retainApplication({ ...data, applicationText });
                  form.reset({ ...data, applicationText });
                }}
                updateApplicationTitle={setApplicationTitle}
              />
            </FormProvider>
          )}
        </div>
        <div className={styles.preview}>
          {form.formState.isSubmitting ? (
            <JumpingCircle />
          ) : (
            <p className={styles["preview-content"]}>
              {applicationText ||
                "Your personalized job application will appear here..."}
            </p>
          )}

          {applicationText && !form.formState.isSubmitting && (
            <div className={styles["preview-actions"]}>
              <CopyToClipboardButton text={applicationText} />
            </div>
          )}
        </div>
      </section>
      {applicationText && <Cta targetCount={APPLICATIONS_TARGET_COUNT} />}
    </main>
  );
};
