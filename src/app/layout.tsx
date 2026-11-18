import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DriveHub — Premium Car Rental in Dubai",
  description:
    "DriveHub is a premium car rental platform for Dubai and the UAE. Sports cars, luxury SUVs and honest economy rentals with transparent AED pricing, free delivery and 24/7 support.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen bg-ink text-cream font-sans flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
