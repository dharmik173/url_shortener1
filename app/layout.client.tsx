"use client";

import { SessionProvider } from "next-auth/react";
import Particles from "@/components/Particles";
import NavBar from "@/components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SessionProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black h-screen overflow-hidden relative`}
        >
          {/* Particles Background */}
          <div className="absolute inset-0 -z-10 h-full w-full">
            <Particles
              particleColors={["#ffffff", "#ffffff"]}
              particleCount={250}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={200}
              moveParticlesOnHover
              alphaParticles={false}
              disableRotation={false}
            />
          </div>

          <NavBar />
          <main className="relative mt-16">{children}</main>
        </body>
      </SessionProvider>
    </Suspense>
  );
}
