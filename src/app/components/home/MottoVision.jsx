"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Star,
  Users,
  Shield,
  GraduationCap,
  Award,
} from "lucide-react";
import { schoolData } from "../../data/schoolData";

export default function MottoVision() {
  const values = [
    {
      icon: GraduationCap,
      title: "Pendidikan Berkualitas",
      description: "Pendidikan bermutu yang relevan dengan kebutuhan industri",
    },
    {
      icon: Users,
      title: "Karakter & Akhlak",
      description: "Membentuk pribadi berkarakter kuat dan berintegritas",
    },
    {
      icon: Shield,
      title: "Profesional & Mandiri",
      description: "Mengembangkan sikap profesional dan kemandirian",
    },
    {
      icon: Award,
      title: "Inovasi & Kreativitas",
      description: "Mendorong inovasi dan pemikiran kritis",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Visi & Misi</h2>

          {/* Motto */}
          <div className="max-w-2xl mx-auto mb-12">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Motto Sekolah
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              "{schoolData.motto}"
            </p>
          </div>
        </motion.div>

        {/* Vision & Mission Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Visi Sekolah</h3>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed">
                {schoolData.vision}
              </p>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Misi Sekolah</h3>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <ul className="space-y-3">
                {schoolData.mission.map((mission, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{mission}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Nilai-Nilai Kami
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fondasi yang membangun karakter unggul dan kesuksesan siswa
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors duration-300"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-gray-700" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-3">
                {value.title}
              </h4>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
