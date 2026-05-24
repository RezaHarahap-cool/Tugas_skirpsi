import React from "react";
import { 
  X, UserCircle, GraduationCap, Phone, 
  User, Briefcase, CheckCircle2, XCircle, 
  Image as ImageIcon 
} from "lucide-react";

// Tipe Data Kepsek / Staf (Harus sama dengan di halaman utama)
interface KepsekItem {
  id: string;
  nama: string;
  jk: "L" | "P";
  ijazah: string;
  tugas: string;
  noHp: string;
  foto: string;
  status: "Aktif" | "Non-Aktif";
}

interface ModalDetailKepsekProps {
  kepsek: KepsekItem | null;
  onClose: () => void;
}

export default function ModalDetailKepsek({ kepsek, onClose }: ModalDetailKepsekProps) {
  // Jika tidak ada data yang dipilih, jangan tampilkan modal
  if (!kepsek) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Overlay Gelap */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Kotak Modal Detail (Responsif Scroll HP) */}
      <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in z-10 custom-scrollbar">
        
        {/* Header Modal */}
        <div className="bg-[#f8f9fa] border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-20">
          <h3 className="text-lg font-bold text-black flex items-center gap-2">
            <UserCircle className="w-5 h-5 text-gray-500" /> Profil Detail Pimpinan / Staf
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
            {kepsek.foto ? (
              <img 
                src={kepsek.foto} 
                alt={`Foto ${kepsek.nama}`} 
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
            
            {/* Nama Lengkap & Badge Status */}
            <div className="space-y-2">
              <h4 className="text-2xl md:text-3xl font-extrabold text-black leading-tight">
                {kepsek.nama}
              </h4>
              <div>
                <span 
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${
                    kepsek.status === "Aktif" 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                      : "bg-rose-50 text-rose-700 border-rose-200"
                  }`}
                >
                  {kepsek.status === "Aktif" ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                  Status: {kepsek.status}
                </span>
              </div>
            </div>

            {/* Grid Informasi Detail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Tugas Diampu / Jabatan
                </p>
                <p className="font-bold text-black">{kepsek.tugas}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Nomor Handphone
                </p>
                <p className="font-bold text-black">{kepsek.noHp}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Ijazah Tertinggi
                </p>
                <p className="font-bold text-black">{kepsek.ijazah}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Jenis Kelamin
                </p>
                <p className="font-bold text-black">
                  {kepsek.jk === "L" ? "Laki-laki" : "Perempuan"}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}