import React, { useState } from "react";
import { Menu, ChevronDown, CalendarDays } from "lucide-react";

// 1. Tipe Data Roster
interface RosterItem {
  id: string;
  sesi: number;
  jamMulai: string;
  jamSelesai: string;
  mapel: string;
  hari: string;
}

// 2. Data Dummy Sesuai Wireframe
const dataRosterDummy: RosterItem[] = [
  // Jadwal Senin
  { id: "r1", sesi: 1, jamMulai: "07:30", jamSelesai: "08:10", mapel: "Matematika", hari: "Senin" },
  { id: "r2", sesi: 2, jamMulai: "08:10", jamSelesai: "08:50", mapel: "Matematika", hari: "Senin" },
  { id: "r3", sesi: 3, jamMulai: "08:50", jamSelesai: "09:30", mapel: "Bhs. Indonesia", hari: "Senin" },
  { id: "r4", sesi: 4, jamMulai: "09:30", jamSelesai: "10:10", mapel: "Agama Kristen", hari: "Senin" },
  { id: "r5", sesi: 5, jamMulai: "10:30", jamSelesai: "11:10", mapel: "Agama Kristen", hari: "Senin" },
  { id: "r6", sesi: 6, jamMulai: "11:10", jamSelesai: "11:50", mapel: "Akuntansi", hari: "Senin" },
  { id: "r7", sesi: 7, jamMulai: "11:50", jamSelesai: "12:30", mapel: "Akuntansi", hari: "Senin" },
  // Tambahan dummy untuk test filter
  { id: "r8", sesi: 1, jamMulai: "07:30", jamSelesai: "08:10", mapel: "Bhs. Inggris", hari: "Selasa" },
];

export default function RosterSiswaContent({ onMenuClick }: { onMenuClick: () => void }) {
  const [filterHari, setFilterHari] = useState("Senin");

  // Filter data berdasarkan hari yang dipilih
  const jadwalTampil = dataRosterDummy.filter((item) => item.hari === filterHari);

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-[#f4f7fb] p-6 md:p-10 custom-scrollbar">
      
      {/* Header Mobile Toggle */}
      <div className="flex items-center gap-4 mb-8">
        <button className="lg:hidden p-2 bg-white rounded-lg shadow-sm cursor-pointer" onClick={onMenuClick}>
          <Menu className="w-6 h-6 text-black" />
        </button>
        <div>
          <p className="text-gray-500 font-medium">Selamat Datang,</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">Jadwal Pelajaran</h2>
        </div>
      </div>

      {/* BOX 1: INFO KELAS & FILTER (Sesuai Wireframe) */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm mb-8 w-full max-w-3xl">
        <h3 className="text-xl font-extrabold text-black mb-6">Roster</h3>
        
        {/* CSS Grid agar titik dua (:) sejajar rapi */}
        <div className="grid grid-cols-[80px_10px_1fr] md:grid-cols-[100px_10px_1fr] gap-y-4 items-center text-sm md:text-base">
          
          <span className="font-bold text-gray-800">Jurusan</span>
          <span className="font-bold text-gray-800">:</span>
          <span className="font-medium text-gray-700">Akuntansi dan Keuangan Lembaga (AKL)</span>
          
          <span className="font-bold text-gray-800">Kelas</span>
          <span className="font-bold text-gray-800">:</span>
          <span className="font-medium text-gray-700">X</span>
          
          <span className="font-bold text-gray-800">Hari</span>
          <span className="font-bold text-gray-800">:</span>
          <div className="relative w-40">
            <select 
              value={filterHari}
              onChange={(e) => setFilterHari(e.target.value)}
              className="w-full appearance-none px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-sm font-semibold text-gray-800 focus:outline-none focus:border-black cursor-pointer"
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

        </div>
      </div>

      {/* BOX 2: TABEL ROSTER */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm max-w-4xl">
        <div className="overflow-x-auto">
          <table className="w-full text-center text-sm whitespace-nowrap">
            
            {/* Header Tabel */}
            <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-800 font-bold">
              <tr>
                <th className="px-6 py-4 w-24">Sesi</th>
                <th className="px-6 py-4 w-32">Jam Mulai</th>
                <th className="px-6 py-4 w-32">Jam Selesai</th>
                <th className="px-6 py-4">Mapel</th>
              </tr>
            </thead>

            {/* Body Tabel */}
            <tbody className="divide-y divide-gray-100">
              {jadwalTampil.length > 0 ? (
                jadwalTampil.map((item, index) => {
                  // Tambahkan baris istirahat secara visual jika ada jeda antara sesi 4 dan 5 (10:10 ke 10:30)
                  const isIstirahat = index === 4;

                  return (
                    <React.Fragment key={item.id}>
                      {isIstirahat && (
                        <tr className="bg-orange-50/50">
                          <td colSpan={4} className="px-6 py-3 font-bold text-orange-600 text-xs tracking-widest uppercase">
                            Istirahat (10:10 - 10:30)
                          </td>
                        </tr>
                      )}
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-extrabold text-gray-900">{item.sesi}</td>
                        <td className="px-6 py-4 font-semibold text-gray-600">{item.jamMulai}</td>
                        <td className="px-6 py-4 font-semibold text-gray-600">{item.jamSelesai}</td>
                        <td className="px-6 py-4 font-bold text-black">{item.mapel}</td>
                      </tr>
                    </React.Fragment>
                  );
                })
              ) : (
                /* Jika tidak ada jadwal di hari tersebut */
                <tr>
                  <td colSpan={4} className="px-6 py-12">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <CalendarDays className="w-12 h-12 mb-3 opacity-30" />
                      <p className="text-base font-medium text-gray-600">Libur / Tidak ada jadwal</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
            
          </table>
        </div>
      </div>

    </main>
  );
}