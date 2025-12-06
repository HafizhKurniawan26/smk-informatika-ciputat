import { Metadata } from "next";
import Layout from "../../../components/layout/Layout";
import ComplaintList from "../../../components/complaint/ComplaintList";
import { ArrowLeft, MessageCircle, Shield } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Daftar Pengaduan - SMK Informatika Ciputat",
  description:
    "Lihat daftar pengaduan yang telah diajukan ke SMK Informatika Ciputat",
};

export default function ComplaintsListPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Daftar Pengaduan SMK Informatika Ciputat",
    description: "Lihat daftar pengaduan dan tanggapan admin",
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
        <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4">
            {/* Header Section yang Lengkap */}
            <div className="text-center mb-12">
              {/* Icon dan Judul Utama */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Daftar Pengaduan
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Lihat semua pengaduan yang telah diajukan ke SMK Informatika
                Ciputat. Setiap pengaduan akan mendapatkan tanggapan dari admin.
              </p>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/complaint"
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Buat Pengaduan Baru</span>
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-6 py-3 rounded-xl font-semibold border border-gray-300 hover:border-gray-400 transition-colors duration-200"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Kembali ke Beranda</span>
                </Link>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Informasi Pengaduan
                  </h3>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>
                      • Pengaduan dengan status{" "}
                      <span className="font-semibold">"Selesai"</span> telah
                      mendapatkan tanggapan dari admin
                    </li>
                    <li>
                      • Pengaduan{" "}
                      <span className="font-semibold">"Dalam Proses"</span>{" "}
                      sedang ditindaklanjuti
                    </li>
                    <li>
                      • Pengaduan{" "}
                      <span className="font-semibold">"Pending"</span> menunggu
                      untuk diproses
                    </li>
                    <li>
                      • Gunakan fitur pencarian dan filter untuk menemukan
                      pengaduan tertentu
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Complaint List Component */}
            <ComplaintList />
          </div>
        </div>
      </Layout>
    </>
  );
}
