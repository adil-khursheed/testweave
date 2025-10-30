"use client";

import React from "react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { useTheme } from "next-themes";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import Logo from "@/components/logo";

const SidebarNavHeader = () => {
  const { resolvedTheme } = useTheme();
  const { open } = useSidebar();
  const params = useParams();

  return (
    <SidebarMenu className="gap-2">
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/${params?.org_slug}/${params?.project_slug}/dashboard`}>
            <Logo textClassName="text-base" />
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <OrganizationSwitcher
            hidePersonal={true}
            afterCreateOrganizationUrl={({ slug }) => `/${slug}/dashboard`}
            afterSelectOrganizationUrl={({ slug }) => `/${slug}/dashboard`}
            appearance={{
              theme: resolvedTheme === "dark" ? dark : undefined,
              elements: {
                rootBox: "w-full",
                organizationSwitcherTrigger: cn(
                  "cursor-pointer py-1.5",
                  open
                    ? "w-full justify-between"
                    : "w-7 ml-[5px] overflow-hidden"
                ),
              },
            }}
          />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarNavHeader;
