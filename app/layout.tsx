import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "SquareUp",
  description: "SquareUp landing page with shared navigation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} h-full antialiased` }
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground "
      >
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
