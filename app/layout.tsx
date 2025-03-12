import type { Metadata } from "next";
import ClientLayout from "./layout.client";
import "./globals.css";

export const metadata: Metadata = {
  title: "URL Shortener | Shorten & Share Links Instantly",
  description:
    "Shorten long URLs with ease using our simple and fast URL Shortener. Generate short, shareable links in seconds, track recent URLs, and copy with one click",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}
