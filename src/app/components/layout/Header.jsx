"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import Image from "next/image";
import LogoImage from "../../../../public/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    setIsAdmin(!!auth);
  }, []);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Only update active section on homepage
      if (isHomePage) {
        const sections = [
          "home",
          "programs",
          "about",
          "extracurricular",
          "contact",
        ];
        const currentSection = sections.find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });

        if (currentSection) {
          setActiveSection(currentSection);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const navigation = [
    { name: "Beranda", href: "/", id: "home" }, // Changed to root path
    { name: "Visi & Misi", href: "/#about", id: "about" },
    { name: "Program", href: "/#programs", id: "programs" },
    {
      name: "Ekstrakurikuler",
      href: "/#extracurricular",
      id: "extracurricular",
    },
    { name: "PPDB", href: "/#ppdb", id: "ppdb" },
    { name: "Kontak", href: "/#contact", id: "contact" },
    { name: "Pengaduan", href: "/complaint", id: "complaint" },
  ];

  const handleNavClick = (href, id, isHashLink = false) => {
    if (isHashLink && isHomePage) {
      // Only smooth scroll on homepage for hash links
      const elementId = href.replace("/#", "");
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(elementId);
      }
    }
    // For non-homepage or non-hash links, let the Link component handle navigation
    setIsOpen(false);
  };

  // Determine header styles based on page and scroll state
  const getHeaderStyles = () => {
    if (!isHomePage) {
      return {
        bg: "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200",
        logoText: "text-gray-800",
        logoSubtext: "text-gray-600",
        navText: "text-gray-600",
        navHover: "hover:text-green-600 hover:bg-gray-50",
        navActive: "text-green-600 bg-green-50",
        ctaText: "text-gray-600 hover:text-green-600 hover:bg-gray-50",
        ctaButton: "bg-gradient-to-r from-green-600 to-emerald-700 text-white",
        mobileBg: "bg-white border-t border-gray-200",
      };
    }

    if (isScrolled) {
      return {
        bg: "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200",
        logoText: "text-gray-800",
        logoSubtext: "text-gray-600",
        navText: "text-gray-600",
        navHover: "hover:text-green-600 hover:bg-gray-50",
        navActive: "text-green-600 bg-green-50",
        ctaText: "text-gray-600 hover:text-green-600 hover:bg-gray-50",
        ctaButton: "bg-gradient-to-r from-green-600 to-emerald-700 text-white",
        mobileBg: "bg-white border-t border-gray-200",
      };
    }

    return {
      bg: "bg-transparent",
      logoText: "text-white",
      logoSubtext: "text-white/80",
      navText: "text-white/90",
      navHover: "hover:text-white hover:bg-white/20",
      navActive: "text-white bg-white/30",
      ctaText: "text-white/90 hover:text-white hover:bg-white/20",
      ctaButton: "bg-white text-green-700 hover:bg-green-50",
      mobileBg: "bg-white/95 backdrop-blur-lg border-t border-white/20",
    };
  };

  const styles = getHeaderStyles();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${styles.bg}`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <Image
                src={LogoImage}
                alt="Logo SMK Informatika Ciputat"
                width={32}
                height={32}
                className="rounded-lg"
              />
            </div>
            <div className="sm:block">
              <h1
                className={`font-bold leading-tight transition-all duration-300 text-lg ${styles.logoText}`}
              >
                SMK INFORMATIKA
              </h1>
              <p
                className={`leading-tight transition-all duration-300 text-xs ${styles.logoSubtext}`}
              >
                Ciputat
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const isHashLink = item.href.startsWith("/#");
              const isActive = isHomePage
                ? activeSection === item.id
                : pathname === item.href;

              if (isHashLink) {
                return (
                  <Link
                    key={item.name}
                    href={isHomePage ? item.href : `/${item.href}`}
                    onClick={(e) => {
                      if (isHomePage) {
                        e.preventDefault();
                        handleNavClick(item.href, item.id, true);
                      }
                    }}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                      isActive
                        ? styles.navActive
                        : `${styles.navText} ${styles.navHover}`
                    } ${
                      item.name === "Pengaduan"
                        ? "border border-red-200 hover:border-red-300"
                        : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isActive
                      ? styles.navActive
                      : `${styles.navText} ${styles.navHover}`
                  } ${
                    item.name === "Pengaduan"
                      ? "border border-red-200 hover:border-red-300"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="https://wa.me/62123456789"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex justify-center items-center gap-2 px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 ${styles.ctaButton}`}
            >
              <MessageCircle size={16} />
              <span>Chat</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              !isHomePage || isScrolled
                ? "text-gray-600 hover:text-green-600 hover:bg-gray-50"
                : "text-white hover:text-white hover:bg-white/20"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden rounded-b-2xl ${styles.mobileBg}`}
            >
              <div className="py-2 space-y-1">
                {navigation.map((item) => {
                  const isHashLink = item.href.startsWith("/#");
                  const isActive = isHomePage
                    ? activeSection === item.id
                    : pathname === item.href;

                  if (isHashLink) {
                    return (
                      <Link
                        key={item.name}
                        href={isHomePage ? item.href : `/${item.href}`}
                        onClick={(e) => {
                          if (isHomePage) {
                            e.preventDefault();
                            handleNavClick(item.href, item.id, true);
                          }
                        }}
                        className={`block px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? "bg-green-50 text-green-700"
                            : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "bg-green-50 text-green-700"
                          : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {/* Mobile CTA Buttons */}
                <div
                  className={`p-4 border-t space-y-3 ${
                    !isHomePage || isScrolled
                      ? "border-gray-200"
                      : "border-white/20"
                  }`}
                >
                  <a
                    href="https://wa.me/62123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <span>Chat WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
