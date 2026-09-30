import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import { Preloader } from "@/components/ui/Preloader";
import { PRELOADER_SEEN_KEY } from "@/lib/preloader";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geist.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Hide the intro preloader before first paint for returning visitors. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("${PRELOADER_SEEN_KEY}")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.preloaderSkip=""}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Preloader />
        <SmoothScroll />
        <CustomCursor />
        <Navbar />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}
