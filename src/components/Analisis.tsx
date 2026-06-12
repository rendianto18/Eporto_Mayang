/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { portfolioArtifacts } from '../data';
import { 
  BookOpen, 
  HelpCircle, 
  AlertTriangle, 
  Settings, 
  CheckCircle2, 
  Shuffle, 
  Award,
  Bookmark,
  FileText,
  Video,
  Lightbulb,
  FileCheck
} from 'lucide-react';

export default function Analisis() {
  const [activeSubTab, setActiveSubTab] = useState<'empatAspek' | 'artefak'>('empatAspek');
  const [selectedId, setSelectedId] = useState<string>('art-rpp');

  const selectedArtifact = portfolioArtifacts.find(a => a.id === selectedId) || portfolioArtifacts[0];

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'rpp':
        return { label: 'RPP / Modul Ajar', bg: 'bg-indigo-50 border-indigo-200 text-indigo-700', icon: <FileText className="w-4 h-4 text-indigo-600" /> };
      case 'media':
        return { label: 'Media Pembelajaran', bg: 'bg-amber-50 border-amber-200 text-amber-700', icon: <Bookmark className="w-4 h-4 text-amber-600" /> };
      case 'kerja-siswa':
        return { label: 'Hasil Kerja Siswa', bg: 'bg-sky-50 border-sky-200 text-sky-700', icon: <FileCheck className="w-4 h-4 text-sky-600" /> };
      case 'penilaian-gp':
        return { label: 'Penilaian Guru Pamong', bg: 'bg-emerald-50 border-emerald-200 text-emerald-700', icon: <Award className="w-4 h-4 text-emerald-600" /> };
      case 'penilaian-dpl':
        return { label: 'Penilaian Dosen DPL', bg: 'bg-purple-50 border-purple-200 text-purple-700', icon: <Award className="w-4 h-4 text-purple-600" /> };
      case 'video-ppl':
        return { label: 'Video Pembelajaran', bg: 'bg-rose-50 border-rose-200 text-rose-700', icon: <Video className="w-4 h-4 text-rose-600" /> };
      case 'laporan-refleksi':
        return { label: 'Laporan Refleksi', bg: 'bg-teal-50 border-teal-200 text-teal-700', icon: <BookOpen className="w-4 h-4 text-teal-600" /> };
      default:
        return { label: 'Dokumen', bg: 'bg-slate-50 border-slate-200 text-slate-700', icon: <FileText className="w-4 h-4 text-slate-600" /> };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" id="analisis-artefak-section">
      {/* Title header bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/85 shadow-3xs">
        <h2 className="text-xl font-extrabold text-slate-900 font-display">Analisis Mendalam Produk & Refleksi Pembelajaran</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl">
          Setiap artefak pendamping PPL Terbimbing dianalisis secara kritis berasaskan kajian ilmiah teoretis, sasis pedagogik yang diadopsi, kendala nyata penyusunan, dan mitigasi adaptabilitas di kelas berbeda.
        </p>
      </div>

      {/* Modern Tab Selector */}
      <div className="flex bg-slate-100 p-1 rounded-xl max-w-md border border-slate-200/60 shadow-3xs">
        <button
          onClick={() => setActiveSubTab('empatAspek')}
          className={`flex-1 py-2 px-3 text-center text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'empatAspek'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-550 hover:text-slate-800'
          }`}
        >
          Analisis Empat Aspek
        </button>
        <button
          onClick={() => setActiveSubTab('artefak')}
          className={`flex-1 py-2 px-3 text-center text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'artefak'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-550 hover:text-slate-800'
          }`}
        >
          Analisis Per Artefak
        </button>
      </div>

      {activeSubTab === 'empatAspek' ? (
        /* PILAR 04: ANALISIS EMPAT ASPEK BENTO GRID */
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/85 shadow-2xs space-y-6">
            <div className="pb-5 border-b border-slate-100 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-[10px] font-black text-amber-700 uppercase tracking-widest font-mono">
                <FileCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Pilar 04 • Refleksi Praktik</span>
              </div>
              <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight font-display">
                Analisis Empat Aspek Utama
              </h2>
              <p className="text-xs text-slate-400">Tinjauan analitis dwi-pekan terhadap kendala, landasan kognitif pedagogi, kunci keberhasilan, dan adaptasi skenario tindakan belajar.</p>
            </div>

            {/* Aspects Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              
              {/* Aspek 01 · Kendala */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-3xs hover:shadow-2xs transition flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-rose-50 text-rose-700 border border-rose-150 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">Aspek 01</span>
                    <span className="text-[10px] text-slate-455 font-bold font-mono">KENDALA</span>
                  </div>
                  <h3 className="text-sm md:text-base font-black text-slate-900 leading-snug">
                    Kendala Selama Penyusunan Produk Pembelajaran
                  </h3>
                  
                  <div className="space-y-3.5 pt-1.5">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-rose-900 flex items-center gap-1.5 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                        KENDALA TEKNIS
                      </h4>
                      <p className="text-[11px] text-slate-600 text-justify leading-relaxed">
                        Tidak semua komputer sekolah mampu menjalankan MIT App Inventor secara optimal karena keterbatasan spesifikasi dan kecepatan internet. Hal ini memaksa desain ulang skenario pembelajaran dengan pendekatan pair programming.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-rose-900 flex items-center gap-1.5 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                        KENDALA PEDAGOGIS
                      </h4>
                      <p className="text-[11px] text-slate-600 text-justify leading-relaxed">
                        Kesenjangan kemampuan awal siswa cukup signifikan. Sebagian sudah terbiasa dengan logika pemrograman, sementara lainnya belum pernah bersentuhan dengan coding. Merancang pembelajaran yang inklusif dan berdiferensiasi menjadi tantangan tersendiri.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-rose-900 flex items-center gap-1.5 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                        KENDALA WAKTU
                      </h4>
                      <p className="text-[11px] text-slate-600 text-justify leading-relaxed">
                        Penyusunan instrumen asesmen yang autentik dan sesuai profil pelajar Pancasila membutuhkan waktu yang tidak sedikit. Alokasi waktu terbatas antara perkuliahan PPG dan persiapan PPL menuntut manajemen waktu yang ketat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aspek 02 · Teori & Konsep Pedagogi */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-3xs hover:shadow-2xs transition flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-50 text-blue-700 border border-blue-150 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">Aspek 02</span>
                    <span className="text-[10px] text-slate-455 font-bold font-mono">TEORI & PEDAGOGI</span>
                  </div>
                  <h3 className="text-sm md:text-base font-black text-slate-900 leading-snug">
                    Landasan Teori yang Diadopsi
                  </h3>

                  <div className="space-y-3.5 pt-1.5">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        KONSTRUKTIVISME (PIAGET & VYGOTSKY)
                      </h4>
                      <p className="text-[11px] text-slate-600 text-justify leading-relaxed">
                        Siswa membangun pengetahuan melalui pengalaman langsung. ZPD diterapkan melalui scaffolding bertahap dalam setiap sesi coding.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        PROJECT-BASED LEARNING (PBL)
                      </h4>
                      <p className="text-[11px] text-slate-600 text-justify leading-relaxed">
                        Siswa merancang dan mengembangkan aplikasi nyata yang menjawab permasalahan di sekitar mereka, sehingga pembelajaran menjadi kontekstual dan bermakna.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        COMPUTATIONAL THINKING
                      </h4>
                      <p className="text-[11px] text-slate-600 text-justify leading-relaxed">
                        Empat pilar — dekomposisi, pengenalan pola, abstraksi, dan algoritma — dijadikan kerangka berpikir eksplisit bersama MIT App Inventor.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        PEMBELAJARAN DIFERENSIASI
                      </h4>
                      <p className="text-[11px] text-slate-600 text-justify leading-relaxed">
                        Konten, proses, dan produk disesuaikan dengan gaya belajar dan kemampuan awal siswa untuk memastikan semua peserta didik berkembang optimal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aspek 03 · Faktor Keberhasilan */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-3xs hover:shadow-2xs transition flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-150 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">Aspek 03</span>
                    <span className="text-[10px] text-slate-455 font-bold font-mono">FAKTOR KEBERHASILAN</span>
                  </div>
                  <h3 className="text-sm md:text-base font-black text-slate-900 leading-snug">
                    Kunci Keberhasilan Penerapan Produk Pembelajaran
                  </h3>

                  <div className="space-y-3 pt-1.5">
                    {[
                      { num: '1', title: 'Desain Student-Centered', desc: 'Kebebasan memilih tema proyek aplikasi sesuai minat kelompok menjaga motivasi intrinsik siswa sepanjang proses pembelajaran.' },
                      { num: '2', title: 'Media Pembelajaran Beragam', desc: 'Video tutorial pendek, lembar kerja digital interaktif, dan demo langsung membantu siswa dengan berbagai gaya belajar.' },
                      { num: '3', title: 'Sistem Peer-Tutoring', desc: 'Siswa yang lebih cepat memahami konsep didorong membantu teman sebayanya, menciptakan ekosistem belajar kolaboratif.' },
                      { num: '4', title: 'Umpan Balik Formatif Rutin', desc: 'Umpan balik yang spesifik membantu siswa mengetahui area yang perlu diperbaiki tanpa membuat mereka merasa dihakimi.' },
                      { num: '5', title: 'Dukungan Guru Pamong', desc: 'Masukan konstruktif di setiap akhir siklus sangat membantu penyempurnaan perangkat secara berkelanjutan.' }
                    ].map((item) => (
                      <div key={item.num} className="flex gap-3 items-start bg-white p-3 rounded-xl border border-slate-200/60 shadow-3xs">
                        <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-150 text-[10.5px] font-mono font-black flex items-center justify-center shrink-0">
                          {item.num}
                        </span>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-850 uppercase tracking-tight">{item.title}</p>
                          <p className="text-[11px] text-slate-600 leading-relaxed text-justify">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Aspek 04 · Adaptasi & Perubahan */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-3xs hover:shadow-2xs transition flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-purple-50 text-purple-700 border border-purple-150 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">Aspek 04</span>
                    <span className="text-[10px] text-slate-455 font-bold font-mono">ADAPTASI & TINDAKAN</span>
                  </div>
                  <h3 className="text-sm md:text-base font-black text-slate-900 leading-snug">
                    Komponen yang Dapat Dimodifikasi untuk Situasi Kelas Berbeda
                  </h3>

                  <div className="space-y-3 pt-1.5">
                    {[
                      { letter: 'A', title: 'Strategi Pengelompokan', desc: 'Untuk kelas dengan rasio komputer rendah, pengelompokan 3–4 orang dengan rotasi peran (driver, navigator, observer) dapat dioptimalkan. Untuk kelas dengan fasilitas memadai, individual project lebih mendorong kemandirian.' },
                      { letter: 'B', title: 'Kompleksitas Proyek', desc: 'Untuk kelas reguler, proyek dibatasi pada aplikasi satu fitur (single-screen app). Untuk kelas unggulan atau program STEM, proyek dapat dikembangkan menjadi multi-screen app dengan integrasi model ML yang lebih kompleks.' },
                      { letter: 'C', title: 'Moda Asesmen', desc: 'Presentasi demo aplikasi cocok untuk kelas yang ekspresif. Untuk kelas yang cenderung introvert, asesmen portofolio digital atau laporan reflektif menjadi alternatif yang lebih inklusif.' },
                      { letter: 'D', title: 'Mode Pembelajaran (Offline/Online)', desc: 'Modul ajar dirancang agar dapat diadaptasi ke mode luring (menggunakan template offline MIT App Inventor) maupun daring (browser-based AI2 companion) tanpa mengubah alur belajar utama.' }
                    ].map((item) => (
                      <div key={item.letter} className="flex gap-3 items-start bg-white p-3 rounded-xl border border-slate-200/60 shadow-3xs">
                        <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 border border-purple-150 text-[10.5px] font-mono font-black flex items-center justify-center shrink-0">
                          {item.letter}
                        </span>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-850 uppercase tracking-tight">{item.title}</p>
                          <p className="text-[11px] text-slate-600 leading-relaxed text-justify">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : (
        /* PILAR COMPARISON ARTEFAK (The original artifact layout) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT COLUMN: LIST OF ARTIFACTS FOR SELECTION */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Pilih Artefak Kajian:</p>
            <div className="space-y-2.5">
              {portfolioArtifacts.map((art) => {
                const theme = getCategoryTheme(art.category);
                const isSelected = art.id === selectedId;
                return (
                  <button
                    key={art.id}
                    onClick={() => setSelectedId(art.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-2 relative overflow-hidden group cursor-pointer ${
                      isSelected 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-blue-500/10'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border font-display ${isSelected ? 'bg-blue-600/20 border-blue-500/30 text-blue-300' : theme.bg}`}>
                        {theme.label}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 shrink-0">{art.grade}</span>
                    </div>
                    
                    <h3 className={`text-xs font-bold leading-normal ${isSelected ? 'text-white' : 'text-slate-900 group-hover:text-blue-600'}`}>
                      {art.title}
                    </h3>
                    
                    <p className={`text-[10px] line-clamp-2 leading-relaxed ${isSelected ? 'text-slate-350' : 'text-slate-450'}`}>
                      {art.description}
                    </p>

                    {isSelected && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-500 rounded-l" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILED SCIENTIFIC ANALYSIS */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/85 p-6 shadow-3xs flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              {/* Artifact title and status */}
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-slate-900 text-white rounded-xl shadow-xs mt-1 shrink-0">
                    {getCategoryTheme(selectedArtifact.category).icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 font-mono">Arsip Autentik Akademik</span>
                    <h3 className="text-base font-black text-slate-900 font-display mt-0.5 leading-snug">
                      {selectedArtifact.title}
                    </h3>
                  </div>
                </div>
                <div className="text-right shrink-0 bg-slate-50 border px-3- py-1 rounded-xl text-[11px] font-mono p-2">
                  <span className="text-slate-400 block uppercase font-bold text-[8px]">Skor Penilaian</span>
                  <span className="font-extrabold text-blue-800">{selectedArtifact.grade}</span>
                </div>
              </div>

              {/* DETAILED NARRATIVE (Context, Purpose, Pros, Cons, Theory) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-1">
                  <h4 className="text-[10px] font-bold text-slate-455 uppercase tracking-wider flex items-center gap-1.5 font-display">
                    <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                    Konteks & Latar Belakang
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedArtifact.analysis?.context}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-1">
                  <h4 className="text-[10px] font-bold text-slate-455 uppercase tracking-wider flex items-center gap-1.5 font-display">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Kelebihan Utama Produk
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedArtifact.analysis?.pros}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-1">
                  <h4 className="text-[10px] font-bold text-slate-455 uppercase tracking-wider flex items-center gap-1.5 font-display">
                    <Lightbulb className="w-3.5 h-3.5 text-blue-500" />
                    Tujuan Pembuatan
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedArtifact.analysis?.purpose}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-1">
                  <h4 className="text-[10px] font-bold text-slate-455 uppercase tracking-wider flex items-center gap-1.5 font-display">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    Kelemahan & Tantangan
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedArtifact.analysis?.cons}
                  </p>
                </div>

              </div>

              {/* INTEGRATED COGNITIVE THEORY */}
              <div className="p-4 bg-blue-50/40 border border-blue-100 rounded-xl space-y-1.5">
                <h4 className="text-xs font-bold text-blue-900 font-display uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Kajian Teori Terintegrasi PPL Terbimbing
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedArtifact.analysis?.pedagogyTheory}
                </p>
              </div>

              {/* REFLECTION ON FOUR REQUISITE ASPECTS */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-extrabold text-slate-900 border-b pb-1.5 tracking-wide flex items-center gap-1.5">
                  <Settings className="w-4.5 h-4.5 text-indigo-600 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Aspek Refleksi Produk Pembelajaran</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* A. Kendala */}
                  <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/10 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-[10px] font-black font-mono">A</span>
                      <span className="text-xs font-extrabold text-rose-900">Kendala Penyusunan</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {selectedArtifact.analysis?.aspects.constraints}
                    </p>
                  </div>

                  {/* B. Teori Pedagogi */}
                  <div className="p-4 rounded-xl border border-indigo-150 bg-indigo-55/10 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-black font-mono">B</span>
                      <span className="text-xs font-extrabold text-indigo-900">Teori Pedagogi diadopsi</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {selectedArtifact.analysis?.aspects.pedagogicalConcept}
                    </p>
                  </div>

                  {/* C. Faktor Keberhasilan */}
                  <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/10 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] font-black font-mono">C</span>
                      <span className="text-xs font-extrabold text-emerald-900">Faktor Keberhasilan</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {selectedArtifact.analysis?.aspects.successFactors}
                    </p>
                  </div>

                  {/* D. Perubahan Komponen */}
                  <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/10 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-[10px] font-black font-mono">D</span>
                      <span className="text-xs font-extrabold text-amber-900">Mitra Dampak & Skenario Beda</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {selectedArtifact.analysis?.aspects.adaptability}
                    </p>
                  </div>

                </div>
              </div>

            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 gap-2">
              <span>Berkas Rujukan: <span className="font-mono font-bold text-slate-600">{selectedArtifact.linkText}</span></span>
              <span className="font-mono">PPL Terbimbing Terorganisasi • Informatika UKSW 2026</span>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
