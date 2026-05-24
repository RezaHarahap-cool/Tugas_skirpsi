import React from "react";
import { 
  X, UserCircle, BookOpen, GraduationCap, 
  Phone, User, Image as ImageIcon 
} from "lucide-react";

// Definisikan tipe data Guru (Sama seperti di halaman utama)
interface GuruItem {
  id: string;
  nama: string;
  jk: "L" | "P";
  ijazah: string;
  mapel: string;
  noHp: string;
  foto: string;
}

// Props: menerima data 'guru' (bisa null jika modal tertutup) dan fungsi 'onClose'
interface ModalDetailGuruProps {
  guru: GuruItem | null;
  onClose: () => void;
}

export default function ModalDetailGuru({ guru, onClose }: ModalDetailGuruProps) {
  // Jika tidak ada data guru yang dipilih (null), jangan tampilkan modal
  if (!guru) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Overlay Gelap */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Kotak Modal Detail */}
      <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in z-10">
        
        {/* Header (Aksen Gelap) */}
        <div className="bg-[#f8f9fa] border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-bold text-black flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-gray-500" /> Profil Detail Guru
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 bg-white rounded-full shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content (Responsif Flexbox) */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
          
          {/* Bagian Kiri: Foto Profil */}
          <div className="w-40 h-48 md:w-48 md:h-64 flex-shrink-0 bg-gray-100 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm relative flex items-center justify-center">
            {guru.foto ? (
              <img 
                src={guru.foto} 
                alt={`Foto ${guru.nama}`} 
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
          <div className="flex-1 w-full space-y-5">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Nama Lengkap</p>
              <h4 className="text-2xl font-extrabold text-black leading-tight">
                {guru.nama}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Mata Pelajaran
                </p>
                <p className="font-bold text-black">{guru.mapel}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Nomor Handphone
                </p>
                <p className="font-bold text-black">{guru.noHp}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Ijazah Tertinggi
                </p>
                <p className="font-bold text-black">{guru.ijazah}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Jenis Kelamin
                </p>
                <p className="font-bold text-black">
                  {guru.jk === "L" ? "Laki-laki" : "Perempuan"}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}