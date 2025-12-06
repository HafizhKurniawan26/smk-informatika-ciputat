"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { schoolData } from "../../data/schoolData";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Program Keahlian", href: "/#programs" },
    { name: "Visi & Misi", href: "/#about" },
    { name: "Ekstrakurikuler", href: "/#extracurricular" },
    { name: "Kontak", href: "/#contact" },
    { name: "Layanan Pengaduan", href: "/complaint" },
  ];

  const programs = Object.values(schoolData.programs).map((program) => ({
    name: program.name,
    href: `/#programs`,
  }));

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Link
                href="/"
                className="flex items-center space-x-3 group"
                onClick={() => {}}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                  <Image
                    src="/logo.png"
                    alt="Logo SMK Informatika Ciputat"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                </div>
                <div className="sm:block">
                  <h1
                    className={`font-bold leading-tight transition-all duration-300 text-lg`}
                  >
                    SMK INFORMATIKA
                  </h1>
                  <p
                    className={`leading-tight transition-all duration-300 text-xs`}
                  >
                    Ciputat
                  </p>
                </div>
              </Link>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {schoolData.motto}. {schoolData.vision}
            </p>

            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin size={18} className="mr-3 text-blue-400" />
                <span className="text-sm">{schoolData.contact.address}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone size={18} className="mr-3 text-blue-400" />
                <span className="text-sm">{schoolData.contact.phone}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail size={18} className="mr-3 text-blue-400" />
                <span className="text-sm">{schoolData.contact.email}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Tautan Cepat</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center"
                  >
                    {link.name}
                    <ExternalLink size={14} className="ml-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Program Keahlian</h4>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program.name}>
                  <button
                    onClick={() => {
                      const element = document.getElementById("programs");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-gray-300 text-left hover:text-white transition-colors duration-200 text-sm flex items-center"
                  >
                    {program.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} SMK Informatika Ciputat. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Disiplin, Berkarakter dan Mandiri
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
