import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sentinel API Command",
  description: "Bilingual REST API command console for mock enterprise integrations.",
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
