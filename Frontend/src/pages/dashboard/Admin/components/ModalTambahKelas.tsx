import React from "react";
import { X } from "lucide-react";

interface ModalTambahKelasProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalTambahKelas({ isOpen, onClose }: ModalTambahKelasProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Overlay Gelap */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Kotak Form Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 animate-fade-in z-10 custom-scrollbar">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold text-black">Tambah Data Kelas</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Input */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          
          {/* Baris 1: Tingkat & Jurusan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tingkat Kelas</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm bg-white cursor-pointer">
                <option value="">Pilih Tingkat</option>
                <option value="X">Kelas X</option>
                <option value="XI">Kelas XI</option>
                <option value="XII">Kelas XII</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Jurusan</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm bg-white cursor-pointer">
                <option value="">Pilih Jurusan</option>
                <option value="PPLG">PPLG</option>
                <option value="TJKT">TJKT</option>
                <option value="AKL">AKL</option>
                <option value="OTKP">OTKP</option>
              </select>
            </div>
          </div>

          {/* Baris 2: Nama Kelas Spesifik */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Nama Kelas Spesifik
            </label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm" 
              placeholder="Cth: X AKL 1" 
              required
            />
          </div>

          {/* Baris 3: Wali Kelas & Jumlah Siswa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Wali Kelas</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm bg-white cursor-pointer">
                <option value="">Pilih Guru</option>
                <option value="g1">Siti Aminah, S.Pd.</option>
                <option value="g2">Budi Santoso, M.Pd.</option>
                <option value="g3">Reza Yuda, S.Kom.</option>
                <option value="g4">Ahmad Fauzi, S.T.</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Kapasitas / Jumlah Siswa</label>
              <input 
                type="number"
                min="0"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm" 
                placeholder="Cth: 36" 
                required
              />
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