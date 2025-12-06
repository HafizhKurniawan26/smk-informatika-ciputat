"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Search,
  Filter,
  Eye,
  Calendar,
  User,
  Phone,
  Mail,
  Edit3,
  LogOut,
  MessageSquare,
  BarChart3,
  Download,
  Shield,
  Home,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

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
    },
    {
      value: "in_progress",
      label: "Dalam Proses",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "resolved",
      label: "Selesai",
      color: "bg-green-100 text-green-800",
    },
    { value: "rejected", label: "Ditolak", color: "bg-red-100 text-red-800" },
  ];

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (complaints.length > 0) {
      filterComplaints();
    }
  }, [complaints, searchTerm, statusFilter, categoryFilter]);

  const checkAuth = () => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      router.push("/admin/login");
      return;
    }
    fetchComplaints();
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminLoginTime");
    router.push("/admin/login");
  };

  const fetchComplaints = async () => {
    try {
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
          complaint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          complaint.ticket_number
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          complaint.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleStatusUpdate = async (complaintId, newStatus) => {
    try {
      const { error } = await supabase
        .from("complaints")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", complaintId);

      if (error) throw error;

      setComplaints((prev) =>
        prev.map((comp) =>
          comp.id === complaintId ? { ...comp, status: newStatus } : comp
        )
      );

      if (selectedComplaint?.id === complaintId) {
        setSelectedComplaint((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Gagal mengupdate status");
    }
  };

  const handleEdit = (complaint) => {
    setSelectedComplaint(complaint);
    setEditForm({
      status: complaint.status,
      admin_notes: complaint.admin_notes || "",
    });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const { error } = await supabase
        .from("complaints")
        .update({
          status: editForm.status,
          admin_notes: editForm.admin_notes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedComplaint.id);

      if (error) throw error;

      setComplaints((prev) =>
        prev.map((comp) =>
          comp.id === selectedComplaint.id ? { ...comp, ...editForm } : comp
        )
      );

      setIsEditing(false);
      setSelectedComplaint(null);
      alert("Perubahan berhasil disimpan");
    } catch (error) {
      console.error("Error updating complaint:", error);
      alert("Gagal menyimpan perubahan");
    }
  };

  const handleDelete = async (complaintId) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengaduan ini?")) {
      try {
        const { error } = await supabase
          .from("complaints")
          .delete()
          .eq("id", complaintId);

        if (error) throw error;

        setComplaints((prev) => prev.filter((comp) => comp.id !== complaintId));
        alert("Pengaduan berhasil dihapus");
      } catch (error) {
        console.error("Error deleting complaint:", error);
        alert("Gagal menghapus pengaduan");
      }
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Calculate stats
  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "pending").length,
    in_progress: complaints.filter((c) => c.status === "in_progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
    rejected: complaints.filter((c) => c.status === "rejected").length,
    withResponse: complaints.filter((c) => c.admin_notes).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data pengaduan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600">
                  Manajemen Pengaduan SMK Informatika Ciputat
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <Home className="w-4 h-4" />
                <span>Beranda</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </div>
                <div className="text-gray-600">Total Pengaduan</div>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </div>
                <div className="text-gray-600">Pending</div>
              </div>
              <MessageSquare className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {stats.resolved}
                </div>
                <div className="text-gray-600">Selesai</div>
              </div>
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.withResponse}
                </div>
                <div className="text-gray-600">Dengan Tanggapan</div>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari pengaduan..."
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

            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setCategoryFilter("all");
              }}
              className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Reset Filter
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            Menampilkan {filteredComplaints.length} dari {complaints.length}{" "}
            pengaduan
          </p>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <p className="text-gray-500 text-lg">
                Tidak ada pengaduan yang ditemukan
              </p>
            </div>
          ) : (
            filteredComplaints.map((complaint) => (
              <div
                key={complaint.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          getStatusInfo(complaint.status).color
                        }`}
                      >
                        {getStatusInfo(complaint.status).label}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {complaint.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(complaint.created_at)}
                    </div>
                    <button
                      onClick={() => handleEdit(complaint)}
                      className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(complaint.id)}
                      className="flex items-center space-x-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Hapus</span>
                    </button>
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
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Klik untuk melihat gambar
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {complaint.admin_notes && (
                  <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      Catatan Admin:
                    </h4>
                    <p className="text-sm text-yellow-700 whitespace-pre-wrap">
                      {complaint.admin_notes}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm font-mono text-blue-600 font-semibold">
                    {complaint.ticket_number}
                  </div>
                  <div className="flex space-x-2">
                    {statuses.map((status) => (
                      <button
                        key={status.value}
                        onClick={() =>
                          handleStatusUpdate(complaint.id, status.value)
                        }
                        disabled={complaint.status === status.value}
                        className={`px-3 py-1 text-xs rounded-lg transition-colors duration-200 ${
                          complaint.status === status.value
                            ? `${status.color} cursor-default`
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Edit Pengaduan
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catatan Admin
                  </label>
                  <textarea
                    value={editForm.admin_notes || ""}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        admin_notes: e.target.value,
                      }))
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tambahkan catatan untuk pengaduan ini..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <span className="text-lg">✕ Tutup</span>
            </button>
            <img
              src={selectedImage}
              alt="Bukti pengaduan"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
