import React, { useState } from "react";
import { Menu, Calendar } from "lucide-react";

// 1. Tipe Data Siswa untuk Presensi
interface SiswaPresensi {
  id: string;
  nama: string;
  status: "Hadir" | "Izin" | "Sakit" | "Alpha" | "";
  catatan: string;
}

// 2. Data Dummy Siswa (Akan muncul saat filter lengkap)
const initialSiswaData: SiswaPresensi[] = [
  { id: "s1", nama: "Ahmad Budi Santoso", status: "", catatan: "" },
  { id: "s2", nama: "Bagas Saputra", status: "", catatan: "" },
  { id: "s3", nama: "Citra Kirana", status: "", catatan: "" },
  { id: "s4", nama: "Dina Mariana", status: "", catatan: "" },
];

export default function PresensiContent({ onMenuClick }: { onMenuClick: () => void }) {
  // --- STATE UNTUK FILTER (FORM ATAS) ---
  const [filter, setFilter] = useState({
    jurusan: "",
    kelas: "",
    mapel: "",
    pertemuan: "",
    tanggal: new Date().toISOString().split("T")[0], // Default hari ini
  });

  // --- STATE UNTUK INPUTAN BAWAH ---
  const [topik, setTopik] = useState("");
  const [siswaData, setSiswaData] = useState<SiswaPresensi[]>(initialSiswaData);

  // Logika Cek Apakah Filter Sudah Diisi Semua
  const isFilterLengkap = 
    filter.jurusan !== "" && 
    filter.kelas !== "" && 
    filter.mapel !== "" && 
    filter.pertemuan !== "" && 
    filter.tanggal !== "";

  // Handler untuk Form Filter
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  // Handler untuk Radio Button Kehadiran
  const handleStatusChange = (id: string, statusBaru: SiswaPresensi["status"]) => {
    setSiswaData(prev => 
      prev.map(siswa => 
        siswa.id === id ? { ...siswa, status: statusBaru } : siswa
      )
    );
  };

  // Handler untuk Input Catatan
  const handleCatatanChange = (id: string, teks: string) => {
    setSiswaData(prev => 
      prev.map(siswa => 
        siswa.id === id ? { ...siswa, catatan: teks } : siswa
      )
    );
  };

  const handleSimpan = () => {
    console.log("Data Presensi Disimpan:", { filter, topik, siswaData });
    alert("Data Presensi Berhasil Disimpan!");
  };

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-gray-50 p-6 md:p-10">
      
      {/* Header Content */}
      <div className="flex items-center gap-4 mb-6">
        <button className="lg:hidden p-2 bg-white rounded-lg shadow-sm cursor-pointer" onClick={onMenuClick}>
          <Menu className="w-6 h-6 text-black" />
        </button>
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">Presensi Siswa</h2>
          <p className="text-gray-500 font-medium">Tahun Ajaran 2025/2026 • Semester Genap</p>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
        
        {/* ========================================== */}
        {/* BAGIAN 1: FILTER (SELALU TAMPIL)           */}
        {/* ========================================== */}
        <div className="space-y-5">
          
          {/* Baris 1: Jurusan (Full Width) */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Jurusan</label>
            <select 
              name="jurusan"
              value={filter.jurusan}
              onChange={handleFilterChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer"
            >
              <option value="">-- Pilih Jurusan --</option>
              <option value="OTKP">Otomatisasi dan Tata Kelola Perkantoran (OTKP)</option>
              <option value="AKL">Akuntansi dan Keuangan Lembaga (AKL)</option>
              <option value="PPLG">Pengembangan Perangkat Lunak dan Gim (PPLG)</option>
            </select>
          </div>

          {/* Baris 2: Kelas & Mata Pelajaran */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Kelas</label>
              <select 
                name="kelas"
                value={filter.kelas}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer"
              >
                <option value="">-- Pilih Kelas --</option>
                <option value="X">Kelas X</option>
                <option value="XI">Kelas XI</option>
                <option value="XII">Kelas XII</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Mata Pelajaran</label>
              <select 
                name="mapel"
                value={filter.mapel}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer"
              >
                <option value="">-- Pilih Mata Pelajaran --</option>
                <option value="Matematika">Matematika</option>
                <option value="Bahasa Inggris">Bahasa Inggris</option>
                <option value="Kejuruan">Kejuruan Produktif</option>
              </select>
            </div>
          </div>

          {/* Baris 3: Pertemuan & Tanggal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Pertemuan Ke-</label>
              <select 
                name="pertemuan"
                value={filter.pertemuan}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer"
              >
                <option value="">-- Pilih Pertemuan --</option>
                {[...Array(16)].map((_, i) => (
                  <option key={i} value={i + 1}>Pertemuan {i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Hari, Tanggal</label>
              <div className="relative">
                <input 
                  type="date" 
                  name="tanggal"
                  value={filter.tanggal}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none cursor-pointer pr-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* BAGIAN 2: TOPIK & TABEL (MUNCUL JIKA LENGKAP) */}
        {/* ========================================== */}
        {isFilterLengkap && (
          <div className="mt-10 pt-8 border-t border-gray-200 animate-fade-in">
            
            {/* Topik Pembelajaran */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-800 mb-2">Topik Pembelajaran</label>
              <input 
                type="text" 
                value={topik}
                onChange={(e) => setTopik(e.target.value)}
                placeholder="Cth: Persamaan Kuadrat dan Fungsi Linear..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Tabel Presensi Siswa */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  
                  {/* Header Tabel */}
                  <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-bold">
                    <tr>
                      <th className="px-4 py-3 w-12 text-center">No</th>
                      <th className="px-4 py-3 w-64">Nama Siswa</th>
                      <th className="px-4 py-3 text-center">Hadir</th>
                      <th className="px-4 py-3 text-center">Izin</th>
                      <th className="px-4 py-3 text-center">Sakit</th>
                      <th className="px-4 py-3 text-center">Tanpa Ket.</th>
                      <th className="px-4 py-3">Catatan</th>
                    </tr>
                  </thead>

                  {/* Body Tabel */}
                  <tbody className="divide-y divide-gray-100">
                    {siswaData.map((siswa, index) => (
                      <tr key={siswa.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-center font-bold text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 font-semibold text-black">{siswa.nama}</td>
                        
                        {/* Radio Button Kehadiran */}
                        <td className="px-4 py-3 text-center">
                          <input type="radio" name={`status-${siswa.id}`} className="w-4 h-4 cursor-pointer accent-blue-600" checked={siswa.status === "Hadir"} onChange={() => handleStatusChange(siswa.id, "Hadir")} />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input type="radio" name={`status-${siswa.id}`} className="w-4 h-4 cursor-pointer accent-blue-600" checked={siswa.status === "Izin"} onChange={() => handleStatusChange(siswa.id, "Izin")} />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input type="radio" name={`status-${siswa.id}`} className="w-4 h-4 cursor-pointer accent-blue-600" checked={siswa.status === "Sakit"} onChange={() => handleStatusChange(siswa.id, "Sakit")} />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input type="radio" name={`status-${siswa.id}`} className="w-4 h-4 cursor-pointer accent-blue-600" checked={siswa.status === "Alpha"} onChange={() => handleStatusChange(siswa.id, "Alpha")} />
                        </td>
                        
                        {/* Input Catatan Bebas */}
                        <td className="px-4 py-2">
                          <input 
                            type="text" 
                            value={siswa.catatan}
                            onChange={(e) => handleCatatanChange(siswa.id, e.target.value)}
                            placeholder="Opsional..."
                            className="w-full min-w-[150px] px-3 py-1.5 rounded-md border border-gray-200 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tombol Aksi Akhir */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button 
                type="button"
                className="px-6 py-2.5 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
              >
                Batal
              </button>
              <button 
                type="button"
                onClick={handleSimpan}
                className="px-8 py-2.5 rounded-lg font-bold text-white bg-black hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
              >
                Simpan
              </button>
            </div>
            
          </div>
        )}

      </div>
    </main>
  );
}