import React from "react";
import { 
  X, UserCircle, Hash, GraduationCap, 
  Phone, User, Image as ImageIcon, Users 
} from "lucide-react";

// Tipe Data Siswa (Sama persis seperti di halaman utama)
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

interface ModalDetailSiswaProps {
  siswa: SiswaItem | null;
  onClose: () => void;
}

export default function ModalDetailSiswa({ siswa, onClose }: ModalDetailSiswaProps) {
  // Jika tidak ada data siswa yang dipilih (null), jangan tampilkan modal
  if (!siswa) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Overlay Gelap */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Kotak Modal Detail (Sudah responsif scroll HP) */}
      <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in z-10 custom-scrollbar">
        
        {/* Header (Aksen Gelap) */}
        <div className="bg-[#f8f9fa] border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-20">
          <h3 className="text-lg font-bold text-black flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-gray-500" /> Profil Detail Siswa
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 bg-white rounded-full shadow-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content (Responsif Flexbox) */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
          
          {/* Bagian Kiri: Foto Profil */}
          <div className="w-40 h-48 md:w-48 md:h-64 flex-shrink-0 bg-gray-100 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm relative flex items-center justify-center">
            {siswa.foto ? (
              <img 
                src={siswa.foto} 
                alt={`Foto ${siswa.nama}`} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                <span className="text-xs font-semibold">Tidak ada foto</span>
              </div>
            )}
          </div>

          {/* Bagian Kanan: Informasi Data */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Header Nama & NIS */}
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Hash className="w-4 h-4" /> NIS: {siswa.nis}
              </p>
              <h4 className="text-2xl md:text-3xl font-extrabold text-black leading-tight">
                {siswa.nama}
              </h4>
            </div>

            {/* Grid Informasi Akademik & Pribadi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Kelas & Jurusan
                </p>
                <p className="font-bold text-black">{siswa.kelas} - {siswa.jurusan}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Jenis Kelamin
                </p>
                <p className="font-bold text-black">
                  {siswa.jk === "L" ? "Laki-laki (L)" : "Perempuan (P)"}
                </p>
              </div>

            </div>

            {/* Area Khusus Data Orang Tua / Wali */}
            <div className="border-t border-gray-100 pt-4">
              <h5 className="text-sm font-bold text-black mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" /> Kontak Orang Tua / Wali
              </h5>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Nama Ayah / Wali</p>
                  <p className="font-bold text-black">{siswa.namaAyah}</p>
                </div>

                <div className="bg-green-50/50 p-3 rounded-xl border border-green-100">
                  <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> No. Handphone
                  </p>
                  <p className="font-bold text-black">{siswa.noHpWali}</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}