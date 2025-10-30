"use client";

import React from "react";
import { CreateOrganization } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const CreateOrganizationClient = ({
  afterCreateOrganizationUrl = "/",
}: {
  afterCreateOrganizationUrl?: string;
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <CreateOrganization
      afterCreateOrganizationUrl={afterCreateOrganizationUrl}
      appearance={{
        theme: resolvedTheme === "dark" ? dark : undefined,
      }}
    />
  );
};

export default CreateOrganizationClient;
