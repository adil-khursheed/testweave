"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const UserButtonClient = () => {
  const { resolvedTheme } = useTheme();

  return (
    <UserButton
      appearance={{
        theme: resolvedTheme === "dark" ? dark : undefined,
        elements: {
          userButtonBox: "flex-row-reverse",
        },
      }}
    />
  );
};

export default UserButtonClient;
