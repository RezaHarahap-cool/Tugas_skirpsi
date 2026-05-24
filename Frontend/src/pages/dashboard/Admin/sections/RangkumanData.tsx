
import {  ArrowUpRight, Menu,
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";


// ==========================================
// 2. KOMPONEN CONTENT (DASHBOARD UTAMA)
// ==========================================
// Data untuk grafik garis
const chartData = [
  { tahun: "2020", jumlah: 125 },
  { tahun: "2021", jumlah: 185 },
  { tahun: "2022", jumlah: 138 },
  { tahun: "2023", jumlah: 165 },
  { tahun: "2024", jumlah: 122 },
  { tahun: "2025", jumlah: 150 },
  { tahun: "2026", jumlah: 145 },
];

const statCards = [
  { title: "Total Siswa", count: "145" },
  { title: "Total Guru", count: "21" },
  { title: "Total Kelas", count: "145" },
  { title: "Mata Pelajaran", count: "21" },
];

export default function RangkumanData({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <main className="flex-1 h-screen overflow-y-auto bg-white p-6 md:p-10">
      
      {/* Header Content Mobile Toggle */}
      <div className="flex items-center gap-4 mb-8 lg:mb-10">
        <button className="lg:hidden p-2 bg-gray-100 rounded-lg" onClick={onMenuClick}>
          <Menu className="w-6 h-6 text-black" />
        </button>
        <div>
          <p className="text-gray-500 font-medium">Selamat Datang,</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-black">Dashboard</h2>
        </div>
      </div>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-[#f8f9fa] border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-black mb-2">{card.title}</h3>
            <p className="text-4xl font-bold text-black mb-6">{card.count}</p>
            <button className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-black transition-colors group">
              Lihat Selengkapnya 
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        ))}
      </div>

      {/* Area Grafik */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-2xl p-6 w-full">
        <h3 className="text-xl font-bold text-black mb-8">Grafik Jumlah Siswa</h3>
        
        {/* Container Chart Responsive */}
        <div className="w-full h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis 
                dataKey="tahun" 
                axisLine={true} 
                tickLine={false} 
                tick={{ fill: '#374151', fontSize: 12 }}
                dy={15}
              />
              <YAxis 
                axisLine={true} 
                tickLine={false} 
                tick={{ fill: '#374151', fontSize: 12 }}
                domain={[0, 280]}
                ticks={[0, 40, 80, 120, 160, 200, 240, 280]}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="jumlah" 
                stroke="#000000" 
                strokeWidth={2}
                dot={{ fill: '#000000', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Label Bawah Axis */}
        <div className="text-center mt-4 text-sm font-semibold text-gray-600">
          Tahun Ajaran
        </div>
        <div className="absolute left-6 md:left-10 top-1/2 -rotate-90 origin-left text-sm font-semibold text-gray-600 hidden md:block">
          Jumlah Siswa
        </div>
      </div>
    </main>
  );
};
