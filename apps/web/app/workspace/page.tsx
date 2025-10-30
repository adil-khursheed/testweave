"use client";

import React from "react";
import { CreateOrganization } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const Page = () => {
  const { resolvedTheme } = useTheme();

  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <CreateOrganization
        afterCreateOrganizationUrl={"/project/create"}
        appearance={{
          theme: resolvedTheme === "dark" ? dark : undefined,
        }}
      />
    </section>
  );
};

export default Page;
