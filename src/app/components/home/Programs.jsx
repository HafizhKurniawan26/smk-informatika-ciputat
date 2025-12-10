"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Users,
  Target,
  PlayCircle,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
import { schoolData } from "../../data/schoolData";
import Image from "next/image";

export default function Programs() {
  const programs = Object.values(schoolData.programs);
  const [expandedProgram, setExpandedProgram] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const programImages = {
    multimedia: "/images/programs/mm.jpg",
    tkj: "/images/programs/tkj.jpg",
    otkp: "/images/programs/otkp.jpg",
  };

  const stats = [
    {
      number: "3",
      label: "Program Keahlian",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      number: "243",
      label: "Siswa Aktif",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    // {
    //   number: "95%",
    //   label: "Tingkat Kelulusan",
    //   icon: Target,
    //   color: "text-purple-600",
    //   bgColor: "bg-purple-50",
    // },
  ];

  useEffect(() => {
    // Cek apakah kita di client-side
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleProgram = (id) => {
    if (isMobile) {
      setExpandedProgram(expandedProgram === id ? null : id);
    }
  };

  return (
    <section
      id="programs"
      className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full text-white text-sm font-semibold mb-4">
            Program Unggulan
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Pilih <span className="text-purple-600">Jurusan Impian</span> Anda
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kembangkan bakat dan persiapkan karir gemilang dengan program
            keahlian terbaik kami
          </p>
        </motion.div>

        {/* Filter Tabs (Mobile) */}
        {isMobile && (
          <div className="flex overflow-x-auto mb-8 gap-2 pb-2">
            {programs.map((program) => (
              <button
                key={program.id}
                onClick={() => toggleProgram(program.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm ${
                  expandedProgram === program.id
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {program.name}
              </button>
            ))}
          </div>
        )}

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl overflow-hidden border ${
                expandedProgram === program.id && isMobile
                  ? "ring-2 ring-purple-500 shadow-xl"
                  : "border-gray-200 shadow-sm hover:shadow-lg"
              } transition-all duration-300 bg-white`}
            >
              {/* Program Header */}
              <div
                className="relative cursor-pointer"
                onClick={() => toggleProgram(program.id)}
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={
                      programImages[program.id] ||
                      "/images/programs/default.jpg"
                    }
                    alt={program.name}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {program.name}
                      </h3>
                      <p className="text-white/90 text-sm mt-1 line-clamp-1">
                        {program.description.split(".")[0]}
                      </p>
                    </div>
                    {isMobile && (
                      <ChevronDown
                        className={`w-5 h-5 text-white transition-transform duration-300 ${
                          expandedProgram === program.id ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                </div>

                {/* Color Accent */}
                <div
                  className={`h-1 w-full ${program.color.replace(
                    "text",
                    "bg"
                  )}`}
                ></div>
              </div>

              {/* Program Content */}
              <AnimatePresence>
                {/* Show always on desktop, conditionally on mobile */}
                {(!isMobile || expandedProgram === program.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-5"
                  >
                    {/* Description */}
                    <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                      {program.description}
                    </p>

                    {/* Career Prospects */}
                    <div className="mb-5">
                      <div className="flex items-center mb-3">
                        <Target className="w-4 h-4 text-green-600 mr-2" />
                        <h4 className="font-semibold text-gray-900 text-sm">
                          Prospek Karir
                        </h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {program.careerProspects
                          .slice(0, 4)
                          .map((prospect, idx) => (
                            <div key={idx} className="flex items-center">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                              <span className="text-xs text-gray-600 line-clamp-1">
                                {prospect}
                              </span>
                            </div>
                          ))}
                        {program.careerProspects.length > 4 && (
                          <div className="text-xs text-gray-500 col-span-2 mt-1">
                            +{program.careerProspects.length - 4} karir lainnya
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Key Subjects */}
                    <div>
                      <div className="flex items-center mb-3">
                        <BookOpen className="w-4 h-4 text-blue-600 mr-2" />
                        <h4 className="font-semibold text-gray-900 text-sm">
                          Materi Utama
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {program.subjects.slice(0, 4).map((subject, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() =>
                        document
                          .getElementById("ppdb")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className={`w-full mt-6 py-2.5 rounded-lg font-semibold text-white text-sm ${program.color.replace(
                        "text",
                        "bg"
                      )} hover:opacity-90 transition-all duration-200`}
                    >
                      Daftar {program.name}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-6 md:p-8 shadow-xl"
        >
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/90 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
