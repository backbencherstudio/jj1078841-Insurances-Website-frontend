import type { Metadata } from "next";
import "./globals.css";
import { AppConfig } from "@/config/app.config";
import { ReduxProvider } from "@/src/redux/provider";
import { Toaster } from "sonner";
import { UserProvider } from "./_components/reusable/UserProvider";

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
        <ReduxProvider>
          <UserProvider >
            {children}
          </UserProvider>
        </ReduxProvider>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}