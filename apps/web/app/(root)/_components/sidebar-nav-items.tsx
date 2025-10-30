"use client";

import React from "react";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { navMenuItems } from "@/lib/constants";
import { useParams, usePathname } from "next/navigation";

const SidebarNavItems = () => {
  const pathname = usePathname();
  const params = useParams();

  return (
    <SidebarMenu>
      {navMenuItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            tooltip={item.title}
            isActive={pathname === `/${params?.org_slug}/${item.url}`}>
            <Link href={`/${params?.org_slug}/${item.url}`}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default SidebarNavItems;
