import React from "react";
import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <SignUp />
    </section>
  );
};

export default Page;
