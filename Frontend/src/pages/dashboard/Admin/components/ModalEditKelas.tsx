import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

// Tipe Data Kelas (Sama seperti di halaman utama)
interface KelasItem {
  id: string;
  namaKelas: string;
  tingkat: string;
  jurusan: string;
  waliKelas: string;
  jumlahSiswa: number;
}

interface ModalEditKelasProps {
  kelas: KelasItem | null;
  onClose: () => void;
}

export default function ModalEditKelas({ kelas, onClose }: ModalEditKelasProps) {
  // State lokal untuk menampung data yang sedang diedit
  const [formData, setFormData] = useState<KelasItem | null>(null);

  // Otomatis isi form dengan data kelas yang diklik
  useEffect(() => {
    if (kelas) {
      setFormData(kelas);
    }
  }, [kelas]);

  // Jika tidak ada data yang dipilih, jangan tampilkan apa-apa
  if (!kelas || !formData) return null;

  // Fungsi untuk mendeteksi ketikan di input/select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Kelas yang di-update:", formData);
    // Logika API untuk UPDATE ke database ditaruh di sini nanti
    onClose(); // Tutup modal setelah berhasil simpan
  };

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
          <h3 className="text-xl font-extrabold text-black">Edit Data Kelas</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Baris 1: Tingkat & Jurusan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tingkat Kelas</label>
              <select 
                name="tingkat"
                value={formData.tingkat}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white cursor-pointer"
              >
                <option value="X">Kelas X</option>
                <option value="XI">Kelas XI</option>
                <option value="XII">Kelas XII</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Jurusan</label>
              <select 
                name="jurusan"
                value={formData.jurusan}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white cursor-pointer"
              >
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
              name="namaKelas"
              value={formData.namaKelas}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm" 
              required
            />
          </div>

          {/* Baris 3: Wali Kelas & Jumlah Siswa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Wali Kelas</label>
              <select 
                name="waliKelas"
                value={formData.waliKelas}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white cursor-pointer"
              >
                <option value="Siti Aminah, S.Pd.">Siti Aminah, S.Pd.</option>
                <option value="Budi Santoso, M.Pd.">Budi Santoso, M.Pd.</option>
                <option value="Reza Yuda, S.Kom.">Reza Yuda, S.Kom.</option>
                <option value="Ahmad Fauzi, S.T.">Ahmad Fauzi, S.T.</option>
                <option value="Dra. Rina Mulyani">Dra. Rina Mulyani</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Kapasitas / Siswa</label>
              <input 
                type="number"
                name="jumlahSiswa"
                value={formData.jumlahSiswa}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm" 
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
              className="px-5 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer text-sm shadow-sm"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}