"use client";

import React from "react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { useTheme } from "next-themes";
import { cn } from "@workspace/ui/lib/utils";

const SidebarNavHeader = () => {
  const { resolvedTheme } = useTheme();
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <OrganizationSwitcher
          hidePersonal={true}
          afterCreateOrganizationUrl={({ slug }) => `/${slug}/dashboard`}
          afterSelectOrganizationUrl={({ slug }) => `/${slug}/dashboard`}
          appearance={{
            theme: resolvedTheme === "dark" ? dark : undefined,
            elements: {
              rootBox: "w-full h-12",
              organizationSwitcherTrigger: cn(
                "cursor-pointer",
                open ? "w-full justify-between" : "w-7 ml-[5px] overflow-hidden"
              ),
            },
          }}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarNavHeader;
