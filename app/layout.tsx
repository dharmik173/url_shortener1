import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Particles from "@/components/Particles";
import NavBar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "URL Shortener | Shorten & Share Links Instantly",
  description:
    "Shorten long URLs with ease using our simple and fast URL Shortener. Generate short, shareable links in seconds, track recent URLs, and copy with one click",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black relative`}
      >
        {/* Particles Background */}
        <div className="absolute inset-0 -z-10">
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={250}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={200}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        <NavBar />

        <main className="relative mt-16">{children}</main>
      </body>
    </html>
  );
}
