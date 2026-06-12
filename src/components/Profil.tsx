/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  MapPin, 
  BookOpen, 
  GraduationCap, 
  Award,
  ShieldCheck,
  BookMarked,
  Phone,
  Instagram,
  Video
} from 'lucide-react';

interface ProfilProps {
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

export default function Profil({ profileImage = '', onImageUpload, studentInfo: propStudentInfo }: ProfilProps) {
  const [localStudentInfo] = useState(() => {
    try {
      const stored = localStorage.getItem('ppg_student_info');
      return stored ? JSON.parse(stored) : {
        fullName: 'Mayang Arta Mahesi, S.Kom.',
        nim: '95202541N',
        lptk: 'Universitas Kristen Satya Wacana (UKSW)',
        school: 'SMA Negeri 1 Salatiga',
        email: 'mayangarta09@gmail.com',
        programStudi: 'Informatika'
      };
    } catch {
      return {
        fullName: 'Mayang Arta Mahesi, S.Kom.',
        nim: '95202541N',
        lptk: 'Universitas Kristen Satya Wacana (UKSW)',
        school: 'SMA Negeri 1 Salatiga',
        email: 'mayangarta09@gmail.com',
        programStudi: 'Informatika'
      };
    }
  });

  const studentInfo = propStudentInfo || localStudentInfo;

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* 1. PROFESSIONAL HEADER HERO BANNER */}
      <div className="relative overflow-hidden bg-slate-950 text-white rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-800/80">
        
        {/* Glowing Mesh Orbs */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        
        {/* Sleek Tech Blueprint Grid */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 md:gap-10">
          {/* Avatar and Badges */}
          <div className="relative shrink-0 flex flex-col items-center">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -1.5, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 14 }}
              className="w-32 h-44 md:w-36 md:h-48 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-amber-400 p-0.5 shadow-2.5xl relative group"
            >
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-3xl blur-md opacity-50 group-hover:opacity-90 transition duration-300" />
              
              <div 
                className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden shadow-inner flex flex-col items-center justify-end cursor-pointer"
                onClick={() => document.getElementById('profile-file-uploader')?.click()}
                title="Klik atau seret foto kesini untuk mengunggah"
              >
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt={studentInfo.fullName} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <svg className="w-full h-full" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="120" height="160" fill="#cc1d1d" />
                    <circle cx="60" cy="70" r="45" fill="#e52d2d" opacity="0.65" />
                    <path d="M42 112L60 126L78 112L60 134L42 112Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.75" />
                    <path d="M48 114L60 127L72 114" fill="#ffffff" />
                    <path d="M22 120C22 118 24 115 28 114L44 113L52 135L42 160H15L22 120Z" fill="#18181b" />
                    <path d="M98 120C98 118 96 115 92 114L76 113L68 135L78 160H105L98 120Z" fill="#18181b" />
                    <path d="M44 113L42 138L52 135L44 113Z" fill="#27272a" />
                    <path d="M76 113L78 138L68 135L76 113Z" fill="#27272a" />
                    <path d="M38 78C38 52 82 52 82 78C82 92 78 98 60 98C42 98 38 92 38 78Z" fill="#fbd38d" />
                    <path d="M50 94V108H70V94H50Z" fill="#ecc94b" opacity="0.15" />
                    <ellipse cx="49" cy="74" rx="2.5" ry="1.75" fill="#2d3748" />
                    <ellipse cx="71" cy="74" rx="2.5" ry="1.75" fill="#2d3748" />
                    <circle cx="49.5" cy="73.5" r="0.6" fill="#ffffff" />
                    <circle cx="71.5" cy="73.5" r="0.6" fill="#ffffff" />
                    <path d="M44 69.5C46 68 49 68 52 70" stroke="#1a202c" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M76 69.5C74 68 71 68 68 70" stroke="#1a202c" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M53 86.5C55 88.5 65 88.5 67 86.5" stroke="#c53030" strokeWidth="1.6" strokeLinecap="round" />
                    <ellipse cx="44" cy="81" rx="3.5" ry="1.5" fill="#feb2b2" opacity="0.4" />
                    <ellipse cx="76" cy="81" rx="3.5" ry="1.5" fill="#feb2b2" opacity="0.4" />
                    <path d="M58 78C59 80 61 80 62 78" stroke="#dd6b20" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M33 72C33 46 45 36 60 36C75 36 87 46 87 72C87 90 85 96 89 105C93 114 91 116 83 118C75 120 45 120 37 118C29 116 27 114 31 105C35 96 33 90 33 72Z" fill="#09090b" />
                    <path d="M38 68C48 57 72 57 82 68C83 62 81 58 77 56C69 52 51 52 43 56C39 58 37 62 38 68Z" fill="#18181b" />
                    <path d="M33 72C33 78 37 88 41 94C45 100 48 103 48 106C48 108 52 112 60 112C68 112 72 108 72 106C72 103 75 100 79 94C83 88 87 78 87 72C83 82 78 87 74 91C68 96 66 98 60 98C54 98 52 96 46 91C42 87 37 82 33 72Z" fill="#18181b" />
                    <path d="M43 45C51 40 69 40 77 45" stroke="#27272a" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
                  </svg>
                )}

                <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider block">Unggah Foto</span>
                  <span className="text-[8px] text-slate-300 block mt-1 leading-tight">Seret-lepas / klik disini</span>
                </div>
              </div>

              <input 
                type="file" 
                id="profile-file-uploader" 
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
            </motion.div>
            
            {profileImage && (
              <button 
                type="button"
                onClick={() => onImageUpload && onImageUpload('')}
                className="mt-3 bg-red-950/30 hover:bg-red-950/50 border border-red-550/30 text-red-300 hover:text-white rounded-lg px-2.5 py-1 text-[8px] font-black uppercase tracking-widest transition-all duration-200 active:scale-95 shadow-sm block text-center cursor-pointer"
                title="Hapus foto unggahan & gunakan avatar bawaan"
              >
                Reset Ke Avatar Bawaan
              </button>
            )}

            <div className="absolute top-40 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-slate-950 shadow-lg z-20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          {/* Student Info */}
          <div className="space-y-4 text-center lg:text-left flex-1">
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 backdrop-blur-md text-cyan-300 border border-indigo-550/20 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                Mahasiswa LPTK PPG Prajabatan • Angkatan 2026
              </span>
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight font-display text-white">
                {studentInfo.fullName.includes(',') ? (
                  <>
                    {studentInfo.fullName.split(',')[0]}, <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-300 bg-clip-text text-transparent">{studentInfo.fullName.split(',')[1]}</span>
                  </>
                ) : (
                  studentInfo.fullName
                )}
              </h1>
              <p className="text-xs md:text-sm text-slate-400 font-bold tracking-wide flex justify-center lg:justify-start items-center gap-1.5">
                <span className="bg-gradient-to-r from-cyan-500 to-indigo-500 w-2.5 h-2.5 rounded-full inline-block shrink-0" />
                Transformasi Pembelajaran Berpikir Komputasional & Desain Aplikasi Kreatif
              </p>
            </div>

            {/* Immersive Glassmorphism Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <a 
                href="https://instagram.com/mayangarta"
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 hover:bg-white/15 hover:border-pink-500/35 transition-all duration-300 flex items-center gap-3 cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 shrink-0 border border-pink-500/15 group-hover:bg-pink-500/20 transition-all">
                  <Instagram className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-slate-300 block uppercase font-black tracking-wider">Instagram</span>
                  <span className="font-extrabold text-pink-300 text-[11px] group-hover:text-pink-250 transition-colors">@mayangarta</span>
                </div>
              </a>

              <a 
                href="https://tiktok.com/@mayangarta"
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 hover:bg-white/15 hover:border-indigo-400/35 transition-all duration-300 flex items-center gap-3 cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 border border-indigo-500/15 group-hover:bg-indigo-500/20 transition-all">
                  <Video className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-slate-300 block uppercase font-black tracking-wider">TikTok</span>
                  <span className="font-extrabold text-indigo-300 text-[11px] group-hover:text-indigo-250 transition-colors">@mayangarta</span>
                </div>
              </a>

              <a 
                href="https://wa.me/6285157654440"
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10 hover:bg-white/15 hover:border-emerald-500/35 transition-all duration-300 flex items-center gap-3 cursor-pointer group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 border border-emerald-500/15 group-hover:bg-emerald-500/20 transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-slate-300 block uppercase font-black tracking-wider">WhatsApp</span>
                  <span className="font-extrabold text-emerald-300 text-[11px] group-hover:text-emerald-250 transition-colors">085157654440</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DENT DETAILS PROFILE INFO & ACADEMIC CP TARGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Card: Info Ringkas Mahasiswa */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/85 shadow-2xs space-y-5">
          <div className="pb-3 border-b border-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-650" />
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-800 font-mono">
              Informasi Akademik
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <span className="text-slate-400 font-medium">Asal Daerah</span>
              <span className="font-extrabold text-slate-800">Grobogan, Jawa Tengah</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <span className="text-slate-400 font-medium">LPTK Penyelenggara</span>
              <span className="font-extrabold text-slate-800 text-right">UKSW Salatiga</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <span className="text-slate-400 font-medium font-semibold text-slate-500">Nomor Induk Mahasiswa (NIM)</span>
              <span className="font-bold text-slate-800 font-mono">{studentInfo.nim}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <span className="text-slate-455 font-medium">Sekolah Mitra PPL</span>
              <span className="font-extrabold text-indigo-650 font-black">SMA Negeri 1 Salatiga</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
              <span className="text-slate-400 font-medium">Program Studi</span>
              <span className="font-extrabold text-slate-800">PPG Informatika 2026</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-400 font-medium">Email Resmi</span>
              <span className="font-extrabold text-slate-800 font-mono text-[11px]">{studentInfo.email}</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50/50 p-4 rounded-xl border border-indigo-100 text-xs">
              <span className="text-[9px] font-black text-indigo-800 uppercase tracking-wider block font-mono mb-1">Motto Mengajar</span>
              <p className="italic text-slate-655 font-semibold leading-relaxed text-justify">
                "Mendidik dengan hati, mentransformasikan nalar kritis lewat logika komputasi untuk masa depan unggul Pancasila."
              </p>
            </div>
          </div>
        </div>

        {/* Right Card: Biografi Ringkas & Visi Misi */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/85 shadow-2xs space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <GraduationCap className="w-4.5 h-4.5 text-indigo-650" />
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-800 font-mono">
                Biografi & Visi Guru
              </h3>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed text-justify space-y-2 font-sans">
              <p>
                Saya adalah mahasiswa PPG Prajabatan Informatika di LPTK <strong>{studentInfo.lptk}</strong> dengan penempatan praktik klinik di <strong>{studentInfo.school}</strong>. Berasal dari Grobogan, daerah yang terkenal dengan fenomena geologi Bledug Kuwu dan Api Abadi Mrapen, saya memperoleh inspirasi tentang keindahan keteraturan logika alam.
              </p>
              <p>
                Melalui program ini, saya berkomitmen penuh mengintegrasikan pendekatan <strong>Berpikir Komputasional (CT)</strong> dalam pengajaran informatika, membiasakan siswa tidak sekadar menggunakan teknologi, melainkan mampu merancang solusi algoritma kreatif untuk menyelesaikan masalah nyata dalam gawai cerdas.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Visi */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150 text-xs">
              <span className="text-[9px] font-black text-indigo-700 uppercase tracking-widest block font-mono mb-1">Visi Utama</span>
              <p className="font-extrabold text-slate-800 leading-normal text-justify">
                Mencetak generasi yang kreatif, bernalar kritis, dan adaptif melalui pembelajaran CT dan integrasi mobile apps.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150 text-xs">
              <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest block font-mono mb-1">Misi Aksi</span>
              <ul className="list-disc pl-4 text-slate-655 font-semibold space-y-0.5 text-justify">
                <li>Menyusun modul ajar interaktif MIT App Inventor</li>
                <li>Melakukan refleksi pembelajaran sistematis berkelanjutan</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
