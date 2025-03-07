import { FC, useCallback } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Application } from "../../types";
import styles from "./index.module.css";
import { Button } from "../../components/button";
import { FormControl } from "../../components/form-control";
import { Input } from "../../components/input";
import { Textarea } from "../../components/textarea";
import LoadingIcon from "../../assets/icons/loading-icon.svg?react";
import RepeatIcon from "../../assets/icons/repeat-icon.svg?react";

interface Props {
  updateApplicationTitle: (title: string) => void;
  onSubmit: (data: Application) => void;
}

export const ApplicationForm: FC<Props> = ({
  onSubmit,
  updateApplicationTitle,
}) => {
  const { control, handleSubmit, getValues, formState } =
    useFormContext<Application>();

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

  const applicationText = useWatch({
    control,
    name: "applicationText",
  });

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <span className={styles.row}>
        <Controller
          control={control}
          name="jobTitle"
          rules={{ required: "Job title is required" }}
          render={({ field, fieldState }) => (
            <FormControl error={fieldState.error?.message} label="Job title">
              <Input
                placeholder="Product manager"
                {...field}
                onBlur={handleBlur}
              />
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="companyName"
          rules={{ required: "Company name is required" }}
          render={({ field, fieldState }) => (
            <FormControl error={fieldState.error?.message} label="Company">
              <Input placeholder="Apple" {...field} onBlur={handleBlur} />
            </FormControl>
          )}
        />
      </span>
      <Controller
        control={control}
        name="goodAt"
        rules={{ required: "«I am good at» is required" }}
        render={({ field, fieldState }) => (
          <FormControl
            error={fieldState.error?.message}
            label="I am good at..."
          >
            <Input
              placeholder="HTML, CSS and doing things in time"
              {...field}
            />
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="additionalDetails"
        rules={{
          maxLength: {
            value: 1200,
            message: "Additional details must be less than 1200 characters",
          },
          required: "Additional details are required",
        }}
        render={({ field, fieldState }) => {
          return (
            <FormControl
              error={fieldState.error?.message}
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
          );
        }}
      />
      <Button
        size="large"
        type="submit"
        variant={getValues("applicationText") ? "outlined" : "regular"}
        disabled={!formState.isValid || formState.isSubmitting}
      >
        {formState.isSubmitting && (
          <LoadingIcon height={24} style={{ margin: "2px 0px" }} />
        )}
        {!formState.isSubmitting && applicationText && (
          <RepeatIcon height={24} style={{ margin: "2px 0px" }} />
        )}
        {!formState.isSubmitting &&
          (applicationText ? "Try Again" : "Generate Now")}
      </Button>
    </form>
  );
};
