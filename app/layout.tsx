import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Header from "@/components/wrapper/Header";
import { Toaster } from "@/components/ui/toaster";
const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSI Admin dashboard ⚡",
  description: "Created with ❤️ by technical team 🚀🔥⚡",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}> <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header/>
            {children}
            <Toaster />
          </ThemeProvider></body>
    </html>
  );
}
