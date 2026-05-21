import React, { useState } from "react";
import { Search } from "lucide-react";
import gambarPlaceholder from "../asset/gambar_guru.jpg"; // Ganti dengan path gambarmu

// 1. Tipe Data untuk Anggota Sekolah
interface StafMember {
  id: string;
  namaLengkap: string;
  kategori: "Guru Kejuruan" | "Guru Umum" | "Staf Tata Usaha";
  jabatan: string;
  mataPelajaran: string;
  image: string;
}

// 2. Data Dummy (Sesuaikan dengan guru-guru asli di SMK Parulian 1)
const dataStaf: StafMember[] = [
  {
    id: "1",
    namaLengkap: "Budi Santoso, S.Kom., M.T.",
    kategori: "Guru Kejuruan",
    jabatan: "Kepala Program PPLG",
    mataPelajaran: "Pemrograman Web & Perangkat Bergerak",
    image: gambarPlaceholder,
  },
  {
    id: "2",
    namaLengkap: "Siti Aminah, S.Pd.",
    kategori: "Guru Umum",
    jabatan: "Guru Mata Pelajaran",
    mataPelajaran: "Matematika",
    image: gambarPlaceholder,
  },
  {
    id: "3",
    namaLengkap: "Andi Wijaya, S.T.",
    kategori: "Guru Kejuruan",
    jabatan: "Kepala Program TJKT",
    mataPelajaran: "Administrasi Infrastruktur Jaringan",
    image: gambarPlaceholder,
  },
  {
    id: "4",
    namaLengkap: "Rina Marlina, S.E.",
    kategori: "Staf Tata Usaha",
    jabatan: "Kepala Tata Usaha",
    mataPelajaran: "Administrasi Keuangan Sekolah",
    image: gambarPlaceholder,
  },
  {
    id: "5",
    namaLengkap: "Dewi Lestari, S.Pd.",
    kategori: "Guru Umum",
    jabatan: "Guru Mata Pelajaran",
    mataPelajaran: "Bahasa Inggris",
    image: gambarPlaceholder,
  },
];

// 3. Daftar Kategori untuk Tombol Filter
const categories = ["Semua Anggota", "Guru Kejuruan", "Guru Umum", "Staf Tata Usaha"];

export default function DetailKariawan() {
  // State untuk menyimpan kategori yang sedang dipilih & teks pencarian
  const [activeCategory, setActiveCategory] = useState("Semua Anggota");
  const [searchQuery, setSearchQuery] = useState("");

  // Logika Filtering Data
  const filteredStaf = dataStaf.filter((staf) => {
    // Filter berdasarkan Kategori
    const matchCategory = activeCategory === "Semua Anggota" || staf.kategori === activeCategory;
    
    // Filter berdasarkan Pencarian (cocokkan nama ATAU mata pelajaran, abaikan huruf besar/kecil)
    const keyword = searchQuery.toLowerCase();
    const matchSearch = 
      staf.namaLengkap.toLowerCase().includes(keyword) || 
      staf.mataPelajaran.toLowerCase().includes(keyword);

    return matchCategory && matchSearch;
  });

  return (
    <section id="guru-staf" className="py-24 bg-[#f8f9fa] relative">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
            Tenaga Pendidik & Kependidikan
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Mengenal lebih dekat para pendidik dan staf profesional yang berdedikasi membimbing generasi masa depan.
          </p>
        </div>

        {/* Action Row: Tombol Filter & Kolom Pencarian */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          
          {/* Tombol Kategori (Kiri) */}
          <div className="flex flex-wrap gap-3">
            {categories.map((kategori) => (
              <button
                key={kategori}
                onClick={() => setActiveCategory(kategori)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border shadow-sm ${
                  activeCategory === kategori
                    ? "bg-primary text-white border-primary" // Style aktif (Hitam)
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary/50 hover:text-primary" // Style tidak aktif (Putih)
                }`}
              >
                {kategori}
              </button>
            ))}
          </div>

          {/* Search Bar (Kanan) */}
          <div className="relative w-full lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="cari guru atau mata pelajaran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Grid Profil Guru & Staf */}
        {filteredStaf.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredStaf.map((staf, idx) => (
              <div 
                key={staf.id} 
                className="group animate-fade-in cursor-pointer"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Frame Foto (Portrait) */}
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-5 bg-gray-200">
                  <img
                    src={staf.image}
                    alt={`Foto ${staf.namaLengkap}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay tipis agar transisi lebih elegan */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>

                {/* Teks Biodata */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-primary leading-tight group-hover:text-secondary transition-colors">
                    {staf.namaLengkap}
                  </h3>
                  <p className="text-secondary font-medium text-sm">
                    {staf.jabatan}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {staf.mataPelajaran}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Tampilan jika pencarian tidak membuahkan hasil
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <p className="text-gray-500 text-lg">Maaf, tidak ada staf atau mata pelajaran yang cocok dengan pencarian <strong>"{searchQuery}"</strong>.</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("Semua Anggota");
              }}
              className="mt-4 text-secondary font-semibold hover:underline"
            >
              Reset Pencarian
            </button>
          </div>
        )}

      </div>
    </section>
  );
}