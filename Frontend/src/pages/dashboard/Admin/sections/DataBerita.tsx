import React, { useState } from "react";
import ModalTambahBerita from "../components/ModalTambahBerita";
import ModalDetailBerita from "../components/ModalDetailBerita";
import ModalEditBerita from "../components/ModalEditBerita";
import ModalHapusBerita from "../components/ModalHapusBerita";
import {
  Menu,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";

// 1. Tipe Data Berita
interface BeritaItem {
  id: string;
  judul: string;
  kategori: string;
  tanggal: string;
  isi: string;
  gambar?: string; // URL gambar, opsional
}

// 2. Data Dummy Berita
const dataBeritaDummy: BeritaItem[] = [
  {
    id: "b1",
    judul: "Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 Dibuka",
    kategori: "Pengumuman",
    tanggal: "12 Mei 2026",
    isi: "Sekolah kami kembali membuka pendaftaran untuk calon peserta didik baru. Proses pendaftaran dapat dilakukan secara online maupun datang langsung ke sekretariat PPDB di sekolah. Segera daftarkan diri Anda sebelum kuota penuh...",
  },
  {
    id: "b2",
    judul: "Tim Robotik Sekolah Raih Juara 1 Tingkat Nasional",
    kategori: "Prestasi",
    tanggal: "05 Mei 2026",
    isi: "Kabar gembira datang dari tim robotik kebanggaan kita yang berhasil meraih juara pertama pada ajang kompetisi robotik tingkat nasional yang diselenggarakan di Jakarta. Prestasi ini menjadi kebanggaan luar biasa...",
  },
  {
    id: "b3",
    judul: "Pelaksanaan Ujian Akhir Semester Genap Berbasis Komputer",
    kategori: "Akademik",
    tanggal: "28 April 2026",
    isi: "Diberitahukan kepada seluruh siswa bahwa Ujian Akhir Semester (UAS) genap akan dilaksanakan secara penuh menggunakan sistem Computer Based Test (CBT). Harap mempersiapkan diri dan memastikan akun login aktif...",
  },
  {
    id: "b4",
    judul: "Kegiatan Ekstrakurikuler Wajib Pramuka Diadakan Minggu Depan",
    kategori: "Kegiatan",
    tanggal: "20 April 2026",
    isi: "Sebagai bagian dari kurikulum pembentukan karakter, ekstrakurikuler wajib pramuka akan dilaksanakan pada hari Jumat dan Sabtu minggu depan. Seluruh siswa kelas X wajib mengikuti kegiatan kemah bakti ini...",
  },
];

export default function DataBeritaContent({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  // State Filter & Pencarian
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");

  // State Dropdown Aksi (Titik Tiga)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [detailBerita, setDetailBerita] = useState<BeritaItem | null>(null);

  const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  const [editBerita, setEditBerita] = useState<BeritaItem | null>(null);
  const [hapusBerita, setHapusBerita] = useState<BeritaItem | null>(null);

  // Logika Filter Berlapis (Search + Kategori)
  const filteredBerita = dataBeritaDummy.filter((item) => {
    const matchSearch =
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.isi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchKategori =
      filterKategori === "Semua" || item.kategori === filterKategori;

    return matchSearch && matchKategori;
  });

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-gray-50 p-6 md:p-10">
      {/* Header Content */}
      <div className="flex items-center gap-4 mb-8 lg:mb-10">
        <button
          className="lg:hidden p-2 bg-white rounded-lg shadow-sm cursor-pointer"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6 text-black" />
        </button>
        <div>
          <p className="text-gray-500 font-medium">Selamat Datang,</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">
            Berita
          </h2>
        </div>
      </div>

      {/* Action Bar (Search & Filter/Tambah) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        {/* Kiri: Search Bar */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="cari berita..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all shadow-sm"
          />
        </div>

        {/* Kanan: Dropdown Kategori & Tombol Tambah */}
        <div className="flex flex-row items-center gap-3 w-full md:w-auto">
          <select
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
            className="w-full md:w-40 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black cursor-pointer shadow-sm"
          >
            <option value="Semua">Kategori</option>
            <option value="Pengumuman">Pengumuman</option>
            <option value="Prestasi">Prestasi</option>
            <option value="Akademik">Akademik</option>
            <option value="Kegiatan">Kegiatan</option>
          </select>

          <button
            onClick={() => setIsModalTambahOpen(true)}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
          >
            Tambah <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Kontainer Grid Card Berita */}
      {filteredBerita.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-24">
          {filteredBerita.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col relative group"
            >
              {/* Thumbnail Gambar (Placeholder X jika tidak ada gambar) */}
              <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
                {item.gambar ? (
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center border-b border-gray-300">
                    {/* Garis X ala wireframe */}
                    <svg
                      className="absolute inset-0 w-full h-full text-gray-300"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2="100"
                        y2="100"
                        stroke="currentColor"
                        strokeWidth="1"
                      ></line>
                      <line
                        x1="100"
                        y1="0"
                        x2="0"
                        y2="100"
                        stroke="currentColor"
                        strokeWidth="1"
                      ></line>
                    </svg>
                    <ImageIcon className="w-10 h-10 text-gray-400 z-10 bg-gray-200 rounded-full p-2" />
                  </div>
                )}

                {/* Tombol Titik Tiga (Absolute di pojok kanan atas gambar) */}
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-md shadow hover:bg-white text-gray-600 transition-colors cursor-pointer z-10"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {/* Dropdown Menu Popup di dalam card */}
                {activeDropdown === item.id && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setActiveDropdown(null)}
                    ></div>
                    <div className="absolute top-12 right-3 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 animate-fade-in">
                      <button
                        onClick={() => setDetailBerita(item)}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> Lihat Detail
                      </button>
                      <button
                        onClick={() => {
                          setEditBerita(item); // Masukkan data card ini ke form Edit
                          setActiveDropdown(null); // Tutup popup menu titik tiga
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => {
                          setHapusBerita(item); // Masukkan data baris ini ke modal hapus
                          setActiveDropdown(null); // Otomatis tutup menu pop-up kecilnya
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Hapus
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Konten Teks Bawah */}
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs font-medium text-gray-500 mb-2">
                  {item.tanggal}, {item.kategori}
                </p>

                <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 line-clamp-2">
                  {item.judul}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3 mb-6">
                  {item.isi}
                </p>

                {/* Footer Card (Link Lihat Selengkapnya) */}
                <div className="mt-auto pt-4 border-t border-gray-100 text-right">
                  <button className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-black transition-colors cursor-pointer">
                    <Eye className="w-3.5 h-3.5" /> Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* State Kosong */
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200">
          <Search className="w-12 h-12 mb-3 text-gray-300" />
          <p className="text-base font-medium text-gray-600">
            Berita tidak ditemukan
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Coba gunakan kata kunci atau kategori lain.
          </p>
        </div>
      )}
      <ModalHapusBerita
        berita={hapusBerita}
        onClose={() => setHapusBerita(null)}
      />
      <ModalEditBerita
        berita={editBerita}
        onClose={() => setEditBerita(null)}
      />
      <ModalTambahBerita
        isOpen={isModalTambahOpen}
        onClose={() => setIsModalTambahOpen(false)}
      />
      <ModalDetailBerita
        berita={detailBerita}
        onClose={() => setDetailBerita(null)}
      />
    </main>
  );
}
