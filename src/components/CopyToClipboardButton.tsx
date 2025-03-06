import { ComponentProps, FC, useCallback, useEffect, useState } from "react";
import { TextButton } from "./text-button";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import CopyIcon from "../assets/icons/copy-icon.svg?react";

interface Props {
  text: string;
}

export const CopyToClipboardButton: FC<
  Props & ComponentProps<typeof TextButton>
> = ({ text, ...props }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = useCallback(async () => {
    try {
      await copyToClipboard(text);
      setIsCopied(true);
    } catch (error) {
      console.error(error);
    }
  }, [copyToClipboard, text]);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  }, [isCopied]);

  return (
    <TextButton {...props} onClick={handleClick}>
      {isCopied ? "Copied" : "Copy to clipboard"}
      <CopyIcon height={20} />
    </TextButton>
  );
};
