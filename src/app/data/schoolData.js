export const schoolData = {
  name: "SMK INFORMATIKA CIPUTAT",
  motto: "Disiplin, Berkarakter dan Mandiri",
  vision:
    "Menjadi sekolah kejuruan yang terbaik dan mencetak SDM yang berwawasan luas, modern, cerdas dan berakhlak mulia",
  mission: [
    "Menyelenggarakan Pendidikan yang Berketuhanan Yang Maha Esa",
    "Menyelenggarakan Pendidikan yang berkualitas, berwawasan luas dan berakhlak",
    "Mengupayakan dan pemerataan kesempatan memperoleh pendidikan di SMK Informatika Ciputat",
    "Menerapkan metode pembelajaran dengan sistem manajemen sekolah berbasis IT secara transparan dan profesional",
    "Mencetak SDM yang berkarya, siap bekerja dan berwiraswasta",
    "Mewujudkan sikap semangat kebersamaan (Team Work) yang bersinergis baik dalam dunia pendidikan maupun dalam dunia usaha/ Industri",
  ],

  programs: {
    multimedia: {
      id: "multimedia",
      name: "Multimedia (MM)",
      slug: "multimedia",
      icon: "🎨",
      description:
        "Multimedia (MM) adalah Kompetensi Keahlian yang mempelajari tentang penggunaan komputer/ laptop guna menyajikan data teks, suara, gambar, animasi, serta video yang dibuat semenarik mungkin dengan software yang telah tersedia seperti Adobe Photoshop, CorelDraw, Freehand, Adobe After Effect, DII.",
      careerProspects: [
        "Fotografer",
        "Animator/Ilustrator",
        "Content Creator",
        "Graphic Designer",
        "Game Designer",
        "Web Designer",
        "Wirausaha/DII",
      ],
      subjects: [
        "Desain Grafis Percetakan",
        "Desain Media Interaktif",
        "Animasi 2D & 3D",
        "Teknik Pengolahan Audio & Video",
        "Produk Kreatif dan Kewirausahaan",
        "Dasar Desain Grafis",
        "Simulasi dan Komunikasi Digital",
      ],
      color: "from-purple-500 to-pink-500",
    },
    tkj: {
      id: "tkj",
      name: "Teknik Komputer dan Jaringan (TKJ)",
      slug: "teknik-komputer-jaringan",
      icon: "💻",
      description:
        "Teknik Komputer dan Jaringan (TKJ) Adalah Kompetensi Keahlian yang mempelajari Ilmu berbasis Teknologi Informasi dan Komunikasi terkait kemampuan algoritma, pemrograman komputer, perakitan komputer, perakitan jaringan komputer, pengoperasian perangkat lunak dan internet.",
      careerProspects: [
        "IT Support",
        "Help Desk",
        "Network Administrator",
        "Programmer",
        "System Analyst",
        "Game Developer",
        "Wirausaha/DII",
      ],
      subjects: [
        "Teknologi Jaringan Berbasis Luas WAN",
        "Administrasi Infrastruktur Jaringan",
        "Administrasi Sistem Jaringan",
        "Teknologi Layanan Jaringan",
        "Produk Kreatif dan Kewirausahaan",
        "Sistem Komputer",
        "Komputer dan Jaringan Dasar",
        "Simulasi dan Komunikasi Digital",
        "Pemrograman Dasar",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    otkp: {
      id: "otkp",
      name: "Otomatisasi Tata Kelola Perkantoran (OTKP)",
      slug: "otomatisasi-tata-kelola-perkantoran",
      icon: "📊",
      description:
        "Otomatisasi Tata Kelola Perkantoran (OTKP) atau yang biasa dikenal dengan Administrasi Perkantoran (AP) adalah Kompetensi Keahlian yang mempelajari tentang pengetahuan, keterampilan dan sikap dalam bidang administrasi.",
      careerProspects: [
        "Staff Administrasi",
        "Staff Personalia/HRD",
        "Account Executive",
        "Personal Asisten",
        "Front Office",
        "Junior Sekretaris",
        "Wirausaha/DII",
      ],
      subjects: [
        "OTK. Kepegawaian",
        "OTK. Keuangan",
        "OTK. Humas dan Protokoler",
        "OTK. Sarana dan Prasarana",
        "Produk Kreatif dan Kewirausahaan",
        "Kearsipan",
        "Korespondensi",
        "Simulasi dan Komunikasi Digital",
      ],
      color: "from-green-500 to-emerald-500",
    },
  },

  extracurricular: [
    {
      id: "rohis-hadroh",
      name: "Rohis/Hadroh",
      slug: "rohis-hadroh",
      description:
        "Kegiatan kerohanian Islam dan grup hadroh untuk pengembangan spiritual dan seni",
      longDescription:
        "Rohis (Rohani Islam) dan Hadroh adalah ekstrakurikuler yang fokus pada pengembangan spiritual dan seni Islami. Kegiatan ini meliputi kajian Islam, pembacaan sholawat dengan alat musik hadroh, dan berbagai kegiatan keagamaan lainnya.",
      activities: [
        "Kajian Islam mingguan",
        "Latihan hadroh dan nasyid",
        "Peringatan hari besar Islam",
        "Bakti sosial",
        "Pesantren kilat",
      ],
      schedule: "Setiap Jumat, 15:00 - 17:00 WIB",
      location: "Masjid Sekolah",
      image: "/images/extracurricular/rohis.jpg",
    },
    {
      id: "futsal",
      name: "Futsal",
      slug: "futsal",
      description:
        "Olahraga futsal untuk menjaga kebugaran dan mengembangkan teamwork",
      longDescription:
        "Ekstrakurikuler futsal melatih siswa dalam keterampilan sepak bola dalam ruangan. Fokus pada teknik dasar, strategi tim, dan menjaga kebugaran fisik.",
      activities: [
        "Latihan teknik dasar",
        "Strategi permainan",
        "Pertandingan persahabatan",
        "Turnamen internal",
      ],
      schedule: "Setiap Selasa & Kamis, 16:00 - 18:00 WIB",
      location: "Lapangan Futsal Sekolah",
      image: "/images/extracurricular/futsal.jpg",
    },
    {
      id: "silat",
      name: "Silat",
      slug: "silat",
      description:
        "Seni bela diri tradisional untuk melestarikan budaya dan menjaga kesehatan",
      longDescription:
        "Silat adalah ekstrakurikuler yang melestarikan seni bela diri tradisional Indonesia. Selain melatih fisik, juga mengajarkan disiplin dan mental yang kuat.",
      activities: [
        "Latihan jurus dasar",
        "Teknik bela diri",
        "Seni gerak silat",
        "Latihan pernafasan",
      ],
      schedule: "Setiap Rabu, 15:30 - 17:30 WIB",
      location: "Aula Sekolah",
      image: "/images/extracurricular/silat.jpg",
    },
    {
      id: "paskibra",
      name: "Paskibra",
      slug: "paskibra",
      description:
        "Pasukan pengibar bendera untuk melatih kedisiplinan dan nasionalisme",
      longDescription:
        "Paskibra melatih siswa dalam baris-berbaris, pengibaran bendera, dan menumbuhkan rasa cinta tanah air serta kedisiplinan yang tinggi.",
      activities: [
        "Latihan baris-berbaris",
        "Teknik pengibaran bendera",
        "PBB tingkat lanjut",
        "Upacara bendera",
      ],
      schedule: "Setiap Senin & Sabtu, 15:00 - 17:30 WIB",
      location: "Lapangan Upacara",
      image: "/images/extracurricular/paskibra.jpg",
    },
    {
      id: "pmr",
      name: "Palang Merah Remaja",
      slug: "palang-merah-remaja",
      description:
        "Organisasi kemanusiaan untuk melatih kepedulian sosial dan pertolongan pertama",
      longDescription:
        "PMR mengajarkan pertolongan pertama, kesehatan remaja, dan kepedulian sosial. Anggota PMr siap menjadi relawan dalam berbagai kegiatan kemanusiaan.",
      activities: [
        "Pelatihan pertolongan pertama",
        "Kegiatan donor darah",
        "Bakti sosial",
        "Simulasi bencana",
      ],
      schedule: "Setiap Jumat, 14:30 - 16:30 WIB",
      location: "Ruang Kesehatan",
      image: "/images/extracurricular/pmr.jpg",
    },
    {
      id: "tari-tradisional",
      name: "Tari Traditional",
      slug: "tari-tradisional",
      description: "Pelestarian seni tari tradisional Indonesia",
      longDescription:
        "Ekstrakurikuler tari tradisional melestarikan kekayaan budaya Indonesia melalui seni tari. Mempelajari berbagai tarian daerah dan pentas seni.",
      activities: [
        "Latihan tari tradisional",
        "Pengenalan budaya daerah",
        "Persiapan pentas seni",
        "Lomba tari",
      ],
      schedule: "Setiap Kamis, 15:00 - 17:00 WIB",
      location: "Aula Seni",
      image: "/images/extracurricular/tari.jpg",
    },
  ],

  contact: {
    address:
      "Jl. W R Supratman No.50, Pd. Ranji, Kec. Ciputat Tim., Kota Tangerang Selatan, Banten 15412",
    phone: "(021) 388 910 18",
    email: "informatikaciputat@gmail.com",
    website: "https://smk-informatika-ciputat.my.id",
    mapUrl: "https://maps.app.goo.gl/TfjgwTaVC5X1ykZa9",
  },
};
