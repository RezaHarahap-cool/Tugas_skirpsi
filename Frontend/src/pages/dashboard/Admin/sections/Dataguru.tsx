import React, { useState } from "react";
import ModalTambahGuru from "../components/ModalTambahGuru";
import ModalDetailGuru from "../components/ModalDetailGuru";
import ModalEditGuru from "../components/ModalEditGuru";
import ModalHapusGuru from "../components/ModalHapusGuru";
import {
  Menu,
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

// 1. Tipe Data Guru
interface GuruItem {
  id: string;
  nama: string;
  jk: "L" | "P";
  ijazah: string;
  mapel: string;
  noHp: string;
  foto: string; // URL foto
}

// 2. Data Dummy Guru (Disesuaikan dengan konteks SMK)
const dataGuruDummy: GuruItem[] = [
  {
    id: "g1",
    nama: "Budi Santoso, S.Kom., M.T.",
    jk: "L",
    ijazah: "S2",
    mapel: "Pemrograman Web",
    noHp: "081234567890",
    foto: "", // Kosongkan untuk melihat tampilan fallback icon
  },
  {
    id: "g2",
    nama: "Siti Aminah, S.Pd.",
    jk: "P",
    ijazah: "S1",
    mapel: "Bhs. Inggris",
    noHp: "081298765432",
    foto: "",
  },
  {
    id: "g3",
    nama: "Andi Wijaya, S.T.",
    jk: "L",
    ijazah: "S1",
    mapel: "Jaringan Komputer",
    noHp: "085565656565",
    foto: "",
  },
  {
    id: "g4",
    nama: "Rina Marlina, S.E.",
    jk: "P",
    ijazah: "S1",
    mapel: "Akuntansi",
    noHp: "081122334455",
    foto: "",
  },
];

export default function DataGuruContent({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  // State untuk melacak baris mana yang menu titik tiganya sedang terbuka
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailGuru, setDetailGuru] = useState<GuruItem | null>(null);
  const [editGuru, setEditGuru] = useState<GuruItem | null>(null);
  const [hapusGuru, setHapusGuru] = useState<GuruItem | null>(null);

  // Fungsi Filter Pencarian
  const filteredGuru = dataGuruDummy.filter(
    (guru) =>
      guru.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guru.mapel.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Fungsi Toggle Dropdown
  const toggleDropdown = (id: string) => {
    if (activeDropdown === id) {
      setActiveDropdown(null); // Tutup jika diklik lagi
    } else {
      setActiveDropdown(id); // Buka dropdown baris ini
    }
  };

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-white p-6 md:p-10">
      {/* Header Content & Mobile Menu Toggle */}
      <div className="flex items-center gap-4 mb-8 lg:mb-10">
        <button
          className="lg:hidden p-2 bg-gray-100 rounded-lg"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6 text-black" />
        </button>
        <div>
          <p className="text-gray-500 font-medium">Selamat Datang,</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">
            Data Guru
          </h2>
        </div>
      </div>

      {/* Action Bar: Search & Tambah Data */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="cari guru atau mapel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
          />
        </div>

        {/* Tombol Tambah */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
        >
          Tambah <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Table Container (Responsif dengan overflow-x-auto) */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto pb-24">
          {" "}
          {/* pb-24 agar dropdown terbawah tidak terpotong area scroll */}
          <table className="w-full text-left text-sm whitespace-nowrap">
            {/* Header Tabel */}
            <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-bold">
              <tr>
                <th className="px-6 py-4 w-16 text-center">No</th>
                <th className="px-6 py-4">Foto</th>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4 text-center">Jenis Kelamin</th>
                <th className="px-6 py-4 text-center">Ijazah Tertinggi</th>
                <th className="px-6 py-4">Mapel</th>
                <th className="px-6 py-4">No.Hp</th>
                <th className="px-6 py-4 text-center w-24">Aksi</th>
              </tr>
            </thead>

            {/* Body Tabel */}
            <tbody className="divide-y divide-gray-100">
              {filteredGuru.length > 0 ? (
                filteredGuru.map((guru, index) => (
                  <tr
                    key={guru.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-center text-gray-500 font-medium">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      {/* Box Foto */}
                      <div className="w-12 h-10 bg-gray-900 rounded flex items-center justify-center text-white overflow-hidden relative">
                        {guru.foto ? (
                          <img
                            src={guru.foto}
                            alt="foto"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          // Fallback jika tidak ada foto (seperti kotak X di wireframe)
                          <div className="w-full h-full border border-gray-600 flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {guru.nama}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {guru.jk}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {guru.ijazah}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{guru.mapel}</td>
                    <td className="px-6 py-4 text-gray-600">{guru.noHp}</td>

                    {/* Kolom Aksi (Titik Tiga & Dropdown) */}
                    <td className="px-6 py-4 text-center relative">
                      <button
                        onClick={() => toggleDropdown(guru.id)}
                        className="p-2 rounded-md hover:bg-gray-200 text-gray-500 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {/* Dropdown Menu Popup */}
                      {activeDropdown === guru.id && (
                        <>
                          {/* Invisible overlay untuk menutup dropdown jika klik di luar area */}
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setActiveDropdown(null)}
                          ></div>

                          <div className="absolute right-8 top-10 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 animate-fade-in">
                            <button
                              onClick={() => {
                                setDetailGuru(guru); // Masukkan data guru baris ini ke modal
                                setActiveDropdown(null); // Tutup menu dropdown kecilnya
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                            >
                              <Eye className="w-3.5 h-3.5" /> Lihat Detail
                            </button>
                            <button
                              onClick={() => {
                                setEditGuru(guru); // Masukkan data baris ini ke modal edit
                                setActiveDropdown(null); // Tutup menu popup kecilnya
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                            >
                              <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button
                              onClick={() => {
                                setHapusGuru(guru); // Masukkan data baris ini ke modal hapus
                                setActiveDropdown(null); // Tutup menu popup kecilnya
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Hapus
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                // Tampilan jika data tidak ditemukan
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Data guru tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalHapusGuru 
        guru={hapusGuru} 
        onClose={() => setHapusGuru(null)} 
      />
      <ModalEditGuru guru={editGuru} onClose={() => setEditGuru(null)} />
      <ModalDetailGuru guru={detailGuru} onClose={() => setDetailGuru(null)} />
      <ModalTambahGuru
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
