"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, List, Shield, Menu, X, Home } from "lucide-react";
import Link from "next/link";
import ComplaintForm from "./ComplaintForm";
import ComplaintList from "./ComplaintList";
import ComplaintAdmin from "./ComplaintAdmin";

const ComplaintSystem = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabs = [
    {
      id: "create",
      name: "Buat Pengaduan",
      icon: MessageCircle,
      description: "Ajukan pengaduan baru",
    },
    {
      id: "list",
      name: "Daftar Pengaduan",
      icon: List,
      description: "Lihat semua pengaduan",
    },
    {
      id: "admin",
      name: "Admin",
      icon: Shield,
      description: "Kelola pengaduan",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "create":
        return <ComplaintForm />;
      case "list":
        return <ComplaintList />;
      case "admin":
        return <ComplaintAdmin />;
      default:
        return <ComplaintForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header untuk Mobile */}
      {/* <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white"
        } lg:hidden`}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">
                  Sistem Pengaduan
                </h1>
                <p className="text-xs text-gray-500">SMK Informatika</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg"
              >
                <Home className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header> */}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 w-full p-4 rounded-xl text-left ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{tab.name}</div>
                        <div
                          className={`text-sm ${
                            isActive ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {tab.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 p-3 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  <span>Kembali ke Beranda</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content dengan padding untuk header mobile */}
      <div className="pt-24 lg:pt-8 pb-16 lg:pb-8">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Desktop Header */}
          <div className="lg:block text-center mb-8 md:mt-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
              <MessageCircle className="w-8 h-8 text-blue-600" />
            </div>

            <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-3">
              Sistem Pengaduan
            </h1>
            <p className="text-md lg:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Sampaikan pengaduan, lihat status, dan kelola keluhan dengan
              sistem terintegrasi.
            </p>
          </div>

          {/* Desktop Tabs Navigation */}
          <div className="hidden lg:block bg-white rounded-xl shadow-lg p-2 mb-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-2" />
                    <span className="font-medium text-sm">{tab.name}</span>
                    <span
                      className={`text-xs mt-1 ${
                        isActive ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {tab.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40 lg:hidden">
            <div className="grid grid-cols-3 gap-1 p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="pb-16 lg:pb-0"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintSystem;
