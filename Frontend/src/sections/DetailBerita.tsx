import React, { useState } from "react";
import { Search, Calendar, ArrowRight } from "lucide-react";// Ganti dengan path gambarmu

// 1. Tipe Data Berita
interface BeritaItem {
  id: string;
  tanggal: string;
  judul: string;
  ringkasan: string;
  kategori: "Akademik" | "Prestasi" | "Kegiatan Siswa";
  image: string;
}

// 2. Data Dummy Berita (Sesuai konteks SMK Parulian 1)
const dataBerita: BeritaItem[] = [
  {
    id: "b1",
    tanggal: "20 Mei 2026",
    judul: "Siswa Jurusan PPLG Sukses Mengembangkan Sistem Informasi Akademik Sekolah",
    ringkasan: "Kolaborasi apik siswa tingkat akhir jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) berhasil menciptakan aplikasi manajemen sekolah berbasis web yang modern. Sistem ini dilengkapi fitur notifikasi absensi real-time berbasis WhatsApp.",
    kategori: "Akademik",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "b2",
    tanggal: "15 Mei 2026",
    judul: "Tim Futsal SMK Parulian 1 Raih Juara 1 Tingkat Kota Medan",
    ringkasan: "Kabar gembira datang dari bidang olahraga. Tim futsal andalan sekolah kita berhasil membawa pulang piala bergilir setelah menaklukkan lawan-lawannya di turnamen futsal antar SMK se-Kota Medan dengan skor meyakinkan.",
    kategori: "Prestasi",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "b3",
    tanggal: "10 Mei 2026",
    judul: "Kunjungan Industri Jurusan TJKT ke Kantor PT Telkom Indonesia",
    ringkasan: "Guna meningkatkan wawasan industri, puluhan siswa kelas XI TJKT melaksanakan kunjungan industri ke pusat data PT Telkom. Mereka diajak melihat langsung infrastruktur jaringan skala besar dan pengelolaan fiber optik.",
    kategori: "Kegiatan Siswa",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "b4",
    tanggal: "02 Mei 2026",
    judul: "Pendaftaran PPDB Tahun Ajaran 2026/2027 Telah Dibuka",
    ringkasan: "SMK Swasta Parulian 1 Medan resmi membuka Penerimaan Peserta Didik Baru (PPDB). Calon siswa kini dapat mendaftar secara online melalui portal resmi sekolah untuk empat program keahlian unggulan.",
    kategori: "Akademik",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = ["Semua Berita", "Akademik", "Prestasi", "Kegiatan Siswa"];

export default function DetailBerita() {
  const [activeCategory, setActiveCategory] = useState("Semua Berita");
  const [searchQuery, setSearchQuery] = useState("");

  // Logika Filtering Data (Kategori + Search)
  const filteredBerita = dataBerita.filter((berita) => {
    const matchCategory = activeCategory === "Semua Berita" || berita.kategori === activeCategory;
    
    const keyword = searchQuery.toLowerCase();
    const matchSearch = 
      berita.judul.toLowerCase().includes(keyword) || 
      berita.ringkasan.toLowerCase().includes(keyword);

    return matchCategory && matchSearch;
  });

  return (
    <section className="py-24 bg-[#f8f9fa] min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header Opsional (Bisa dihapus jika sudah pakai PageHeader terpisah) */}
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-primary mb-2">Kumpulan Berita</h2>
          <p className="text-muted-foreground">Informasi, pengumuman, dan artikel terbaru.</p>
        </div>

        {/* Action Row: Tombol Kategori & Search (Sesuai Wireframe) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          
          {/* Tombol Kategori (Kiri) */}
          <div className="flex flex-wrap gap-3">
            {categories.map((kategori) => (
              <button
                key={kategori}
                onClick={() => setActiveCategory(kategori)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border shadow-sm ${
                  activeCategory === kategori
                    ? "bg-primary text-white border-primary" 
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary/50 hover:text-primary"
                }`}
              >
                {kategori}
              </button>
            ))}
          </div>

          {/* Search Bar (Kanan) */}
          <div className="relative w-full lg:w-80 flex-shrink-0">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="cari berita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all shadow-sm"
            />
          </div>
        </div>

        {/* List Berita (Sesuai Wireframe: Teks Kiri, Gambar Kanan) */}
        <div className="space-y-6">
          {filteredBerita.length > 0 ? (
            filteredBerita.map((berita, idx) => (
              <article 
                key={berita.id} 
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row overflow-hidden group animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                
                {/* Bagian Teks (Kiri pada Desktop) */}
                {/* md:order-1 memastikan di Desktop teks ada di kiri. flex-1 agar teks mengambil sisa ruang */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-center order-2 md:order-1">
                  
                  {/* Tanggal & Kategori */}
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-secondary">
                      <Calendar className="w-4 h-4" />
                      {berita.tanggal}
                    </span>
                    <span className="px-2.5 py-1 bg-gray-100 rounded-md text-gray-500">
                      {berita.kategori}
                    </span>
                  </div>

                  {/* Judul */}
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 leading-snug group-hover:text-secondary transition-colors cursor-pointer">
                    {berita.judul}
                  </h3>

                  {/* Ringkasan dengan Garis Putus-putus virtual (menggunakan text & border) */}
                  <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
                    {berita.ringkasan}
                  </p>

                  {/* Tombol Aksi (Tambahan UX) */}
                  <div className="mt-auto">
                    <button className="text-primary font-bold text-sm flex items-center gap-2 hover:text-secondary transition-colors group/btn">
                      Baca Selengkapnya 
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Bagian Gambar (Kanan pada Desktop) */}
                {/* md:order-2 memindahkan gambar ke kanan di Desktop. md:w-2/5 mengatur lebarnya 40% dari total */}
                <div className="w-full md:w-2/5 lg:w-1/3 aspect-video md:aspect-auto relative overflow-hidden order-1 md:order-2 border-l border-gray-50">
                  <img 
                    src={berita.image} 
                    alt={berita.judul}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay gradien tipis */}
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors"></div>
                </div>

              </article>
            ))
          ) : (
            // Empty State
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-lg mb-4">Pencarian untuk <strong>"{searchQuery}"</strong> tidak ditemukan.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("Semua Berita");
                }}
                className="px-6 py-2 bg-secondary text-white rounded-full font-semibold hover:bg-secondary/90 transition-colors"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}