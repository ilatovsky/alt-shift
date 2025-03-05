import { Steps } from "../Steps";
import { FC } from "react";
import CheckIcon from "../../assets/icons/check-icon.svg?react";
import { APPLICATIONS_TARGET_COUNT } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
export const Progress: FC = () => {
  const { data: applicationsCount = 0 } = useQuery({
    queryKey: ["applicationIdsList"],
    queryFn: api.getApplicationIdsList,
    select: (data) => data.length,
  });

  return (
    <span
      style={{
        display: "inline-flex",
        gap: 16,
        alignItems: "center",
      }}
    >
      <span>
        {`${applicationsCount}/${APPLICATIONS_TARGET_COUNT} applications generated`}
      </span>
      <Steps
        targetCount={APPLICATIONS_TARGET_COUNT}
        currentCount={applicationsCount}
      />
      {applicationsCount === APPLICATIONS_TARGET_COUNT && (
        <CheckIcon height={28} />
      )}
    </span>
  );
};
