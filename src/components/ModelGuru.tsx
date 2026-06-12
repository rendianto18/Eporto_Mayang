/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Compass, 
  Target, 
  Star, 
  CheckCircle2, 
  Award, 
  Heart, 
  TrendingUp, 
  Users, 
  BookOpen, 
  ShieldCheck, 
  Fingerprint,
  Zap,
  Cpu,
  Tv
} from 'lucide-react';
import { motion } from 'motion/react';
import BottomPillars from './BottomPillars';
import RightPanel from './RightPanel';

interface ModelGuruProps {
  studentInfo?: any;
}

export default function ModelGuru({ studentInfo }: ModelGuruProps) {
  const [activeMisiIdx, setActiveMisiIdx] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<'model' | 'pillars' | 'bloom'>('model');

  const misiList = [
    {
      title: studentInfo?.misi1Title || "Misi 1: Pionir Literasi Computational Thinking Nasional",
      desc: studentInfo?.misi1Desc || "Menjadi pelopor implementasi cara berpikir komputasi (dekomposisi, pola, abstraksi, algoritma) di lingkungan sekolah untuk rumpun pelajaran STEM guna mengakselerasi keterampilan problem solving abad ke-21.",
      execution: studentInfo?.misi1Execution || "Melakukan lokakarya mandiri (micro-teaching sharing) dengan teman sejawat, menyusun bahan ajar unplugged inovatif, dan menulis berkas best practices di komunitas MGMP.",
      icon: <Zap className="w-5 h-5 text-indigo-400" />
    },
    {
      title: studentInfo?.misi2Title || "Misi 2: Pendidik Inklusif Berakar Pancasila",
      desc: studentInfo?.misi2Desc || "Merancang ruang belajar yang mengedepankan diferensiasi (differentiated learning) yang aman, nyaman, berpihak penuh pada kodrat murid, serta menuntut terbentuknya karakter Profil Pelajar Pancasila.",
      execution: studentInfo?.misi2Execution || "Melakukan asesmen diagnostik non-kognitif, merancang tantangan bertingkat untuk mengakomodasi anak lambat kognitif, serta mengintegrasikan muatan reflektif di penutupan.",
      icon: <Users className="w-5 h-5 text-blue-400" />
    },
    {
      title: studentInfo?.misi3Title || "Misi 3: Pembelajar Seputar Hidup yang Reflektif (Life-long Learner)",
      desc: studentInfo?.misi3Desc || "Membudayakan evaluasi diri harian pasca-aksi (reflective teaching) dan adaptif mendalam terhadap tren inovasi teknologi cerdas, bukan sekadar menggunakan alat bantu melainkan memperkuat pedagogik.",
      execution: studentInfo?.misi3Execution || "Aktif menulis refleksi dwi-mingguan, meminta umpan balik terbuka dari siswa pasca-kelas, memanfaatkan data asesmen untuk merevisi taktik mengajar berikutnya.",
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />
    }
  ];

  const kompetensiList = [
    {
      kategori: "Kompetensi Pedagogik",
      status: "Prioritas Utama",
      materi: "Pemahaman mendalam mengenai karakteristik anak didik, penyusunan Modul Ajar berdiferensiasi, evaluasi formatif terintegrasi, dan kemahiran taktik Scaffolding.",
      target: studentInfo?.pedagogikTarget || "Mampu menyusun RPP interaktif dan adaptif untuk 100% siswa dengan kecepatan belajar variatif."
    },
    {
      kategori: "Kompetensi Kepribadian",
      status: "Penopang Etika",
      materi: "Menampilkan pribadi berwibawa, stabil, jujur, berakhlak mulia, menjadi teladan perilaku santun, dan taat hukum negara.",
      target: studentInfo?.kepribadianTarget || "Memiliki integritas tinggi, disiplin waktu masuk mengajar, dan ramah namun kokoh menjaga batas etika pendidik."
    },
    {
      kategori: "Kompetensi Sosial",
      status: "Kolaborasi Komunitas",
      materi: "Berkomunikasi secara empatik, inklusif, dan objektif dengan seluruh sejawat, kepala sekolah, komite, guru pamong, dosen, serta orang tua murid.",
      target: studentInfo?.sosialTarget || "Membentuk sinergi pembelajaran segitiga (pamong-kampus-siswa) demi melahirkan ruang tumbuh yang asri."
    },
    {
      kategori: "Kompetensi Profesional",
      status: "Penguasaan Keilmuan",
      materi: "Menguasai materi bidang studi Informatika (BK, AD, AP, JKI, SK, TIK, DSI, PLB) secara teoretis tebal dan fungsional praktis.",
      target: studentInfo?.profesionalTarget || "Menguasai logika algoritma visual Scratch, pemrograman biner, perakitan mikrokontroler, dan kedaulatan data digital."
    }
  ];

  const karakterList = [
    { name: "Berpikir Kritis", desc: "Menganalisis aneka isu pengajaran berbasis data empirik lapangan dan merumuskan solusi bertahap." },
    { name: "Kreatif", desc: "Menciptakan media pembelajaran manipulatif (logic cardboard) guna menggugah atensi belajar anak." },
    { name: "Mandiri", desc: "Mengambil kendali pengembangan professional dirinya secara aktif tanpa dorongan paksaan eksternal." },
    { name: "Gotong Royong", desc: "Secara tangguh berkolaborasi dengan rekan sejawat dalam merancang projek P5 kurikulum merdeka." },
    { name: "Kebinekaan Global", desc: "Menghormati perbedaan tata krama budaya asal siswa dan membina toleransi tinggi di dalam lab." },
    { name: "Beriman & Bertakwa", desc: "Menjadikan nilai-nilai ketuhanan serta budi pekerti luhur sebagai jangkar kompas perilaku spiritual." }
  ];

  return (
    <div className="space-y-6 animate-fade-in" id="model-guru-section">
      {/* Upper sub-tab Navigation */}
      <div className="flex bg-slate-100 p-1 rounded-xl mb-6 gap-1 max-w-full overflow-x-auto shrink-0 shadow-3xs">
        <button
          onClick={() => setActiveSubTab('model')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'model' 
              ? 'bg-white text-indigo-700 shadow-2xs' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Rancangan Model Guru Cita-Cita</span>
        </button>
        <button
          onClick={() => setActiveSubTab('pillars')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'pillars' 
              ? 'bg-white text-indigo-700 shadow-2xs' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Lab & Media 4 Pilar CT (Interactive)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('bloom')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'bloom' 
              ? 'bg-white text-indigo-700 shadow-2xs' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Skala Progresi Kognitif (Bloom)</span>
        </button>
      </div>

      {activeSubTab === 'model' ? (
        <div className="space-y-6">
          {/* Title Header */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/85 shadow-3xs">
            <h2 className="text-xl font-extrabold text-slate-900 font-display">Model Guru Profesional yang Dituju</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl">
              Kompas cita-cita pengembangan diri Mayang Arta Mahesi, S.Kom., merangkum rancangan misi pengajaran masa depan, klaster kompetensi yang tengah didongkrak, hingga pembentukan karakter guru profesional.
            </p>
          </div>

          {/* MISSION RADAR (Interactive Section) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left hand selection items */}
            <div className="lg:col-span-5 bg-slate-950 text-white rounded-2xl p-5 md:p-6 border border-slate-800 shadow-md flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-800">
                  <Target className="w-5 h-5 text-blue-450" />
                  <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300">Target Misi Guru Profesional</h3>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed text-justify mb-2">
                  Misi terukur yang saya canangkan untuk memandu perjalanan karier saya dari status mahasiswa PPG hingga menjadi guru profesional seutuhnya:
                </p>

                <div className="space-y-2.5">
                  {misiList.map((misi, idx) => {
                    const isActive = idx === activeMisiIdx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveMisiIdx(idx)}
                        className={`w-full text-left p-3 rounded-lg border text-xs font-semibold transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                          isActive 
                            ? 'bg-blue-600/20 border-blue-450 text-white shadow-inner' 
                            : 'bg-slate-900 border-slate-850 hover:bg-slate-900/60 text-slate-400'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                          isActive ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="truncate flex-1">{misi.title.split(":")[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-[10px] leading-relaxed italic text-blue-300 mt-5">
                "Guru yang berdaya adalah guru yang berhenti lari dari refleksi dan bersedia dikritik demi perbaikan mutu nalar kognitif anak muridnya."
              </div>
            </div>

            {/* Right hand content display */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/85 p-6 shadow-3xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  {misiList[activeMisiIdx].icon}
                  <h4 className="text-sm font-black text-slate-900 font-display">
                    {misiList[activeMisiIdx].title}
                  </h4>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-dashed text-slate-700 leading-relaxed space-y-1">
                    <span className="text-[10px] font-bold text-slate-450 block uppercase tracking-wide">Visi Utama Misi:</span>
                    <p className="font-medium text-justify">{misiList[activeMisiIdx].desc}</p>
                  </div>

                  <div className="bg-blue-50/40 p-4 rounded-xl border border-blue-100 text-slate-700 leading-relaxed space-y-1">
                    <span className="text-[10px] font-bold text-blue-700 block uppercase tracking-wide">Rencana Aksi & Langkah Konkret:</span>
                    <p className="font-semibold text-slate-800 text-justify">{misiList[activeMisiIdx].execution}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3.5 mt-4 text-[10px] text-slate-400 flex justify-between items-center font-mono">
                <span>Misi Terarah Mayang Arta Mahesi</span>
                <span>UKSW Salatiga 2026</span>
              </div>
            </div>

          </div>

          {/* CORE COMPETENCY TIERS */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 ml-1">
              <Award className="w-4.5 h-4.5 text-blue-600" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-display">Tumpuan Empat Standar Kompetensi Guru</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kompetensiList.map((comp, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border hover:border-blue-400 transition-all rounded-xl p-4 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[9px] font-black uppercase text-indigo-700 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded">
                        {comp.status}
                      </span>
                      <Award className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-950 font-display mb-1.5">{comp.kategori}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed text-justify mb-3">{comp.materi}</p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border text-[10px] text-slate-600 font-medium">
                    <span className="font-extrabold text-indigo-900 block uppercase text-[8px] mb-0.5">Target Indikator:</span>
                    {comp.target}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CHARACTER BUILDING STANDARDS */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 space-y-5 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Fingerprint className="w-5 h-5 text-emerald-400 animate-pulse" />
              <div>
                <h3 className="text-sm font-extrabold text-white font-display">Karakter Guru Profesional Yang Dibangun</h3>
                <p className="text-[10px] text-slate-400 font-medium">Berlandaskan Asas Profil Pelajar Pancasila</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
              {karakterList.map((kar, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/90 border border-slate-850 p-3 rounded-xl hover:border-emerald-500/40 transition-colors flex flex-col gap-1 text-center"
                >
                  <span className="text-[10px] font-extrabold text-emerald-400 font-mono tracking-widest uppercase">0{idx+1}</span>
                  <h4 className="text-xs font-bold text-white font-display">{kar.name}</h4>
                  <p className="text-[9.5px] text-slate-400 leading-relaxed mt-1 font-sans">
                    {kar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeSubTab === 'pillars' ? (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/85 shadow-3xs">
            <h2 className="text-xl font-extrabold text-slate-900 font-display">Lab 4 Pilar Computational Thinking</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Simulasi interaktif pilar dekomposisi, pengenalan pola, abstraksi, dan pembentukan algoritma runtut terpadu.
            </p>
          </div>
          <BottomPillars />
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/85 shadow-3xs">
            <h2 className="text-xl font-extrabold text-slate-900 font-display">Progresi Kognitif & Taksonomi Bloom</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Kajian tahapan kognitif dari mengingat hingga menciptakan guna melahirkan asupan modul ajar CT kelas mantap.
            </p>
          </div>
          <RightPanel />
        </div>
      )}

    </div>
  );
}
