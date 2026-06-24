import type { Metadata } from "next";
import { ppMori } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cityrr. — City runs from transit to breakfast",
  description:
    "Discover urban running routes from 5K to 20K. Start at a public transport stop, run the city, finish at breakfast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ppMori.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
