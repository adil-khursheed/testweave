import React from "react";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <SignIn />
    </section>
  );
};

export default SignInPage;
