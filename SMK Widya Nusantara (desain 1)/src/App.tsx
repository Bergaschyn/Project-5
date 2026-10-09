import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowUp, Moon, Sun, Phone, Mail, MapPin, Award, Users, BookOpen, 
  Calendar, Star, ChevronDown, ChevronUp 
} from 'lucide-react';

// Types
interface Jurusan {
  id: number;
  nama: string;
  singkatan: string;
  deskripsi: string;
  peluang: string[];
  kompetensi: string[];
  image: string;
}

interface GaleriItem {
  id: number;
  title: string;
  image: string;
  category: string;
}

interface Testimoni {
  id: number;
  nama: string;
  tahun: string;
  jurusan: string;
  testimoni: string;
  foto: string;
}

interface Berita {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

interface Prestasi {
  id: number;
  tahun: string;
  title: string;
  description: string;
  type: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// Data
const jurusanData: Jurusan[] = [
  {
    id: 1,
    nama: "Teknik Komputer dan Jaringan",
    singkatan: "TKJ",
    deskripsi: "Mempelajari perakitan, instalasi, konfigurasi jaringan komputer dan troubleshooting perangkat IT.",
    peluang: ["Network Administrator", "IT Support", "Cyber Security Analyst", "Web Developer"],
    kompetensi: ["Jaringan Komputer", "Sistem Operasi", "Pemrograman Dasar", "Hardware & Software"],
    image: "/images/lab-komputer.jpg"
  },
  {
    id: 2,
    nama: "Akuntansi dan Keuangan Lembaga",
    singkatan: "AKL",
    deskripsi: "Menguasai pencatatan keuangan, pelaporan pajak, audit, dan manajemen keuangan lembaga.",
    peluang: ["Akuntan", "Staff Keuangan", "Auditor", "Tax Consultant"],
    kompetensi: ["Akuntansi Keuangan", "Perpajakan", "Sistem Informasi Akuntansi", "Manajemen Keuangan"],
    image: "/images/library.jpg"
  },
  {
    id: 3,
    nama: "Otomatisasi Tata Kelola Perkantoran",
    singkatan: "OTKP",
    deskripsi: "Mempelajari administrasi perkantoran modern, manajemen dokumen digital dan komunikasi bisnis.",
    peluang: ["Sekretaris", "Office Manager", "Admin Perusahaan", "Customer Service"],
    kompetensi: ["Administrasi Perkantoran", "Korespondensi Bisnis", "Microsoft Office", "Manajemen Arsip"],
    image: "/images/gallery1.jpg"
  },
  {
    id: 4,
    nama: "Teknik dan Bisnis Sepeda Motor",
    singkatan: "TBSM",
    deskripsi: "Menguasai perbaikan dan perawatan sepeda motor, sistem kelistrikan dan bisnis otomotif.",
    peluang: ["Mekanik Motor", "Service Advisor", "Technician Otomotif", "Wirausaha Bengkel"],
    kompetensi: ["Sistem Mesin", "Kelistrkan Motor", "Diagnosa Kerusakan", "Manajemen Bengkel"],
    image: "/images/bengkel.jpg"
  }
];

const galeriData: GaleriItem[] = [
  { id: 1, title: "Kegiatan Praktikum TKJ", image: "/images/lab-komputer.jpg", category: "Praktik" },
  { id: 2, title: "Bengkel TBSM", image: "/images/bengkel.jpg", category: "Praktik" },
  { id: 3, title: "Prestasi Juara Nasional", image: "/images/gallery1.jpg", category: "Prestasi" },
  { id: 4, title: "Perpustakaan Modern", image: "/images/library.jpg", category: "Fasilitas" },
  { id: 5, title: "Upacara Bendera", image: "/images/gallery1.jpg", category: "Kegiatan" },
  { id: 6, title: "Ekstrakurikuler", image: "/images/hero.jpg", category: "Ekstrakurikuler" },
];

const testimoniData: Testimoni[] = [
  {
    id: 1, nama: "Rizki Pratama", tahun: "2021", jurusan: "TKJ",
    testimoni: "SMK Widya Nusantara memberi saya bekal ilmu yang sangat relevan. Sekarang saya bekerja di perusahaan IT ternama di Jakarta.",
    foto: "/images/principal.jpg"
  },
  {
    id: 2, nama: "Sinta Dewi", tahun: "2020", jurusan: "AKL",
    testimoni: "Pendidikan di sini sangat profesional. Saya langsung diterima kerja di bank swasta setelah lulus dengan predikat terbaik.",
    foto: "/images/principal.jpg"
  },
  {
    id: 3, nama: "Andi Saputra", tahun: "2022", jurusan: "TBSM",
    testimoni: "Bengkel sekolah sangat lengkap. Saya sekarang memiliki bengkel sendiri dan banyak siswa magang dari sini.",
    foto: "/images/principal.jpg"
  }
];

const beritaData: Berita[] = [
  { id: 1, title: "SMK WNB Raih Juara 1 Lomba Kompetensi Siswa Tingkat Provinsi", excerpt: "Tim TKJ berhasil meraih juara pertama di LKS Jawa Barat.", date: "15 Jan 2025", category: "Prestasi" },
  { id: 2, title: "Pendaftaran PPDB Tahun Ajaran 2025/2026 Dibuka", excerpt: "Pendaftaran dibuka mulai 1 Februari - 30 Maret 2025.", date: "10 Jan 2025", category: "Pengumuman" },
  { id: 3, title: "Kerja Sama Industri dengan PT Astra Motor", excerpt: "SMK WNB menjalin kerjasama magang dan sertifikasi dengan PT Astra.", date: "5 Jan 2025", category: "Kerja Sama" }
];

const prestasiData: Prestasi[] = [
  { id: 1, tahun: "2024", title: "Juara 1 LKS Tingkat Nasional", description: "Kategori Jaringan Komputer", type: "Akademik" },
  { id: 2, tahun: "2023", title: "Sertifikasi ISO 9001:2015", description: "Manajemen Mutu Pendidikan", type: "Akreditasi" },
  { id: 3, tahun: "2024", title: "Juara Umum O2SN", description: "Cabang Futsal Putra", type: "Non-Akademik" },
];

const faqData: FAQItem[] = [
  { question: "Bagaimana cara mendaftar di SMK Widya Nusantara?", answer: "Pendaftaran dapat dilakukan secara online melalui website atau datang langsung ke sekolah. Syarat: Ijazah SMP/sederajat, Akta Kelahiran, dan KK." },
  { question: "Apakah ada biaya pendaftaran dan SPP?", answer: "Biaya pendaftaran Rp 150.000. SPP bulanan Rp 350.000 - Rp 450.000 tergantung jurusan. Tersedia beasiswa untuk siswa berprestasi." },
  { question: "Apa saja jurusan yang tersedia?", answer: "TKJ, AKL, OTKP, dan TBSM. Semua jurusan telah terakreditasi A dan memiliki link and match dengan industri." },
  { question: "Apakah lulusan langsung bisa kerja?", answer: "Ya, 92% lulusan langsung terserap industri dalam 3 bulan. Kami memiliki program link and match dengan 40+ perusahaan mitra." }
];

// Components
const Navbar: React.FC<{ isDark: boolean; toggleDark: () => void }> = ({ isDark, toggleDark }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Tentang", href: "#tentang" },
    { label: "Profil", href: "#profil" },
    { label: "Jurusan", href: "#jurusan" },
    { label: "Fasilitas", href: "#fasilitas" },
    { label: "Galeri", href: "#galeri" },
    { label: "Berita", href: "#berita" },
    { label: "Prestasi", href: "#prestasi" },
    { label: "Testimoni", href: "#testimoni" },
    { label: "FAQ", href: "#faq" },
    { label: "Kontak", href: "#kontak" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">WN</span>
          </div>
          <div>
            <div className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">SMK Widya Nusantara</div>
            <div className="text-[10px] text-slate-500 -mt-1">BEKASI</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <button key={link.label} onClick={() => scrollToSection(link.href)} 
              className="text-slate-600 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleDark} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => scrollToSection('#kontak')}
            className="hidden md:block px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-all active:scale-[0.985]">
            Daftar Sekarang
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t bg-white dark:bg-slate-900 px-6 py-8 flex flex-col gap-y-4 text-lg">
            {navLinks.map(link => (
              <button key={link.label} onClick={() => scrollToSection(link.href)} className="text-left py-1 text-slate-700 dark:text-slate-300">
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const StatCard: React.FC<{ number: string; label: string; icon: React.ReactNode }> = ({ number, label, icon }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
    <div className="flex items-center gap-4">
      <div className="text-blue-600 dark:text-blue-400">{icon}</div>
      <div>
        <div className="text-4xl font-semibold tracking-tighter text-slate-900 dark:text-white">{number}</div>
        <div className="text-sm text-slate-500 mt-1">{label}</div>
      </div>
    </div>
  </div>
);

const JurusanCard: React.FC<{ jurusan: Jurusan; onClick: () => void }> = ({ jurusan, onClick }) => (
  <motion.div whileHover={{ y: -8 }} onClick={onClick}
    className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
    <div className="relative h-52 overflow-hidden">
      <img src={jurusan.image} alt={jurusan.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-4 right-4 px-4 py-1 text-xs font-medium bg-white/95 text-blue-700 rounded-full">{jurusan.singkatan}</div>
    </div>
    <div className="p-7">
      <h3 className="font-semibold text-2xl tracking-tight mb-2 text-slate-900 dark:text-white">{jurusan.nama}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-[15px] mb-5 leading-relaxed line-clamp-2">{jurusan.deskripsi}</p>
      <div className="text-sm text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
        Lihat Detail <ChevronDown size={16} />
      </div>
    </div>
  </motion.div>
);

// Main App
const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [selectedJurusan, setSelectedJurusan] = useState<Jurusan | null>(null);
  const [selectedImage, setSelectedImage] = useState<GaleriItem | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Dark Mode
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved ? saved === 'true' : prefersDark;
    setIsDark(initial);
    if (initial) document.documentElement.classList.add('dark');
  }, []);

  const toggleDark = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  // Back to Top
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Contact Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      alert("Terima kasih! Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.");
    }, 900);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleFAQ = (index: number) => setOpenFAQ(openFAQ === index ? null : index);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <Navbar isDark={isDark} toggleDark={toggleDark} />

      {/* 1. HERO / HOME */}
      <section id="home" className="relative h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero.jpg" alt="SMK Widya Nusantara" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-5xl px-6 text-center text-white">
          <div className="inline-block px-5 py-1.5 mb-6 rounded-full bg-white/10 text-sm tracking-[3px] font-medium border border-white/20">SEKOLAH KEJURUAN UNGGULAN BEKASI</div>
          <h1 className="text-6xl md:text-7xl font-semibold tracking-[-3.2px] leading-none mb-6">
            Selamat Datang di<br />SMK Widya Nusantara Bekasi
          </h1>
          <p className="max-w-lg mx-auto text-xl md:text-2xl text-white/90 tracking-tight mb-10">Mencetak Generasi Unggul, Kompeten, dan Siap Kerja</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 rounded-2xl bg-white text-slate-950 font-semibold text-lg hover:bg-amber-400 transition-all active:scale-[0.985]">
              Daftar Sekarang
            </button>
            <button onClick={() => document.getElementById('tentang')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 rounded-2xl border border-white/60 hover:bg-white/10 font-semibold text-lg transition-all">
              Lihat Profil Sekolah
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex gap-4 z-20">
          <StatCard number="1.248" label="Siswa Aktif" icon={<Users size={22} />} />
          <StatCard number="4" label="Jurusan Unggulan" icon={<BookOpen size={22} />} />
          <StatCard number="72" label="Tenaga Pendidik" icon={<Award size={22} />} />
          <StatCard number="87" label="Prestasi" icon={<Star size={22} />} />
        </div>
      </section>

      {/* 2. TENTANG SEKOLAH */}
      <section id="tentang" className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-3xl mb-12">
          <div className="uppercase text-blue-600 dark:text-blue-400 text-sm tracking-[3px] font-medium">Sejak 2008</div>
          <h2 className="text-6xl tracking-[-2.6px] font-semibold mt-2">Tentang Sekolah</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6 text-[17px] leading-relaxed text-slate-600 dark:text-slate-300">
            <p>SMK Widya Nusantara Bekasi didirikan dengan semangat mencetak lulusan yang siap kerja dan berdaya saing tinggi di dunia industri. Kami menggabungkan kurikulum nasional dengan kebutuhan industri terkini.</p>
            <p>Berlokasi strategis di Bekasi, sekolah ini telah dipercaya oleh ribuan orang tua untuk membentuk masa depan anak-anak mereka dengan pendidikan kejuruan berkualitas.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-9 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="font-semibold mb-5 text-xl">Visi</div>
            <p className="text-blue-700 dark:text-blue-400 text-[21px] leading-tight tracking-tight">"Menjadi SMK unggulan yang menghasilkan lulusan kompeten, berintegritas, dan siap menghadapi tantangan global."</p>
            
            <div className="h-px bg-slate-200 dark:bg-slate-800 my-8" />
            
            <div className="font-semibold mb-4">Misi</div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {["Menyelenggarakan pendidikan berkualitas berbasis industri", "Meningkatkan kompetensi guru dan fasilitas modern", "Membangun kemitraan strategis dengan dunia usaha", "Membentuk karakter siswa yang berakhlak mulia"].map((m, i) => (
                <li key={i} className="flex gap-3">• {m}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. PROFIL SEKOLAH */}
      <section id="profil" className="bg-white dark:bg-slate-900 py-20 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-5xl tracking-[-2.4px] font-semibold mb-12">Profil Sekolah</h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 text-sm">
            <div>
              <div className="uppercase font-medium text-blue-600 mb-1 tracking-widest text-xs">Identitas Resmi</div>
              <div className="space-y-4 mt-6 text-base">
                <div className="flex justify-between border-b pb-3"><span className="text-slate-500">Nama Sekolah</span> <span className="font-semibold">SMK Widya Nusantara Bekasi</span></div>
                <div className="flex justify-between border-b pb-3"><span className="text-slate-500">NPSN</span> <span className="font-semibold">20201234</span></div>
                <div className="flex justify-between border-b pb-3"><span className="text-slate-500">Status</span> <span className="font-semibold">Swasta, Akreditasi A</span></div>
                <div className="flex justify-between border-b pb-3"><span className="text-slate-500">Alamat</span> <span className="font-semibold">Jl. Raya Bekasi No. 88, Bekasi Timur</span></div>
              </div>
            </div>
            <div>
              <div className="uppercase font-medium text-blue-600 mb-1 tracking-widest text-xs">Kontak &amp; Lokasi</div>
              <div className="mt-6 space-y-5">
                <div className="flex gap-4"><Phone className="mt-0.5 text-blue-700" size={19} /> (021) 8245-2211</div>
                <div className="flex gap-4"><Mail className="mt-0.5 text-blue-700" size={19} /> info@smkwidyabekasi.sch.id</div>
                <div className="flex gap-4"><MapPin className="mt-0.5 text-blue-700" size={19} /> Bekasi, Jawa Barat 17112</div>
                <div className="pt-4 border-t">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.120!2d106.98!3d-6.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnMDAuMCJTIDEwNsKwNTgnNTAuMCJF!5e0!3m2!1sen!2sid!4v1700000000000" className="w-full h-56 rounded-2xl" title="Lokasi SMK Widya Nusantara" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. JURUSAN */}
      <section id="jurusan" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <div className="text-blue-600 tracking-[2.5px] text-sm font-medium">PROGRAM KEAHLIAN</div>
          <h3 className="text-6xl tracking-[-2.6px] font-semibold mt-2">Jurusan Unggulan</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {jurusanData.map(j => <JurusanCard key={j.id} jurusan={j} onClick={() => setSelectedJurusan(j)} />)}
        </div>
      </section>

      {/* 5. FASILITAS */}
      <section id="fasilitas" className="bg-white dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl tracking-tight font-semibold text-center mb-14">Fasilitas Sekolah</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Laboratorium Komputer", "Ruang Kelas Modern", "Perpustakaan Digital", "Aula Multifungsi", "Bengkel Praktik TBSM", "Area WiFi Seluruh Sekolah", "Mushola", "Lapangan Olahraga"].map((fas, idx) => (
              <div key={idx} className="bg-slate-100 dark:bg-slate-800 rounded-3xl p-8 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center text-center font-medium text-lg h-36 border border-transparent hover:border-blue-200 dark:hover:border-blue-900">
                {fas}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GALERI */}
      <section id="galeri" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center font-semibold text-5xl tracking-tight mb-10">Galeri Sekolah</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {galeriData.map(item => (
            <div key={item.id} onClick={() => setSelectedImage(item)} className="relative aspect-[16/10] overflow-hidden rounded-3xl group cursor-pointer">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 p-6 text-white">
                <div className="font-medium text-xl tracking-tight">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BERITA */}
      <section id="berita" className="bg-white dark:bg-slate-900 py-20 border-y">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-9">
            <div><h2 className="font-semibold text-5xl tracking-tighter">Berita &amp; Pengumuman</h2></div>
            <div className="text-blue-700 text-sm">Lihat Semua</div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {beritaData.map(b => (
              <div key={b.id} className="border border-slate-200 dark:border-slate-800 p-7 rounded-3xl">
                <div className="text-xs tracking-widest text-blue-700 mb-3">{b.category} • {b.date}</div>
                <div className="font-semibold text-2xl tracking-tight leading-tight mb-3">{b.title}</div>
                <p className="text-slate-600 dark:text-slate-400 text-[15px]">{b.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PRESTASI */}
      <section id="prestasi" className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-12"><h2 className="font-semibold tracking-[-2.5px] text-6xl">Prestasi Sekolah</h2></div>
        <div className="space-y-4">
          {prestasiData.map((p, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center gap-6 border border-slate-200 dark:border-slate-800 px-9 py-7 rounded-3xl">
              <div className="font-mono text-6xl font-semibold tracking-[-4px] text-blue-700 w-20">{p.tahun}</div>
              <div>
                <div className="font-semibold text-3xl tracking-tight">{p.title}</div>
                <div className="text-slate-500 mt-1">{p.description}</div>
              </div>
              <div className="ml-auto px-4 py-1 text-sm bg-blue-100 dark:bg-blue-950 text-blue-700 rounded-full">{p.type}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. TESTIMONI */}
      <section id="testimoni" className="bg-white dark:bg-slate-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12"><h2 className="font-semibold text-5xl tracking-tight">Testimoni Alumni</h2></div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimoniData.map((t) => (
              <div key={t.id} className="border border-slate-200 dark:border-slate-800 rounded-3xl p-9">
                <div className="flex gap-4 mb-6 items-center">
                  <img src={t.foto} alt={t.nama} className="w-14 h-14 rounded-full object-cover ring-1 ring-slate-200" />
                  <div><div className="font-semibold">{t.nama}</div><div className="text-sm text-slate-500">{t.tahun} • {t.jurusan}</div></div>
                </div>
                <p className="italic text-slate-600 dark:text-slate-300 leading-relaxed">“{t.testimoni}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-10"><h2 className="font-semibold text-6xl tracking-[-2.2px]">FAQ</h2></div>
        <div className="space-y-2">
          {faqData.map((faq, index) => (
            <div key={index} onClick={() => toggleFAQ(index)} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-8 py-6 cursor-pointer">
              <div className="flex justify-between items-center font-medium text-xl">
                {faq.question}
                {openFAQ === index ? <ChevronUp /> : <ChevronDown />}
              </div>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-3 text-slate-600 dark:text-slate-400">
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 11. CONTACT */}
      <section id="kontak" className="bg-slate-950 py-24 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-amber-400 text-xs tracking-[4px]">HUBUNGI KAMI</div>
            <div className="text-white font-semibold tracking-[-2.5px] text-6xl mt-2">Mari Bergabung Bersama Kami</div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-9 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nama Lengkap" required className="bg-white/5 border border-white/10 px-7 py-4 rounded-2xl placeholder:text-white/60 text-white focus:outline-none" />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required className="bg-white/5 border border-white/10 px-7 py-4 rounded-2xl placeholder:text-white/60 text-white focus:outline-none" />
            </div>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="No. WhatsApp" className="bg-white/5 border border-white/10 w-full px-7 py-4 rounded-2xl placeholder:text-white/60 mb-6 text-white focus:outline-none" />
            <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} placeholder="Pesan / Pertanyaan Anda" className="bg-white/5 border border-white/10 w-full px-7 py-4 rounded-3xl placeholder:text-white/60 mb-8 text-white resize-y focus:outline-none" />
            <button type="submit" disabled={formSubmitted} className="w-full bg-white text-black font-semibold py-4 rounded-2xl active:bg-amber-400 transition-all disabled:opacity-70">
              {formSubmitted ? "Mengirim..." : "Kirim Pesan"}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white/60 py-16 text-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-y-12">
          <div>
            <div className="flex items-center gap-3 mb-5 text-white">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center"><span className="font-bold">WN</span></div>
              <div className="font-semibold tracking-tight">SMK Widya Nusantara</div>
            </div>
            <div>Mencetak Generasi Unggul</div>
          </div>
          <div>Navigasi Cepat<br />Tentang • Jurusan • Fasilitas • Galeri • Kontak</div>
          <div>Kontak<br />(021) 8245-2211<br />info@smkwidyabekasi.sch.id</div>
          <div>© {new Date().getFullYear()} SMK Widya Nusantara Bekasi<br />Semua Hak Dilindungi.</div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {selectedJurusan && (
          <div className="fixed inset-0 bg-black/70 z-[70] flex items-center justify-center p-6" onClick={() => setSelectedJurusan(null)}>
            <motion.div initial={{ opacity:0, scale:0.96, y:20 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.96, y:20 }}
              onClick={e => e.stopPropagation()} className="bg-white dark:bg-slate-900 max-w-3xl w-full rounded-3xl p-9">
              <div className="flex justify-between mb-7 items-center">
                <div><div className="text-xs tracking-[3px] text-blue-600">{selectedJurusan.singkatan}</div><div className="text-4xl font-semibold tracking-tighter">{selectedJurusan.nama}</div></div>
                <button onClick={() => setSelectedJurusan(null)}><X /></button>
              </div>
              <img src={selectedJurusan.image} className="rounded-2xl mb-8 w-full h-80 object-cover" />
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-9">{selectedJurusan.deskripsi}</p>
              <div className="grid md:grid-cols-2 gap-x-8">
                <div><div className="font-semibold mb-4 text-blue-700">Peluang Karir</div><ul className="space-y-1.5 text-sm">{selectedJurusan.peluang.map((p,i)=><li key={i}>• {p}</li>)}</ul></div>
                <div><div className="font-semibold mb-4 text-blue-700 mt-8 md:mt-0">Kompetensi Keahlian</div><ul className="space-y-1.5 text-sm">{selectedJurusan.kompetensi.map((p,i)=><li key={i}>• {p}</li>)}</ul></div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[80] p-4" onClick={() => setSelectedImage(null)}>
            <div className="max-w-5xl relative">
              <img src={selectedImage.image} className="max-h-[82vh] rounded-2xl shadow-2xl" alt={selectedImage.title} />
              <div className="text-white mt-4 text-center text-xl tracking-tight">{selectedImage.title}</div>
              <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white bg-black/40 p-3 rounded-full"><X /></button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button onClick={scrollToTop} initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
            className="fixed bottom-9 right-6 z-50 p-4 rounded-full bg-blue-700 text-white shadow-xl">
            <ArrowUp size={21} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

