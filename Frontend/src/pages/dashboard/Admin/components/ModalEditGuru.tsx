import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

// Tipe data harus sama dengan yang di DataGuruContent
interface GuruItem {
  id: string;
  nama: string;
  jk: "L" | "P";
  ijazah: string;
  mapel: string;
  noHp: string;
  foto: string;
}

interface ModalEditGuruProps {
  guru: GuruItem | null;
  onClose: () => void;
}

export default function ModalEditGuru({ guru, onClose }: ModalEditGuruProps) {
  // State lokal untuk menyimpan data form yang sedang di-edit
  const [formData, setFormData] = useState<GuruItem | null>(null);

  // Efek ini berjalan otomatis saat prop 'guru' berubah.
  // Gunanya untuk memindahkan data guru yang diklik ke dalam state form.
  useEffect(() => {
    if (guru) {
      setFormData(guru);
    }
  }, [guru]);

  // Jangan tampilkan apa-apa jika tidak ada guru yang dipilih atau form belum siap
  if (!guru || !formData) return null;

  // Fungsi untuk menangani perubahan ketikan di input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data yang mau disimpan (Edit):", formData);
    // Logika API untuk update ke database ditaruh di sini nanti
    onClose(); // Tutup modal setelah berhasil simpan
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Overlay Gelap */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Kotak Form Modal (Sudah responsif scroll HP) */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 animate-fade-in z-10 custom-scrollbar">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold text-black">Edit Data Guru</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Nama Lengkap & Gelar
            </label>
            <input 
              type="text" 
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Mata Pelajaran</label>
              <input 
                type="text" 
                name="mapel"
                value={formData.mapel}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Jenis Kelamin</label>
              <select 
                name="jk"
                value={formData.jk}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm bg-white"
              >
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nomor HP</label>
              <input 
                type="text" 
                name="noHp"
                value={formData.noHp}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Ijazah</label>
              <input 
                type="text" 
                name="ijazah"
                value={formData.ijazah}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm" 
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