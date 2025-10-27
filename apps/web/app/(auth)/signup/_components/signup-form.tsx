"use client";

import React from "react";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const SignUpForm = () => {
  const { resolvedTheme } = useTheme();
  return (
    <SignUp
      appearance={{ theme: resolvedTheme === "dark" ? dark : undefined }}
    />
  );
};

export default SignUpForm;
