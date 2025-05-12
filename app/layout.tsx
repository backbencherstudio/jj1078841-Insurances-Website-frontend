import type { Metadata } from "next";
 import './globals.css'
import { AppConfig } from "@/config/app.config";
import Navbar from "./_components/reusable/Navbar";
import Footer from "./_components/reusable/Footer";

export const metadata: Metadata = {
  title: AppConfig().app.name,
  description: AppConfig().app.slogan,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
