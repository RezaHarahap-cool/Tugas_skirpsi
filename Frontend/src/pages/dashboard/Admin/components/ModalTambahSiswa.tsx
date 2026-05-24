import React from "react";
import { X, UploadCloud } from "lucide-react";

interface ModalTambahSiswaProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalTambahSiswa({ isOpen, onClose }: ModalTambahSiswaProps) {
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
          <h3 className="text-xl font-extrabold text-black">Tambah Data Siswa</h3>
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
            <label className="block text-sm font-bold text-gray-700 mb-2">Foto Siswa</label>
            <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-black transition-colors cursor-pointer">
              <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm font-medium">Klik untuk unggah foto (Max 2MB)</p>
              <p className="text-xs text-gray-400 mt-1">Format: JPG, PNG</p>
            </div>
          </div>

          {/* Baris 1: NIS & Nama */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">NIS</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm" 
                placeholder="Cth: 3614.23" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm" 
                placeholder="Cth: Reza Yuda Pratama" 
              />
            </div>
          </div>
          
          {/* Baris 2: Jenis Kelamin & Kelas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Jenis Kelamin</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm bg-white">
                <option value="">Pilih Jenis Kelamin</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Kelas</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm bg-white">
                <option value="">Pilih Kelas</option>
                <option value="X">X</option>
                <option value="XI">XI</option>
                <option value="XII">XII</option>
              </select>
            </div>
          </div>

          {/* Baris 3: Jurusan & Nama Ayah */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Jurusan</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm bg-white">
                <option value="">Pilih Jurusan</option>
                <option value="PPLG">Pengembangan Perangkat Lunak dan Gim</option>
                <option value="TJKT">Teknik Jaringan Komputer dan Telekomunikasi</option>
                <option value="AKL">Akuntansi dan Keuangan Lembaga</option>
                <option value="OTKP">Otomatisasi Tata Kelola Perkantoran</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nama Ayah (Wali)</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm" 
                placeholder="Cth: Harahap" 
              />
            </div>
          </div>

          {/* Baris 4: No HP Wali */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nomor Handphone Wali</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm" 
              placeholder="Cth: 081122334455" 
            />
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