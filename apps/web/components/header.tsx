import React, { Suspense } from "react";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import ThemeToggle from "./theme-toggle";
import Logo from "./logo";
import UserButtonClient from "./user-button-client";

import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";

const Header = async () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        <SignedOut>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link
              href="/features"
              className="font-medium text-muted-foreground transition-colors hover:text-primary">
              Features
            </Link>
            <Link
              href="/pricing"
              className="font-medium text-muted-foreground transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link
              href="/docs"
              className="font-medium text-muted-foreground transition-colors hover:text-primary">
              Documentation
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Button asChild variant="outline">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Start Testing</Link>
            </Button>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Suspense fallback={<Skeleton className="size-6 rounded-full" />}>
              <UserButtonClient />
            </Suspense>
          </div>
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
