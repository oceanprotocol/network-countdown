import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Network Countdown",
  description: "The Ocean Network is powering ON. Countdown to launch and key milestones.",
  openGraph: {
    title: "Network Countdown",
    description: "The Ocean Network is powering ON. Countdown to launch and key milestones.",
    images: ["/Ocean Network Logo - Black.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Network Countdown",
    description: "The Ocean Network is powering ON. Countdown to launch and key milestones.",
    images: ["/Ocean Network Logo - Black.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
