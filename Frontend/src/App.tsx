import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import JurusanPage from './pages/public/JurusanPage';
import Profile from './pages/public/Profile';
import Kariawan from './pages/public/Kariawan';
import Galeri from './pages/public/Galeri';
import Berita from './pages/public/Berita';
import Login from './pages/auth/LoginPage';
import AdminLayout from './pages/dashboard/Admin/Dashbord';
import PageDataGuru from './pages/dashboard/Admin/PageDataGuru';
import PageDataSiswa from './pages/dashboard/Admin/PageDataSiswa';
import PageDataKepalaSekolah from './pages/dashboard/Admin/PageDataKepalaSekolah';
import PageDataJurusan from './pages/dashboard/Admin/PageDataJurusan'
import PageDataMapel from './pages/dashboard/Admin/PageDataMapel';
import PageDataRoster from './pages/dashboard/Admin/PageDataRoster';
import PageDataKelas from './pages/dashboard/Admin/PageDataKelas';
import PageDataTahunAjaran from './pages/dashboard/Admin/PageDataTahunAjaran';
import PageDataBerita from './pages/dashboard/Admin/PageDataBerita';
import PageDataRaport from './pages/dashboard/Admin/PageDataRaport';
import PageDataKenaikanKelas from './pages/dashboard/Admin/PageKenaikankelas';
import PageDataAlumni from './pages/dashboard/Admin/PageAlumni';
// Import halaman lain jika sudah dibuat:
// import Login from './pages/auth/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute publik */}
        <Route path="/" element={<Home />} />
        <Route path="/jurusan" element={<JurusanPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/kariawan" element={<Kariawan />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/berita" element={<Berita/>} />
        <Route path="/login" element={<Login />} />

        {/* Rute admin */}
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/admin/data-guru" element={<PageDataGuru />} />
        <Route path="/admin/data-siswa" element={<PageDataSiswa />} />
        <Route path="admin/data-kepsek" element={<PageDataKepalaSekolah />} />
        <Route path="/admin/jurusan" element={<PageDataJurusan />} />
        <Route path="/admin/mata-pelajaran" element={<PageDataMapel />} />
        <Route path="/admin/roster" element={<PageDataRoster />} />
        <Route path="/admin/data-kelas" element={<PageDataKelas />} />
        <Route path="/admin/tahun-ajaran" element={<PageDataTahunAjaran />} />
        <Route path="/admin/berita" element={<PageDataBerita />} />
        <Route path="/admin/cetak-rapor" element={<PageDataRaport />} />
        <Route path="/admin/kenaikan-kelas" element={<PageDataKenaikanKelas />} />
        <Route path="/admin/alumni" element={<PageDataAlumni />} />
        {/* Rute lainnya nanti taruh di bawah sini */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}