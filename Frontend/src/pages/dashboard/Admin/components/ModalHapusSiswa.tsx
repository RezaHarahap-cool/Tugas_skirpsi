import React from "react";
import { AlertTriangle, X } from "lucide-react";

// Tipe Data Siswa
interface SiswaItem {
  id: string;
  nis: string;
  nama: string;
  jk: "L" | "P";
  kelas: string;
  jurusan: string;
  namaAyah: string;
  noHpWali: string;
  foto: string;
}

interface ModalHapusSiswaProps {
  siswa: SiswaItem | null;
  onClose: () => void;
}

export default function ModalHapusSiswa({ siswa, onClose }: ModalHapusSiswaProps) {
  // Jika tidak ada data siswa yang dipilih, modal tidak akan muncul
  if (!siswa) return null;

  const handleConfirmDelete = () => {
    console.log(`Siswa dengan NIS ${siswa.nis} berhasil dihapus dari sistem.`);
    // Logika API untuk HTTP DELETE ditaruh di sini nanti
    onClose(); // Tutup modal setelah sukses hapus
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Overlay Gelap (Backdrop) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Kotak Modal Konfirmasi */}
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 md:p-8 animate-fade-in z-10 text-center">
        
        {/* Tombol Silang (X) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ikon Bahaya/Peringatan Merah */}
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-5 mt-2">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>

        {/* Teks Peringatan */}
        <h3 className="text-xl font-extrabold text-black mb-2">Hapus Data Siswa?</h3>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Apakah Anda yakin ingin menghapus siswa bernama <span className="font-bold text-gray-800">"{siswa.nama}"</span> dengan NIS <span className="font-semibold text-gray-700">{siswa.nis}</span>? 
          <br />
          <span className="text-red-500 block mt-2 font-medium">Tindakan ini permanen dan akan menghapus semua riwayat data nilai serta absensi siswa tersebut.</span>
        </p>

        {/* Tombol Konfirmasi Aksi */}
        <div className="flex gap-3 justify-center">
          <button 
            onClick={onClose}
            className="flex-1 px-5 py-2.5 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors text-sm cursor-pointer"
          >
            Batal
          </button>
          <button 
            onClick={handleConfirmDelete}
            className="flex-1 px-5 py-2.5 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-colors text-sm cursor-pointer"
          >
            Ya, Hapus Permanen
          </button>
        </div>

      </div>
    </div>
  );
}