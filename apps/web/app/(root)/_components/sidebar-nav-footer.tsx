"use client";

import React from "react";

import ThemeToggle from "@/components/theme-toggle";
import UserButtonClient from "@/components/user-button-client";

import { cn } from "@workspace/ui/lib/utils";
import { SidebarMenu, useSidebar } from "@workspace/ui/components/sidebar";

const SidebarNavFooter = () => {
  const { open } = useSidebar();
  return (
    <SidebarMenu
      className={cn(
        "flex items-center justify-between w-full",
        open ? "flex-row" : "flex-col-reverse gap-4"
      )}>
      <UserButtonClient />
      <ThemeToggle />
    </SidebarMenu>
  );
};

export default SidebarNavFooter;
