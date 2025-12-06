"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, AlertCircle, CheckCircle, Upload, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    message: "",
    image_url: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  const categories = [
    "Administrasi",
    "Akademik",
    "Fasilitas",
    "Guru & Staff",
    "Ekstrakurikuler",
    "Lainnya",
  ];

  const uploadToCloudinary = async (file) => {
    try {
      console.log("Mengupload gambar ke Cloudinary...");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "complaint_images");
      formData.append("folder", "smk-complaints");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload gagal: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Upload Cloudinary berhasil:", data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error(`Gagal mengupload gambar: ${error.message}`);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "Ukuran gambar maksimal 5MB" }));
        return;
      }

      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: "File harus berupa gambar" }));
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image_url: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nama harus diisi";
    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email tidak valid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Nomor telepon harus diisi";
    if (!formData.category) newErrors.category = "Kategori harus dipilih";
    if (!formData.message.trim()) newErrors.message = "Pesan harus diisi";
    if (formData.message.length < 20)
      newErrors.message = "Pesan minimal 20 karakter";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateTicketNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `TKT-${timestamp}-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        console.log("Mengupload gambar ke Cloudinary...");
        imageUrl = await uploadToCloudinary(imageFile);
        console.log("Upload gambar selesai:", imageUrl);
      }

      const ticketNum = generateTicketNumber();
      console.log("Generated ticket:", ticketNum);

      const { data, error } = await supabase
        .from("complaints")
        .insert([
          {
            ...formData,
            image_url: imageUrl,
            ticket_number: ticketNum,
            status: "pending",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        console.error("Supabase insert error:", error);
        throw new Error(error.message);
      }

      if (data) {
        console.log("Data berhasil disimpan:", data);
        setIsSubmitted(true);
        setTicketNumber(ticketNum);
        setFormData({
          name: "",
          email: "",
          phone: "",
          category: "",
          message: "",
          image_url: "",
        });
        setImageFile(null);
        setImagePreview("");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setErrors({
        submit: error.message || "Terjadi kesalahan saat mengirim pengaduan",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-6 lg:p-8 text-center"
      >
        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
          <CheckCircle className="w-7 h-7 lg:w-8 lg:h-8 text-green-600" />
        </div>
        <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3 lg:mb-4">
          Pengaduan Berhasil Dikirim!
        </h3>
        <p className="text-gray-600 text-sm lg:text-base mb-4 lg:mb-6">
          Terima kasih telah menyampaikan pengaduan. Kami akan segera
          menindaklanjuti.
        </p>
        <div className="bg-gray-50 rounded-xl p-4 mb-4 lg:mb-6">
          <div className="text-sm text-gray-600 mb-2">Nomor Tiket</div>
          <div className="text-lg lg:text-xl font-bold text-blue-600 break-all">
            {ticketNumber}
          </div>
        </div>
        <button
          onClick={() => setIsSubmitted(false)}
          className="w-full lg:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          Kirim Pengaduan Lain
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-8"
    >
      <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">
        Formulir Pengaduan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
        {/* Grid untuk desktop - 2 kolom untuk form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {/* Kolom 1 */}
          <div className="space-y-4 lg:space-y-6">
            <div>
              <label className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                Nama Lengkap *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 lg:py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan nama lengkap"
              />
              {errors.name && (
                <p className="mt-1 lg:mt-2 text-xs lg:text-sm text-red-600 flex items-center">
                  <AlertCircle size={12} className="mr-1 lg:mr-2" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 lg:py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="email@contoh.com"
              />
              {errors.email && (
                <p className="mt-1 lg:mt-2 text-xs lg:text-sm text-red-600 flex items-center">
                  <AlertCircle size={12} className="mr-1 lg:mr-2" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Kolom 2 */}
          <div className="space-y-4 lg:space-y-6">
            <div>
              <label className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                Nomor Telepon *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 lg:py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="08xxxxxxxxxx"
              />
              {errors.phone && (
                <p className="mt-1 lg:mt-2 text-xs lg:text-sm text-red-600 flex items-center">
                  <AlertCircle size={12} className="mr-1 lg:mr-2" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                Kategori Pengaduan *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 lg:py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 lg:mt-2 text-xs lg:text-sm text-red-600 flex items-center">
                  <AlertCircle size={12} className="mr-1 lg:mr-2" />
                  {errors.category}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Image Upload - Full width di bawah grid */}
        <div>
          <label className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
            Unggah Gambar (Opsional)
          </label>
          <div className="space-y-3">
            {imagePreview ? (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-28 h-28 lg:w-32 lg:h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={14} className="lg:w-4 lg:h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-28 lg:h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition-colors duration-200">
                <div className="flex flex-col items-center justify-center p-5">
                  <Upload className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400 mb-1 lg:mb-2" />
                  <p className="text-xs lg:text-sm text-gray-500 text-center">
                    <span className="font-semibold">Klik untuk upload</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, JPEG (Max. 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
            {errors.image && (
              <p className="text-xs lg:text-sm text-red-600 flex items-center">
                <AlertCircle size={12} className="mr-1 lg:mr-2" />
                {errors.image}
              </p>
            )}
          </div>
        </div>

        {/* Message - Full width di bawah image upload */}
        <div>
          <label className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
            Pesan Pengaduan *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 lg:py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Jelaskan pengaduan Anda secara detail (minimal 20 karakter)..."
          />
          {errors.message && (
            <p className="mt-1 lg:mt-2 text-xs lg:text-sm text-red-600 flex items-center">
              <AlertCircle size={12} className="mr-1 lg:mr-2" />
              {errors.message}
            </p>
          )}
          <div className="mt-1 lg:mt-2 text-xs lg:text-sm text-gray-500">
            {formData.message.length}/20 karakter
          </div>
        </div>

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 lg:p-4">
            <p className="text-red-700 text-sm lg:text-base flex items-center">
              <AlertCircle size={14} className="mr-2 flex-shrink-0" />
              {errors.submit}
            </p>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 lg:py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Mengirim...</span>
            </>
          ) : (
            <>
              <Send size={16} className="lg:w-5 lg:h-5" />
              <span>Kirim Pengaduan</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ComplaintForm;
