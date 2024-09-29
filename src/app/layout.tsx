import type { Metadata } from "next"; 
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
      <body>{children}</body>
    </html>
  );
}
