import React, { useState } from "react";
import ModalTambahSiswa from "../components/ModalTambahSiswa";
import ModalDetailSiswa from "../components/ModalDetailSiswa";
import ModalEditSiswa from "../components/ModalEditSiswa";
import ModalHapusSiswa from "../components/ModalHapusSiswa";
import {
  Menu,
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  Image as ImageIcon,
} from "lucide-react"; // <-- Tambahkan Image as ImageIcon di sini

// 1. Tipe Data Siswa (Ditambah foto)
interface SiswaItem {
  id: string;
  nis: string;
  nama: string;
  jk: "L" | "P";
  kelas: string;
  jurusan: string;
  namaAyah: string;
  noHpWali: string;
  foto: string; // <-- Tambahan foto
}

// 2. Data Dummy Siswa
const dataSiswaDummy: SiswaItem[] = [
  {
    id: "s1",
    nis: "3614.23",
    nama: "Siswa A",
    jk: "L",
    kelas: "XII",
    jurusan: "AKL",
    namaAyah: "Polan",
    noHpWali: "088765432123",
    foto: "",
  },
  {
    id: "s2",
    nis: "3614.24",
    nama: "Siswa B",
    jk: "P",
    kelas: "XII",
    jurusan: "AKL",
    namaAyah: "Reno",
    noHpWali: "088765432123",
    foto: "",
  },
  {
    id: "s3",
    nis: "3614.25",
    nama: "Siswa C",
    jk: "L",
    kelas: "XII",
    jurusan: "AKL",
    namaAyah: "Palan",
    noHpWali: "088765432123",
    foto: "",
  },
  {
    id: "s4",
    nis: "3615.01",
    nama: "Reza Yuda",
    jk: "L",
    kelas: "XI",
    jurusan: "PPLG",
    namaAyah: "Harahap",
    noHpWali: "081122334455",
    foto: "",
  },
  {
    id: "s5",
    nis: "3615.02",
    nama: "Siti Rahma",
    jk: "P",
    kelas: "X",
    jurusan: "TJKT",
    namaAyah: "Budi",
    noHpWali: "085566778899",
    foto: "",
  },
];

export default function DataSiswaContent({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKelas, setFilterKelas] = useState("Semua Kelas");
  const [filterJurusan, setFilterJurusan] = useState("Semua Jurusan");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  const [detailSiswa, setDetailSiswa] = useState<SiswaItem | null>(null);
  const [editSiswa, setEditSiswa] = useState<SiswaItem | null>(null);
  const [hapusSiswa, setHapusSiswa] = useState<SiswaItem | null>(null);

  const filteredSiswa = dataSiswaDummy.filter((siswa) => {
    const matchSearch =
      siswa.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      siswa.nis.includes(searchQuery);
    const matchKelas =
      filterKelas === "Semua Kelas" || siswa.kelas === filterKelas;
    const matchJurusan =
      filterJurusan === "Semua Jurusan" || siswa.jurusan === filterJurusan;

    return matchSearch && matchKelas && matchJurusan;
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
            Data Siswa
          </h2>
        </div>
      </div>

      {/* Action Bar (Filter & Search) */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-36">
            <select
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-semibold focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="Semua Kelas">Kelas</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <div className="relative w-full sm:w-40">
            <select
              value={filterJurusan}
              onChange={(e) => setFilterJurusan(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-semibold focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="Semua Jurusan">Jurusan</option>
              <option value="PPLG">PPLG</option>
              <option value="TJKT">TJKT</option>
              <option value="AKL">AKL</option>
              <option value="OTKP">OTKP</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="cari siswa atau NIS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>

          <button
            onClick={() => setIsModalTambahOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-sm"
          >
            Tambah <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto pb-24">
          <table className="w-full text-left text-sm whitespace-nowrap">
            {/* Header Tabel */}
            <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-bold">
              <tr>
                <th className="px-6 py-4 w-16 text-center">No</th>
                <th className="px-6 py-4 text-center">Foto</th>{" "}
                {/* <-- Tambahan Header Foto */}
                <th className="px-6 py-4">NIS</th>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4 text-center">Jenis Kelamin</th>
                <th className="px-6 py-4 text-center">Kelas</th>
                <th className="px-6 py-4 text-center">Jurusan</th>
                <th className="px-6 py-4">Nama Ayah</th>
                <th className="px-6 py-4">No.Hp Wali</th>
                <th className="px-6 py-4 text-center w-24">Aksi</th>
              </tr>
            </thead>

            {/* Body Tabel */}
            <tbody className="divide-y divide-gray-100">
              {filteredSiswa.length > 0 ? (
                filteredSiswa.map((siswa, index) => (
                  <tr
                    key={siswa.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-center text-gray-500 font-medium">
                      {index + 1}
                    </td>

                    {/* <-- Tambahan Body Foto --> */}
                    <td className="px-6 py-4 flex justify-center">
                      <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center text-white overflow-hidden relative">
                        {siswa.foto ? (
                          <img
                            src={siswa.foto}
                            alt={`Foto ${siswa.nama}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full border border-gray-600 flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-600">
                      {siswa.nis}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {siswa.nama}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {siswa.jk}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-900 font-semibold">
                      {siswa.kelas}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-900 font-semibold">
                      {siswa.jurusan}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {siswa.namaAyah}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {siswa.noHpWali}
                    </td>

                    {/* Kolom Aksi */}
                    <td className="px-6 py-4 text-center relative">
                      <button
                        onClick={() => toggleDropdown(siswa.id)}
                        className="p-2 rounded-md hover:bg-gray-200 text-gray-500 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {activeDropdown === siswa.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setActiveDropdown(null)}
                          ></div>
                          <div className="absolute right-8 top-10 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 animate-fade-in">
                            <button
                              onClick={() => {
                                setDetailSiswa(siswa); // Kirim data siswa ke state detail
                                setActiveDropdown(null); // Tutup menu popup kecilnya
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" /> Lihat Detail
                            </button>
                            <button
                              onClick={() => {
                                setEditSiswa(siswa); // Kirim data siswa ini ke form Edit
                                setActiveDropdown(null); // Tutup menu popup kecilnya
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button
                              onClick={() => {
                                setHapusSiswa(siswa); // Kirim data siswa baris ini ke modal hapus
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
                  {/* <-- colSpan diubah jadi 10 karena ketambahan 1 kolom foto --> */}
                  <td
                    colSpan={10}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Data siswa tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalHapusSiswa siswa={hapusSiswa} onClose={() => setHapusSiswa(null)} />
      <ModalEditSiswa siswa={editSiswa} onClose={() => setEditSiswa(null)} />
      <ModalDetailSiswa
        siswa={detailSiswa}
        onClose={() => setDetailSiswa(null)}
      />
      <ModalTambahSiswa
        isOpen={isModalTambahOpen}
        onClose={() => setIsModalTambahOpen(false)}
      />
    </main>
  );
}
