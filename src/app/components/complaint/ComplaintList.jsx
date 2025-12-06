"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Search,
  Eye,
  Calendar,
  User,
  Phone,
  Mail,
  Image as ImageIcon,
  MessageSquare,
  RefreshCw,
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [expandedComplaint, setExpandedComplaint] = useState(null);

  const categories = [
    "Administrasi",
    "Akademik",
    "Fasilitas",
    "Guru & Staff",
    "Ekstrakurikuler",
    "Lainnya",
  ];

  const statuses = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
      border: "border-yellow-200",
      icon: "⏳",
      mobileIcon: <Clock className="w-3 h-3" />,
    },
    {
      value: "in_progress",
      label: "Proses",
      color: "bg-blue-100 text-blue-800",
      border: "border-blue-200",
      icon: "🔄",
      mobileIcon: <RefreshCw className="w-3 h-3" />,
    },
    {
      value: "resolved",
      label: "Selesai",
      color: "bg-green-100 text-green-800",
      border: "border-green-200",
      icon: "✅",
      mobileIcon: <CheckCircle className="w-3 h-3" />,
    },
    {
      value: "rejected",
      label: "Ditolak",
      color: "bg-red-100 text-red-800",
      border: "border-red-200",
      icon: "❌",
      mobileIcon: <AlertCircle className="w-3 h-3" />,
    },
  ];

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    filterComplaints();
  }, [complaints, searchTerm, statusFilter, categoryFilter]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setComplaints(data || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterComplaints = () => {
    let filtered = complaints;

    if (searchTerm) {
      filtered = filtered.filter(
        (complaint) =>
          complaint.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          complaint.ticket_number
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          complaint.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (complaint.admin_notes &&
            complaint.admin_notes
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (complaint) => complaint.status === statusFilter
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (complaint) => complaint.category === categoryFilter
      );
    }

    setFilteredComplaints(filtered);
  };

  const getStatusInfo = (status) => {
    return statuses.find((s) => s.value === status) || statuses[0];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleImageError = (complaintId) => {
    setImageErrors((prev) => ({
      ...prev,
      [complaintId]: true,
    }));
  };

  const toggleComplaintExpansion = (complaintId) => {
    setExpandedComplaint(
      expandedComplaint === complaintId ? null : complaintId
    );
  };

  const getStats = () => {
    return {
      total: complaints.length,
      pending: complaints.filter((c) => c.status === "pending").length,
      inProgress: complaints.filter((c) => c.status === "in_progress").length,
      resolved: complaints.filter((c) => c.status === "resolved").length,
      withResponse: complaints.filter((c) => c.admin_notes).length,
    };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data pengaduan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile Quick Stats */}
      <div className="lg:hidden">
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-white rounded-lg shadow-sm p-3 text-center">
            <div className="text-lg font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 text-center">
            <div className="text-lg font-bold text-yellow-600">
              {stats.pending}
            </div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 text-center">
            <div className="text-lg font-bold text-green-600">
              {stats.resolved}
            </div>
            <div className="text-xs text-gray-600">Selesai</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 text-center">
            <div className="text-lg font-bold text-purple-600">
              {stats.withResponse}
            </div>
            <div className="text-xs text-gray-600">Ditanggapi</div>
          </div>
        </div>
      </div>

      {/* Desktop Stats */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Pengaduan</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {stats.pending}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-green-600">
            {stats.resolved}
          </div>
          <div className="text-sm text-gray-600">Selesai</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {stats.withResponse}
          </div>
          <div className="text-sm text-gray-600">Ditanggapi</div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="relative mb-3">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari pengaduan, nomor tiket..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Filter Controls */}
        <div className="lg:hidden">
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
              {showFilters ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={fetchComplaints}
              className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setStatusFilter("all")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      statusFilter === "all"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    Semua
                  </button>
                  {statuses.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setStatusFilter(status.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                        statusFilter === status.value
                          ? `${status.color} ${status.border}`
                          : "bg-white text-gray-700 border border-gray-300"
                      }`}
                    >
                      {status.mobileIcon}
                      <span>{status.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="all">Semua Kategori</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setCategoryFilter("all");
                  setShowFilters(false);
                }}
                className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-xl hover:bg-gray-50 font-medium"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Filter Section */}
      <div className="hidden lg:block bg-white rounded-xl shadow-lg p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari pengaduan, nomor tiket, atau catatan admin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Semua Status</option>
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setCategoryFilter("all");
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              onClick={fetchComplaints}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2">
        <p className="text-sm lg:text-base text-gray-600">
          <span className="font-semibold">{filteredComplaints.length}</span>{" "}
          dari <span className="font-semibold">{complaints.length}</span>{" "}
          pengaduan
        </p>
        <p className="text-xs lg:text-sm text-gray-500">
          {stats.withResponse} pengaduan memiliki tanggapan admin
        </p>
      </div>

      {/* Complaints List - Mobile View */}
      <div className="lg:hidden space-y-3">
        {filteredComplaints.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg mb-2">Tidak ada pengaduan</p>
            <p className="text-gray-400 text-sm">Coba ubah filter pencarian</p>
          </div>
        ) : (
          filteredComplaints.map((complaint) => {
            const statusInfo = getStatusInfo(complaint.status);
            const isExpanded = expandedComplaint === complaint.id;

            return (
              <div
                key={complaint.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
              >
                {/* Complaint Header */}
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => toggleComplaintExpansion(complaint.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color} ${statusInfo.border}`}
                        >
                          <span className="hidden sm:inline">
                            {statusInfo.icon}{" "}
                          </span>
                          {statusInfo.label}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {complaint.category}
                        </span>
                      </div>
                      <div className="font-medium text-gray-900 line-clamp-1">
                        {complaint.name}
                      </div>
                      <div className="text-xs text-blue-600 font-mono font-semibold mt-1">
                        {complaint.ticket_number}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-xs text-gray-500 mb-2 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(complaint.created_at)}
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-200 pt-4">
                    {/* Pengaduan Details */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Isi Pengaduan:
                      </h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {complaint.message}
                      </p>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">
                          Kontak:
                        </h4>
                        <div className="space-y-1">
                          <div className="flex items-center text-xs text-gray-600">
                            <Mail className="w-3 h-3 mr-2" />
                            <span className="truncate">{complaint.email}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <Phone className="w-3 h-3 mr-2" />
                            <span>{complaint.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Image Preview */}
                      {complaint.image_url && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">
                            Bukti:
                          </h4>
                          <div
                            className="w-full h-24 bg-gray-100 rounded-lg border cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
                            onClick={() =>
                              handleImageClick(complaint.image_url)
                            }
                          >
                            {imageErrors[complaint.id] ? (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-gray-400" />
                              </div>
                            ) : (
                              <img
                                src={complaint.image_url}
                                alt="Bukti pengaduan"
                                className="w-full h-full object-cover"
                                onError={() => handleImageError(complaint.id)}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Admin Notes */}
                    {complaint.admin_notes && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-green-800 mb-1">
                              Tanggapan Admin:
                            </h4>
                            <p className="text-xs text-green-700 whitespace-pre-wrap">
                              {complaint.admin_notes}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {complaint.image_url && (
                        <button
                          onClick={() => handleImageClick(complaint.image_url)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          Lihat Gambar
                        </button>
                      )}
                      {!complaint.admin_notes &&
                        complaint.status === "resolved" && (
                          <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            Menunggu tanggapan
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Complaints List - Desktop View */}
      <div className="hidden lg:block lg:space-y-4">
        {filteredComplaints.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-xl mb-2">
              Tidak ada pengaduan yang ditemukan
            </p>
            <p className="text-gray-400">Coba ubah filter pencarian</p>
          </div>
        ) : (
          filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        getStatusInfo(complaint.status).color
                      }`}
                    >
                      {getStatusInfo(complaint.status).icon}{" "}
                      {getStatusInfo(complaint.status).label}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {complaint.category}
                  </span>
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(complaint.created_at)}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Informasi Pengadu
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      {complaint.name}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {complaint.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {complaint.phone}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Detail Pengaduan
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {complaint.message}
                  </p>
                  {complaint.image_url && (
                    <div className="mt-2">
                      <div
                        className="w-32 h-32 bg-gray-100 rounded-lg border cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
                        onClick={() => handleImageClick(complaint.image_url)}
                      >
                        <img
                          src={complaint.image_url}
                          alt="Bukti pengaduan"
                          className="w-full h-full object-cover rounded-lg"
                          loading="lazy"
                          onError={() => handleImageError(complaint.id)}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Klik untuk melihat gambar
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {complaint.admin_notes && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <h4 className="font-semibold text-green-800 mb-2">
                    📝 Tanggapan Admin
                  </h4>
                  <p className="text-sm text-green-700 whitespace-pre-wrap">
                    {complaint.admin_notes}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm font-mono text-blue-600 font-semibold">
                  {complaint.ticket_number}
                </div>
                <button
                  onClick={() => handleImageClick(complaint.image_url)}
                  disabled={!complaint.image_url}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-xl transition-colors duration-200 ${
                    complaint.image_url
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Lihat Gambar</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 lg:top-8 lg:right-8 text-white hover:text-gray-300 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium z-10 flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Tutup
            </button>
            <div className="max-w-full max-h-full flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Bukti pengaduan"
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  const errorDiv = document.createElement("div");
                  errorDiv.className = "text-center text-white p-8";
                  errorDiv.innerHTML = `
                    <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ImageIcon class="w-8 h-8 text-red-400" />
                    </div>
                    <p class="font-semibold">Gagal memuat gambar</p>
                  `;
                  e.target.parentNode.appendChild(errorDiv);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintList;
