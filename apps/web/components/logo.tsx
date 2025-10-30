import { cn } from "@workspace/ui/lib/utils";
import React from "react";
import { IconWorldCheck } from "@tabler/icons-react";

const Logo = ({
  textClassName,
  iconClassName,
}: {
  textClassName?: string;
  iconClassName?: string;
}) => {
  return (
    <>
      <IconWorldCheck className={cn("text-primary", iconClassName)} />
      <span className={cn("font-bold text-xl text-primary", textClassName)}>
        TestWeave
      </span>
    </>
  );
};

export default Logo;
