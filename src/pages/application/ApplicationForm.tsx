import { FC, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Application } from "../../types";
import styles from "./index.module.css";
import { Button } from "../../components/button";
import { FormControl } from "../../components/form-control";
import { Input } from "../../components/input";
import { Textarea } from "../../components/textarea";
import LoadingIcon from "../../assets/icons/loading-icon.svg?react";

interface Props {
  updateApplicationTitle: (title: string) => void;
  onSubmit: (data: Application) => void;
}

export const ApplicationForm: FC<Props> = ({
  onSubmit,
  updateApplicationTitle,
}) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid, isSubmitting },
  } = useFormContext<Application>();

  const submitHandler = handleSubmit(onSubmit);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (["jobTitle", "companyName"].includes(e.target.name)) {
        updateApplicationTitle(
          [getValues().jobTitle, getValues().companyName]
            .filter(Boolean)
            .join(", "),
        );
      }
    },
    [getValues, updateApplicationTitle],
  );

  return (
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
              <Input placeholder="Apple" {...field} onBlur={handleBlur} />
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
      <Button size="large" type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? <LoadingIcon height={24} /> : "Generate Now"}
      </Button>
    </form>
  );
};
