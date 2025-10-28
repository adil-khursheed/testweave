import React from "react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import ThemeToggle from "./theme-toggle";

const Header = async () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span className="font-bold text-xl">TestWeave</span>
        </div>
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
      </div>
    </header>
  );
};

export default Header;
