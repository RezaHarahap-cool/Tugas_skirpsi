import React, { useState } from "react";
import { Menu, FileUp, X, Save } from "lucide-react";

// 1. Tipe Data Siswa
interface SiswaItem {
  id: string;
  nis: string;
  nama: string;
}

// 2. Data Dummy Siswa
const dataSiswaDummy: SiswaItem[] = [
  { id: "s1", nis: "361423", nama: "Siswa A" },
  { id: "s2", nis: "361424", nama: "Siswa B" },
  { id: "s3", nis: "361425", nama: "Siswa C" },
];

export default function DataNilaiContent({ onMenuClick }: { onMenuClick: () => void }) {
  // --- STATE FILTER ---
  const [filter, setFilter] = useState({
    jurusan: "AKL",
    kelas: "X",
    tahunAjaran: "2025/2026",
    semester: "Genap",
    jenisPenilaian: "Tugas",
    mapel: "Matematika",
  });

  // State untuk mengunci jenis penilaian saat tabel dirender (setelah klik Tampilkan)
  const [penilaianAktif, setPenilaianAktif] = useState("");
  const [isTableVisible, setIsTableVisible] = useState(false);

  // State penampung nilai inputan: { "s1": { "Tugas 1": "90", ... } }
  const [grades, setGrades] = useState<Record<string, Record<string, string>>>({});

  // Handler Perubahan Filter
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  // Handler Klik Tampilkan
  const handleTampilkan = () => {
    setPenilaianAktif(filter.jenisPenilaian);
    setIsTableVisible(true);
    // Kosongkan form nilai lama tiap ganti jenis penilaian
    setGrades({}); 
  };

  // Handler Input Nilai
  const handleGradeChange = (siswaId: string, kolom: string, value: string) => {
    setGrades(prev => ({
      ...prev,
      [siswaId]: {
        ...(prev[siswaId] || {}),
        [kolom]: value
      }
    }));
  };

  const handleSimpan = () => {
    console.log("Data Nilai yang Disimpan:", {
      filter_aktif: { ...filter, jenisPenilaian: penilaianAktif },
      data_nilai: grades
    });
    alert(`Nilai ${penilaianAktif} berhasil disimpan ke database!`);
  };

  // Konfigurasi Kolom Dinamis Berdasarkan Jenis Penilaian
  const getColumns = () => {
    switch (penilaianAktif) {
      case "Tugas":
        return ["Tugas 1", "Tugas 2", "Tugas 3", "Tugas 4"];
      case "PH":
        return ["PH1", "PH2", "PH3", "PH4"];
      case "PTS":
        return ["PTS"];
      case "PAS":
        return ["PAS"];
      default:
        return [];
    }
  };

  const activeColumns = getColumns();

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-[#f4f7fb] p-6 md:p-10">
      
      {/* Header Content */}
      <div className="flex items-center gap-4 mb-8">
        <button className="lg:hidden p-2 bg-white rounded-lg shadow-sm cursor-pointer" onClick={onMenuClick}>
          <Menu className="w-6 h-6 text-black" />
        </button>
        <div>
          <p className="text-gray-500 font-medium">Manajemen Akademik,</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">Input Nilai</h2>
        </div>
      </div>

      {/* ========================================== */}
      {/* BAGIAN 1: PANEL FILTER LENGKAP             */}
      {/* ========================================== */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-6">
        
        {/* Baris 1: Jurusan & Kelas (Sekarang jadi Dropdown) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Jurusan</label>
            <select 
              name="jurusan"
              value={filter.jurusan}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="AKL">Akuntansi dan Keuangan Lembaga (AKL)</option>
              <option value="OTKP">Otomatisasi dan Tata Kelola Perkantoran (OTKP)</option>
              <option value="PPLG">Pengembangan Perangkat Lunak dan Gim (PPLG)</option>
              <option value="TJKT">Teknik Jaringan Komputer dan Telekomunikasi (TJKT)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Kelas</label>
            <select 
              name="kelas"
              value={filter.kelas}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
            </select>
          </div>
        </div>

        {/* Baris 2: Parameter Nilai */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Tahun Ajaran</label>
            <select name="tahunAjaran" value={filter.tahunAjaran} onChange={handleFilterChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:border-black cursor-pointer">
              <option value="2024/2025">2024/2025</option>
              <option value="2025/2026">2025/2026</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Semester</label>
            <select name="semester" value={filter.semester} onChange={handleFilterChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:border-black cursor-pointer">
              <option value="Ganjil">Ganjil</option>
              <option value="Genap">Genap</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Jenis Penilaian</label>
            <select name="jenisPenilaian" value={filter.jenisPenilaian} onChange={handleFilterChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:border-black cursor-pointer">
              <option value="Tugas">Tugas</option>
              <option value="PH">Penilaian Harian (PH)</option>
              <option value="PTS">PTS</option>
              <option value="PAS">PAS</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Mapel</label>
            <select name="mapel" value={filter.mapel} onChange={handleFilterChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:border-black cursor-pointer">
              <option value="Matematika">Matematika</option>
              <option value="Bahasa Inggris">Bahasa Inggris</option>
              <option value="Kejuruan">Kejuruan</option>
            </select>
          </div>
          <div>
            <button 
              onClick={handleTampilkan}
              className="w-full bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors cursor-pointer text-sm h-[38px]"
            >
              Tampilkan
            </button>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* BAGIAN 2: AREA TABEL NILAI                 */}
      {/* ========================================== */}
      {isTableVisible && (
        <div className="animate-fade-in">
          
          {/* Tombol Upload Excel */}
          <div className="mb-4">
            <button className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-sm cursor-pointer text-sm">
              <FileUp className="w-4 h-4" /> Upload Nilai dari excel
            </button>
          </div>

          {/* Frame Utama Tabel */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm relative">
            
            <h3 className="text-xl font-extrabold text-black text-center mb-6">
              Nilai {penilaianAktif}
            </h3>

            <div className="border border-gray-200 rounded-xl overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  
                  {/* Header Dinamis */}
                  <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-bold">
                    <tr>
                      <th className="px-4 py-3 w-16 text-center">No</th>
                      <th className="px-4 py-3">Nama</th>
                      {activeColumns.map((col, idx) => (
                        <th key={idx} className="px-4 py-3 text-center w-24">{col}</th>
                      ))}
                    </tr>
                  </thead>

                  {/* Body Tabel Dinamis */}
                  <tbody className="divide-y divide-gray-100">
                    {dataSiswaDummy.map((siswa, index) => (
                      <tr key={siswa.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-center font-bold text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 font-semibold text-black">{siswa.nama}</td>
                        
                        {/* Input Form Dinamis Berdasarkan Kolom Aktif */}
                        {activeColumns.map((col, idx) => (
                          <td key={idx} className="px-4 py-3 text-center">
                            <input 
                              type="number"
                              min="0"
                              max="100"
                              value={grades[siswa.id]?.[col] || ""}
                              onChange={(e) => handleGradeChange(siswa.id, col, e.target.value)}
                              className="w-16 px-2 py-1.5 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black font-semibold bg-white"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tombol Simpan & Batal */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button 
                onClick={() => setIsTableVisible(false)}
                className="px-8 py-2.5 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
              >
                Batal
              </button>
              <button 
                onClick={handleSimpan}
                className="px-8 py-2.5 rounded-lg font-bold text-white bg-black hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
              >
                Simpan
              </button>
            </div>
            
          </div>
        </div>
      )}

    </main>
  );
}