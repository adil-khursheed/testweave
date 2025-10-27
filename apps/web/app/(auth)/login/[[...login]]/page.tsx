import React, { Suspense } from "react";
import Header from "@/components/header";
import SignInForm from "../_components/signin-form";

const SignInPage = () => {
  return (
    <section className="w-full min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center">
        <Suspense>
          <SignInForm />
        </Suspense>
      </div>
    </section>
  );
};

export default SignInPage;
