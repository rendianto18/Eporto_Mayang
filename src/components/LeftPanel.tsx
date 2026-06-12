/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Compass,
  Info 
} from 'lucide-react';
import { capaianDaftar } from '../data';

export default function LeftPanel() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const getIcon = (name: string, colorClass: string) => {
    const size = "w-5 h-5 " + colorClass;
    switch (name) {
      case 'GraduationCap': return <GraduationCap className={size} />;
      case 'CheckCircle2': return <CheckCircle2 className={size} />;
      case 'Sparkles': return <Sparkles className={size} />;
      case 'BookOpen': return <BookOpen className={size} />;
      case 'Layers': return <Layers className={size} />;
      case 'Compass': return <Compass className={size} />;
      default: return <GraduationCap className={size} />;
    }
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'Teori': return 'bg-blue-50 text-blue-700 border-blue-200/50';
      case 'Praktis': return 'bg-emerald-50 text-emerald-700 border-emerald-200/50';
      case 'Problem Solving': return 'bg-purple-50 text-purple-700 border-purple-200/50';
      case 'Kurikulum': return 'bg-amber-50 text-amber-700 border-amber-200/50';
      case 'Projek': return 'bg-indigo-50 text-indigo-700 border-indigo-200/50';
      default: return 'bg-slate-50 text-slate-700 border-slate-200/50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 md:p-6">
      {/* Title block with academic border style */}
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
        <div className="w-2.5 h-6 bg-blue-600 rounded-xs" />
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Capaian Pembelajaran (CP)
          </h2>
          <p className="text-xs text-slate-500">
            Kompetensi inti berpikir komputasional yang dikuasai
          </p>
        </div>
      </div>

      {/* Grid of outcomes */}
      <div className="flex flex-col gap-3">
        {capaianDaftar.map((item) => {
          const isHovered = hoveredId === item.id;
          return (
            <div
              key={item.id}
              className={`group transition-all duration-300 p-4 rounded-xl border flex gap-3.5 items-start bg-slate-50/50 ${
                isHovered
                  ? 'border-blue-300 shadow-xs bg-blue-50/10 -translate-y-0.5' 
                  : 'border-slate-100'
              }`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Icon casing with gradient shadow on hover */}
              <div className={`p-2.5 rounded-lg border transition-all duration-300 flex items-center justify-center shrink-0 ${
                isHovered 
                  ? 'bg-blue-100/60 border-blue-200 text-blue-600 shadow-xs' 
                  : 'bg-white border-slate-100 text-slate-600'
              }`}>
                {getIcon(item.iconName, isHovered ? 'text-blue-600' : 'text-slate-600')}
              </div>

              {/* Text Area */}
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-sm border ${getCategoryTheme(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">
                    CP.0{item.id}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 p-3.5 bg-blue-50/40 rounded-xl border border-blue-100/40 flex items-start gap-2 text-slate-500 text-[11px] leading-relaxed">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <span>
          Capaian pembelajaran ini dirancang selaras dengan standar kompetensi pendidik bidang Informatika pada LPTK nasional.
        </span>
      </div>
    </div>
  );
}
