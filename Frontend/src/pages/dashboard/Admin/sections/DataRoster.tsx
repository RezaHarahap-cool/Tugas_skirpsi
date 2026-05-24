import React, { useState } from "react";
import ModalTambahRoster from "../components/ModalTambahRoster";
import ModalDetailRoster from "../components/ModalDetailRoster";
import ModalEditRoster from "../components/ModalEditRoster";
import ModalHapusRoster from "../components/ModalHapusRoster";
import {
  Menu,
  Plus,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  ChevronDown,
  CalendarDays,
} from "lucide-react";

// 1. Tipe Data Roster (Jadwal)
interface RosterItem {
  id: string;
  sesi: number;
  jamMulai: string;
  jamSelesai: string;
  mapel: string;
  guru: string;
  // Atribut tambahan untuk filter
  hari: string;
  kelas: string;
  jurusan: string;
}

// 2. Data Dummy Roster
const dataRosterDummy: RosterItem[] = [
  {
    id: "r1",
    sesi: 1,
    jamMulai: "07:30",
    jamSelesai: "08:10",
    mapel: "Matematika",
    guru: "Guru A",
    hari: "Senin",
    kelas: "X",
    jurusan: "AKL",
  },
  {
    id: "r2",
    sesi: 2,
    jamMulai: "08:10",
    jamSelesai: "08:50",
    mapel: "Matematika",
    guru: "Guru A",
    hari: "Senin",
    kelas: "X",
    jurusan: "AKL",
  },
  {
    id: "r3",
    sesi: 3,
    jamMulai: "08:50",
    jamSelesai: "09:30",
    mapel: "Bhs. Indonesia",
    guru: "Guru B",
    hari: "Senin",
    kelas: "X",
    jurusan: "AKL",
  },
  {
    id: "r4",
    sesi: 4,
    jamMulai: "09:30",
    jamSelesai: "10:10",
    mapel: "Agama Kristen",
    guru: "Guru C",
    hari: "Senin",
    kelas: "X",
    jurusan: "AKL",
  },
  {
    id: "r5",
    sesi: 5,
    jamMulai: "10:30",
    jamSelesai: "11:10",
    mapel: "Agama Kristen",
    guru: "Guru C",
    hari: "Senin",
    kelas: "X",
    jurusan: "AKL",
  },
  {
    id: "r6",
    sesi: 6,
    jamMulai: "11:10",
    jamSelesai: "11:50",
    mapel: "Akuntansi",
    guru: "Guru D",
    hari: "Senin",
    kelas: "X",
    jurusan: "AKL",
  },
  {
    id: "r7",
    sesi: 7,
    jamMulai: "11:50",
    jamSelesai: "12:30",
    mapel: "Akuntansi",
    guru: "Guru D",
    hari: "Senin",
    kelas: "X",
    jurusan: "AKL",
  },

  // Contoh data beda filter agar bisa dites
  {
    id: "r8",
    sesi: 1,
    jamMulai: "07:30",
    jamSelesai: "08:10",
    mapel: "Pemrograman Web",
    guru: "Guru E",
    hari: "Selasa",
    kelas: "XI",
    jurusan: "PPLG",
  },
];

export default function DataRosterContent({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  // State untuk 3 Filter Utama (Diset default agar tabel tidak kosong di awal)
  const [filterHari, setFilterHari] = useState("Senin");
  const [filterKelas, setFilterKelas] = useState("X");
  const [filterJurusan, setFilterJurusan] = useState("AKL");

  // State Dropdown (Titik tiga)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  const [detailRoster, setDetailRoster] = useState<RosterItem | null>(null);
  const [editRoster, setEditRoster] = useState<RosterItem | null>(null);
  const [hapusRoster, setHapusRoster] = useState<RosterItem | null>(null);

  // State untuk Modals (Disiapkan untuk fitur selanjutnya)
  // const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  // const [editRoster, setEditRoster] = useState<RosterItem | null>(null);
  // const [hapusRoster, setHapusRoster] = useState<RosterItem | null>(null);

  // Logika Filter: Menampilkan data yang cocok dengan KETIGA dropdown
  const filteredRoster = dataRosterDummy.filter((item) => {
    return (
      item.hari === filterHari &&
      item.kelas === filterKelas &&
      item.jurusan === filterJurusan
    );
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
            Data Roster
          </h2>
        </div>
      </div>

      {/* Action Bar: 3 Filter Dropdown & Tombol Tambah */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 rounded-xl ">
        {/* Kiri: Area Filter Berjejer */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <CalendarDays className="w-5 h-5 text-gray-400 hidden sm:block" />

          {/* Filter Hari */}
          <div className="relative w-full sm:w-36">
            <select
              value={filterHari}
              onChange={(e) => setFilterHari(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-bold focus:outline-none focus:border-black cursor-pointer text-gray-700"
            >
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
              <option value="Kamis">Kamis</option>
              <option value="Jumat">Jumat</option>
              <option value="Sabtu">Sabtu</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Filter Kelas */}
          <div className="relative w-full sm:w-28">
            <select
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-bold focus:outline-none focus:border-black cursor-pointer text-gray-700"
            >
              <option value="X">Kelas X</option>
              <option value="XI">Kelas XI</option>
              <option value="XII">Kelas XII</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Filter Jurusan */}
          <div className="relative w-full sm:w-40">
            <select
              value={filterJurusan}
              onChange={(e) => setFilterJurusan(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-bold focus:outline-none focus:border-black cursor-pointer text-gray-700"
            >
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
          className="w-full lg:w-auto flex items-center justify-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
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
                <th className="px-6 py-4 w-16 text-center">Sesi</th>
                <th className="px-6 py-4 text-center">Jam Mulai</th>
                <th className="px-6 py-4 text-center">Jam Selesai</th>
                <th className="px-6 py-4">Mapel</th>
                <th className="px-6 py-4">Guru</th>
                <th className="px-6 py-4 text-center w-24">Aksi</th>
              </tr>
            </thead>

            {/* Body Tabel */}
            <tbody className="divide-y divide-gray-100">
              {filteredRoster.length > 0 ? (
                filteredRoster.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-center text-gray-900 font-bold">
                      {item.sesi}
                    </td>

                    <td className="px-6 py-4 text-center text-gray-600 font-medium">
                      {item.jamMulai}
                    </td>

                    <td className="px-6 py-4 text-center text-gray-600 font-medium">
                      {item.jamSelesai}
                    </td>

                    <td className="px-6 py-4 text-gray-900 font-semibold">
                      {item.mapel}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{item.guru}</td>

                    {/* Kolom Aksi (Titik Tiga) */}
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
                                setDetailRoster(item); // Masukkan data baris ini ke state detail
                                setActiveDropdown(null); // Tutup menu popup kecilnya
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" /> Lihat Detail
                            </button>
                            <button
                              onClick={() => {
                                setEditRoster(item); // Masukkan data baris ini ke modal edit
                                setActiveDropdown(null); // Tutup menu popup kecilnya
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button
                              onClick={() => {
                                setHapusRoster(item); // Masukkan data baris ini ke modal hapus
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
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <CalendarDays className="w-12 h-12 mb-3 opacity-20" />
                      <p className="text-base font-medium text-gray-600">
                        Jadwal belum tersedia
                      </p>
                      <p className="text-sm mt-1">
                        Silakan pilih kombinasi Hari, Kelas, dan Jurusan yang
                        berbeda.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalHapusRoster
        roster={hapusRoster}
        onClose={() => setHapusRoster(null)}
      />
      <ModalEditRoster
        roster={editRoster}
        onClose={() => setEditRoster(null)}
      />
      <ModalDetailRoster
        roster={detailRoster}
        onClose={() => setDetailRoster(null)}
      />
      <ModalTambahRoster
        isOpen={isModalTambahOpen}
        onClose={() => setIsModalTambahOpen(false)}
      />
    </main>
  );
}
