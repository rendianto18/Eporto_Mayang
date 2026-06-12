/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TrendingUp, UserCheck, ShieldAlert, Award, Star, ListChecks } from 'lucide-react';

interface Stage {
  level: string;
  title: string;
  taxonomy: string;
  description: string;
  indicators: string[];
}

const progressionStages: Stage[] = [
  {
    level: "Tahap 1",
    title: "Mengenal konsep CT",
    taxonomy: "Mengingat (C1)",
    description: "Memformulasikan makna mendasar dari dekomposisi, pengenalan pola, abstraksi, dan algoritma secara literal.",
    indicators: ["Mendefinisikan pilar-pilar CT", "Menjelaskan pentingnya CT dalam penyelesaian masalah"]
  },
  {
    level: "Tahap 2",
    title: "Menganalisis masalah",
    taxonomy: "Memahami (C2)",
    description: "Membongkar problem besar menjadi struktur mikro dan memetakan batasan-batasan komponen masalah.",
    indicators: ["Memilah-milah data mentah", "Mengidentifikasi faktor pemicu persoalan"]
  },
  {
    level: "Tahap 3",
    title: "Mengenali pola",
    taxonomy: "Menerapkan (C3)",
    description: "Mendeteksi persamaan karakteristik, urutan kejadian berulang, dan memodelkan data masukan.",
    indicators: ["Menemukan tren numerik/literer", "Mengkategorikan rincian pola serupa"]
  },
  {
    level: "Tahap 4",
    title: "Menyusun solusi",
    taxonomy: "Menganalisis (C4)",
    description: "Mendesain skema solusi logis serta abstraksi data tak krusial demi formulasi program yang bersih.",
    indicators: ["Merancang algoritma runtut (flowchart)", "Menghapus kriteria data tidak mendesak"]
  },
  {
    level: "Tahap 5",
    title: "Merancang projek",
    taxonomy: "Mengevaluasi (C5)",
    description: "Mensintesis proyek STEM terintegrasi CT dan membimbing evaluasi hasil kerja secara kritis.",
    indicators: ["Menguji coba prototipe teknologi", "Merevisi langkah algoritma yang pincang"]
  },
  {
    level: "Tahap 6",
    title: "Mengintegrasikan CT dalam pembelajaran",
    taxonomy: "Menciptakan (C6)",
    description: "Merumuskan Modul Ajar, asesmen kelas, serta mengajar dengan pendekatan CT (unplugged maupun plugged).",
    indicators: ["Menyusun perangkat ajar CT aktif", "Mengevaluasi tumbuh kembang nalar berpikir kritis siswa"]
  }
];

export default function RightPanel() {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(5); // Default to the highest PPG state

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 md:p-6 flex flex-col h-full">
      {/* Title block */}
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
        <div className="w-2.5 h-6 bg-blue-500 rounded-xs" />
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Perkembangan Kemampuan CT
          </h2>
          <p className="text-xs text-slate-500">
            Diagram progresi kompetensi kognitif (Taksonomi Bloom)
          </p>
        </div>
      </div>

      {/* Progression diagram wrapper */}
      <div className="flex flex-col gap-3.5 flex-1 justify-between">
        <div className="space-y-2">
          {progressionStages.map((stage, idx) => {
            const isActive = idx === activeStageIdx;
            const isMilestoneCleared = idx < activeStageIdx;

            return (
              <div
                key={idx}
                onClick={() => setActiveStageIdx(idx)}
                className={`group cursor-pointer p-3 rounded-xl border transition-all duration-300 flex items-center gap-3.5 relative overflow-hidden ${
                  isActive
                    ? 'border-blue-400 bg-blue-50/20 shadow-xs ring-1 ring-blue-500/10'
                    : 'border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200'
                }`}
              >
                {/* Arrow connector indicating flow, hidden on last item */}
                {idx < progressionStages.length - 1 && (
                  <div className="absolute bottom-[-10px] left-[25px] w-0.5 h-3 bg-slate-200 z-0 pointer-events-none" />
                )}

                {/* Left indicators: level step */}
                <div className={`relative z-10 w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 border ${
                  isActive
                    ? 'bg-blue-600 text-white border-transparent'
                    : isMilestoneCleared
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-400'
                }`}>
                  {idx + 1}
                </div>

                {/* Progression label */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-xs font-bold truncate ${isActive ? 'text-blue-900' : 'text-slate-700'}`}>
                      {stage.title}
                    </p>
                    <span className={`text-[10px] font-semibold font-mono px-1.5 py-0.2 rounded shrink-0 ${
                      isActive 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {stage.taxonomy}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Explanation Box */}
        <div className="mt-4 p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 transition-all duration-300">
          <div className="flex items-center gap-2 mb-2.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Analisis Deskripsi Tingkat {activeStageIdx + 1}
            </h4>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
            {progressionStages[activeStageIdx].description}
          </p>

          <div className="h-px bg-slate-800 mb-3" />

          {/* Indikator Kelulusan */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1">
              <ListChecks className="w-3 h-3" />
              <span>Indikator Unjuk Kerja:</span>
            </p>
            <ul className="space-y-1">
              {progressionStages[activeStageIdx].indicators.map((ind, i) => (
                <li key={i} className="text-[11px] text-slate-400 flex items-start gap-1.5 leading-relaxed">
                  <span className="text-emerald-500 mt-1 font-bold">✓</span>
                  <span>{ind}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
