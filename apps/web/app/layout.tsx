import { Aoboshi_One, Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const fontSerif = Aoboshi_One({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "TestWeave | AI-Powered Quality Assurance Automation",
    template: "TestWeave | %s",
  },
  description:
    "TestWeave helps you automate your QA process with advanced AI.Save time, reduce errors, and ship with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${fontSans.variable} ${fontMono.variable} ${fontSerif.variable} font-sans antialiased `}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
