import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToastProvider from "@/components/toast/ToastProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Chatting App",
  description: "Chatting App with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
