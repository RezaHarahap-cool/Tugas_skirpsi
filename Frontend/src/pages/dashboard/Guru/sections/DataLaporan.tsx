import React, { useState } from "react";
import { Menu, Send, Info } from "lucide-react";

// 1. Tipe Data Laporan Siswa
interface LaporanSiswa {
  id: string;
  nama: string;
  kelas: string;
  jurusan: string;
  absensi: {
    matematika: string;
    ips: string;
    pkn: string;
    agama: string;
  };
  catatan: {
    matematika: string;
    ips: string;
    pkn: string;
    agama: string;
  };
}

// 2. Data Dummy Awal
const initialDataLaporan: LaporanSiswa[] = [
  {
    id: "s1", nama: "Siswa A", kelas: "X", jurusan: "AKL",
    absensi: { matematika: "", ips: "", pkn: "", agama: "" },
    catatan: { matematika: "", ips: "", pkn: "", agama: "" }
  },
  {
    id: "s2", nama: "Siswa B", kelas: "X", jurusan: "AKL",
    absensi: { matematika: "", ips: "", pkn: "", agama: "" },
    catatan: { matematika: "", ips: "", pkn: "", agama: "" }
  },
  {
    id: "s3", nama: "Siswa C", kelas: "X", jurusan: "AKL",
    absensi: { matematika: "", ips: "", pkn: "", agama: "" },
    catatan: { matematika: "", ips: "", pkn: "", agama: "" }
  },
];

export default function LaporanWaliMuridContent({ onMenuClick }: { onMenuClick: () => void }) {
  const [dataLaporan, setDataLaporan] = useState<LaporanSiswa[]>(initialDataLaporan);

  // Handler untuk mengupdate state absensi dan catatan
  const handleInputChange = (
    siswaId: string, 
    kategori: "absensi" | "catatan", 
    mapel: keyof LaporanSiswa["absensi"], 
    value: string
  ) => {
    setDataLaporan(prev => prev.map(siswa => {
      if (siswa.id === siswaId) {
        return {
          ...siswa,
          [kategori]: {
            ...siswa[kategori],
            [mapel]: value
          }
        };
      }
      return siswa;
    }));
  };

  const handleKirim = () => {
    console.log("Data Laporan yang dikirim via WA Gateway:", dataLaporan);
    alert("Proses pengiriman laporan ke Wali Murid sedang berjalan...");
  };

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-[#f4f7fb] p-6 md:p-10">
      
      {/* Header Content */}
      <div className="flex items-center gap-4 mb-8">
        <button className="lg:hidden p-2 bg-white rounded-lg shadow-sm cursor-pointer" onClick={onMenuClick}>
          <Menu className="w-6 h-6 text-black" />
        </button>
        <div>
          <p className="text-gray-500 font-medium">Selamat Datang,</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">Laporan ke Wali Murid</h2>
        </div>
      </div>

      {/* Info Pengingat (Opsional) */}
      <div className="mb-6 bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-blue-900">Perhatian Limitasi Pengiriman</h4>
          <p className="text-xs text-blue-700 mt-1 leading-relaxed">
            Pastikan data sudah valid sebelum menekan tombol Kirim. Laporan akan dikirimkan secara sekuensial (berurutan) melalui sistem WhatsApp untuk mencegah pemblokiran nomor.
          </p>
        </div>
      </div>

      {/* Frame Utama Tabel */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm relative">
        
        <div className="text-center mb-8">
          <h3 className="text-lg font-extrabold text-black">Laporan Absensi Kelas X AKL</h3>
          <p className="text-sm font-semibold text-gray-600">Kepada Wali Murid</p>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-center text-sm whitespace-nowrap">
              
              {/* Merged Headers Sesuai Wireframe */}
              <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-800 font-bold">
                <tr>
                  <th rowSpan={2} className="px-4 py-3 border-r border-gray-200 align-middle w-12">No</th>
                  <th rowSpan={2} className="px-4 py-3 border-r border-gray-200 align-middle w-32">Nama</th>
                  <th rowSpan={2} className="px-4 py-3 border-r border-gray-200 align-middle w-20">Kelas</th>
                  <th rowSpan={2} className="px-4 py-3 border-r border-gray-200 align-middle w-24">Jurusan</th>
                  <th colSpan={4} className="px-4 py-2 border-r border-b border-gray-200 text-center">Absensi</th>
                  <th colSpan={4} className="px-4 py-2 border-b border-gray-200 text-center">Catatan</th>
                </tr>
                <tr>
                  {/* Sub-headers Absensi */}
                  <th className="px-2 py-2 border-r border-gray-200 text-xs w-16">Matematika</th>
                  <th className="px-2 py-2 border-r border-gray-200 text-xs w-16">IPS</th>
                  <th className="px-2 py-2 border-r border-gray-200 text-xs w-16">PKN</th>
                  <th className="px-2 py-2 border-r border-gray-200 text-xs w-16">Agama</th>
                  
                  {/* Sub-headers Catatan */}
                  <th className="px-2 py-2 border-r border-gray-200 text-xs w-24">Matematika</th>
                  <th className="px-2 py-2 border-r border-gray-200 text-xs w-24">IPS</th>
                  <th className="px-2 py-2 border-r border-gray-200 text-xs w-24">PKN</th>
                  <th className="px-2 py-2 text-xs w-24">Agama</th>
                </tr>
              </thead>

              {/* Body Tabel */}
              <tbody className="divide-y divide-gray-100">
                {dataLaporan.map((siswa, index) => (
                  <tr key={siswa.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 border-r border-gray-100 font-bold text-gray-900">{index + 1}</td>
                    <td className="px-4 py-3 border-r border-gray-100 font-semibold text-black text-left">{siswa.nama}</td>
                    <td className="px-4 py-3 border-r border-gray-100 font-medium text-gray-700">{siswa.kelas}</td>
                    <td className="px-4 py-3 border-r border-gray-100 font-medium text-gray-700">{siswa.jurusan}</td>
                    
                    {/* Input Absensi (Dibuat input kecil membulat seperti wireframe) */}
                    {(["matematika", "ips", "pkn", "agama"] as const).map((mapel) => (
                      <td key={`abs-${mapel}`} className="px-2 py-3 border-r border-gray-100">
                        <input 
                          type="text" 
                          maxLength={1}
                          value={siswa.absensi[mapel]}
                          onChange={(e) => handleInputChange(siswa.id, "absensi", mapel, e.target.value.toUpperCase())}
                          className="w-10 h-8 text-center border border-gray-300 rounded focus:ring-2 focus:ring-black/10 focus:border-black outline-none bg-white font-bold text-sm"
                        />
                      </td>
                    ))}

                    {/* Input Catatan */}
                    {(["matematika", "ips", "pkn", "agama"] as const).map((mapel) => (
                      <td key={`cat-${mapel}`} className="px-2 py-3 border-r border-gray-100 last:border-r-0">
                        <input 
                          type="text" 
                          value={siswa.catatan[mapel]}
                          onChange={(e) => handleInputChange(siswa.id, "catatan", mapel, e.target.value)}
                          className="w-full min-w-[80px] h-8 px-2 text-center border border-gray-300 rounded focus:ring-2 focus:ring-black/10 focus:border-black outline-none bg-white text-xs"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* Tombol Simpan & Batal Sesuai Wireframe */}
        <div className="flex justify-end gap-3 pt-4">
          <button 
            className="px-8 py-2.5 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
          >
            Batal
          </button>
          <button 
            onClick={handleKirim}
            className="flex items-center gap-2 px-8 py-2.5 rounded-lg font-bold text-white bg-black hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
          >
            <Send className="w-4 h-4" /> Kirim
          </button>
        </div>
        
      </div>

    </main>
  );
}