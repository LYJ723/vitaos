import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VITAOS - 인생 운영체제",
  description: "당신의 삶에 운영체제를 설치하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${playfair.variable} ${notoSans.variable} ${inter.variable}`}>
      <body className="antialiased body">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
