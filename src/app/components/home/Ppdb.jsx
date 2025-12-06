"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  DollarSign,
  FileText,
  ChevronDown,
  ChevronRight,
  Phone,
  StepBack,
  StepForwardIcon,
} from "lucide-react";

export default function PpdbSection() {
  const registrationRequirements = [
    "Mengisi Formulir Pendaftaran",
    "FC Ijazah Legalisir 2 Lembar",
    "FC KTP orang tua 2 Lembar",
    "FC Kartu Keluarga 2 Lembar",
    "FC Akte Kelahiran 2 Lembar",
    "Pas Photo uk. (3X4) 2 Lembar",
    "Printout Nomor Induk Siswa Nasional (NISN)",
  ];

  const uniformItems = [
    "Seragam Kejuruan",
    "Baju Muslim",
    "Baju Olahraga (1 set)",
    "Kaos Kegiatan",
    "Name Tag Siswa (2 Putih + 1 Coklat)",
    "Topi Sekolah",
    "Dasi Sekolah",
    "Badge Sekolah",
    "Almamater Sekolah",
  ];

  const registrationSteps = [
    {
      step: 1,
      title: "Mengisi Formulir",
      description: "Calon peserta didik mengisi Formulir Pendaftaran",
      icon: "📝",
    },
    {
      step: 2,
      title: "Menyerahkan Berkas",
      description: "Menyerahkan berkas persyaratan yang diperlukan",
      icon: "📄",
    },
    {
      step: 3,
      title: "Melakukan Pembayaran",
      description: "Melakukan pembayaran biaya pendaftaran",
      icon: "💰",
    },
    {
      step: 4,
      title: "Verifikasi Data",
      description: "Panitia verifikasi data peserta didik",
      icon: "✅",
    },
    {
      step: 5,
      title: "Tes Masuk",
      description: "Calon peserta didik melaksanakan tes",
      icon: "✏️",
    },
    {
      step: 6,
      title: "Diterima",
      description: "Calon peserta didik diterima",
      icon: "🎉",
    },
  ];

  const [expandedSections, setExpandedSections] = useState({
    requirements: false,
    uniform: false,
    steps: false,
  });

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Function untuk check window size
    const checkWindowSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Initial check
    checkWindowSize();

    // Add event listener untuk resize
    window.addEventListener("resize", checkWindowSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkWindowSize);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="ppdb"
      className="py-12 md:py-20 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white text-sm font-semibold mb-3 md:mb-4">
            PPDB
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Penerimaan Peserta Didik Baru
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah bersama SMK Informatika Ciputat dan raih masa depan
            gemilang
          </p>
        </div>

        {/* Mobile Accordion Sections */}
        <div className="md:hidden space-y-4 mb-8">
          {/* Persyaratan Pendaftaran - Mobile Accordion */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <button
              onClick={() => toggleSection("requirements")}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    Persyaratan Pendaftaran
                  </h3>
                  <p className="text-sm text-gray-500">7 item persyaratan</p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedSections.requirements ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSections.requirements && (
              <div className="px-5 pb-5">
                <div className="space-y-3">
                  {registrationRequirements.map((requirement, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-blue-50 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">
                        {requirement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Biaya Seragam - Mobile Accordion */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <button
              onClick={() => toggleSection("uniform")}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Paket Seragam</h3>
                  <p className="text-sm text-gray-500">Rp 1.800.000</p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedSections.uniform ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSections.uniform && (
              <div className="px-5 pb-5">
                {/* Price Display */}
                <div className="text-center p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white mb-4">
                  <div className="text-xl font-bold">Rp 1.800.000</div>
                  <div className="text-xs opacity-90">Paket Lengkap 9 Item</div>
                </div>

                {/* Uniform Items Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {uniformItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 bg-gray-50 rounded-lg"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-xs">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="font-semibold text-yellow-800 text-sm mb-1">
                      Ketentuan:
                    </p>
                    <ul className="text-xs text-yellow-700 space-y-1">
                      <li>• Pembayaran di loket sekolah atau Bank BTN</li>
                      <li>• No. Rek: 00303-01-50-000971-8</li>
                      <li>• a/n Yayasan Musal Mandiri</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-semibold text-blue-800 text-sm">
                      Ukuran: M - 2XL
                    </p>
                    <p className="text-blue-700 text-xs mt-1">
                      Diluar ukuran +Rp 50.000/seragam
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid lg:grid-cols-5 gap-6 mb-12">
          {/* Persyaratan Pendaftaran */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Persyaratan Pendaftaran
                </h3>
              </div>

              <div className="space-y-3">
                {registrationRequirements.map((requirement, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Biaya Seragam */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Paket Seragam
                </h3>
              </div>

              <div className="mb-6">
                <div className="text-center p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white">
                  <div className="text-2xl font-bold">Rp 1.800.000</div>
                  <div className="text-sm opacity-90 mt-1">
                    Paket Lengkap 9 Item
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {uniformItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="font-semibold text-yellow-800 text-sm mb-1">
                    Ketentuan:
                  </p>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    <li>• Pembayaran di loket sekolah atau Bank BTN</li>
                    <li>• No. Rek: 00303-01-50-000971-8</li>
                    <li>• a/n Yayasan Musal Mandiri</li>
                  </ul>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-semibold text-blue-800 text-sm">
                    Ukuran: M - 2XL
                  </p>
                  <p className="text-blue-700 text-xs mt-1">
                    Diluar ukuran +Rp 50.000/seragam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alur Pendaftaran */}
        <div className="mb-10 md:mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg md:rounded-xl flex items-center justify-center mr-3 md:mr-4">
                  <StepForwardIcon />
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900">
                  Alur Pendaftaran
                </h3>
              </div>

              <button
                onClick={() => toggleSection("steps")}
                className="md:hidden"
              >
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedSections.steps ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {(expandedSections.steps || isDesktop) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Mobile Carousel Style */}
                <div className="md:hidden overflow-x-auto pb-4 -mx-2 p-2">
                  <div
                    className="flex space-x-4"
                    style={{ minWidth: "max-content" }}
                  >
                    {registrationSteps.map((step) => (
                      <div
                        key={step.step}
                        className="min-w-[200px] text-center p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white relative flex-shrink-0"
                      >
                        <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                          {step.step}
                        </div>
                        <div className="text-2xl mb-2">{step.icon}</div>
                        <h4 className="font-bold text-sm mb-1">{step.title}</h4>
                        <p className="text-blue-100 text-xs">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {registrationSteps.map((step) => (
                    <div
                      key={step.step}
                      className="text-center p-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white relative hover:scale-[1.02] transition-transform duration-200"
                    >
                      <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                        {step.step}
                      </div>
                      <div className="text-2xl mb-3">{step.icon}</div>
                      <h4 className="font-bold text-base mb-2">{step.title}</h4>
                      <p className="text-blue-100 text-sm">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
