import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Collabs",
  description: "Your one-stop collaboration app for your team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${albertSans.className} antialiased`}
      >
        {children}
        <Toaster richColors   />
      </body>
    </html>
  );
}
