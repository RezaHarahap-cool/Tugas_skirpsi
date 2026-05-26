import React, { useState } from "react";
import { 
  Menu, CheckSquare, Square, Check, X
} from "lucide-react";

// 1. Tipe Data Siswa
interface SiswaKenaikan {
  id: string;
  nis: string;
  nama: string;
  jk: "L" | "P";
  kelas: string;
  jurusan: string;
  tahunAjaran: string;
  noHpWali: string;
}

// 2. Data Dummy Siswa
const dataSiswaDummy: SiswaKenaikan[] = [
  { id: "s1", nis: "361423", nama: "Siswa A", jk: "L", kelas: "XI", jurusan: "AKL", tahunAjaran: "2025/2026", noHpWali: "089765432123" },
  { id: "s2", nis: "361424", nama: "Siswa B", jk: "P", kelas: "XI", jurusan: "AKL", tahunAjaran: "2025/2026", noHpWali: "089765432123" },
  { id: "s3", nis: "361425", nama: "Siswa C", jk: "L", kelas: "XI", jurusan: "AKL", tahunAjaran: "2025/2026", noHpWali: "089765432123" },
  { id: "s4", nis: "361426", nama: "Siswa D", jk: "P", kelas: "XI", jurusan: "AKL", tahunAjaran: "2025/2026", noHpWali: "089765432123" },
];

export default function KenaikanKelasContent({ onMenuClick }: { onMenuClick: () => void }) {
  // State Filter
  const [filterKelas, setFilterKelas] = useState("XI");
  const [filterJurusan, setFilterJurusan] = useState("AKL");
  const [filterTahun, setFilterTahun] = useState("2025/2026");

  // State Pilihan Checkbox Siswa
  const [selectedSiswa, setSelectedSiswa] = useState<string[]>([]);

  // State Form Kenaikan
  const [statusKenaikan, setStatusKenaikan] = useState("Naik Kelas");
  const [kelasTujuan, setKelasTujuan] = useState("");

  // Logika Pilih Semua / Batal Pilih Semua
  const handleSelectAll = () => {
    if (selectedSiswa.length === dataSiswaDummy.length) {
      setSelectedSiswa([]); // Kosongkan jika sudah terpilih semua
    } else {
      setSelectedSiswa(dataSiswaDummy.map(s => s.id)); // Pilih semua ID
    }
  };

  // Logika Pilih/Batal Pilih Satu per Satu
  const toggleSiswa = (id: string) => {
    if (selectedSiswa.includes(id)) {
      setSelectedSiswa(selectedSiswa.filter(siswaId => siswaId !== id));
    } else {
      setSelectedSiswa([...selectedSiswa, id]);
    }
  };

  const isAllSelected = selectedSiswa.length === dataSiswaDummy.length && dataSiswaDummy.length > 0;

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-gray-50 p-6 md:p-10">
      
      {/* Header Content */}
      <div className="flex items-center gap-4 mb-8">
        <button className="lg:hidden p-2 bg-white rounded-lg shadow-sm cursor-pointer" onClick={onMenuClick}>
          <Menu className="w-6 h-6 text-black" />
        </button>
        <div>
          <p className="text-gray-500 font-medium">Selamat Datang,</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">Pengelolaan Kenaikan Kelas</h2>
        </div>
      </div>

      {/* Filter Row & Tombol Pilih Semua */}
      <div className="flex flex-col xl:flex-row justify-between items-end gap-4 mb-6">
        
        {/* Kiri: Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm w-full xl:w-auto">
          <select 
            value={filterKelas}
            onChange={(e) => setFilterKelas(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-semibold focus:outline-none focus:border-black cursor-pointer"
          >
            <option value="X">Kelas X</option>
            <option value="XI">Kelas XI</option>
          </select>

          <select 
            value={filterJurusan}
            onChange={(e) => setFilterJurusan(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-semibold focus:outline-none focus:border-black cursor-pointer"
          >
            <option value="AKL">AKL</option>
            <option value="PPLG">PPLG</option>
            <option value="TJKT">TJKT</option>
          </select>

          <select 
            value={filterTahun}
            onChange={(e) => setFilterTahun(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-semibold focus:outline-none focus:border-black cursor-pointer"
          >
            <option value="2024/2025">Tahun 2024/2025</option>
            <option value="2025/2026">Tahun 2025/2026</option>
          </select>
        </div>

        {/* Kanan: Tombol Pilih Semua */}
        <button 
          onClick={handleSelectAll}
          className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer border-2
            ${isAllSelected 
              ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' 
              : 'bg-black border-black text-white hover:bg-gray-800'}`}
        >
          {isAllSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
          {isAllSelected ? "Batalkan Pilihan" : "Pilih Semua"}
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-bold">
              <tr>
                <th className="px-6 py-4 w-16 text-center">No</th>
                <th className="px-6 py-4">NIS</th>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4 text-center">Jenis Kelamin</th>
                <th className="px-6 py-4 text-center">Kelas</th>
                <th className="px-6 py-4 text-center">Jurusan</th>
                <th className="px-6 py-4 text-center">Tahun Ajaran</th>
                <th className="px-6 py-4">No.Hp Wali</th>
                <th className="px-6 py-4 text-center">Pilih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataSiswaDummy.map((item, index) => {
                const isSelected = selectedSiswa.includes(item.id);
                return (
                  <tr 
                    key={item.id} 
                    onClick={() => toggleSiswa(item.id)}
                    className={`transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                  >
                    <td className="px-6 py-4 text-center font-bold text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{item.nis}</td>
                    <td className="px-6 py-4 text-black font-extrabold">{item.nama}</td>
                    <td className="px-6 py-4 text-center">{item.jk}</td>
                    <td className="px-6 py-4 text-center font-semibold">{item.kelas}</td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-600">{item.jurusan}</td>
                    <td className="px-6 py-4 text-center">{item.tahunAjaran}</td>
                    <td className="px-6 py-4 text-gray-500">{item.noHpWali}</td>
                    <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => toggleSiswa(item.id)}
                        className="w-5 h-5 cursor-pointer accent-blue-600 rounded"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bagian Bawah: Form Penentuan Status & Kelas Tujuan */}
      {selectedSiswa.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg animate-fade-in mb-24">
          <div className="mb-4">
            <h3 className="font-extrabold text-lg text-black">Proses Data Terpilih</h3>
            <p className="text-sm text-gray-500">Anda telah memilih <span className="font-bold text-blue-600">{selectedSiswa.length} siswa</span> untuk diproses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Box 1: Pilih Status */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Status</label>
              <select 
                value={statusKenaikan}
                onChange={(e) => setStatusKenaikan(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg font-bold outline-none cursor-pointer border-2 transition-colors
                  ${statusKenaikan === 'Naik Kelas' ? 'bg-green-500 border-green-600 text-white' : 
                    statusKenaikan === 'Tinggal Kelas' ? 'bg-red-500 border-red-600 text-white' : 
                    'bg-blue-500 border-blue-600 text-white'}`}
              >
                <option value="Naik Kelas" className="bg-white text-black">Naik Kelas</option>
                <option value="Tinggal Kelas" className="bg-white text-black">Tinggal Kelas</option>
                <option value="Lulus" className="bg-white text-black">Lulus</option>
              </select>
            </div>

            {/* Box 2: Kelas Tujuan */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <label className="block text-sm font-bold text-gray-700 mb-2">Kelas Tujuan</label>
              <select 
                value={kelasTujuan}
                onChange={(e) => setKelasTujuan(e.target.value)}
                disabled={statusKenaikan === 'Lulus' || statusKenaikan === 'Tinggal Kelas'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:border-black cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <option value="">-- Pilih Kelas Tujuan --</option>
                <option value="XII AKL 1">XII AKL 1</option>
                <option value="XII AKL 2">XII AKL 2</option>
                <option value="Alumni (Lulus)">Jadikan Alumni</option>
              </select>
            </div>

          </div>

          {/* Tombol Aksi Akhir */}
          <div className="flex justify-end gap-4 border-t border-gray-100 pt-6">
            <button 
              onClick={() => setSelectedSiswa([])}
              className="px-8 py-3 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
            >
              Batal
            </button>
            <button 
              className="px-8 py-3 rounded-xl font-bold bg-black text-white hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
            >
              Simpan Data
            </button>
          </div>
        </div>
      )}

    </main>
  );
}