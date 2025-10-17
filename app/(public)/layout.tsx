"use client";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {" "}
      <head>
        {" "}
        <ColorSchemeScript />{" "}
      </head>{" "}
      <body>
        {" "}
        <ThemeProvider attribute="class" defaultTheme="light">
          {" "}
          <MantineProvider>
            {" "}
            <Header /> <main>{children}</main> <Footer />{" "}
          </MantineProvider>{" "}
        </ThemeProvider>{" "}
      </body>{" "}
    </html>
  );
}
