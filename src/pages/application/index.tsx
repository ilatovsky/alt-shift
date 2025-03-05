import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "wouter";
import { paths } from "../../paths";
import { Cta } from "../../components/cta";
import { FormControl } from "../../components/form-control";
import { Input } from "../../components/input";
import { Textarea } from "../../components/textarea";
import { Button } from "../../components/button";
import { TextButton } from "../../components/text-button";
import CopyIcon from "../../assets/icons/copy-icon.svg?react";
import { Controller, useForm } from "react-hook-form";
import { Application as ApplicationType } from "../../types";
import styles from "./index.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingIcon from "../../assets/icons/loading-icon.svg?react";
import { api } from "../../api";
import { APPLICATIONS_TARGET_COUNT } from "../../constants";

export const Application: FC = () => {
  const { id } = useParams<typeof paths.applications.view>();

  const {
    control,
    getValues,
    reset,
    handleSubmit,
    formState: { isValid, isSubmitSuccessful },
  } = useForm<ApplicationType>({
    defaultValues: {
      id,
      jobTitle: "",
      companyName: "",
      goodAt: "",
      additionalDetails: "",
      applicationText: "",
    },
  });

  const { data: application } = useQuery({
    queryKey: ["application", id] as const,
    queryFn: ({ queryKey }) => api.getApplication(queryKey[1]),
  });

  useEffect(() => {
    if (id) {
      reset({
        id,
        jobTitle: "",
        companyName: "",
        goodAt: "",
        additionalDetails: "",
        applicationText: "",
      });
      setApplicationTitle("");
    }
  }, [id, reset]);

  useEffect(() => {
    if (application) {
      reset(application);
    }
  }, [id, application, reset]);

  const [applicationTitle, setApplicationTitle] = useState("");

  const pageTitle = `Alt+Shift - ${applicationTitle || "New application"}`;

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (["jobTitle", "companyName"].includes(e.target.name)) {
        setApplicationTitle(
          [getValues().jobTitle, getValues().companyName]
            .filter(Boolean)
            .join(", "),
        );
      }
    },
    [getValues],
  );

  const { mutateAsync: retainApplication, isPending } = useMutation({
    mutationFn: (data: ApplicationType) => api.retainApplication(data),
  });

  const submitHandler = useMemo(
    () =>
      handleSubmit((data: ApplicationType) => {
        retainApplication(data);
      }),
    [handleSubmit, retainApplication],
  );

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
          {
            <form className={styles.form} onSubmit={submitHandler}>
              <span className={styles.row}>
                <FormControl label="Job title">
                  <Controller
                    control={control}
                    name="jobTitle"
                    rules={{ required: "Job title is required" }}
                    render={({ field }) => (
                      <Input
                        placeholder="Product manager"
                        {...field}
                        onBlur={handleBlur}
                      />
                    )}
                  />
                </FormControl>
                <FormControl label="Company">
                  <Controller
                    control={control}
                    name="companyName"
                    rules={{ required: "Company name is required" }}
                    render={({ field }) => (
                      <Input
                        placeholder="Apple"
                        {...field}
                        onBlur={handleBlur}
                      />
                    )}
                  />
                </FormControl>
              </span>
              <FormControl label="I am good at...">
                <Controller
                  control={control}
                  name="goodAt"
                  rules={{ required: "«I am good at» is required" }}
                  render={({ field }) => (
                    <Input
                      placeholder="HTML, CSS and doing things in time"
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <Controller
                control={control}
                name="additionalDetails"
                rules={{
                  required: "Additional details are required",
                  maxLength: 1200,
                }}
                render={({ field }) => (
                  <FormControl
                    label="Additional details"
                    style={{
                      flex: 1,
                    }}
                    hint={`${field.value?.length}/1200`}
                  >
                    <Textarea
                      placeholder="Describe why you are a great fit or paste your bio"
                      style={{ flex: 1 }}
                      {...field}
                    />
                  </FormControl>
                )}
              />
              <Button
                size="large"
                type="submit"
                disabled={!isValid || isPending}
              >
                {isPending ? <LoadingIcon height={24} /> : "Generate Now"}
              </Button>
            </form>
          }
        </div>
        <div className={styles.preview}>
          <p className={styles["preview-content"]}>
            Your personalized job application will appear here...
          </p>
          <div className={styles["preview-actions"]}>
            <TextButton disabled>
              Copy to clipboard
              <CopyIcon height={20} />
            </TextButton>
          </div>
        </div>
      </section>
      {isSubmitSuccessful && !isPending && (
        <Cta targetCount={APPLICATIONS_TARGET_COUNT} />
      )}
    </main>
  );
};
