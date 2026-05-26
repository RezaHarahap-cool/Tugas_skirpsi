import React, { useState } from "react";
import { 
  Menu, Search, MoreVertical, Eye, Edit, Trash2, ChevronDown 
} from "lucide-react";

// 1. Tipe Data Alumni
interface AlumniItem {
  id: string;
  nis: string;
  nama: string;
  jk: "L" | "P";
  jurusan: string;
  status: string;
  tahunTamat: string;
  noHpWali: string;
}

// 2. Data Dummy Sesuai Wireframe
const dataAlumniDummy: AlumniItem[] = [
  { id: "a1", nis: "361423", nama: "Siswa A", jk: "L", jurusan: "AKL", status: "Lulus", tahunTamat: "2020", noHpWali: "0898765432123" },
  { id: "a2", nis: "361424", nama: "Siswa B", jk: "P", jurusan: "AKL", status: "Lulus", tahunTamat: "2020", noHpWali: "0898765432123" },
  { id: "a3", nis: "361425", nama: "Siswa C", jk: "L", jurusan: "AKL", status: "Lulus", tahunTamat: "2020", noHpWali: "0898765432123" },
  { id: "a4", nis: "361500", nama: "Siswa D", jk: "P", jurusan: "PPLG", status: "Lulus", tahunTamat: "2021", noHpWali: "081234567890" },
];

export default function DataAlumniContent({ onMenuClick }: { onMenuClick: () => void }) {
  // State Pencarian dan Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTahun, setFilterTahun] = useState("Semua");
  
  // State Dropdown Aksi (Titik Tiga)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // State untuk Modals (Persiapan)
  // const [detailAlumni, setDetailAlumni] = useState<AlumniItem | null>(null);
  // const [editAlumni, setEditAlumni] = useState<AlumniItem | null>(null);
  // const [hapusAlumni, setHapusAlumni] = useState<AlumniItem | null>(null);

  // Logika Filter Berlapis (Search + Tahun Tamat)
  const filteredAlumni = dataAlumniDummy.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.nis.includes(searchQuery);
    const matchTahun = filterTahun === "Semua" || item.tahunTamat === filterTahun;
    
    return matchSearch && matchTahun;
  });

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <main className="flex-1 h-screen overflow-y-auto bg-gray-50 p-6 md:p-10">
      
      {/* Header Content */}
      <div className="flex items-center gap-4 mb-8">
        <button className="lg:hidden p-2 bg-white rounded-lg shadow-sm cursor-pointer" onClick={onMenuClick}>
          <Menu className="w-6 h-6 text-black" />
        </button>
        <div>
          <p className="text-gray-500 font-medium">Selamat Datang,</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">Alumni</h2>
        </div>
      </div>

      {/* Action Bar (Search & Filter Tahun Tamat) */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-4 mb-6">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari alumni atau NIS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all shadow-sm"
          />
        </div>

        {/* Dropdown Filter Tahun Tamat */}
        <div className="relative w-full sm:w-48">
          <select 
            value={filterTahun}
            onChange={(e) => setFilterTahun(e.target.value)}
            className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black cursor-pointer shadow-sm"
          >
            <option value="Semua">Tahun Tamat</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto pb-24">
          <table className="w-full text-left text-sm whitespace-nowrap">
            
            {/* Header Tabel */}
            <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-700 font-bold">
              <tr>
                <th className="px-6 py-4 w-16 text-center">No</th>
                <th className="px-6 py-4">NIS</th>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4 text-center">Jenis kelamin</th>
                <th className="px-6 py-4 text-center">Jurusan</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Tahun Tamat</th>
                <th className="px-6 py-4">No.Hp Wali</th>
                <th className="px-6 py-4 text-center w-24">aksi</th>
              </tr>
            </thead>

            {/* Body Tabel */}
            <tbody className="divide-y divide-gray-100">
              {filteredAlumni.length > 0 ? (
                filteredAlumni.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                    
                    <td className="px-6 py-4 text-center text-gray-900 font-bold">
                      {index + 1}
                    </td>
                    
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {item.nis}
                    </td>

                    <td className="px-6 py-4 text-black font-semibold">
                      {item.nama}
                    </td>

                    <td className="px-6 py-4 text-center font-medium text-gray-700">
                      {item.jk}
                    </td>

                    <td className="px-6 py-4 text-center font-medium text-gray-700">
                      {item.jurusan}
                    </td>

                    <td className="px-6 py-4 text-center font-medium text-gray-700">
                      {item.status}
                    </td>

                    <td className="px-6 py-4 text-center font-medium text-gray-700">
                      {item.tahunTamat}
                    </td>

                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {item.noHpWali}
                    </td>
                    
                    {/* Kolom Aksi (Dropdown Titik Tiga) */}
                    <td className="px-6 py-4 text-center relative">
                      <button 
                        onClick={() => toggleDropdown(item.id)}
                        className="p-2 rounded-md hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {/* Dropdown Menu Popup Sesuai Wireframe */}
                      {activeDropdown === item.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)}></div>
                          <div className="absolute right-8 top-10 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 animate-fade-in">
                            <button 
                              // onClick={() => { setDetailAlumni(item); setActiveDropdown(null); }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" /> Lihat Detail
                            </button>
                            <button 
                              // onClick={() => { setEditAlumni(item); setActiveDropdown(null); }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button 
                              // onClick={() => { setHapusAlumni(item); setActiveDropdown(null); }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Hapus
                            </button>
                          </div>
                        </>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-10 text-center text-gray-500">
                    Data alumni tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

    </main>
  );
}