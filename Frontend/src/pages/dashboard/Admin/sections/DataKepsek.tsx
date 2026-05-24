import React, { useState } from "react";
import ModalTambahKepsek from "../components/ModalTambahKepsek";
import ModalDetailKepsek from "../components/ModalDetailKepsek";
import ModalEditKepsek from "../components/ModalEditKepsek";
import ModalHapusKepsek from "../components/ModalHapusKepsek";
import {
  Menu,
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// 1. Tipe Data Pimpinan / Staf Utama
interface KepsekItem {
  id: string;
  nama: string;
  jk: "L" | "P";
  ijazah: string;
  tugas: string;
  noHp: string;
  foto: string;
  status: "Aktif" | "Non-Aktif"; // Tambahan field status
}

// 2. Data Dummy (Disesuaikan dengan konteks SMK Parulian 1 Medan)
const dataKepsekDummy: KepsekItem[] = [
  {
    id: "k1",
    nama: "Drs. H. Ahmad Fauzi, M.Pd.",
    jk: "L",
    ijazah: "S2",
    tugas: "Kepala Sekolah",
    noHp: "081122334455",
    foto: "",
    status: "Aktif",
  },
  {
    id: "k2",
    nama: "Rina Marlina, S.E.",
    jk: "P",
    ijazah: "S1",
    tugas: "Kepala Tata Usaha",
    noHp: "085565656565",
    foto: "",
    status: "Aktif",
  },
  {
    id: "k3",
    nama: "Budi Santoso, S.Kom.",
    jk: "L",
    ijazah: "S1",
    tugas: "Operator Sekolah",
    noHp: "081298765432",
    foto: "",
    status: "Aktif",
  },
  {
    id: "k4",
    nama: "Dra. Siti Aminah",
    jk: "P",
    ijazah: "S1",
    tugas: "Kepala Sekolah",
    noHp: "081333444555",
    foto: "",
    status: "Non-Aktif", // Contoh data purna tugas
  },
];

export default function DataKepsekContent({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  const [detailKepsek, setDetailKepsek] = useState<KepsekItem | null>(null);
  const [editKepsek, setEditKepsek] = useState<KepsekItem | null>(null);
  const [hapusKepsek, setHapusKepsek] = useState<KepsekItem | null>(null);

  // Fungsi Filter Pencarian
  const filteredKepsek = dataKepsekDummy.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tugas.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
            Data Kepala Sekolah
          </h2>
        </div>
      </div>

      {/* Action Bar: Search & Tambah */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="cari nama atau jabatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
          />
        </div>

        {/* Tombol Tambah */}
        <button
          onClick={() => setIsModalTambahOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
        >
          Tambah <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Table Container (Responsif dengan overflow-x-auto) */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto pb-24">
          <table className="w-full text-left text-sm whitespace-nowrap">
            {/* Header Tabel */}
            <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-bold">
              <tr>
                <th className="px-6 py-4 w-16 text-center">No</th>
                <th className="px-6 py-4 text-center">Foto</th>
                <th className="px-6 py-4">Nama Lengkap</th>
                <th className="px-6 py-4 text-center">Jenis Kelamin</th>
                <th className="px-6 py-4 text-center">Ijazah</th>
                <th className="px-6 py-4">Tugas Diampu</th>
                <th className="px-6 py-4">No. HP</th>
                <th className="px-6 py-4 text-center">Status</th>{" "}
                {/* Kolom Status */}
                <th className="px-6 py-4 text-center w-24">Aksi</th>
              </tr>
            </thead>

            {/* Body Tabel */}
            <tbody className="divide-y divide-gray-100">
              {filteredKepsek.length > 0 ? (
                filteredKepsek.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-center text-gray-500 font-medium">
                      {index + 1}
                    </td>

                    {/* Kolom Foto */}
                    <td className="px-6 py-4 flex justify-center">
                      <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center text-white overflow-hidden relative shadow-sm">
                        {item.foto ? (
                          <img
                            src={item.foto}
                            alt="foto"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full border border-gray-600 flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 font-extrabold text-gray-900">
                      {item.nama}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 font-medium">
                      {item.jk}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 font-medium">
                      {item.ijazah}
                    </td>
                    <td className="px-6 py-4 font-semibold text-primary">
                      {item.tugas}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.noHp}</td>

                    {/* ======================================= */}
                    {/* KOLOM STATUS BERTUGAS (Hijau / Merah)   */}
                    {/* ======================================= */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                          item.status === "Aktif"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {item.status === "Aktif" ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        {item.status}
                      </span>
                    </td>

                    {/* Kolom Aksi (Dropdown Titik Tiga) */}
                    <td className="px-6 py-4 text-center relative">
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className="p-2 rounded-md hover:bg-gray-200 text-gray-500 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {activeDropdown === item.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setActiveDropdown(null)}
                          ></div>
                          <div className="absolute right-8 top-10 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 animate-fade-in">
                            <button
                              onClick={() => {
                                setDetailKepsek(item); // Masukkan data baris ini ke state detail
                                setActiveDropdown(null); // Tutup pop-up menu titik tiganya
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" /> Lihat Detail
                            </button>
                            <button
                              onClick={() => {
                                setEditKepsek(item); // Masukkan data baris ini ke modal edit
                                setActiveDropdown(null); // Tutup menu popup kecilnya
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button
                              onClick={() => {
                                setHapusKepsek(item); // Masukkan data baris ini ke modal hapus
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
                  <td
                    colSpan={9}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Data tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalHapusKepsek
        kepsek={hapusKepsek}
        onClose={() => setHapusKepsek(null)}
      />
      <ModalEditKepsek
        kepsek={editKepsek}
        onClose={() => setEditKepsek(null)}
      />
      <ModalDetailKepsek
        kepsek={detailKepsek}
        onClose={() => setDetailKepsek(null)}
      />
      <ModalTambahKepsek
        isOpen={isModalTambahOpen}
        onClose={() => setIsModalTambahOpen(false)}
      />
    </main>
  );
}
