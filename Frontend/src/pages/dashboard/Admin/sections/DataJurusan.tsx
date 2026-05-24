import React, { useState } from "react";
import ModalTambahJurusan from "../components/ModalTambahJurusan";
import ModalEditJurusan from "../components/ModalEditJurusan";
import ModalHapusJurusan from "../components/ModalHapusJurusan";
import { Menu, Plus, MoreVertical, Edit, Trash2 } from "lucide-react";

// 1. Tipe Data Jurusan
interface JurusanItem {
  id: string;
  nama: string;
  status: "Aktif" | "Non-Aktif";
}

// 2. Data Dummy Jurusan
const dataJurusanDummy: JurusanItem[] = [
  {
    id: "j1",
    nama: "Otomatis Tata Kelola Perkantoran (OTKP)",
    status: "Aktif",
  },
  {
    id: "j2",
    nama: "Akuntansi dan Keuangan Lembaga (AKL)",
    status: "Aktif",
  },
  {
    id: "j3",
    nama: "Teknik Jaringan Komputer dan Telekomunikasi (TJKT)",
    status: "Aktif",
  },
  {
    id: "j4",
    nama: "Pengembangan Perangkat Lunak dan Game (PPLG)",
    status: "Aktif",
  },
];

export default function DataJurusanContent({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  // State untuk Dropdown Aksi (Tiga Titik)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  const [editJurusan, setEditJurusan] = useState<JurusanItem | null>(null);
  const [hapusJurusan, setHapusJurusan] = useState<JurusanItem | null>(null);

  // State untuk Modals (Bisa disiapkan untuk komponen selanjutnya)
  // const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  // const [editJurusan, setEditJurusan] = useState<JurusanItem | null>(null);
  // const [hapusJurusan, setHapusJurusan] = useState<JurusanItem | null>(null);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
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
            Jurusan
          </h2>
        </div>
      </div>

      {/* Action Bar: Hanya Tombol Tambah (Rata Kanan) */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalTambahOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
        >
          Tambah <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Table Container (Responsif) */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto pb-24">
          <table className="w-full text-left text-sm whitespace-nowrap">
            {/* Header Tabel */}
            <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-bold">
              <tr>
                <th className="px-6 py-4 w-16 text-center">No</th>
                <th className="px-6 py-4">Jurusan</th>
                <th className="px-6 py-4 text-center w-32">Status</th>
                <th className="px-6 py-4 text-center w-24">Aksi</th>
              </tr>
            </thead>

            {/* Body Tabel */}
            <tbody className="divide-y divide-gray-100">
              {dataJurusanDummy.length > 0 ? (
                dataJurusanDummy.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-center text-gray-900 font-bold">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {item.nama}
                    </td>

                    {/* Kolom Status (Blok Solid Hijau / Merah sesuai wireframe) */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block px-4 py-1.5 rounded-md text-xs font-bold text-white shadow-sm ${
                          item.status === "Aktif"
                            ? "bg-[#10b981]" // Hijau terang ala Tailwind
                            : "bg-[#ef4444]" // Merah terang ala Tailwind
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Kolom Aksi (Dropdown Titik Tiga) */}
                    <td className="px-6 py-4 text-center relative">
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className="p-2 rounded-md hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {/* Dropdown Menu Popup (Tanpa Lihat Detail) */}
                      {activeDropdown === item.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setActiveDropdown(null)}
                          ></div>
                          <div className="absolute right-8 top-10 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 animate-fade-in">
                            <button
                              onClick={() => {
                                setEditJurusan(item); // Masukkan data baris ini ke modal edit
                                setActiveDropdown(null); // Tutup menu popup
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button
                              onClick={() => {
                                setHapusJurusan(item); // Masukkan data baris ini ke modal hapus
                                setActiveDropdown(null); // Tutup menu popup
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
                    colSpan={4}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Data jurusan belum ada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalHapusJurusan
        jurusan={hapusJurusan}
        onClose={() => setHapusJurusan(null)}
      />
      <ModalEditJurusan
        jurusan={editJurusan}
        onClose={() => setEditJurusan(null)}
      />
      <ModalTambahJurusan
        isOpen={isModalTambahOpen}
        onClose={() => setIsModalTambahOpen(false)}
      />
    </main>
  );
}
