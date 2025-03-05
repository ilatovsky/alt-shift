import { FC } from "react";
interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: FC<Props> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
