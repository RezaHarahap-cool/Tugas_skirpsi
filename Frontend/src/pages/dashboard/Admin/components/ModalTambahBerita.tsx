import React from "react";
import { X, UploadCloud } from "lucide-react";

interface ModalTambahBeritaProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalTambahBerita({ isOpen, onClose }: ModalTambahBeritaProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Overlay Gelap */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Kotak Form Modal (Lebih lebar untuk textarea) */}
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 animate-fade-in z-10 custom-scrollbar">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold text-black">Tambah Berita</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Input */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Gambar / Thumbnail (Opsional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-10 w-10 text-gray-400 group-hover:text-black transition-colors" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer rounded-md bg-transparent font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                    <span>Upload file</span>
                    <input type="file" className="sr-only" accept="image/png, image/jpeg, image/jpg" />
                  </label>
                  <p className="pl-1">atau drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 2MB</p>
              </div>
            </div>
          </div>
          
          {/* Baris 1: Judul Berita */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Judul Berita
            </label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm" 
              placeholder="Masukkan judul berita yang menarik..." 
              required
            />
          </div>

          {/* Baris 2: Kategori & Tanggal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm bg-white cursor-pointer">
                <option value="">Pilih Kategori</option>
                <option value="Pengumuman">Pengumuman</option>
                <option value="Prestasi">Prestasi</option>
                <option value="Akademik">Akademik</option>
                <option value="Kegiatan">Kegiatan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Tanggal Terbit</label>
              <input 
                type="date" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm cursor-pointer" 
                required
              />
            </div>
          </div>



          {/* Baris 4: Isi Berita (Textarea) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Isi Berita
            </label>
            <textarea 
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black outline-none text-sm resize-none custom-scrollbar" 
              placeholder="Tuliskan isi berita atau pengumuman secara lengkap di sini..." 
              required
            ></textarea>
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
              Simpan Berita
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}