import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 1. Import hooks dari react-router-dom
import { 
  Megaphone, GraduationCap, BookOpenCheck,
  ClipboardList, CalendarDays, Settings, User, LogOut, 
  MoreVertical,  X 
} from "lucide-react";
// ==========================================
// 1. KOMPONEN SIDEBAR
// ==========================================
// 2. Tambahkan properti 'path' pada masing-masing menu sesuai rute yang kamu buat di App.tsx
const menuItems = [
  { title: "Profile", icon: User, path: "/guru" },
  { title: "Presensi", icon: BookOpenCheck, path: "/guru/presensi" },
  { title: "Nilai", icon: ClipboardList, path: "/guru/Nilai" },
  { title: "Jadwal Mengajar", icon: CalendarDays, path: "/guru/JadwalMengejar" },
  { title: "Laporan", icon: Megaphone, path: "/guru/laporan" },
];

export default function Sidebar({ isMobileOpen, setIsMobileOpen }: { isMobileOpen: boolean, setIsMobileOpen: (v: boolean) => void }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // 3. Panggil hooks navigasi dan lokasi
  const navigate = useNavigate();
  const location = useLocation();

  // Fungsi untuk menangani klik menu
  const handleMenuClick = (path: string) => {
    navigate(path); // Pindah halaman
    setIsMobileOpen(false); // Tutup sidebar otomatis kalau di mode HP
  };

  return (
    <>
      {/* Overlay hitam untuk mobile jika sidebar terbuka */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#f8f9fa] border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Header Logo */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-black flex items-center justify-center rounded-md">
            <span className="text-white font-bold text-xs">SMK</span>
          </div>
          <h1 className="font-bold text-sm leading-tight text-black">
            SMK Swasta <br /> Parulian 1 Medan
          </h1>
          {/* Tombol close sidebar di mobile */}
          <button className="ml-auto lg:hidden" onClick={() => setIsMobileOpen(false)}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Menu Navigasi */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {menuItems.map((item, idx) => {
            // 4. Cek apakah menu ini sedang aktif dengan mencocokkan path URL saat ini
            const isActive = location.pathname === item.path;

            return (
              <button 
                key={idx}
                onClick={() => handleMenuClick(item.path)} // 5. Pasang event onClick di sini
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive 
                    ? "bg-black text-white shadow-md" // Style saat menu aktif
                    : "text-gray-600 hover:bg-gray-200 hover:text-black" // Style saat menu tidak aktif
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </button>
            );
          })}
        </div>

        {/* Footer Sidebar: Profil Admin & Popup Menu */}
        <div className="p-4 border-t border-gray-200 relative">
          
          {/* Popup Menu Profil */}
          {showProfileMenu && (
            <div className="absolute bottom-[80px] left-4 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 animate-fade-in z-50">
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Settings className="w-4 h-4" /> Setting
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <User className="w-4 h-4" /> Profil
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button 
                onClick={() => navigate('/login')} // Log out diarahkan kembali ke login
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Log out
              </button>
            </div>
          )}

          {/* Info Admin */}
          <div 
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-black truncate">Guru</p>
              <p className="text-xs text-gray-500 truncate">Guru@contoh.com</p>
            </div>
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </aside>
    </>
  );
}