import localFont from "next/font/local";
import "./globals.css";


// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/react";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "hi hbd.",
  description: "nullable",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <NextUIProvider>
          {children}
          </NextUIProvider>
      </body>
    </html>
  );
}
