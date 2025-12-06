import { Metadata } from "next";
import Layout from "../../components/layout/Layout";
import ComplaintSystem from "../../components/complaint/ComplaintSystem";

export const metadata = {
  title: "Sistem Pengaduan - SMK Informatika Ciputat",
  description:
    "Buat, lihat, dan kelola pengaduan untuk SMK Informatika Ciputat",
};

export default function ComplaintPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Sistem Pengaduan SMK Informatika Ciputat",
    description: "Layanan pengaduan terintegrasi dengan fitur lengkap",
    provider: {
      "@type": "EducationalOrganization",
      name: "SMK Informatika Ciputat",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Layout>
        <ComplaintSystem />
      </Layout>
    </>
  );
}
