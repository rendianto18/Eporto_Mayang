/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Map, 
  Layers, 
  GraduationCap, 
  BookOpen, 
  TrendingUp, 
  FileText, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Compass,
  Cpu,
  BrainCircuit,
  Mail,
  Phone,
  MapPin,
  Quote,
  Activity,
  CheckCircle,
  HelpCircle,
  FileCode,
  BookMarked,
  User
} from 'lucide-react';

interface HomeProps {
  onNavigate: (tab: string) => void;
  evaluationScore?: number;
  submittedSteps?: { [key: number]: boolean };
  profileImage?: string;
  onImageUpload?: (base64: string) => void;
  studentInfo?: {
    fullName: string;
    nim: string;
    lptk: string;
    school: string;
    email: string;
    programStudi: string;
  };
}

export default function Home({ 
  onNavigate, 
  evaluationScore = 0, 
  submittedSteps = {},
  profileImage = '',
  onImageUpload,
  studentInfo = {
    fullName: 'Mayang Arta Mahesi, S.Kom.',
    nim: '95202541N',
    lptk: 'Universitas Kristen Satya Wacana (UKSW)',
    school: 'SMA Negeri 1 Salatiga',
    email: 'mayangarta09@gmail.com',
    programStudi: 'Informatika'
  }
}: HomeProps) {
  const quizzesCompleted = Object.keys(submittedSteps).length;
  
  // State for Ringkasan UAS sub-menu tabs (refleksi & filosofi)
  const [activeUasSubTab, setActiveUasSubTab] = useState<'refleksi' | 'filosofi'>('refleksi');

  return (
    <div className="space-y-10 animate-fade-in text-slate-800">
      
      {/* 1. HERO SECTION WITH GENERAL BIODATA & MUTIARA */}
      <div className="relative overflow-hidden bg-slate-950 text-white rounded-3xl p-6 md:p-10 shadow-2xl border border-slate-800">
        {/* Futuristic grid background decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="home-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#home-grid)" />
            <circle cx="85%" cy="35%" r="200" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch justify-between gap-8">
          
          {/* Welcome & Pembukaan Panel */}
          <div className="space-y-5 flex-1 flex flex-col justify-center">
            <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-500/10 to-sky-400/10 text-sky-400 border border-sky-400/20 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(56,189,248,0.1)]">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>PPG Guru Amatir Profesional • Angkatan 2026</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight font-display">
              Portofolio Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-450 to-indigo-400">
                Mayang Arta Mahesi
              </span>
            </h1>

            {/* Kalimat Pembukaan Wajib */}
            <p className="text-slate-300 text-sm md:text-base leading-relaxed text-justify border-l-2 border-blue-500/50 pl-4 py-1 italic">
              “Selamat datang di E-Portfolio saya. Portofolio ini merekam perjalanan, refleksi, dan pertumbuhan saya sebagai calon guru profesional melalui program PPG Prajabatan — dari ruang kelas nyata menuju kompetensi yang sesungguhnya.”
            </p>

            {/* General Profile Overview Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-450" />
                <span>PPL: <span className="text-white font-bold">{studentInfo.school}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>LPTK: <span className="text-white font-bold">{studentInfo.lptk}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>Email: <span className="text-slate-200">{studentInfo.email}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-emerald-400" />
                <span>Program Studi: <span className="text-white font-bold">{studentInfo.programStudi}</span></span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-3">
              <button 
                onClick={() => onNavigate('penilaian')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Mulai Jelajah Perjalanan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => onNavigate('artefak')}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-xl border border-slate-800 transition-all cursor-pointer"
              >
                Lihat Jurnal Refleksi
              </button>
            </div>
          </div>

          {/* Student Profile Card (Near Foto/Inisial + Kalimat Mutiara) */}
          <div className="w-full lg:w-85 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
            {/* Corner ambient neon visual effect */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col items-center text-center">
              {/* Profile Avatar Frame - High-fidelity Vector Passport Photo representing Mayang Arta Mahesi, S.Kom. */}
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -1.5, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                className="relative mb-4 group shrink-0"
              >
                <div className="absolute -inset-1.5 bg-red-600/35 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                <div 
                  className="relative w-32 h-44 md:w-36 md:h-48 bg-red-600 rounded-2xl overflow-hidden shadow-lg border border-slate-700/65 flex flex-col items-center justify-end select-none cursor-pointer"
                  onClick={() => document.getElementById('home-avatar-upload')?.click()}
                  title="Klik untuk mengunggah atau mengganti foto resmi"
                >
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Mayang Arta Mahesi, S.Kom." 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <svg className="w-full h-full" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Deep Red Passport Background */}
                      <rect width="120" height="160" fill="#cc1d1d" />
                      
                      {/* Decorative glowing back light */}
                      <circle cx="60" cy="70" r="45" fill="#e52d2d" opacity="0.65" />
                      
                      {/* Inside White Shirt Collar */}
                      <path d="M42 112L60 126L78 112L60 134L42 112Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.75" />
                      <path d="M48 114L60 127L72 114" fill="#ffffff" />
                      
                      {/* Black Academic Blazer / Suit */}
                      <path d="M22 120C22 118 24 115 28 114L44 113L52 135L42 160H15L22 120Z" fill="#18181b" />
                      <path d="M98 120C98 118 96 115 92 114L76 113L68 135L78 160H105L98 120Z" fill="#18181b" />
                      
                      {/* Blazer Lapels */}
                      <path d="M44 113L42 138L52 135L44 113Z" fill="#27272a" />
                      <path d="M76 113L78 138L68 135L76 113Z" fill="#27272a" />
                      
                      {/* Face Contour under Hijab */}
                      <path d="M38 78C38 52 82 52 82 78C82 92 78 98 60 98C42 98 38 92 38 78Z" fill="#fbd38d" />
                      
                      {/* Neck under Hijab */}
                      <path d="M50 94V108H70V94H50Z" fill="#ecc94b" opacity="0.15" />
                      
                      {/* Friendly Facial Features (Mayang's gentle expression) */}
                      {/* Eyes */}
                      <ellipse cx="49" cy="74" rx="2.5" ry="1.75" fill="#2d3748" />
                      <ellipse cx="71" cy="74" rx="2.5" ry="1.75" fill="#2d3748" />
                      <circle cx="49.5" cy="73.5" r="0.6" fill="#ffffff" />
                      <circle cx="71.5" cy="73.5" r="0.6" fill="#ffffff" />
                      {/* Eyebrows */}
                      <path d="M44 69.5C46 68 49 68 52 70" stroke="#1a202c" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M76 69.5C74 68 71 68 68 70" stroke="#1a202c" strokeWidth="1.2" strokeLinecap="round" />
                      {/* Gentle warm Smile */}
                      <path d="M53 86.5C55 88.5 65 88.5 67 86.5" stroke="#c53030" strokeWidth="1.6" strokeLinecap="round" />
                      {/* Subtle blush */}
                      <ellipse cx="44" cy="81" rx="3.5" ry="1.5" fill="#feb2b2" opacity="0.4" />
                      <ellipse cx="76" cy="81" rx="3.5" ry="1.5" fill="#feb2b2" opacity="0.4" />
                      {/* Nose */}
                      <path d="M58 78C59 80 61 80 62 78" stroke="#dd6b20" strokeWidth="0.8" strokeLinecap="round" />
                      
                      {/* Neat Black Hijab Frame and Fold Lines */}
                      <path d="M33 72C33 46 45 36 60 36C75 36 87 46 87 72C87 90 85 96 89 105C93 114 91 116 83 118C75 120 45 120 37 118C29 116 27 114 31 105C35 96 33 90 33 72Z" fill="#09090b" />
                      {/* Tight Inner Hijab lining (Ciput) */}
                      <path d="M38 68C48 57 72 57 82 68C83 62 81 58 77 56C69 52 51 52 43 56C39 58 37 62 38 68Z" fill="#18181b" />
                      {/* Hijab folds around the cheeks */}
                      <path d="M33 72C33 78 37 88 41 94C45 100 48 103 48 106C48 108 52 112 60 112C68 112 72 108 72 106C72 103 75 100 79 94C83 88 87 78 87 72C83 82 78 87 74 91C68 96 66 98 60 98C54 98 52 96 46 91C42 87 37 82 33 72Z" fill="#18181b" />
                      
                      {/* Highlight sheen for high-quality depth */}
                      <path d="M43 45C51 40 69 40 77 45" stroke="#27272a" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
                    </svg>
                  )}

                  {/* Dark transparent glass overlay on hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-slate-900/80 backdrop-blur-xs py-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center">
                    <span className="text-[8px] font-extrabold text-white uppercase tracking-widest font-mono">Ganti Foto</span>
                  </div>
                </div>

                <input 
                  type="file" 
                  id="home-avatar-upload" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && onImageUpload) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (typeof event.target?.result === 'string') {
                          onImageUpload(event.target.result);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />

                <div className="absolute -bottom-1 -right-1 bg-emerald-500 border border-slate-950 rounded-full p-0.5 shadow-md">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
              </motion.div>

              {profileImage && (
                <button
                  type="button"
                  onClick={() => onImageUpload && onImageUpload('')}
                  className="mb-3 text-[9px] font-bold text-slate-400 hover:text-rose-450 transition-colors uppercase tracking-widest font-mono cursor-pointer"
                  title="Klik untuk reset kembali ke avatar bawaan"
                >
                  [ Reset Avatar Bawaan ]
                </button>
              )}

              <h2 className="text-base font-black text-white font-display">{studentInfo.fullName}</h2>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono mt-0.5">NIM. {studentInfo.nim}</p>
              
              <div className="w-full h-px bg-slate-800/80 my-3.5" />

              <div className="space-y-2 w-full text-left text-xs">
                <div className="flex justify-between items-center py-0.5 border-b border-slate-800/50">
                  <span className="text-slate-500 font-bold">LPTK:</span>
                  <span className="text-slate-250 font-bold">{studentInfo.lptk.replace('Universitas Kristen Satya Wacana (UKSW)', 'UKSW Salatiga')}</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-slate-800/50">
                  <span className="text-slate-500 font-bold">PPG Angkatan:</span>
                  <span className="text-slate-250 font-medium">Calon Guru 2026</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-slate-500 font-bold">Mitra PPL:</span>
                  <span className="text-sky-350 font-bold">{studentInfo.school.replace('SMA Negeri 1 ', 'SMAN 1 ')}</span>
                </div>
              </div>
            </div>

            {/* Kalimat Mutiara dekat foto profil */}
            <div className="mt-5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2 text-[11px] leading-relaxed text-slate-350 italic">
              <Quote className="w-4 h-4 text-blue-400 mt-0.5 shrink-0 rotate-180" />
              <p>
                "Mendidik dengan hati bukan sekadar mentransfer materi informatika, melainkan mengaktifkan rasa ingin tahu siswa melalui logika komputasi."
              </p>
            </div>

            {/* Tombol Lihat Profil */}
            <button 
              onClick={() => onNavigate('profil')}
              className="mt-4 w-full py-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all shadow-md select-none cursor-pointer"
            >
              Buka Profil Lengkap & Visi
            </button>
          </div>

        </div>
      </div>

      {/* 2. INFOGRAFIS MENGENAI KESELURUHAN ISI E-PORTFOLIO */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest font-mono">Infografis Interaktif</span>
          <h2 className="text-lg md:text-xl font-extrabold text-slate-900 font-display mt-1 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Meta-Struktur Kerangka E-Portfolio PPG
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Visualisasi alur terintegrasi seluruh pilar kognitif, kompetensi, dan instrumen belajar berpikir komputasional dalam program PPG Prajabatan {studentInfo.fullName.split(',')[0]}.
          </p>
        </div>

        {/* Infographic Steps Visualization Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          
          {/* Step 1 */}
          <div className="bg-gradient-to-b from-blue-50/40 to-white border border-blue-100 p-4 rounded-2xl space-y-3 relative overflow-hidden shadow-3xs group hover:border-blue-400 transition-all">
            <div className="absolute top-2 right-2 text-2xl font-black font-display text-blue-100/60 font-mono">01</div>
            <div className="w-8 h-8 rounded-lg bg-blue-100/80 text-blue-700 flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Kompetensi Guru (CP)</h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                Mencakup 6 standar Capaian Pembelajaran LPTK UKSW untuk kesiapan profesional calon pendidik.
              </p>
            </div>
            <div className="h-1 w-full bg-blue-200 rounded-full" />
          </div>

          {/* Step 2 */}
          <div className="bg-gradient-to-b from-indigo-50/40 to-white border border-indigo-100 p-4 rounded-2xl space-y-3 relative overflow-hidden shadow-3xs group hover:border-indigo-400 transition-all">
            <div className="absolute top-2 right-2 text-2xl font-black font-display text-indigo-100/60 font-mono">02</div>
            <div className="w-8 h-8 rounded-lg bg-indigo-100/80 text-indigo-700 flex items-center justify-center font-bold">
              <Map className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Analisis & Milestones</h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                Peta kronologi pembelajaran dwi-pekan dari AKM, rintangan Bebras, hingga rancangan mengajar komparasi.
              </p>
            </div>
            <div className="h-1 w-full bg-indigo-200 rounded-full" />
          </div>

          {/* Step 3 */}
          <div className="bg-gradient-to-b from-emerald-50/40 to-white border border-emerald-100 p-4 rounded-2xl space-y-3 relative overflow-hidden shadow-3xs group hover:border-emerald-400 transition-all">
            <div className="absolute top-2 right-2 text-2xl font-black font-display text-emerald-100/60 font-mono">03</div>
            <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Media & Modul Guru</h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                Simulasi lab 4 pilar Computational Thinking, integrasi STEM tangki saring air pintar berbasis RFID.
              </p>
            </div>
            <div className="h-1 w-full bg-emerald-200 rounded-full" />
          </div>

          {/* Step 4 */}
          <div className="bg-gradient-to-b from-orange-50/40 to-white border border-orange-100 p-4 rounded-2xl space-y-3 relative overflow-hidden shadow-3xs group hover:border-orange-400 transition-all">
            <div className="absolute top-2 right-2 text-2xl font-black font-display text-orange-100/60 font-mono">04</div>
            <div className="w-8 h-8 rounded-lg bg-orange-100/80 text-orange-700 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Dokumen Bukti Fisik</h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                Arsip digital lembar rintangan aksi nyata, dokumen UAS PDF cetak, dan jurnal reflektif mendalam.
              </p>
            </div>
            <div className="h-1 w-full bg-orange-200 rounded-full" />
          </div>

        </div>

      </div>

      {/* 3. RINGKASAN MENU PORTFOLIO (NAVIGATION CENTRAL HUB) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-600 animate-spin-slow" />
          <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-wider font-display">
            Ringkasan & Portal Navigasi Portofolio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              id: 'profil',
              title: "Profil Calon Guru",
              text: "Biografi pendidikan, visi integrasi CT di SMAN 1 Salatiga, dan peta 6 Capaian Pembelajaran LPTK.",
              icon: <User className="w-5 h-5 text-blue-600" />,
              badge: "Tentang Saya"
            },
            {
              id: 'artefak',
              title: "Artefak & Aksi Nyata",
              text: "Makalah, lembar kerja kolaborasi, jurnal tulisan aksi nyata, saringan air sensor pintar QR.",
              icon: <FileText className="w-5 h-5 text-orange-600" />,
              badge: "4 File Fisik"
            },
            {
              id: 'analisis',
              title: "Analisis Pendidikan",
              text: "Kajian taxonomi Bloom kognitif guru, progres keterampilan, dan evolusi mental berpasangan.",
              icon: <Compass className="w-5 h-5 text-teal-600" />,
              badge: "Tinjauan Kritis"
            },
            {
              id: 'penilaian',
              title: "Penilaian & Kuis",
              text: "Kuis interaktif dwi-pekan yang menguji nalar logis CT, PISA, AKM, serta skor capaian Anda.",
              icon: <Award className="w-5 h-5 text-indigo-600" />,
              badge: "Evaluasi Diri"
            },
            {
              id: 'model-guru',
              title: "Model Guru / Lab",
              text: "Simulator 4 pilar dasar berpikir komputasional secara visual dan modular rancangan ajar.",
              icon: <Layers className="w-5 h-5 text-emerald-600" />,
              badge: "Uji Simulasi"
            }
          ].map((item, index) => (
            <div 
              key={index}
              onClick={() => onNavigate(item.id)}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-3xs hover:shadow-md hover:border-blue-450 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <div className="p-2.5 bg-slate-50 border group-hover:bg-blue-50 group-hover:text-blue-600 rounded-xl transition-all">
                    {item.icon}
                  </div>
                  <span className="text-[8px] font-black font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors font-display mb-1">
                  {item.title}
                </h3>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  {item.text}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-50 flex items-center justify-between text-[9px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                <span>KLIK PINDAH MENU</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. RINGKASAN UAS: SUB-MENU REFLEKSI & FILOSOFI */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden" id="ringkasan-uas-beranda-section">
        {/* Subtle decorative background mark */}
        <div className="absolute top-1/2 left-3/4 -translate-y-1/2 font-display pointer-events-none opacity-[0.03] text-8xl font-black select-none text-blue-400 tracking-wider">
          UAS PPG
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <p className="text-[10px] font-bold text-blue-400 tracking-widest uppercase font-mono">
                Ringkasan Ujian Akhir Semester (UAS)
              </p>
              <h2 className="text-xl font-extrabold font-display mt-0.5">
                Integrasi Pedagogi & Filosofi Berpikir Komputasional
              </h2>
            </div>
            
            {/* Navigasi Sub-Menu Refleksi & Filosofi */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 self-start">
              <button
                onClick={() => setActiveUasSubTab('refleksi')}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-colors cursor-pointer select-none ${
                  activeUasSubTab === 'refleksi' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Refleksi Akademik
              </button>
              <button
                onClick={() => setActiveUasSubTab('filosofi')}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-colors cursor-pointer select-none ${
                  activeUasSubTab === 'filosofi' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Filosofi Pendidikan
              </button>
            </div>
          </div>

          {/* Sub Tab Content Area */}
          <div className="min-h-[140px] flex flex-col justify-between">
            {activeUasSubTab === 'refleksi' ? (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                  <p className="text-xs text-slate-350 leading-relaxed text-justify">
                    <strong>Refleksi Integrasi CT di SMAN 1 Salatiga:</strong> Pembelajaran dwi-pekan yang dipraktikkan pada jenjang kelas Informatika menunjukkan bahwa melatih pola pikir komputasi tidak harus selalu membebani sekolah dengan biaya infrastruktur digital yang mahal (unplugged approach). 
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                  <p className="text-xs text-slate-350 leading-relaxed text-justify">
                    Melalui dekomposisi dan abstraksi, murid-murid di SMA Negeri 1 Salatiga diajak mengurai soal literasi AKM dengan nalar logis bertahap. Hasil uji unjuk kerja memperlihatkan peningkatan hasil belajar kognitif dan ketelitian siswa sebesar 24% dalam memecahkan soal algoritma penjadwalan.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <p className="text-xs text-slate-350 leading-relaxed text-justify">
                    <strong>Filosofi Mengajar "Sistem Among" & Computational Thinking:</strong> Mengharmonisasikan pemikiran luhur Ki Hadjar Dewantara, mendidik anak adalah menuntun kodrat alam dan kodrat zaman murid tumbuh secara alami. 
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <p className="text-xs text-slate-350 leading-relaxed text-justify">
                    Berpikir Komputasional memegang peran utama sebagai bagian dari "kodrat zaman" era digital ini. Murid tidak hanya dibisakan sekadar menjadi konsumen teknologi pasif, melainkan berdaya merancang solusi mandiri secara terbebas dan kritis (Ing Ngarso Sung Tulodo, Ing Madyo Mangun Karso, Tut Wuri Handayani).
                  </p>
                </div>
              </div>
            )}

            {/* CTA navigasi ke halaman cetak UAS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-800">
              <span className="text-[10px] text-slate-400">
                Penyusunan berkas resmi format standard lapor LPTK UKSW Salatiga 
              </span>
              <button
                onClick={() => onNavigate('uas')}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <span>Lihat & Cetak Dokumen UAS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
