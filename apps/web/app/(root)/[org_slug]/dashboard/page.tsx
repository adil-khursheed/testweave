import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  const { orgSlug } = await auth();

  return <div>Dashboard: {orgSlug}</div>;
};

export default Page;
