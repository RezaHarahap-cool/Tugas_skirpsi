import React, { useState } from "react";
import ModalTambahMapel from "../components/ModalTambahMapel";
import ModalEditMapel from "../components/ModalEditMapel";
import ModalHapusMapel from "../components/ModalHapusMapel";
import { Menu, Search, Plus, MoreVertical, Edit, Trash2 } from "lucide-react";

// 1. Tipe Data Mata Pelajaran
interface MapelItem {
  id: string;
  nama: string;
}

// 2. Data Dummy Mata Pelajaran (Konteks SMK)
const dataMapelDummy: MapelItem[] = [
  { id: "mp1", nama: "Pendidikan Agama dan Budi Pekerti" },
  { id: "mp2", nama: "Pendidikan Pancasila dan Kewarganegaraan" },
  { id: "mp3", nama: "Bahasa Indonesia" },
  { id: "mp4", nama: "Matematika" },
  { id: "mp5", nama: "Bahasa Inggris" },
  { id: "mp6", nama: "Dasar Program Keahlian (Kejuruan)" },
  { id: "mp7", nama: "Proyek Kreatif dan Kewirausahaan" },
];

export default function DataMapelContent({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  const [editMapel, setEditMapel] = useState<MapelItem | null>(null);
  const [hapusMapel, setHapusMapel] = useState<MapelItem | null>(null);

  // State untuk Modals (Persiapan)
  // const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  // const [editMapel, setEditMapel] = useState<MapelItem | null>(null);
  // const [hapusMapel, setHapusMapel] = useState<MapelItem | null>(null);

  // Logika Filter Pencarian
  const filteredMapel = dataMapelDummy.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase()),
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
            Data Mata Pelajaran
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
            placeholder="cari mata pelajaran..."
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

      {/* Table Container (Responsif) */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto pb-24">
          <table className="w-full text-left text-sm whitespace-nowrap">
            {/* Header Tabel */}
            <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-bold">
              <tr>
                <th className="px-6 py-4 w-20 text-center">No</th>
                <th className="px-6 py-4">Mata Pelajaran</th>
                <th className="px-6 py-4 text-center w-24">Aksi</th>
              </tr>
            </thead>

            {/* Body Tabel */}
            <tbody className="divide-y divide-gray-100">
              {filteredMapel.length > 0 ? (
                filteredMapel.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-center text-gray-500 font-bold">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {item.nama}
                    </td>

                    {/* Kolom Aksi (Dropdown Titik Tiga) */}
                    <td className="px-6 py-4 text-center relative">
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className="p-2 rounded-md hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {/* Dropdown Menu Popup (Hanya Edit & Hapus) */}
                      {activeDropdown === item.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setActiveDropdown(null)}
                          ></div>
                          <div className="absolute right-8 top-10 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 animate-fade-in">
                            <button
                              onClick={() => {
                                setEditMapel(item); // Masukkan data baris ini ke form Edit
                                setActiveDropdown(null); // Tutup popup menu titik tiga
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button
                              onClick={() => {
                                setHapusMapel(item); // Masukkan data baris ini ke modal hapus
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
                    colSpan={3}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Mata pelajaran tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalHapusMapel mapel={hapusMapel} onClose={() => setHapusMapel(null)} />
      <ModalEditMapel mapel={editMapel} onClose={() => setEditMapel(null)} />
      <ModalTambahMapel
        isOpen={isModalTambahOpen}
        onClose={() => setIsModalTambahOpen(false)}
      />
    </main>
  );
}
