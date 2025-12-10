"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Clock, MapPin, Star, Calendar } from "lucide-react";
import Image from "next/image";
import { schoolData } from "../../data/schoolData";

// Direct image imports - make sure these images exist in your public folder
const extracurricularImages = {
  "rohis-hadroh": "/images/rohis.jpg",
  futsal: "/images/futsal.jpg",
  silat: "/images/silat.jpg",
  paskibra: "/images/paskibra.jpg",
  pmr: "/images/pmr.jpg",
  "tari-tradisional": "/images/tari.jpg",
};

export default function Extracurricular() {
  return (
    <section
      id="extracurricular"
      className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Ekstrakurikuler
          </h2>
          <p className="text-base sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            Temukan passion dan kembangkan bakat Anda melalui berbagai kegiatan
            ekstrakurikuler yang mendukung pengembangan karakter dan
            keterampilan
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {schoolData.extracurricular.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-sm hover:shadow-md sm:hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100 hover:border-blue-200">
                {/* Image Section */}
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={extracurricularImages[activity.id]}
                    alt={activity.name}
                    fill
                    className="object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 2}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Member Badge - Hidden on mobile, visible on tablet+ */}
                  {/* <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 flex items-center space-x-1">
                      <Users size={12} className="text-blue-600" />
                      <span className="text-xs sm:text-sm font-medium text-gray-900">
                        50+
                      </span>
                    </div>
                  </div> */}

                  {/* Activity Title */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 leading-tight">
                      {activity.name}
                    </h3>
                    {/* <div className="flex items-center text-white/90">
                      <Calendar size={12} className="mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm">
                        {activity.schedule.split(",")[0]}
                      </span>
                    </div> */}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed flex-1 line-clamp-3 sm:line-clamp-none">
                    {activity.description}
                  </p>

                  {/* Details Grid */}
                  {/* <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <Clock
                        size={14}
                        className="text-blue-600 mt-0.5 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                          Jadwal
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm break-words">
                          {activity.schedule}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <MapPin
                        size={14}
                        className="text-green-600 mt-0.5 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                          Lokasi
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm break-words">
                          {activity.location}
                        </p>
                      </div>
                    </div>
                  </div> */}

                  {/* Hidden on mobile, visible on tablet+ */}
                  {/* <div className="hidden sm:block">
                    <button className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 group/btn shadow hover:shadow-md">
                      <span className="text-sm">Lihat Detail</span>
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200"
                      />
                    </button>
                  </div> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section - Responsive Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
        >
          {[
            { number: "6", label: "Kegiatan", color: "text-blue-600" },
            { number: "243", label: "Siswa Aktif", color: "text-green-600" },
            { number: "5+", label: "Pelatih", color: "text-purple-600" },
            // { number: "50+", label: "Prestasi", color: "text-orange-600" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100"
            >
              <div
                className={`text-xl sm:text-2xl md:text-3xl font-bold ${stat.color} mb-1 sm:mb-2`}
              >
                {stat.number}
              </div>
              <div className="text-gray-600 text-xs sm:text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
