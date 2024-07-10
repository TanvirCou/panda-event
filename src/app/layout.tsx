import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import {ClerkProvider} from '@clerk/nextjs'
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ['100', '300', '400', '500', '700', '900'] });

export const metadata: Metadata = {
  title: "Panda Event",
  description: "This is an event management web apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
