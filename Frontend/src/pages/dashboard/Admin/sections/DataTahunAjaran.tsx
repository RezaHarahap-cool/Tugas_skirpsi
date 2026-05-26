import React, { useState } from "react";
import ModalTambahTahun from "../components/ModalTambahTahun";
import ModalEditTahun from "../components/ModalEditTahun";
import ModalHapusTahun from "../components/ModalHapusTahun";
import { Menu, Plus, MoreVertical, Edit, Trash2 } from "lucide-react";

// 1. Tipe Data Tahun Ajaran
interface TahunAjaranItem {
  id: string;
  tahun: string;
  status: "Aktif" | "Nonaktif";
}

// 2. Data Dummy (Disesuaikan persis dengan wireframe)
const dataTahunAjaranDummy: TahunAjaranItem[] = [
  { id: "ta1", tahun: "2021/2022", status: "Nonaktif" },
  { id: "ta2", tahun: "2022/2023", status: "Nonaktif" },
  { id: "ta3", tahun: "2024/2025", status: "Nonaktif" },
  { id: "ta4", tahun: "2025/2026", status: "Aktif" },
];

export default function DataTahunAjaranContent({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  const [editTahun, setEditTahun] = useState<TahunAjaranItem | null>(null);
  const [hapusTahun, setHapusTahun] = useState<TahunAjaranItem | null>(null);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-white p-6 md:p-10">
      {/* Header Content */}
      <div className="flex items-center gap-4 mb-8 lg:mb-10">
        <button
          className="lg:hidden p-2 bg-gray-100 rounded-lg cursor-pointer"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6 text-black" />
        </button>
        <div>
          <p className="text-gray-500 font-medium">Selamat Datang,</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">
            Tahun Ajaran
          </h2>
        </div>
      </div>

      {/* Action Bar: Hanya Tombol Tambah di sebelah kanan */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalTambahOpen(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
        >
          Tambah <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto pb-24">
          <table className="w-full text-left text-sm whitespace-nowrap">
            {/* Header Tabel */}
            <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-bold">
              <tr>
                <th className="px-6 py-4 w-20">No</th>
                <th className="px-6 py-4 text-center">Tahun Ajaran</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center w-24">aksi</th>
              </tr>
            </thead>

            {/* Body Tabel */}
            <tbody className="divide-y divide-gray-100">
              {dataTahunAjaranDummy.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  {/* Kolom No */}
                  <td className="px-6 py-4 text-black font-extrabold">
                    {index + 1}
                  </td>

                  {/* Kolom Tahun Ajaran */}
                  <td className="px-6 py-4 text-center text-gray-800 font-medium">
                    {item.tahun}
                  </td>

                  {/* Kolom Status dengan Badge Warna Solid */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-4 py-1.5 rounded-md text-xs font-bold text-white shadow-sm
                        ${
                          item.status === "Aktif"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }
                      `}
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
                              setEditTahun(item); // Masukkan data baris ini ke form Edit
                              setActiveDropdown(null); // Tutup popup menu titik tiga
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" /> Edit
                          </button>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button
                            onClick={() => {
                              setHapusTahun(item); // Masukkan data baris ini ke modal hapus
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalHapusTahun
        tahunAjaran={hapusTahun}
        onClose={() => setHapusTahun(null)}
      />
      <ModalEditTahun
        tahunAjaran={editTahun}
        onClose={() => setEditTahun(null)}
      />
      <ModalTambahTahun
        isOpen={isModalTambahOpen}
        onClose={() => setIsModalTambahOpen(false)}
      />
    </main>
  );
}
