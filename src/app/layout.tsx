import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/components/CartProvider";
import { ExtraFeaturesProvider } from "@/components/ExtraFeaturesProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solar Clean & Mushroom Packaging E-Commerce",
  description: "Premium portal for specialized Solar Clean equipment and eco-friendly Mushroom Packaging solutions.",
  manifest: "/manifest.json",
};

import Footer from "@/components/Footer";
import FloatingFeatures from "@/components/FloatingFeatures";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <CartProvider>
              <ExtraFeaturesProvider>
                {children}
                <FloatingFeatures />
                <Footer />
              </ExtraFeaturesProvider>
            </CartProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

