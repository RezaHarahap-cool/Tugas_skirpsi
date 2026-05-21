import React from "react";
import { Calendar, User, ArrowRight } from "lucide-react";

// Tipe Data untuk Berita
interface BeritaItem {
  id: string;
  judul: string;
  ringkasan: string;
  kategori: "Pengumuman" | "Kegiatan" | "Prestasi" | "Akademik";
  tanggal: string;
  penulis: string;
  image: string;
}

// Data Contoh Berita SMK Parulian 1 Medan
const dataBerita: BeritaItem[] = [
  {
    id: "b1",
    judul: "Pendaftaran PPDB SMK Swasta Parulian 1 Medan Tahun Ajaran 2026/2027 Resmi Dibuka",
    ringkasan: "Segera daftarkan diri Anda dan pilih program keahlian unggulanmu. Kuota terbatas untuk gelombang pertama!",
    kategori: "Pengumuman",
    tanggal: "15 Mei 2026",
    penulis: "Admin PPDB",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "b2",
    judul: "Siswa Jurusan PPLG Sukses Mengembangkan Sistem Informasi Akademik Sekolah Baru",
    ringkasan: "Kolaborasi apik siswa tingkat akhir berhasil menciptakan aplikasi manajemen sekolah berbasis web yang modern.",
    kategori: "Kegiatan",
    tanggal: "10 Mei 2026",
    penulis: "Humas Sekolah",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "b3",
    judul: "Kunjungan Industri Jurusan TJKT ke Kantor PT Telkom Indonesia Regional Medan",
    ringkasan: "Para siswa melihat langsung bagaimana infrastruktur jaringan skala besar dikelola oleh para profesional di industri.",
    kategori: "Kegiatan",
    tanggal: "02 Mei 2026",
    penulis: "Kaprog TJKT",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  },
];

export const BeritaSection: React.FC = () => {
  // Fungsi penentu warna label kategori berita
  const getKategoriColor = (kategori: string) => {
    switch (kategori) {
      case "Pengumuman": return "bg-red-50 text-red-600 border-red-100";
      case "Kegiatan": return "bg-blue-50 text-blue-600 border-blue-100";
      case "Prestasi": return "bg-amber-50 text-amber-600 border-amber-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <section id="berita" className="py-24 bg-gray-50/30">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-2xl animate-fade-in">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">
              Informasi Terkini
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-primary mb-4">
              Berita & Pengumuman
            </h2>
            <p className="text-muted-foreground text-lg">
              Ikuti terus perkembangan, kegiatan seru, dan informasi penting seputar SMK Swasta Parulian 1 Medan.
            </p>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold hover:bg-secondary transition-colors duration-300 shadow-md">
            Lihat Semua Berita <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid Berita */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataBerita.map((berita, idx) => (
            <article 
              key={berita.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col animate-fade-in"
              style={{ animationDelay: `${(idx + 1) * 150}ms` }}
            >
              {/* Image & Kategori */}
              <div className="relative h-52 overflow-hidden group">
                <img 
                  src={berita.image} 
                  alt={berita.judul} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${getKategoriColor(berita.kategori)}`}>
                  {berita.kategori}
                </span>
              </div>

              {/* Konten Berita */}
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                {/* Meta Data: Tanggal & Penulis */}
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{berita.tanggal}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{berita.penulis}</span>
                  </div>
                </div>

                {/* Judul Berita */}
                <h3 className="text-xl font-bold text-primary mb-3 hover:text-secondary transition-colors line-clamp-2 cursor-pointer">
                  {berita.judul}
                </h3>

                {/* Ringkasan Berita */}
                <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1 line-clamp-3">
                  {berita.ringkasan}
                </p>

                {/* Tombol Baca Selengkapnya */}
                <div className="pt-4 border-t border-gray-50">
                  <button className="text-primary font-bold text-sm flex items-center gap-1.5 hover:text-secondary transition-colors group/btn">
                    Baca Selengkapnya 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};