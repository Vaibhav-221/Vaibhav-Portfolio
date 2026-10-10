import type { Metadata, Viewport } from "next";
import { Oswald, Bubblegum_Sans, Coiny } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bubblegum = Bubblegum_Sans({
  variable: "--font-bubblegum",
  subsets: ["latin"],
  weight: ["400"],
});

const coiny = Coiny({
  variable: "--font-coiny",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Aditya Chauhan Portfolio",
  description: "Web Developer and Designer Portfolio with interactive macOS desktop experience",
  keywords: ["Aditya Chauhan", "Portfolio", "Web Developer", "Designer", "Full Stack", "React", "Next.js", "Laravel"],
  authors: [{ name: "Aditya Chauhan" }],
  openGraph: {
    title: "Aditya Chauhan Portfolio",
    description: "Web Developer and Designer Portfolio with interactive macOS desktop experience",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${bubblegum.variable} ${coiny.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
