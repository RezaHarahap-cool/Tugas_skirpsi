import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

// Tipe Data Mata Pelajaran
interface MapelItem {
  id: string;
  nama: string;
}

interface ModalEditMapelProps {
  mapel: MapelItem | null;
  onClose: () => void;
}

export default function ModalEditMapel({ mapel, onClose }: ModalEditMapelProps) {
  // State lokal untuk menampung data yang sedang diedit
  const [formData, setFormData] = useState<MapelItem | null>(null);

  // Otomatis isi form dengan data mapel yang diklik
  useEffect(() => {
    if (mapel) {
      setFormData(mapel);
    }
  }, [mapel]);

  // Jika tidak ada data yang dipilih, jangan tampilkan apa-apa
  if (!mapel || !formData) return null;

  // Fungsi untuk mendeteksi ketikan
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Mata Pelajaran yang di-update:", formData);
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
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 md:p-8 animate-fade-in z-10">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold text-black">Edit Mata Pelajaran</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Nama Mata Pelajaran
            </label>
            <input 
              type="text" 
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm" 
              required
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