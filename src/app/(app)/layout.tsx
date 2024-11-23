import type { Metadata } from "next";
import "./globals.css";

import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "PlanMaster",
  description: "An App to Plan your goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <Navbar />
          <ChakraProvider>{children}</ChakraProvider>

          <Toaster />
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
