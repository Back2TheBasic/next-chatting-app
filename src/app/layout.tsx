import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import ToastProvider from "@/components/toast/ToastProvider";
import "./globals.css";
import Header from "@/layouts/header/Header";
import NavigationEvents from "@/components/navigation/NavigationEvents";
import Loader from "@/components/loader/Loader";

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
    // TODO: Loading을 여기에서 관리하는 방법!!
    <html lang="ko">
      <body className={inter.className}>
        <ToastProvider />
        {children}

        <Suspense fallback={<Loader />}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}
