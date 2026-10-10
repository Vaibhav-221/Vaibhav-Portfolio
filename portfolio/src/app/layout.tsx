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
  title: "Vaibhav Singh | Full Stack Developer & Open Source Contributor",
  description:
    "Personal developer portfolio of Vaibhav Singh (CSE '29) featuring real-time web applications, AI integrations, GSSoC '26 top 1% open source contributions, and interactive macOS desktop UI.",
  keywords: [
    "Vaibhav Singh",
    "Portfolio",
    "Full Stack Developer",
    "Open Source",
    "GSSoC",
    "Next.js",
    "React",
    "FastAPI",
    "Tailwind CSS",
    "Firebase",
    "VBSPU",
  ],
  authors: [{ name: "Vaibhav Singh" }],
  openGraph: {
    title: "Vaibhav Singh | Full Stack Developer & Open Source Contributor",
    description:
      "Explore the work, projects, open-source milestones, and interactive desktop experience of Vaibhav Singh.",
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
