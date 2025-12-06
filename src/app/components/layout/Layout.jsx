"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function Layout({ children }) {
  const pathname = usePathname();

  const showScrollToTop = pathname !== "/complaint";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>

      {showScrollToTop && <Footer />}
      {showScrollToTop && <ScrollToTop />}
    </div>
  );
}
