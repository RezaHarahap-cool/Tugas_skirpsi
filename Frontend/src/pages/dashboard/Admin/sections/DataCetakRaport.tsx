import React, { useState } from "react";
import { 
  Menu, Search, Printer, Filter, 
  CheckCircle2, AlertCircle, FileText, Download
} from "lucide-react";

// 1. Tipe Data Siswa untuk Raport
interface RaportSiswaItem {
  id: string;
  nis: string;
  nama: string;
  kelas: string;
  statusNilai: "Lengkap" | "Belum Lengkap";
}

// 2. Data Dummy Siswa
const dataRaportDummy: RaportSiswaItem[] = [
  { id: "r1", nis: "1001", nama: "Ahmad Budi Santoso", kelas: "X AKL 1", statusNilai: "Lengkap" },
  { id: "r2", nis: "1002", nama: "Siti Aisyah", kelas: "X AKL 1", statusNilai: "Lengkap" },
  { id: "r3", nis: "1003", nama: "Reza Yuda Pratama", kelas: "XI PPLG 1", statusNilai: "Belum Lengkap" },
  { id: "r4", nis: "1004", nama: "Dina Mariana", kelas: "XI PPLG 1", statusNilai: "Lengkap" },
  { id: "r5", nis: "1005", nama: "Bagas Saputra", kelas: "XII TJKT 1", statusNilai: "Belum Lengkap" },
];

export default function CetakRaportContent({ onMenuClick }: { onMenuClick: () => void }) {
  // State Filter Control Panel
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTahun, setFilterTahun] = useState("2025/2026");
  const [filterSemester, setFilterSemester] = useState("Genap");
  const [filterKelas, setFilterKelas] = useState("X AKL 1"); // Default fokus ke satu kelas

  // Logika Pencarian dan Filter
  const filteredRaport = dataRaportDummy.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.nis.includes(searchQuery);
    const matchKelas = filterKelas === "Semua" || item.kelas === filterKelas;
    
    return matchSearch && matchKelas;
  });

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-gray-50 p-6 md:p-10">
      
      {/* Header Content */}
      <div className="flex items-center gap-4 mb-8">
        <button className="lg:hidden p-2 bg-white rounded-lg shadow-sm cursor-pointer" onClick={onMenuClick}>
          <Menu className="w-6 h-6 text-black" />
        </button>
        <div>
          <p className="text-gray-500 font-medium">Manajemen Akademik,</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">Cetak Raport</h2>
        </div>
      </div>

      {/* Control Panel (Filter Lanjutan) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="font-bold text-gray-800">Panel Filter Raport</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filter Tahun Ajaran */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Tahun Ajaran</label>
            <select 
              value={filterTahun}
              onChange={(e) => setFilterTahun(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm font-semibold focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="2024/2025">2024/2025</option>
              <option value="2025/2026">2025/2026</option>
            </select>
          </div>

          {/* Filter Semester */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Semester</label>
            <select 
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm font-semibold focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="Ganjil">Ganjil (1)</option>
              <option value="Genap">Genap (2)</option>
            </select>
          </div>

          {/* Filter Kelas */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Pilih Kelas</label>
            <select 
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-sm font-bold focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="Semua">Semua Kelas</option>
              <option value="X AKL 1">X AKL 1</option>
              <option value="XI PPLG 1">XI PPLG 1</option>
              <option value="XII TJKT 1">XII TJKT 1</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Bar (Search & Cetak Massal) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari nama atau NIS siswa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all shadow-sm"
          />
        </div>

        {/* Tombol Cetak Massal (Satu Kelas) */}
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          <Printer className="w-4 h-4" /> Cetak 1 Kelas
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto pb-6">
          <table className="w-full text-left text-sm whitespace-nowrap">
            
            {/* Header Tabel */}
            <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-bold">
              <tr>
                <th className="px-6 py-4 w-16 text-center">No</th>
                <th className="px-6 py-4">NIS</th>
                <th className="px-6 py-4">Nama Siswa</th>
                <th className="px-6 py-4 text-center">Kelas</th>
                <th className="px-6 py-4 text-center">Status Nilai</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>

            {/* Body Tabel */}
            <tbody className="divide-y divide-gray-100">
              {filteredRaport.length > 0 ? (
                filteredRaport.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                    
                    <td className="px-6 py-4 text-center text-gray-900 font-bold">
                      {index + 1}
                    </td>
                    
                    <td className="px-6 py-4 text-gray-600 font-semibold">
                      {item.nis}
                    </td>

                    <td className="px-6 py-4 text-black font-extrabold">
                      {item.nama}
                    </td>

                    <td className="px-6 py-4 text-center font-semibold text-gray-700">
                      {item.kelas}
                    </td>

                    {/* Status Indikator (Lengkap vs Belum Lengkap) */}
                    <td className="px-6 py-4 text-center">
                      {item.statusNilai === "Lengkap" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full font-bold text-xs border border-green-100">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Siap Cetak
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full font-bold text-xs border border-red-100">
                          <AlertCircle className="w-3.5 h-3.5" /> Belum Lengkap
                        </span>
                      )}
                    </td>
                    
                    {/* Kolom Aksi (Tombol Cetak PDF) */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          disabled={item.statusNilai === "Belum Lengkap"}
                          className={`p-2 rounded-lg flex items-center justify-center transition-colors 
                            ${item.statusNilai === "Lengkap" 
                              ? "bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer" 
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                          title="Cetak PDF Raport"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <FileText className="w-12 h-12 mb-3 opacity-20" />
                      <p className="text-base font-medium text-gray-600">Data siswa tidak ditemukan</p>
                      <p className="text-sm mt-1">Pastikan Anda memilih kelas yang tepat di panel filter.</p>
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