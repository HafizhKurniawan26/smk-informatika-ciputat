"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Clock, MessageCircle } from "lucide-react";
import { schoolData } from "../../data/schoolData";

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      label: "Alamat",
      value: schoolData.contact.address,
      color: "text-blue-600",
      link: schoolData.contact.mapUrl,
    },
    {
      icon: Phone,
      label: "Telepon",
      value: schoolData.contact.phone,
      color: "text-green-600",
      link: `tel:${schoolData.contact.phone}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: schoolData.contact.email,
      color: "text-purple-600",
      link: `mailto:${schoolData.contact.email}`,
    },
    {
      icon: Globe,
      label: "Website",
      value: schoolData.contact.website.replace("https://", ""),
      color: "text-orange-600",
      link: schoolData.contact.website,
    },
  ];

  const operatingHours = [
    { day: "Senin - Jumat", hours: "07:00 - 16:00 WIB" },
    { day: "Sabtu", hours: "08:00 - 14:00 WIB" },
    { day: "Minggu", hours: "Tutup", closed: true },
  ];

  return (
    <section id="contact" className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Hubungi Kami
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Mari berdiskusi tentang masa depan pendidikan Anda. Tim kami siap
            membantu mewujudkan impian Anda.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:gap-8 xl:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-1/2 mb-8 lg:mb-0 space-y-6 sm:space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.link}
                  target={contact.link.startsWith("http") ? "_blank" : "_self"}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="block group col-span-1"
                >
                  <div className="flex items-center p-4 sm:p-5 md:p-6 border border-gray-200 rounded-xl sm:rounded-2xl hover:border-blue-300 hover:shadow-sm sm:hover:shadow-md transition-all duration-300 h-full">
                    <div
                      className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 mr-3 sm:mr-4 group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}
                    >
                      <contact.icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${contact.color}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 truncate">
                        {contact.label}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm truncate">
                        {contact.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-blue-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-blue-200"
            >
              <div className="flex items-center mb-3">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Butuh Respons Cepat?
                </h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mb-4">
                Hubungi kami via WhatsApp untuk informasi lebih lanjut
              </p>
              <motion.a
                href={`https://wa.me/${schoolData.contact.phone.replace(
                  /[^0-9]/g,
                  ""
                )}?text=Halo, saya ingin informasi tentang SMK Informatika Ciputat`}
                target="_blank"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center bg-green-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:bg-green-700 transition-colors duration-200 w-full sm:w-auto justify-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                <span className="text-sm sm:text-base">Chat WhatsApp</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Operating Hours & Location */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-1/2 space-y-6 sm:space-y-8"
          >
            {/* Operating Hours */}
            <div className="border border-gray-200 rounded-xl sm:rounded-2xl p-5 sm:p-6">
              <div className="flex items-center mb-5 sm:mb-6">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Jam Operasional
                </h3>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {operatingHours.map((schedule, index) => (
                  <motion.div
                    key={schedule.day}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <span
                      className={`font-medium text-sm sm:text-base ${
                        schedule.closed ? "text-gray-500" : "text-gray-700"
                      }`}
                    >
                      {schedule.day}
                    </span>
                    <span
                      className={`font-medium text-sm sm:text-base ${
                        schedule.closed ? "text-red-500" : "text-gray-900"
                      }`}
                    >
                      {schedule.hours}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="border border-gray-200 rounded-xl sm:rounded-2xl p-5 sm:p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 mr-3" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Lokasi Kampus
                </h3>
              </div>

              <div className="bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.796751783305!2d106.74340907429982!3d-6.2904235615677315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f01641cf42c1%3A0x74afca73b40a7311!2sSMK%20Informatika%20Ciputat!5e0!3m2!1sid!2sid!4v1763223637373!5m2!1sid!2sid"
                  width="100%"
                  height="250"
                  className="w-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi SMK Informatika Ciputat"
                ></iframe>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm mb-3">
                {schoolData.contact.address}
              </p>

              <motion.a
                href={schoolData.contact.mapUrl}
                target="_blank"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base mt-2"
              >
                <span>Buka di Google Maps</span>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
