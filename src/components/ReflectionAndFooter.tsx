/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Calendar, ArrowUpRight, Compass, Heart, CheckCircle } from 'lucide-react';

export default function ReflectionAndFooter() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
      
      {/* LEFT COLUMN: REFLECTION SECTION */}
      <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-xs">
        <div>
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Refleksi Perjalanan
            </h3>
          </div>

          {/* Core Essay Content */}
          <div className="relative p-5 bg-gradient-to-br from-amber-50/40 to-orange-50/20 rounded-xl border border-dashed border-amber-200/60 leading-relaxed text-xs text-slate-700 shadow-3xs">
            <span className="absolute top-3 right-4 font-mono text-[9px] text-amber-600/70 select-none">
              Jurnal Refleksi Kuliah PPG
            </span>
            
            <p className="indent-4 leading-relaxed text-justify mb-3">
              Perjalanan mempelajari <strong>Computational Thinking (CT)</strong> telah mengubah cara saya memandang masalah secara total. Saya belajar bahwa sebuah solusi yang baik, tangguh, dan bermutu tinggi tidaklah selalu ditemukan secara instan atau terburu-buru. Solusi yang matang tumbuh subur melalui <strong>proses berpikir yang terstruktur, logis, dan mendalam</strong> melalui integrasi pilar dekomposisi hingga pilar algoritma.
            </p>
            <p className="indent-4 leading-relaxed text-justify">
              Pengalaman luar biasa ini menjadi bekal pedagogi yang sangat berharga bagi saya untuk merancang aktivitas pembelajaran di masa depan. Guru yang berdaya CT tinggi akan mampu melahirkan situasi belajar menantang yang secara alami menumbuhkan kemampuan penalaran kritis dan pemecahan masalah yang asri dan aplikatif pada diri setiap peserta didik.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 text-[10px] text-slate-400 mt-4 font-mono pt-3 border-t border-slate-100">
          <span>Ditulis secara Orisinal oleh Calon Guru</span>
          <span className="text-amber-600 font-extrabold">Terverifikasi Dosen Pembimbing</span>
        </div>
      </div>

      {/* RIGHT COLUMN: FOOTER - LANGKAH KE DEPAN */}
      <div className="md:col-span-5 bg-slate-900 text-slate-100 rounded-2xl p-6 flex flex-col justify-between shadow-md border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <Compass className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider font-display">
              Langkah ke Depan
            </h3>
          </div>

          <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
            Ikhtiar rencana aksi nyata prapraktik mengajar setelah menempuh sertifikasi Computational Thinking:
          </p>

          <div className="space-y-3">
            {[
              { title: "Mengembangkan perangkat ajar berbasis CT", text: "Menyusun RPP/Modul Ajar interaktif yang membubuhkan pilar berpikir komputatif pada bab jaringan komputer & algoritma." },
              { title: "Mengintegrasikan CT dalam aktivitas pembelajaran", text: "Merancang aktivitas unplugged (permainan klasifikasi fisik) agar anak tidak jenuh memandang layar digital." },
              { title: "Merancang projek yang mendorong problem solving", text: "Mengadakan project bento STEM siswa memecahkan masalah kedaulatan lingkungan sekolahan." },
              { title: "Menjadi guru Informatika yang kreatif, reflektif, dan adaptif", text: "Membiasakan evaluasi performa rancangan kelas secara terbuka berdasarkan asupan dari para pamong dan akademisi." }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-2.5 items-start">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white shrink-0">
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800 pt-4 mt-6">
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>PPG Prajabatan Informatika © 2026</span>
          </div>
          <span className="font-mono">Versi Cetak PDF 1.0</span>
        </div>
      </div>

    </div>
  );
}
