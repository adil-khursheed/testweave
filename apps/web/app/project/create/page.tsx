import React from "react";
import Header from "@/components/header";
import { Card } from "@workspace/ui/components/card";

const Page = () => {
  return (
    <section className="w-full min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center">
        <Card></Card>
      </div>
    </section>
  );
};

export default Page;
