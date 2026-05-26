import React, { useState } from "react";
import { Menu, ChevronDown, FileText } from "lucide-react";

export default function RaporSiswaContent({ onMenuClick }: { onMenuClick: () => void }) {
  // --- STATE FILTER ---
  const [filterKelas, setFilterKelas] = useState("X PPLG 1");
  const [filterSemester, setFilterSemester] = useState("Genap");
  const [isTampil, setIsTampil] = useState(false);

  // --- DATA DUMMY RAPOR ---
  const dataRapor = {
    kelas: "X PPLG 1",
    semester: "Genap",
    nilaiUmum: [
      { no: "1", mapel: "Pendidikan Agama dan Budi Pekerti", kktp: 75, na: 85, capaian: "Menunjukkan penguasaan yang baik dalam memahami makna ayat suci." },
      { no: "2", mapel: "Pendidikan Pancasila", kktp: 75, na: 82, capaian: "Sangat baik dalam menerapkan nilai-nilai gotong royong." },
      { no: "3", mapel: "Bahasa Indonesia", kktp: 75, na: 88, capaian: "Mampu menyusun teks laporan hasil observasi dengan sangat baik." },
      { no: "4", mapel: "Pendidikan Jasmani, Olahraga, dan Kesehatan", kktp: 75, na: 90, capaian: "Sangat terampil dalam mempraktikkan permainan bola besar." },
      { no: "5", mapel: "Sejarah", kktp: 75, na: 80, capaian: "Baik dalam menganalisis peristiwa sejarah lokal." },
      { no: "6", mapel: "Seni Budaya", kktp: 75, na: 85, capaian: "Kreatif dalam merancang karya seni rupa dua dimensi." },
    ],
    nilaiKejuruan: [
      { no: "1", mapel: "Matematika", kktp: 75, na: 86, capaian: "Baik dalam menyelesaikan masalah fungsi eksponensial." },
      { no: "2", mapel: "Bahasa Inggris", kktp: 75, na: 84, capaian: "Mampu memahami teks deskriptif lisan dan tulisan." },
      { no: "3", mapel: "Informatika", kktp: 75, na: 92, capaian: "Sangat kompeten dalam membuat program dengan struktur logika." },
      { no: "4", mapel: "Projek Ilmu Pengetahuan Alam dan Sosial", kktp: 75, na: 81, capaian: "Memahami mitigasi bencana dan energi terbarukan." },
      { no: "5", mapel: "Dasar-dasar Program Keahlian", kktp: 78, na: 89, capaian: "Sangat kompeten dalam merancang algoritma dasar." },
      // Contoh sub-mapel jika ada
      { no: "", mapel: "5.1 Pemrograman Web Dasar", kktp: 78, na: 90, capaian: "Mampu membuat struktur HTML dan CSS statis." },
      { no: "", mapel: "5.2 Logika Pemrograman", kktp: 78, na: 88, capaian: "Memahami penggunaan variabel, tipe data, dan kontrol alur." },
    ],
    ekskul: [
      { no: "1", kegiatan: "Pramuka", predikat: "Baik", keterangan: "Aktif mengikuti kegiatan perkemahan dan baris-berbaris." },
      { no: "2", kegiatan: "English Club", predikat: "Sangat Baik", keterangan: "Aktif dalam simulasi debat dan pidato bahasa Inggris." },
    ],
    kehadiran: { sakit: 2, izin: 1, tk: 0 },
    catatan: "Terus tingkatkan semangat belajarmu. Pertahankan prestasi di bidang produktif kejuruan!"
  };

  const handleTampilkan = () => {
    setIsTampil(true);
  };

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-[#f4f7fb] p-4 md:p-10 custom-scrollbar">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <button className="lg:hidden p-2 bg-white rounded-lg shadow-sm cursor-pointer" onClick={onMenuClick}>
          <Menu className="w-6 h-6 text-black" />
        </button>
        <div>
          <p className="text-gray-500 font-medium">Selamat Datang,</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">Rapor</h2>
        </div>
      </div>

      {/* ACTION BAR (FILTER) */}
      <div className="flex justify-end mb-8">
        <div className="flex flex-wrap items-center gap-3 bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm w-full md:w-auto">
          <div className="relative w-full sm:w-36">
            <select 
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="w-full appearance-none px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="X PPLG 1">X PPLG 1</option>
              <option value="XI PPLG 1">XI PPLG 1</option>
              <option value="XII TJKT 1">XII TJKT 1</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative w-full sm:w-36">
            <select 
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="w-full appearance-none px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="Ganjil">Ganjil</option>
              <option value="Genap">Genap</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          <button 
            onClick={handleTampilkan}
            className="w-full sm:w-auto bg-black text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Tampilkan
          </button>
        </div>
      </div>

      {/* KERTAS RAPOR (Tampil setelah filter diklik) */}
      {isTampil ? (
        <div className="animate-fade-in flex justify-center pb-20">
          {/* Kertas Virtual (A4 Style) */}
          <div className="bg-white w-full max-w-4xl p-6 md:p-12 border border-gray-300 shadow-lg rounded-sm text-gray-900">
            
            {/* Kop Rapor */}
            <div className="mb-8">
              <div className="grid grid-cols-[80px_10px_1fr] text-sm font-bold gap-y-1">
                <span>Kelas</span><span>:</span><span>{filterKelas}</span>
                <span>Semester</span><span>:</span><span>{filterSemester}</span>
              </div>
              <h3 className="text-center text-lg md:text-xl font-extrabold mt-6 uppercase tracking-wide">
                Laporan Hasil Belajar
              </h3>
            </div>

            {/* I. NILAI AKADEMIK */}
            <div className="mb-8">
              <h4 className="font-bold text-sm mb-3">I. Nilai Akademik</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-400 min-w-[700px]">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-400 px-3 py-2 text-center w-12">NO</th>
                      <th className="border border-gray-400 px-3 py-2 text-center">MATA PELAJARAN</th>
                      <th className="border border-gray-400 px-3 py-2 text-center w-16">KKTP</th>
                      <th className="border border-gray-400 px-3 py-2 text-center w-16">NA</th>
                      <th className="border border-gray-400 px-3 py-2 text-center w-64">CAPAIAN KOMPETENSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Kelompok A */}
                    <tr>
                      <td colSpan={5} className="border border-gray-400 px-3 py-2 font-bold bg-gray-50 text-xs">
                        A. Kelompok Mata Pelajaran Umum
                      </td>
                    </tr>
                    {dataRapor.nilaiUmum.map((item, idx) => (
                      <tr key={`umum-${idx}`}>
                        <td className="border border-gray-400 px-3 py-2 text-center font-semibold">{item.no}</td>
                        <td className="border border-gray-400 px-3 py-2 font-semibold">{item.mapel}</td>
                        <td className="border border-gray-400 px-3 py-2 text-center">{item.kktp}</td>
                        <td className="border border-gray-400 px-3 py-2 text-center font-bold">{item.na}</td>
                        <td className="border border-gray-400 px-3 py-2 text-xs leading-relaxed">{item.capaian}</td>
                      </tr>
                    ))}
                    
                    {/* Kelompok B */}
                    <tr>
                      <td colSpan={5} className="border border-gray-400 px-3 py-2 font-bold bg-gray-50 text-xs mt-2">
                        B. Kelompok Mata Pelajaran Kejuruan
                      </td>
                    </tr>
                    {dataRapor.nilaiKejuruan.map((item, idx) => (
                      <tr key={`kejuruan-${idx}`}>
                        <td className="border border-gray-400 px-3 py-2 text-center font-semibold">{item.no}</td>
                        <td className={`border border-gray-400 px-3 py-2 font-semibold ${!item.no ? 'pl-8 text-gray-700' : ''}`}>
                          {item.mapel}
                        </td>
                        <td className="border border-gray-400 px-3 py-2 text-center">{item.kktp}</td>
                        <td className="border border-gray-400 px-3 py-2 text-center font-bold">{item.na}</td>
                        <td className="border border-gray-400 px-3 py-2 text-xs leading-relaxed">{item.capaian}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* II. EKSTRAKURIKULER */}
            <div className="mb-8">
              <h4 className="font-bold text-sm mb-3">II. Ekstrakurikuler</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-400 min-w-[500px]">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-400 px-3 py-2 text-center w-12">NO</th>
                      <th className="border border-gray-400 px-3 py-2 text-center">KEGIATAN EKSTRAKURIKULER</th>
                      <th className="border border-gray-400 px-3 py-2 text-center w-32">PREDIKAT</th>
                      <th className="border border-gray-400 px-3 py-2 text-center">KETERANGAN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataRapor.ekskul.map((item, idx) => (
                      <tr key={`ekskul-${idx}`}>
                        <td className="border border-gray-400 px-3 py-2 text-center font-semibold">{item.no}</td>
                        <td className="border border-gray-400 px-3 py-2 font-semibold">{item.kegiatan}</td>
                        <td className="border border-gray-400 px-3 py-2 text-center font-bold">{item.predikat}</td>
                        <td className="border border-gray-400 px-3 py-2 text-xs">{item.keterangan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* III. KETIDAKHADIRAN & CATATAN */}
            <div>
              <h4 className="font-bold text-sm mb-3">III. Ketidakhadiran</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Tabel Kehadiran */}
                <div className="border border-gray-400 rounded-sm">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-gray-400">
                        <td className="px-4 py-2 font-semibold">Sakit</td>
                        <td className="px-4 py-2 w-4 text-center">:</td>
                        <td className="px-4 py-2">{dataRapor.kehadiran.sakit} hari</td>
                      </tr>
                      <tr className="border-b border-gray-400">
                        <td className="px-4 py-2 font-semibold">Izin</td>
                        <td className="px-4 py-2 w-4 text-center">:</td>
                        <td className="px-4 py-2">{dataRapor.kehadiran.izin} hari</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-semibold">Tanpa Keterangan</td>
                        <td className="px-4 py-2 w-4 text-center">:</td>
                        <td className="px-4 py-2">{dataRapor.kehadiran.tk} hari</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Box Catatan */}
                <div className="border border-gray-400 flex flex-col sm:flex-row h-full">
                  <div className="bg-gray-100 border-b sm:border-b-0 sm:border-r border-gray-400 p-3 sm:w-1/3 flex items-center justify-center font-bold text-sm">
                    Catatan
                  </div>
                  <div className="p-4 sm:w-2/3 text-sm italic leading-relaxed text-gray-700 flex items-center">
                    "{dataRapor.catatan}"
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-base font-bold text-gray-800">Pilih Kelas dan Semester</p>
          <p className="text-sm text-gray-500 mt-1 text-center px-4">
            Tekan tombol "Tampilkan" untuk melihat lembar rapor siswa.
          </p>
        </div>
      )}

    </main>
  );
}