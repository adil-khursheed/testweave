"use client";

import React from "react";
import ThemeToggle from "@/components/theme-toggle";
import { UserButton } from "@clerk/nextjs";
import { useSidebar } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";

const SidebarNavFooter = () => {
  const { open } = useSidebar();
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full",
        open ? "flex-row" : "flex-col-reverse gap-4"
      )}>
      <UserButton />
      <ThemeToggle />
    </div>
  );
};

export default SidebarNavFooter;
