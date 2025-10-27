"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const SignInForm = () => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <SignIn
        appearance={{ theme: resolvedTheme === "dark" ? dark : undefined }}
      />
    </>
  );
};

export default SignInForm;
