"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  Users,
  BookOpen,
  Award,
  Star,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Siswa Aktif",
      color: "text-yellow-300",
    },
    {
      icon: BookOpen,
      number: "3",
      label: "Program Keahlian",
      color: "text-blue-300",
    },
    {
      icon: Award,
      number: "6+",
      label: "Ekstrakurikuler",
      color: "text-purple-300",
    },
    {
      icon: Users,
      number: "50+",
      label: "Guru Berpengalaman",
      color: "text-green-300",
    },
  ];

  return (
    <section
      id="home"
      className="pt-20 pb-12 lg:pt-2 lg:pb-2 relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_70%)] opacity-10"></div>
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Sparkles className="w-6 h-6 text-yellow-300/50" />
      </div>
      <div
        className="absolute bottom-20 right-10 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <Sparkles className="w-6 h-6 text-blue-300/50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">
                Sekolah Kejuruan Terbaik di Ciputat
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              SMK
              <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                INFORMATIKA
              </span>
              <span className="text-xl sm:text-2xl opacity-90">CIPUTAT</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Membentuk Generasi Unggul yang{" "}
              <span className="font-semibold text-yellow-300">
                Berkarakter, Cerdas, dan Siap Kerja
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="#ppdb"
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
                >
                  <span>Daftar Sekarang</span>
                  <ChevronRight className="ml-2" size={20} />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="#programs"
                  className="inline-flex items-center justify-center w-full border-2 border-white/50 bg-white/10 backdrop-blur-sm px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-white/20 transition-all duration-300"
                >
                  Lihat Program
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 md:gap-6"
          >
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <item.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-yellow-300" />
                <div className="text-2xl md:text-3xl font-bold mb-1">
                  {item.number}
                </div>
                <div className="text-xs md:text-sm opacity-90">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() =>
          document
            .getElementById("programs")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <div className="flex flex-col items-center">
          <span className="text-sm opacity-70 mb-2">
            Scroll untuk eksplorasi
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-1"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
