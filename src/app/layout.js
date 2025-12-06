import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: {
    default: "SMK Informatika Ciputat - Sekolah Kejuruan Terdepan",
    template: "%s | SMK Informatika Ciputat",
  },
  description:
    "SMK Informatika Ciputat - Sekolah kejuruan terbaik dengan program Multimedia, TKJ, dan OTKP. Menciptakan generasi unggul yang berkarakter, cerdas, dan mandiri.",
  keywords:
    "SMK, Informatika, Ciputat, Sekolah Kejuruan, Multimedia, TKJ, OTKP, Pendidikan, Sekolah Teknik",
  authors: [{ name: "SMK Informatika Ciputat" }],
  metadataBase: new URL("https://smkinformatika-ciputat.sch.id"),
  openGraph: {
    title: "SMK Informatika Ciputat - Sekolah Kejuruan Terdepan",
    description:
      "Sekolah kejuruan terbaik dengan program Multimedia, TKJ, dan OTKP.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <title>SMK Informatika Ciputat</title>
      </head>

      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
