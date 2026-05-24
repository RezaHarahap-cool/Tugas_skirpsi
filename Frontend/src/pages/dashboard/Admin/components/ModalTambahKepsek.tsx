import React from "react";
import { X, UploadCloud } from "lucide-react";

interface ModalTambahKepsekProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalTambahKepsek({ isOpen, onClose }: ModalTambahKepsekProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Overlay Gelap */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Kotak Form Modal (Responsif Scroll HP) */}
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 animate-fade-in z-10 custom-scrollbar">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold text-black">Tambah Data Pimpinan / Staf</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Input */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          
          {/* Area Upload Foto */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Foto Profil</label>
            <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-black transition-colors cursor-pointer">
              <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm font-medium">Klik untuk unggah foto (Max 2MB)</p>
              <p className="text-xs text-gray-400 mt-1">Format: JPG, PNG dengan rasio 3:4 atau 4:6</p>
            </div>
          </div>

          {/* Baris 1: Nama Lengkap & Tugas Diampu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm" 
                placeholder="Cth: Drs. H. Ahmad Fauzi, M.Pd." 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tugas Diampu</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm bg-white cursor-pointer">
                <option value="">Pilih Tugas / Jabatan</option>
                <option value="Kepala Sekolah">Kepala Sekolah</option>
                <option value="Wakil Kepala Sekolah">Wakil Kepala Sekolah</option>
                <option value="Kepala Tata Usaha">Kepala Tata Usaha</option>
                <option value="Bendahara Sekolah">Bendahara Sekolah</option>
                <option value="Operator Sekolah">Operator Sekolah</option>
              </select>
            </div>
          </div>
          
          {/* Baris 2: Jenis Kelamin & Ijazah Tertinggi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Jenis Kelamin</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm bg-white cursor-pointer">
                <option value="">Pilih Jenis Kelamin</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Ijazah Tertinggi</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm bg-white cursor-pointer">
                <option value="">Pilih Pendidikan Terakhir</option>
                <option value="SMA/SMK">SMA / SMK Sederajat</option>
                <option value="D3">Diploma 3 (D3)</option>
                <option value="S1">Strata 1 (S1) / D4</option>
                <option value="S2">Strata 2 (S2)</option>
                <option value="S3">Strata 3 (S3)</option>
              </select>
            </div>
          </div>

          {/* Baris 3: No HP & Status Bertugas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nomor Handphone</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm" 
                placeholder="Cth: 081122334455" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Status Bertugas</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm bg-white cursor-pointer">
                <option value="Aktif">Aktif</option>
                <option value="Non-Aktif">Non-Aktif (Purna Tugas/Pindah)</option>
              </select>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
            <button 
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer text-sm"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="px-5 py-2 rounded-lg font-semibold bg-black text-white hover:bg-gray-800 transition-colors cursor-pointer text-sm shadow-sm"
            >
              Simpan Data
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}