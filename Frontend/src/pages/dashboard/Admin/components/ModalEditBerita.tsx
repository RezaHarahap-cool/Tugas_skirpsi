import React, { useState, useEffect } from "react";
import { X, UploadCloud } from "lucide-react";

// Tipe Data Berita (Sama seperti di halaman utama)
interface BeritaItem {
  id: string;
  judul: string;
  kategori: string;
  tanggal: string;
  isi: string;
  gambar?: string;
}

interface ModalEditBeritaProps {
  berita: BeritaItem | null;
  onClose: () => void;
}

export default function ModalEditBerita({
  berita,
  onClose,
}: ModalEditBeritaProps) {
  // State lokal untuk menampung data yang sedang diedit
  const [formData, setFormData] = useState<BeritaItem | null>(null);

  // Otomatis isi form dengan data berita yang diklik
  useEffect(() => {
    if (berita) {
      setFormData(berita);
    }
  }, [berita]);

  // Jika tidak ada data yang dipilih, jangan tampilkan apa-apa
  if (!berita || !formData) return null;

  // Fungsi untuk mendeteksi ketikan di input/select/textarea
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Berita yang di-update:", formData);
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

      {/* Kotak Form Modal (Lebih lebar untuk textarea) */}
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 animate-fade-in z-10 custom-scrollbar">
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold text-black">Edit Berita</h3>
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
              Ganti Gambar / Thumbnail (Opsional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:bg-blue-50 transition-colors cursor-pointer group">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-10 w-10 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer rounded-md bg-transparent font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                    <span>Upload file baru</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/png, image/jpeg, image/jpg"
                    />
                  </label>
                  <p className="pl-1">atau drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, JPEG up to 2MB
                </p>
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
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              required
            />
          </div>

          {/* Baris 2: Kategori & Tanggal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Kategori
              </label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white cursor-pointer"
              >
                <option value="Pengumuman">Pengumuman</option>
                <option value="Prestasi">Prestasi</option>
                <option value="Akademik">Akademik</option>
                <option value="Kegiatan">Kegiatan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Tanggal Terbit
              </label>
              <input
                type="text"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                required
              />
            </div>
          </div>

          {/* Baris 3: Area Upload Gambar */}

          {/* Baris 4: Isi Berita (Textarea) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Isi Berita
            </label>
            <textarea
              name="isi"
              value={formData.isi}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm resize-none custom-scrollbar leading-relaxed"
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
