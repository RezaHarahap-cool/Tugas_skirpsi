import React from "react";
import { X, CalendarDays, Tag, ImageIcon } from "lucide-react";

// Tipe Data Berita
interface BeritaItem {
  id: string;
  judul: string;
  kategori: string;
  tanggal: string;
  isi: string;
  gambar?: string;
}

interface ModalDetailBeritaProps {
  berita: BeritaItem | null;
  onClose: () => void;
}

export default function ModalDetailBerita({ berita, onClose }: ModalDetailBeritaProps) {
  if (!berita) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      
      {/* Overlay Gelap */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Kotak Modal Detail (Dibuat lebih lebar untuk kenyamanan membaca) */}
      <div className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto shadow-2xl animate-fade-in z-10 custom-scrollbar flex flex-col">
        
        {/* Tombol Close Melayang (Floating) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md text-white rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Bagian 1: Header Image (Banner) */}
        <div className="relative w-full h-64 sm:h-80 bg-gray-100 flex-shrink-0 flex items-center justify-center rounded-t-2xl overflow-hidden">
          {berita.gambar ? (
            <img 
              src={berita.gambar} 
              alt={berita.judul} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-gray-200">
              {/* Garis X ala wireframe untuk konsistensi */}
              <svg className="absolute inset-0 w-full h-full text-gray-300" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1"></line>
                <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1"></line>
              </svg>
              <ImageIcon className="w-16 h-16 text-gray-400 z-10 bg-gray-100 rounded-full p-4 shadow-sm" />
            </div>
          )}
        </div>

        {/* Bagian 2: Konten Artikel */}
        <div className="p-6 md:p-10 flex flex-col flex-1 bg-white">
          
          {/* Metadata: Kategori & Tanggal */}
          <div className="flex flex-wrap items-center gap-4 mb-4 border-b border-gray-100 pb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-bold text-xs border border-blue-100">
              <Tag className="w-3.5 h-3.5" /> {berita.kategori}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500">
              <CalendarDays className="w-4 h-4" /> {berita.tanggal}
            </span>
          </div>

          {/* Judul Artikel */}
          <h2 className="text-2xl md:text-4xl font-extrabold text-black leading-tight mb-6">
            {berita.judul}
          </h2>

          {/* Isi Teks Artikel */}
          <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {berita.isi}
          </div>
          
        </div>
      </div>
    </div>
  );
}