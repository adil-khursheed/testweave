import React from "react";
import { auth } from "@clerk/nextjs/server";

const Page = async () => {
  const { orgSlug, orgId } = await auth();

  return (
    <div>
      Dashboard: {orgSlug} {orgId}
    </div>
  );
};

export default Page;
