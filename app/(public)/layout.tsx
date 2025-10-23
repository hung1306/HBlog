"use client";

import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer";
import "@/app/global.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>My App</title>
        <meta name="description" content="A Next.js app without Mantine" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
