import "./globals.css";
import "toastr/build/toastr.css";
import { Metadata } from "next";
import Script from "next/script";
import { FCProps } from "@/lib/types";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: {
    template: "%s | M-Peague",
    default: "M-Peague",
  },
  description: "M-Peague",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/icon.png",
  }
};

export default async function RootLayout({ children }: FCProps) {
  return (
    <html lang="zh-Hans" className="scroll-smooth">
      <body>
        <div className="min-h-screen bg-white py-[20px] layoutBefore">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
      <Script src="toastr.js" />
    </html>
  );
}
