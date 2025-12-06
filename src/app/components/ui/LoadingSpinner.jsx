"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LoadingSpinner({ size = "md", className = "" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`inline-block ${sizeClasses[size]} ${className}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`w-full h-full border-2 border-blue-600 border-t-transparent rounded-full ${sizeClasses[size]}`}
      />
    </motion.div>
  );
}
