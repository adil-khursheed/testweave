import React, { Suspense } from "react";
import Header from "@/components/header";
import SignUpForm from "../_components/signup-form";
import { Loader2Icon } from "lucide-react";

const Page = () => {
  return (
    <section className="w-full min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center">
        <Suspense fallback={<Loader2Icon className="size-7 animate-spin" />}>
          <SignUpForm />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
