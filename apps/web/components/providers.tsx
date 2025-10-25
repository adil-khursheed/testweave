"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import QueryProviders from "./query-providers";
import { Toaster } from "@workspace/ui/components/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProviders>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme>
        {children}
        <ToastProvider />
      </NextThemesProvider>
    </QueryProviders>
  );
}

function ToastProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      richColors
      closeButton
      position="top-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
