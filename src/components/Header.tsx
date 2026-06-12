/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, GraduationCap, Calendar, User, BookOpen } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative w-full bg-slate-900 text-white rounded-2xl overflow-hidden shadow-xl mb-8 border border-slate-800">
      {/* Decorative clean geometric curves/grid in background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <circle cx="90%" cy="10%" r="200" fill="none" stroke="rgba(34, 197, 94, 0.2)" strokeWidth="1" />
          <circle cx="10%" cy="90%" r="300" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          {/* Institution Label badge with a subtle accent */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full text-xs font-semibold tracking-wider uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Infografik Edukatif PPG Calon Guru</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent font-display">
            Portofolio Jejak Perjalanan
          </h1>
          <p className="text-2xl md:text-4xl font-medium tracking-tight text-blue-400/90 font-display mt-0.5">
            Computational Thinking
          </p>
          <p className="text-slate-400 text-sm mt-3 max-w-xl leading-relaxed">
            Dokumentasi komprehensif, terstruktur, dan aksi reflektif dalam menguasai, menguji, 
            dan mengintegrasikan berpikir komputasional pada Kurikulum Informatika sekolah.
          </p>
        </div>

        {/* Credentials badge */}
        <div className="flex flex-col gap-3.5 bg-slate-850/80 p-5 rounded-xl border border-slate-700/60 backdrop-blur-xs min-w-[280px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">Penyusun</p>
              <p className="text-sm font-bold text-slate-100 font-display">Mayang Arta Mahesi, S.Kom.</p>
            </div>
          </div>

          <div className="h-px bg-slate-700/60" />

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <div>
              <p className="text-slate-500">NIM</p>
              <p className="text-slate-200 font-mono font-semibold">95202541N</p>
            </div>
            <div>
              <p className="text-slate-500">Mata Kuliah</p>
              <p className="text-slate-200 font-semibold truncate">Informatika (BK)</p>
            </div>
            <div>
              <p className="text-slate-500">Program</p>
              <p className="text-slate-200 font-semibold">PPG Prajabatan</p>
            </div>
            <div>
              <p className="text-slate-500">Tahun Akademik</p>
              <p className="text-slate-200 font-semibold font-mono">2026/2027</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
