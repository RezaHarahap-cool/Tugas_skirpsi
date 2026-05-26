import React from "react";
import { X } from "lucide-react";

// Tipe data yang diterima dari klik tombol di halaman utama
export interface DataAbsensi {
  id: string;
  mapel: string;
  kelas: string;
  semester: string;
  guruPengajar: string;
}

interface ModalDetailAbsensiProps {
  data: DataAbsensi | null;
  onClose: () => void;
}

export default function ModalDetailAbsensi({ data, onClose }: ModalDetailAbsensiProps) {
  if (!data) return null;

  // Data Dummy Riwayat Pertemuan (Otomatis menyesuaikan nama mapel yang diklik)
  const historyAbsensi = [
    { id: 1, mapel: data.mapel, pertemuan: 1, tanggal: "Kamis, 22 Maret 2026", absen: "Hadir", catatan: "Baik" },
    { id: 2, mapel: data.mapel, pertemuan: 2, tanggal: "Kamis, 30 Maret 2026", absen: "Hadir", catatan: "Ribut di kelas" },
    { id: 3, mapel: data.mapel, pertemuan: 3, tanggal: "Kamis, 06 April 2026", absen: "Izin", catatan: "Sakit demam" },
    { id: 4, mapel: data.mapel, pertemuan: 4, tanggal: "Kamis, 13 April 2026", absen: "Hadir", catatan: "Aktif bertanya" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      
      {/* Overlay Gelap */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Kotak Modal (Dibuat lebih lebar yaitu max-w-4xl agar tabel muat) */}
      <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl animate-fade-in z-10 overflow-hidden">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white z-10">
          <div>
            <h3 className="text-xl font-extrabold text-black">Detail Absensi: {data.mapel}</h3>
            <p className="text-sm font-semibold text-gray-500 mt-1">
              Kelas {data.kelas} • Semester {data.semester} • {data.guruPengajar}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Konten Detail - TABEL */}
        <div className="p-6 overflow-y-auto custom-scrollbar bg-gray-50/50">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm whitespace-nowrap">
                
                {/* Header Tabel Sesuai Wireframe */}
                <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-800 font-bold">
                  <tr>
                    <th className="px-6 py-4">Mapel</th>
                    <th className="px-6 py-4">Pertemuan</th>
                    <th className="px-6 py-4">Hari, Tanggal</th>
                    <th className="px-6 py-4">Absen</th>
                    <th className="px-6 py-4 text-left">Catatan</th>
                  </tr>
                </thead>
                
                {/* Body Tabel */}
                <tbody className="divide-y divide-gray-100">
                  {historyAbsensi.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">{item.mapel}</td>
                      <td className="px-6 py-4 font-extrabold text-black">{item.pertemuan}</td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{item.tanggal}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">{item.absen}</td>
                      <td className="px-6 py-4 text-left text-gray-600">{item.catatan}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}