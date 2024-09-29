import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
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
          {children}

          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
