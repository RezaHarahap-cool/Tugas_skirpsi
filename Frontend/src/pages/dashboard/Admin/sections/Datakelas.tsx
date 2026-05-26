import ModalTambahKelas from "../components/ModalTambahKelas";
import ModalEditKelas from "../components/ModalEditKelas";
import ModalHapusKelas from "../components/ModalHapusKelas";

import React, { useState } from "react";
import {
  Menu,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Users,
  ChevronDown,
  Filter,
} from "lucide-react";

// 1. Tipe Data Kelas (Ditambah atribut tingkat dan jurusan untuk filter)
interface KelasItem {
  id: string;
  namaKelas: string;
  tingkat: string;
  jurusan: string;
  waliKelas: string;
  jumlahSiswa: number;
}

// 2. Data Dummy Kelas (Konteks SMK)
const dataKelasDummy: KelasItem[] = [
  {
    id: "k1",
    namaKelas: "X AKL 1",
    tingkat: "X",
    jurusan: "AKL",
    waliKelas: "Siti Aminah, S.Pd.",
    jumlahSiswa: 36,
  },
  {
    id: "k2",
    namaKelas: "X AKL 2",
    tingkat: "X",
    jurusan: "AKL",
    waliKelas: "Budi Santoso, M.Pd.",
    jumlahSiswa: 35,
  },
  {
    id: "k3",
    namaKelas: "XI PPLG 1",
    tingkat: "XI",
    jurusan: "PPLG",
    waliKelas: "Reza Yuda, S.Kom.",
    jumlahSiswa: 32,
  },
  {
    id: "k4",
    namaKelas: "XI TJKT 1",
    tingkat: "XI",
    jurusan: "TJKT",
    waliKelas: "Ahmad Fauzi, S.T.",
    jumlahSiswa: 34,
  },
  {
    id: "k5",
    namaKelas: "XII OTKP 1",
    tingkat: "XII",
    jurusan: "OTKP",
    waliKelas: "Dra. Rina Mulyani",
    jumlahSiswa: 30,
  },
];

export default function DataKelasContent({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  // State untuk Pencarian dan Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTingkat, setFilterTingkat] = useState("Semua");
  const [filterJurusan, setFilterJurusan] = useState("Semua");

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  const [editKelas, setEditKelas] = useState<KelasItem | null>(null);
  const [hapusKelas, setHapusKelas] = useState<KelasItem | null>(null);

  // State untuk Modals (Persiapan)
  // const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  // const [editKelas, setEditKelas] = useState<KelasItem | null>(null);
  // const [hapusKelas, setHapusKelas] = useState<KelasItem | null>(null);

  // Logika Filter Berlapis (Pencarian + Dropdown Tingkat + Dropdown Jurusan)
  const filteredKelas = dataKelasDummy.filter((item) => {
    const matchSearch =
      item.namaKelas.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.waliKelas.toLowerCase().includes(searchQuery.toLowerCase());

    const matchTingkat =
      filterTingkat === "Semua" || item.tingkat === filterTingkat;
    const matchJurusan =
      filterJurusan === "Semua" || item.jurusan === filterJurusan;

    return matchSearch && matchTingkat && matchJurusan;
  });

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-white p-6 md:p-10">
      {/* Header Content */}
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
            Data Kelas
          </h2>
        </div>
      </div>

      {/* Action Bar: Search, Filters, dan Tombol Tambah */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6  rounded-xl ">
        {/* Kiri: Area Filter & Search */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <Filter className="w-5 h-5 text-gray-400 hidden md:block" />

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari kelas / wali kelas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>

          {/* Dropdown Tingkat Kelas */}
          <div className="relative w-full sm:w-36">
            <select
              value={filterTingkat}
              onChange={(e) => setFilterTingkat(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-bold focus:outline-none focus:border-black cursor-pointer text-gray-700"
            >
              <option value="Semua">Semua Kelas</option>
              <option value="X">Kelas X</option>
              <option value="XI">Kelas XI</option>
              <option value="XII">Kelas XII</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Dropdown Jurusan */}
          <div className="relative w-full sm:w-44">
            <select
              value={filterJurusan}
              onChange={(e) => setFilterJurusan(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-bold focus:outline-none focus:border-black cursor-pointer text-gray-700"
            >
              <option value="Semua">Semua Jurusan</option>
              <option value="PPLG">PPLG</option>
              <option value="TJKT">TJKT</option>
              <option value="AKL">AKL</option>
              <option value="OTKP">OTKP</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Kanan: Tombol Tambah */}
        <button
          onClick={() => setIsModalTambahOpen(true)}
          className="w-full xl:w-auto flex items-center justify-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
        >
          Tambah <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto pb-24">
          <table className="w-full text-left text-sm whitespace-nowrap">
            {/* Header Tabel */}
            <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-bold">
              <tr>
                <th className="px-6 py-4 w-16 text-center">No</th>
                <th className="px-6 py-4">Nama Kelas</th>
                <th className="px-6 py-4">Jurusan</th>
                <th className="px-6 py-4">Wali Kelas</th>
                <th className="px-6 py-4 text-center">Jumlah Siswa</th>
                <th className="px-6 py-4 text-center w-24">Aksi</th>
              </tr>
            </thead>

            {/* Body Tabel */}
            <tbody className="divide-y divide-gray-100">
              {filteredKelas.length > 0 ? (
                filteredKelas.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-center text-gray-900 font-bold">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 text-black font-extrabold">
                      {item.namaKelas}
                    </td>

                    {/* Kolom Baru: Jurusan */}
                    <td className="px-6 py-4 text-gray-600 font-semibold">
                      {item.jurusan}
                    </td>

                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {item.waliKelas}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-bold text-xs border border-blue-100">
                        <Users className="w-3.5 h-3.5" /> {item.jumlahSiswa}{" "}
                        Siswa
                      </span>
                    </td>

                    {/* Kolom Aksi */}
                    <td className="px-6 py-4 text-center relative">
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className="p-2 rounded-md hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {/* Dropdown Menu Popup */}
                      {activeDropdown === item.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setActiveDropdown(null)}
                          ></div>
                          <div className="absolute right-8 top-10 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 animate-fade-in">
                            <button
                              onClick={() => {
                                setEditKelas(item); // Masukkan data baris ini ke form Edit
                                setActiveDropdown(null); // Tutup popup menu titik tiga
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button
                              onClick={() => {
                                setHapusKelas(item); // Masukkan data baris ini ke modal hapus
                                setActiveDropdown(null); // Otomatis tutup menu pop-up kecilnya
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
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Filter className="w-10 h-10 mb-3 opacity-20" />
                      <p className="text-base font-medium text-gray-600">
                        Kelas tidak ditemukan
                      </p>
                      <p className="text-sm mt-1">
                        Coba sesuaikan kata kunci pencarian atau filter Anda.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalHapusKelas kelas={hapusKelas} onClose={() => setHapusKelas(null)} />
      <ModalEditKelas kelas={editKelas} onClose={() => setEditKelas(null)} />
      <ModalTambahKelas
        isOpen={isModalTambahOpen}
        onClose={() => setIsModalTambahOpen(false)}
      />
    </main>
  );
}
