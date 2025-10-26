import React from "react";
import { CreateOrganization } from "@clerk/nextjs";

const Page = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <CreateOrganization />
    </section>
  );
};

export default Page;
