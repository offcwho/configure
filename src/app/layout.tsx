import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import ConfigProviders from "@/components/providers/config.providers";
import { Header, HeaderMenu } from "@/entities/header";
import { Search } from "@/entities/search";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Мой сайт",
  description: "Описание сайта",
  openGraph: {
    title: "OG Title",
    description: "OG Description",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} antialiased font-(var(--font-rubik))`}
      >
        <ConfigProviders>
          <div className="wrapper">
            {children}
          </div>
        </ConfigProviders>
      </body>
    </html>
  );
}
