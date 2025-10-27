"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

import ThemeToggle from "@/components/theme-toggle";

import { cn } from "@workspace/ui/lib/utils";
import { useSidebar } from "@workspace/ui/components/sidebar";

const SidebarNavFooter = () => {
  const { resolvedTheme } = useTheme();
  const { open } = useSidebar();
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full",
        open ? "flex-row" : "flex-col-reverse gap-4"
      )}>
      <UserButton
        appearance={{
          theme: resolvedTheme === "dark" ? dark : undefined,
        }}
      />
      <ThemeToggle />
    </div>
  );
};

export default SidebarNavFooter;
