// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Shield, AlertCircle, School } from "lucide-react";
// import Link from "next/link";

// export default function AdminLogin() {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       // Simple authentication
//       if (formData.username === "admin" && formData.password === "admin123") {
//         localStorage.setItem("adminAuth", "true");
//         localStorage.setItem("adminLoginTime", new Date().toISOString());
//         router.push("/admin/dashboard");
//       } else {
//         setError("Username atau password salah");
//       }
//     } catch (error) {
//       setError("Terjadi kesalahan saat login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="bg-white rounded-2xl shadow-2xl p-8">
//           <div className="text-center">
//             <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
//               <Shield className="w-8 h-8 text-blue-600" />
//             </div>
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">
//               Admin Login
//             </h2>
//             <p className="text-gray-600 mb-8">
//               Sistem Pengaduan SMK Informatika Ciputat
//             </p>
//           </div>

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Username
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 required
//                 value={formData.username}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, username: e.target.value }))
//                 }
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 placeholder="Masukkan username"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, password: e.target.value }))
//                 }
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 placeholder="Masukkan password"
//               />
//             </div>

//             {error && (
//               <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-xl">
//                 <AlertCircle className="w-5 h-5" />
//                 <span className="text-sm">{error}</span>
//               </div>
//             )}

//             <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl">
//               <strong>Default credentials:</strong>
//               <br />
//               Username: <code>admin</code>
//               <br />
//               Password: <code>admin123</code>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
//             >
//               {loading ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   <span>Memproses...</span>
//                 </>
//               ) : (
//                 <>
//                   <Shield className="w-5 h-5" />
//                   <span>Masuk sebagai Admin</span>
//                 </>
//               )}
//             </button>

//             <div className="text-center">
//               <Link
//                 href="/"
//                 className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center space-x-1"
//               >
//                 <School className="w-4 h-4" />
//                 <span>Kembali ke Beranda</span>
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
