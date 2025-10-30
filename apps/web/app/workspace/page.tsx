import React from "react";
import CreateOrganizationClient from "@/components/create-organization-client";
import Header from "@/components/header";

const Page = () => {
  return (
    <section className="w-full min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center">
        <CreateOrganizationClient afterCreateOrganizationUrl="/project/create" />
      </div>
    </section>
  );
};

export default Page;
