import React, { useState } from "react";
import { Menu, ChevronDown, ArrowUpRight, SearchX } from "lucide-react";
import ModalDetailAbsensi from "../components/ModalDetailAbsensi"; // Sesuaikan path jika perlu

// 1. Tipe Data Gabungan (Untuk Card dan untuk Modal)
interface DataAbsensi {
  id: string;
  mapel: string;
  kelas: string;
  semester: string;
  guruPengajar: string;
  // --- Field tambahan untuk Modal Detail ---
  pertemuan: number;
  tanggal: string;
  topik: string;
  keterangan: "Hadir" | "Izin" | "Sakit" | "Alpha";
  catatan_sikap: string;
}

// 2. Data Dummy Lengkap
const dataAbsensiDummy: DataAbsensi[] = [
  { 
    id: "ab1", mapel: "Matematika", kelas: "X", semester: "Genap", guruPengajar: "Siti Aminah, S.Pd.",
    pertemuan: 5, tanggal: "Selasa, 18 Maret 2026", topik: "Persamaan Kuadrat dan Fungsi Linear", keterangan: "Hadir", catatan_sikap: "Aktif bertanya dan memperhatikan penjelasan."
  },
  { 
    id: "ab2", mapel: "Pendidikan Pancasila", kelas: "X", semester: "Genap", guruPengajar: "Budi Santoso, M.Pd.",
    pertemuan: 4, tanggal: "Senin, 17 Maret 2026", topik: "Sejarah Perumusan Pancasila", keterangan: "Sakit", catatan_sikap: "Siswa memberikan surat keterangan sakit dari dokter."
  },
  { 
    id: "ab3", mapel: "Dasar-dasar Kejuruan", kelas: "X", semester: "Genap", guruPengajar: "Reza Yuda, S.Kom.",
    pertemuan: 8, tanggal: "Rabu, 19 Maret 2026", topik: "Pengenalan Algoritma Dasar", keterangan: "Hadir", catatan_sikap: "Mampu menyelesaikan studi kasus dengan baik."
  },
];

export default function AbsensiContent({ onMenuClick }: { onMenuClick: () => void }) {
  // State Filter Card
  const [filterKelas, setFilterKelas] = useState("X");
  const [filterSemester, setFilterSemester] = useState("Genap");
  
  // State Data Card yang Tampil
  const [dataTampil, setDataTampil] = useState<DataAbsensi[]>(dataAbsensiDummy);

  // STATE UNTUK MODAL DETAIL
  const [detailAbsensi, setDetailAbsensi] = useState<DataAbsensi | null>(null);

  const handleTampilkan = () => {
    const filtered = dataAbsensiDummy.filter(
      (item) => 
        (filterKelas === "Semua" || item.kelas === filterKelas) &&
        (filterSemester === "Semua" || item.semester === filterSemester)
    );
    setDataTampil(filtered);
  };

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-[#f4f7fb] p-6 md:p-10 custom-scrollbar">
      
      {/* Header Content */}
      <div className="flex items-center gap-4 mb-8">
        <button className="lg:hidden p-2 bg-white rounded-lg shadow-sm cursor-pointer" onClick={onMenuClick}>
          <Menu className="w-6 h-6 text-black" />
        </button>
        <div>
          <p className="text-gray-500 font-medium">Selamat Datang,</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">Absensi</h2>
        </div>
      </div>

      {/* Action Bar (Filter Dropdowns) */}
      <div className="flex justify-start md:justify-end mb-8">
        <div className="flex flex-wrap items-center gap-3 bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm w-full md:w-auto">
          <div className="relative w-full sm:w-32">
            <select 
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="w-full appearance-none px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="Semua">Kelas</option>
              <option value="X">Kelas X</option>
              <option value="XI">Kelas XI</option>
              <option value="XII">Kelas XII</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <div className="relative w-full sm:w-36">
            <select 
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="w-full appearance-none px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="Semua">Semester</option>
              <option value="Ganjil">Ganjil</option>
              <option value="Genap">Genap</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <button 
            onClick={handleTampilkan}
            className="w-full sm:w-auto bg-black text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Tampilkan
          </button>
        </div>
      </div>

      {/* Grid Cards Container */}
      {dataTampil.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {dataTampil.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col group overflow-hidden"
            >
              
              {/* Bagian Atas Card (Info Mapel) */}
              <div className="p-6 flex-1">
                <h3 className="text-lg font-extrabold text-gray-900 mb-5 leading-tight line-clamp-2">
                  {item.mapel}
                </h3>
                
                <div className="grid grid-cols-[110px_10px_1fr] text-sm gap-y-2.5">
                  <span className="text-gray-500 font-medium">Kelas</span>
                  <span className="text-gray-400">:</span>
                  <span className="font-bold text-gray-900">{item.kelas}</span>
                  
                  <span className="text-gray-500 font-medium">Semester</span>
                  <span className="text-gray-400">:</span>
                  <span className="font-bold text-gray-900">{item.semester}</span>
                  
                  <span className="text-gray-500 font-medium">Guru Pengajar</span>
                  <span className="text-gray-400">:</span>
                  <span className="font-bold text-gray-900 truncate" title={item.guruPengajar}>
                    {item.guruPengajar}
                  </span>
                </div>
              </div>

              {/* Bagian Bawah Card (Tombol Hitam yang berfungsi) */}
              <div className="bg-gray-50/80 px-6 py-4 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => setDetailAbsensi(item)} 
                  className="flex items-center gap-1.5 text-xs font-bold bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer shadow-sm"
                >
                  Lihat Detail <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-200">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <SearchX className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-base font-bold text-gray-800">Data Tidak Ditemukan</p>
          <p className="text-sm text-gray-500 mt-1 text-center px-4">
            Tidak ada data absensi untuk kelas dan semester tersebut.
          </p>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL DETAIL ABSENSI                      */}
      {/* ========================================= */}
      <ModalDetailAbsensi 
        data={detailAbsensi} 
        onClose={() => setDetailAbsensi(null)} 
      />

    </main>
  );
}