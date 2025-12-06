import { Metadata } from "next";
import Layout from "./components/layout/Layout";
import Hero from "./components/home/Hero";
import Programs from "./components/home/Programs";
import MottoVision from "./components/home/MottoVision";
import Extracurricular from "./components/home/Extracurricular";
import Contact from "./components/home/Contact";
import PpdbSection from "./components/home/Ppdb";
import { schoolData } from "./data/schoolData";

export const metadata = {
  title: "SMK Informatika Ciputat - Sekolah Kejuruan Terdepan",
  description: `${schoolData.motto}. ${schoolData.vision}. Program keahlian: Multimedia, TKJ, OTKP.`,
  keywords:
    "SMK, Informatika, Ciputat, Sekolah Kejuruan, Multimedia, TKJ, OTKP, Pendidikan, PPDB",
  openGraph: {
    title: "SMK Informatika Ciputat - Sekolah Kejuruan Terdepan",
    description: schoolData.motto,
    images: ["/images/og-image.jpg"],
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: schoolData.name,
    description: metadata.description,
    url: "https://smkinformatika-ciputat.sch.id",
    logo: "https://smkinformatika-ciputat.sch.id/images/logo.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ciputat",
      addressRegion: "Banten",
      addressCountry: "ID",
    },
    telephone: schoolData.contact.phone,
    email: schoolData.contact.email,
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Layout>
        {/* Hero Section */}
        <section id="home">
          <Hero />
        </section>

        {/* Visi & Misi */}
        <section id="about" className="mx-6">
          <MottoVision />
        </section>

        {/* Program Keahlian */}
        <section id="programs" className="mx-6">
          <Programs />
        </section>

        {/* Ekstrakurikuler */}
        <section id="extracurricular" className="mx-6">
          <Extracurricular />
        </section>

        {/* PPDB Section - Tambahkan di sini */}
        <section id="ppdb" className="mx-6">
          <PpdbSection />
        </section>

        {/* Kontak */}
        <section id="contact">
          <Contact />
        </section>
      </Layout>
    </>
  );
}
