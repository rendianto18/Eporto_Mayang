/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { 
  Milestone as MilestoneIcon, 
  ChevronRight, 
  Check, 
  HelpCircle, 
  BookOpen, 
  CheckCircle2, 
  XCircle,
  Lightbulb,
  ArrowRight,
  ClipboardList,
  Layers,
  UserCheck,
  Award,
  BookOpenCheck,
  Download,
  ArrowUpRight,
  TrendingUp,
  FileSpreadsheet,
  FileCode,
  Cpu,
  Smartphone,
  BarChart3,
  Target
} from 'lucide-react';
import { Milestone } from '../types';

interface CenterPanelProps {
  score: number;
  onScoreChange: (score: number) => void;
  selectedAnswers: { [key: number]: number };
  onSelectedAnswersChange: (answers: { [key: number]: number }) => void;
  submittedSteps: { [key: number]: boolean };
  onSubmittedStepsChange: (submitted: { [key: number]: boolean }) => void;
  milestones: Milestone[];
  lampiran7?: any;
  lampiran8?: any;
}

export default function CenterPanel({
  score,
  onScoreChange,
  selectedAnswers,
  onSelectedAnswersChange,
  submittedSteps,
  onSubmittedStepsChange,
  milestones,
  lampiran7,
  lampiran8
 }: CenterPanelProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeSubTab, setActiveSubTab] = useState<'peta' | 'lampiran7' | 'lampiran8' | 'visualisasi' | 'download'>('peta');
  const [selectedCycle, setSelectedCycle] = useState<1 | 2 | 3>(1);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{ cycle: string; rpp: number; practice: number } | null>(null);
  const [activeDetailDimension, setActiveDetailDimension] = useState<string>('ct');

  const activeMilestone = milestones.find(m => m.number === activeStep) || milestones[0] || {
    number: 1,
    title: 'Belum ada Milestone',
    shortDescription: 'Silakan tambahkan di dashboard Admin.',
    fullNarrative: 'Gunakan panel admin yang disamarkan jika ingin merestorasi atau mengelola milestone kuis secara runtut.',
    challengeTitle: 'Kuis Kosong',
    challengeInteractive: undefined
  };

  const handleSelectOption = (index: number) => {
    if (submittedSteps[activeStep]) return;
    const updated = {
      ...selectedAnswers,
      [activeStep]: index
    };
    onSelectedAnswersChange(updated);
  };

  const handleSubmitAnswer = () => {
    if (submittedSteps[activeStep] || selectedAnswers[activeStep] === undefined) return;
    
    const isCorrect = selectedAnswers[activeStep] === activeMilestone.challengeInteractive?.correctAnswerIdx;
    if (isCorrect) {
      onScoreChange(score + 10);
    }
    
    onSubmittedStepsChange({
      ...submittedSteps,
      [activeStep]: true
    });
  };

  const handleResetChallenge = () => {
    const updatedSelected = { ...selectedAnswers };
    delete updatedSelected[activeStep];
    const updatedSubmitted = { ...submittedSteps };
    delete updatedSubmitted[activeStep];
    
    onSelectedAnswersChange(updatedSelected);
    onSubmittedStepsChange(updatedSubmitted);
  };

  // Use dynamically injected props driven by persistent state with initial defaults fallback
  const lampiran7Data = lampiran7;
  const lampiran8Data = lampiran8;

  // List of Rubric Instruments or Official Assessment Sheets to Download (Ketentuan 2)
  const downloadInstruments = [
    {
      id: 'inst-1',
      title: 'Rubrik Penilaian Proyek MIT App Inventor',
      description: 'Format Penilaian Keterampilan Blok Pemrograman, Tata Letak UI, dan Integrasi Dekomposisi Kejadian.',
      format: 'PDF',
      size: '2.4 MB',
      type: 'Asesmen Formatif',
      materi: 'MIT App Inventor',
      downloads: 142
    },
    {
      id: 'inst-2',
      title: 'Draf Penilaian Pemodelan Machine Learning',
      description: 'Rubrik Penilaian Laporan Latih Model Citra, Keakuratan Data, dan Abstraksi Klasifikasi Data Kurikulum Merdeka.',
      format: 'XLSX',
      size: '1.2 MB',
      type: 'Asesmen Kinerja',
      materi: 'Machine Learning',
      downloads: 98
    },
    {
      id: 'inst-3',
      title: 'Format Penilaian Berpikir Komputasional (Bebras)',
      description: 'Instrumen Analisis Kemampuan Siswa Mengurai Soal Tantangan Bebras Logika Tingkat Menengah Atas.',
      format: 'PDF',
      size: '1.8 MB',
      type: 'Asesmen Diagnostik',
      materi: 'Berpikir Komputasional',
      downloads: 204
    },
    {
      id: 'inst-4',
      title: 'Lembar Observasi Scaffolding Vygotsky',
      description: 'Instrumen Pengamatan Keberhasilan Bimbingan Berkelanjutan untuk Membantu Siswa Mengatasi Eror Koding.',
      format: 'DOCX',
      size: '850 KB',
      type: 'Klinis Praktik',
      materi: 'Pedagogi CT',
      downloads: 75
    }
  ];

  const getSiklusScores = (cycle: 1 | 2 | 3, type: 'l7' | 'l8') => {
    const data = type === 'l7' ? lampiran7Data[cycle] : lampiran8Data[cycle];
    const total = data.scores.reduce((sum, item) => sum + item.val, 0);
    return Math.round((total / data.scores.length) * 10) / 10;
  };

  const simulateDownload = (id: string, name: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Berhasil mengunduh dokumen "${name}" untuk kriteria asesmen kurikulum.`);
    }, 1200);
  };

  return (
    <div className="bg-slate-50/50 rounded-2xl border border-slate-200/80 p-5 md:p-6 flex flex-col h-full text-slate-800">
      
      {/* Visual Metric Summary Header (Ketentuan 1 & 2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Metric 1 - RPP Perangkat */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-3xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Rata-rata RPP</span>
              <h4 className="text-2xl font-black text-indigo-700 font-mono">97.3 <span className="text-xs text-slate-400">/ 100</span></h4>
            </div>
            <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-650 font-bold mt-3">
            <TrendingUp className="w-3.5 h-3.5 shrink-0" />
            <span>Peningkatan +4.3% sejak Siklus 1</span>
          </div>
        </div>

        {/* Metric 2 - Praktik Mengajar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-3xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kemampuan Praktik Mengajar</span>
              <h4 className="text-2xl font-black text-emerald-700 font-mono">96.3 <span className="text-xs text-slate-400">/ 100</span></h4>
            </div>
            <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
              <Smartphone className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-650 font-bold mt-3">
            <TrendingUp className="w-3.5 h-3.5 shrink-0" />
            <span>Kategori Unggul & Kompeten</span>
          </div>
        </div>

        {/* Metric 3 - SVG Mini Progression Chart */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-3xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Evolusi Kinerja Akademik</span>
              <span className="text-xs text-slate-500 block leading-tight">Progres Siklus I → II → III</span>
            </div>
            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          
          {/* Simple Clean SVG progression chart (Ketentuan 2) */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-8">
              <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="15" x2="100" y2="15" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2,2" />
                {/* Progress Area */}
                <path 
                  d="M 10 24 L 50 12 L 90 2 Z" 
                  fill="url(#progression-gradient)" 
                  opacity="0.15" 
                />
                {/* Progression Line */}
                <path 
                  d="M 10 24 L 50 12 L 90 2" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                {/* Data Points */}
                <circle cx="10" cy="24" r="3" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
                <circle cx="50" cy="12" r="3" fill="#4f46e5" stroke="#ffffff" strokeWidth="1" />
                <circle cx="90" cy="2" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="progression-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[9px] font-extrabold text-blue-600 uppercase block font-mono">S3: 98.5</span>
              <span className="text-[8px] text-slate-400 block font-mono">Optimal</span>
            </div>
          </div>
        </div>

      </div>

      {/* Sub-tab Navigation */}
      <div className="flex bg-slate-100 p-1.5 rounded-xl mb-6 gap-1 max-w-full overflow-x-auto shrink-0 select-none border border-slate-200/50">
        <button
          onClick={() => setActiveSubTab('peta')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'peta' 
              ? 'bg-white text-indigo-700 shadow-2xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
          }`}
        >
          <MilestoneIcon className="w-4 h-4" />
          <span>Peta Perjalanan Belajar</span>
        </button>
        <button
          onClick={() => setActiveSubTab('lampiran7')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'lampiran7' 
              ? 'bg-white text-indigo-700 shadow-2xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Lampiran 7 (Perangkat Ajar)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('lampiran8')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'lampiran8' 
              ? 'bg-white text-indigo-700 shadow-2xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Lampiran 8 (Praktik Mengajar)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('visualisasi')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'visualisasi' 
              ? 'bg-white text-indigo-700 shadow-2xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Grafik & Analisis Kompetensi</span>
        </button>
        <button
          onClick={() => setActiveSubTab('download')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'download' 
              ? 'bg-white text-indigo-700 shadow-2xs' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Instrumen Unduhan Rubrik</span>
        </button>
      </div>

      {/* RENDER ACTIVE VIEW */}
      {activeSubTab === 'peta' ? (
        <>
          {/* Head section */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-200/60 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-6 bg-indigo-600 rounded-sm" />
              <div>
                <h2 className="text-sm font-bold text-slate-900 font-display">
                  Peta Perjalanan Belajar
                </h2>
                <p className="text-[11px] text-slate-500">
                  Perjalanan milestones studi CT dari dasar hingga integrasi pembelajaran Informatika terapan
                </p>
              </div>
            </div>

            {/* Score Badge */}
            <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200/60 rounded-full text-xs text-indigo-750 font-bold font-mono">
              <span>Hasil Pemahaman Kuis:</span>
              <span className="bg-indigo-600 text-white rounded-full px-2 py-0.5 text-[10px]">
                {score}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
            {/* Roadmap Path Indicator */}
            <div className="lg:col-span-5 flex flex-col gap-3 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-400 via-indigo-400 to-purple-500" />

              {milestones.map((m) => {
                const isActive = m.number === activeStep;
                const isCompleted = m.number < activeStep;
                const isQuizSubmitted = submittedSteps[m.number];
                const isQuizCorrect = isQuizSubmitted && selectedAnswers[m.number] === m.challengeInteractive?.correctAnswerIdx;

                return (
                  <button
                    key={m.number}
                    onClick={() => setActiveStep(m.number)}
                    className={`relative z-10 w-full text-left transition-all duration-300 p-3 rounded-xl flex items-center gap-4 group border ${
                      isActive 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-indigo-500/20' 
                        : 'bg-white hover:bg-slate-100/80 text-slate-750 border-slate-200/80'
                    }`}
                  >
                    {/* Timeline node */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 font-bold font-mono text-xs transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-500 border-white text-white shadow-xs' 
                        : isCompleted
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                          : 'bg-white border-slate-300 text-slate-500'
                    }`}>
                      {isCompleted ? <Check className="w-3.5 h-3.5 text-indigo-700 stroke-[3]" /> : m.number}
                    </div>

                    {/* Milestone Details */}
                    <div className="flex-1 min-w-0 pr-1">
                      <p className={`text-[9px] uppercase font-mono font-black tracking-wider ${isActive ? 'text-blue-450' : 'text-indigo-600/80'}`}>
                        Tahap {m.number}
                      </p>
                      <p className={`text-xs font-bold font-display truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                        {m.title}
                      </p>
                    </div>

                    {/* Microstatus Icons */}
                    {isQuizSubmitted && (
                      <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                        isQuizCorrect ? 'bg-emerald-500/15 text-emerald-600' : 'bg-rose-500/15 text-rose-500'
                      }`}>
                        {isQuizCorrect ? 'Paham' : 'Remedi'}
                      </span>
                    )}

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-blue-450 translate-x-0.5' : 'text-slate-400 group-hover:translate-x-0.5'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Milestone Detail Card */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col h-full justify-between shadow-xs">
              <div>
                {/* Header detail */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/50 rounded px-2 py-0.5 uppercase tracking-wide">
                      Detail Capaian Tahap {activeStep}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 font-display mt-2">
                      {activeMilestone.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                </div>

                {/* Core learning outcome block */}
                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 mb-4 shadow-3xs">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Capaian Utama Kurikulum:</p>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed italic border-l-2 border-indigo-500 pl-2.5">
                    "{activeMilestone.shortDescription}"
                  </p>
                </div>

                {/* Narrative text block */}
                <p className="text-xs text-slate-500 leading-relaxed text-justify mb-6">
                  {activeMilestone.fullNarrative}
                </p>

                {/* Interactive check challenge */}
                {activeMilestone.challengeInteractive && (
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500" />
                    
                    <div className="flex items-center gap-2 mb-3">
                      <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wide">
                        Evaluasi Mandiri: {activeMilestone.challengeTitle}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-900 leading-relaxed mb-3">
                      {activeMilestone.challengeInteractive.question}
                    </p>

                    {/* MCQ Options */}
                    <div className="flex flex-col gap-2 mb-4">
                      {activeMilestone.challengeInteractive.options.map((option, i) => {
                        const isSelected = selectedAnswers[activeStep] === i;
                        const isSubmitted = submittedSteps[activeStep];
                        const isCorrectOption = i === activeMilestone.challengeInteractive?.correctAnswerIdx;
                        
                        let bgClass = "bg-slate-50 border-slate-150 text-slate-700 hover:bg-slate-100/60 cursor-pointer";
                        if (isSelected) {
                          bgClass = "bg-indigo-50 border-indigo-400 text-indigo-900 cursor-pointer";
                        }
                        if (isSubmitted) {
                          if (isCorrectOption) {
                            bgClass = "bg-emerald-50 border-emerald-400 text-emerald-900 pointer-events-none";
                          } else if (isSelected && !isCorrectOption) {
                            bgClass = "bg-rose-50 border-rose-300 text-rose-900 pointer-events-none";
                          } else {
                            bgClass = "bg-slate-50/50 border-slate-100 text-slate-400 pointer-events-none";
                          }
                        }

                        return (
                          <button
                            key={i}
                            onClick={() => handleSelectOption(i)}
                            disabled={isSubmitted}
                            className={`text-left p-3 rounded-xl border text-xs font-medium transition-all duration-200 flex items-start gap-2.5 ${bgClass}`}
                          >
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border text-[9px] font-bold ${
                              isSelected 
                                ? 'bg-indigo-600 border-transparent text-white' 
                                : 'border-slate-300 text-slate-500'
                            }`}>
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="flex-1 leading-normal">{option}</span>
                            {isSubmitted && isCorrectOption && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                            {isSubmitted && isSelected && !isCorrectOption && <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Submission triggers */}
                    {submittedSteps[activeStep] ? (
                      <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-150 space-y-1.5 animate-fade-in">
                        <div className="flex items-center gap-1.5 text-slate-800">
                          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                          <span className="text-[11px] font-bold">Kunci Analisis Soal:</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed text-justify">
                          {activeMilestone.challengeInteractive.explanation}
                        </p>
                        <button
                          onClick={handleResetChallenge}
                          className="mt-2 text-[10px] font-extrabold text-indigo-600 hover:text-indigo-800 tracking-wide uppercase flex items-center gap-1 cursor-pointer focus:outline-none"
                        >
                          Coba Jawab Lagi
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <button
                          onClick={handleSubmitAnswer}
                          disabled={selectedAnswers[activeStep] === undefined}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 uppercase tracking-wider ${
                            selectedAnswers[activeStep] === undefined
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed border'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-md cursor-pointer border-transparent'
                          }`}
                        >
                          <span>Verifikasi Jawaban</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Rampung Portofolio: {Math.round((activeStep / 6) * 100)}%</span>
                <span>Fase A-B-C-D-E-F Terintegrasi</span>
              </div>
            </div>
          </div>
        </>
      ) : activeSubTab === 'lampiran7' ? (
        <div className="space-y-6 flex-1 animate-fade-in">
          {/* Cycle Selection Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/60 pb-3 gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">Lampiran 7: Instrumen Penyusunan Perangkat Pembelajaran</h3>
              <p className="text-[11px] text-slate-550">Asesmen berkala dari Guru Pamong selama 3 Siklus PPL</p>
            </div>
            {/* Cycle Pill buttons */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
              {([1, 2, 3] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCycle(c)}
                  className={`px-3.5 py-1.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                    selectedCycle === c 
                      ? 'bg-white text-indigo-700 shadow-3xs' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Siklus {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between bg-indigo-50/50 border border-indigo-150 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-mono text-lg font-black text-indigo-700 border shadow-3xs">
                  {getSiklusScores(selectedCycle, 'l7')}
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-indigo-600 block">Nilai Rata-rata Siklus {selectedCycle}</span>
                  <h4 className="text-sm font-extrabold text-slate-950 font-display">Predikat Kelayakan Perangkat: Amat Baik</h4>
                </div>
              </div>
              <BookOpenCheck className="w-7 h-7 text-indigo-400" />
            </div>

            {/* Items Evaluation Grid */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-3xs bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[600px]">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Kriteria Penilaian Perangkat Ajar</th>
                      <th className="p-3.5 text-center w-24">Skor (1-100)</th>
                      <th className="p-3.5">Catatan / Analisis Detail Materi Kurikulum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {lampiran7Data[selectedCycle].scores.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-3.5 font-semibold text-slate-900">{s.item}</td>
                        <td className="p-3.5 text-center font-mono font-black text-indigo-700 bg-indigo-50/10">{s.val}</td>
                        <td className="p-3.5 text-slate-550 leading-normal">{s.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Constructive Comments Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50/20 border border-emerald-150 p-4 rounded-xl space-y-1.5 shadow-3xs">
                <span className="text-[9.5px] font-black uppercase text-emerald-700 font-mono flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  Umpan Balik Guru Pamong (Ibu Sri Astuti, S.Pd.)
                </span>
                <p className="text-xs text-slate-705 leading-relaxed text-justify italic">
                  "{lampiran7Data[selectedCycle].feedbackGP}"
                </p>
              </div>
              <div className="bg-purple-50/20 border border-purple-150 p-4 rounded-xl space-y-1.5 shadow-3xs">
                <span className="text-[9.5px] font-black uppercase text-purple-700 font-mono flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  Umpan Balik Akademis DPL (Dr. H. Edy Suryanto, M.Pd.)
                </span>
                <p className="text-xs text-slate-705 leading-relaxed text-justify italic">
                  "{lampiran7Data[selectedCycle].feedbackDPL}"
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : activeSubTab === 'lampiran8' ? (
        <div className="space-y-6 flex-1 animate-fade-in">
          {/* Cycle Selection Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/60 pb-3 gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">Lampiran 8: Penilaian Praktik Mengajar Mahasiswa</h3>
              <p className="text-[11px] text-slate-550">Asesmen nyata tingkat penguasaan kelas informatika SMAN 1 Salatiga</p>
            </div>
            {/* Cycle Pill buttons */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
              {([1, 2, 3] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCycle(c)}
                  className={`px-3.5 py-1.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                    selectedCycle === c 
                      ? 'bg-white text-indigo-700 shadow-3xs' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Siklus {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between bg-emerald-50/30 border border-emerald-150 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-mono text-lg font-black text-emerald-700 border shadow-3xs">
                  {getSiklusScores(selectedCycle, 'l8')}
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-600 block">Nilai Praktik Siklus {selectedCycle}</span>
                  <h4 className="text-sm font-extrabold text-slate-950 font-display">Kinerja Lapangan: Unggul, Adaptif & Profesional</h4>
                </div>
              </div>
              <Award className="w-7 h-7 text-emerald-400" />
            </div>

            {/* Items Evaluation Grid */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-3xs bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[600px]">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Kriteria Penilaian Praktik Mengajar di Kelas</th>
                      <th className="p-3.5 text-center w-24">Skor (1-100)</th>
                      <th className="p-3.5">Catatan Konstruktif Guru Pamong & DPL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {lampiran8Data[selectedCycle].scores.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-3.5 font-semibold text-slate-900">{s.item}</td>
                        <td className="p-3.5 text-center font-mono font-black text-emerald-700 bg-emerald-50/10">{s.val}</td>
                        <td className="p-3.5 text-slate-550 leading-normal">{s.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Constructive Comments Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50/20 border border-emerald-150 p-4 rounded-xl space-y-1.5 shadow-3xs">
                <span className="text-[9.5px] font-black uppercase text-emerald-700 font-mono flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  Evaluasi Kerja Guru Pamong (Ibu Sri Astuti, S.Pd.)
                </span>
                <p className="text-xs text-slate-705 leading-relaxed text-justify italic">
                  "{lampiran8Data[selectedCycle].feedbackGP}"
                </p>
              </div>
              <div className="bg-purple-50/20 border border-purple-150 p-4 rounded-xl space-y-1.5 shadow-3xs">
                <span className="text-[9.5px] font-black uppercase text-purple-700 font-mono flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  Umpan Balik Akademis DPL (Dr. H. Edy Suryanto, M.Pd.)
                </span>
                <p className="text-xs text-slate-705 leading-relaxed text-justify italic">
                  "{lampiran8Data[selectedCycle].feedbackDPL}"
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : activeSubTab === 'visualisasi' ? (
        /* TAB: GRAPH & COMPETENCY ANALYSIS */
        <div className="space-y-6 flex-1 animate-fade-in" id="visual-analisis-kompetensi-tab">
          <div className="border-b border-slate-200/60 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">Grafik Perkembangan Nilai & Kompetensi PPG</h3>
              <p className="text-[11px] text-slate-550">Visualisasi kenaikan performa RPP dan Praktik Pembelajaran Terbimbing (Siklus I s.d. III)</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-150 rounded-full text-[10px] text-indigo-800 font-black uppercase tracking-wider font-mono">
              <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping" />
              <span>Sertifikasi Kompeten</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* COLUMN 1: INTERACTIVE LINE GRAPH */}
            <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-3xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-display">Kurva Pertumbuhan Akademik PPL</h4>
                    <p className="text-[10px] text-slate-400">Sentuh titik grafik untuk melihat ringkasan evaluasi detail</p>
                  </div>
                  {/* Legend */}
                  <div className="flex items-center gap-3 text-[9px] font-bold font-mono">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                      <span className="text-slate-650">RPP Modul</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full" />
                      <span className="text-slate-650">Praktik SMAN 1</span>
                    </div>
                  </div>
                </div>

                {/* Interactive SVG Chart Canvas */}
                <div className="relative w-full h-44 bg-slate-50 border border-slate-100/80 rounded-xl p-2.5">
                  <svg className="w-full h-full" viewBox="0 0 450 180" preserveAspectRatio="none">
                    {/* Y-axis Guidance lines */}
                    <line x1="50" y1="20" x2="420" y2="20" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="50" y1="70" x2="420" y2="70" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="50" y1="120" x2="420" y2="120" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="50" y1="170" x2="420" y2="170" stroke="#cbd5e1" strokeWidth="1" />

                    {/* Chart axis labels */}
                    <text x="50" y="174" className="text-[9px] font-bold fill-slate-400 font-mono" textAnchor="end">80</text>
                    <text x="50" y="124" className="text-[9px] font-bold fill-slate-400 font-mono" textAnchor="end">90</text>
                    <text x="50" y="74" className="text-[9px] font-bold fill-slate-400 font-mono" textAnchor="end">95</text>
                    <text x="50" y="24" className="text-[9px] font-bold fill-slate-400 font-mono" textAnchor="end">100</text>

                    {/* X-axis cycles */}
                    <text x="100" y="179" className="text-[10px] font-black fill-slate-500 font-mono" textAnchor="middle">Siklus I</text>
                    <text x="250" y="179" className="text-[10px] font-black fill-slate-500 font-mono" textAnchor="middle">Siklus II</text>
                    <text x="380" y="179" className="text-[10px] font-black fill-slate-500 font-mono" textAnchor="middle">Siklus III</text>

                    {/* BLUE/INDIGO PATH: RPP (92.8 -> 97.0 -> 98.8) */}
                    {/* SVG Coords Translation: Y: 170 is score 80. Y: 20 is score 100. 15px = 2 points. */}
                    {/* 92.8 => 170 - (12.8 * 7.5) = 74 */}
                    {/* 97.0 => 170 - (17.0 * 7.5) = 42.5 */}
                    {/* 98.8 => 170 - (18.8 * 7.5) = 29 */}
                    <path 
                      d="M 100 94 L 250 42 L 380 29" 
                      fill="none" 
                      stroke="#4f46e5" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    {/* EMERALD PATH: Praktik (90.6 -> 95.2 -> 98.0) */}
                    {/* 90.6 => 170 - (10.6 * 7.5) = 90.5 */}
                    {/* 95.2 => 170 - (15.2 * 7.5) = 56 */}
                    {/* 98.0 => 170 - (18.0 * 7.5) = 35 */}
                    <path 
                      d="M 100 110 L 250 56 L 380 35" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />

                    {/* Interactive Knobs - Cycle 1 */}
                    <circle 
                      cx="100" 
                      cy="94" 
                      r="5" 
                      fill="#4f46e5" 
                      stroke="#ffffff" 
                      strokeWidth="2"
                      className="cursor-pointer hover:r-7 transition-all"
                      onMouseEnter={() => setHoveredPoint({ cycle: 'Siklus I', rpp: 92.8, practice: 90.6 })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                    <circle 
                      cx="100" 
                      cy="110" 
                      r="5" 
                      fill="#10b981" 
                      stroke="#ffffff" 
                      strokeWidth="2"
                      className="cursor-pointer hover:r-7 transition-all"
                      onMouseEnter={() => setHoveredPoint({ cycle: 'Siklus I', rpp: 92.8, practice: 90.6 })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />

                    {/* Interactive Knobs - Cycle 2 */}
                    <circle 
                      cx="250" 
                      cy="42" 
                      r="5" 
                      fill="#4f46e5" 
                      stroke="#ffffff" 
                      strokeWidth="2"
                      className="cursor-pointer hover:r-7 transition-all"
                      onMouseEnter={() => setHoveredPoint({ cycle: 'Siklus II', rpp: 97.0, practice: 95.2 })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                    <circle 
                      cx="250" 
                      cy="56" 
                      r="5" 
                      fill="#10b981" 
                      stroke="#ffffff" 
                      strokeWidth="2"
                      className="cursor-pointer hover:r-7 transition-all"
                      onMouseEnter={() => setHoveredPoint({ cycle: 'Siklus II', rpp: 97.0, practice: 95.2 })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />

                    {/* Interactive Knobs - Cycle 3 */}
                    <circle 
                      cx="380" 
                      cy="29" 
                      r="5.5" 
                      fill="#4f46e5" 
                      stroke="#ffffff" 
                      strokeWidth="2"
                      className="cursor-pointer hover:r-7 transition-all"
                      onMouseEnter={() => setHoveredPoint({ cycle: 'Siklus III (Terakhir)', rpp: 98.8, practice: 98.0 })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                    <circle 
                      cx="380" 
                      cy="35" 
                      r="5.5" 
                      fill="#10b981" 
                      stroke="#ffffff" 
                      strokeWidth="2"
                      className="cursor-pointer hover:r-7 transition-all"
                      onMouseEnter={() => setHoveredPoint({ cycle: 'Siklus III (Terakhir)', rpp: 98.8, practice: 98.0 })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  </svg>

                  {/* Real-time reactive HUD tooltip */}
                  {hoveredPoint ? (
                    <div className="absolute top-2.5 left-2.5 bg-slate-900/95 text-white p-2.5 rounded-lg text-[10px] space-y-1 shadow-lg border border-slate-700 font-mono animate-fade-in z-20">
                      <p className="font-extrabold text-blue-400">{hoveredPoint.cycle}</p>
                      <p>📝 RPP Rerata: <span className="font-bold text-indigo-300">{hoveredPoint.rpp} Poin</span></p>
                      <p>🏫 Praktik Riil: <span className="font-bold text-emerald-300">{hoveredPoint.practice} Poin</span></p>
                    </div>
                  ) : (
                    <div className="absolute top-2.5 left-2.5 bg-slate-800/80 text-white/90 px-2 py-1.5 rounded-md text-[9px] font-mono leading-none">
                      Sorot titik kordinat untuk info nilai
                    </div>
                  )}
                </div>
              </div>

              {/* Summary Progression Info */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div className="bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Puncak Nilai RPP</span>
                  <p className="text-sm font-black text-indigo-900 font-mono">S3: 98.8 Poin</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Berpusat pada Scaffolding Vygotsky</p>
                </div>
                <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Puncak Praktik Mengajar</span>
                  <p className="text-sm font-black text-emerald-900 font-mono">S3: 98.0 Poin</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Evaluasi Pembelajaran Mandiri</p>
                </div>
              </div>
            </div>

            {/* COLUMN 2: FIVE KEY INFORMATICS DIMENSIONS (BAR COMPARE) */}
            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-3xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 font-display mb-1">Kemajuan 5 Kriteria Utama Kurikulum</h4>
                <p className="text-[10px] text-slate-400 mb-4">Komparasi tingkat ketercapaian antara Siklus I (awal) vs Siklus III (akhir)</p>

                <div className="space-y-3.5">
                  {/* DIMENSION 1: CT INTEGRATION */}
                  <div 
                    onClick={() => setActiveDetailDimension('ct')} 
                    className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                      activeDetailDimension === 'ct' ? 'bg-slate-50 border-slate-250/70' : 'border-transparent hover:bg-slate-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 mb-1">
                      <span>1. Integrasi 4 Pilar CT (Dekomposisi, dsb.)</span>
                      <span className="font-mono text-indigo-700">91% → 99%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
                      <div className="bg-slate-350 h-full rounded-l-full" style={{ width: '91%' }} />
                      <div className="bg-indigo-600 h-full rounded-r-full" style={{ width: '8%' }} />
                    </div>
                  </div>

                  {/* DIMENSION 2: CODE MIT APP INVENTOR */}
                  <div 
                    onClick={() => setActiveDetailDimension('mit')} 
                    className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                      activeDetailDimension === 'mit' ? 'bg-slate-50 border-slate-250/70' : 'border-transparent hover:bg-slate-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 mb-1">
                      <span>2. Blok Pemrograman & Aplikasi MIT Inventor</span>
                      <span className="font-mono text-indigo-700">89% → 98%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
                      <div className="bg-slate-350 h-full rounded-l-full" style={{ width: '89%' }} />
                      <div className="bg-indigo-600 h-full rounded-r-full" style={{ width: '9%' }} />
                    </div>
                  </div>

                  {/* DIMENSION 3: MACHINE LEARNING */}
                  <div 
                    onClick={() => setActiveDetailDimension('ml')} 
                    className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                      activeDetailDimension === 'ml' ? 'bg-slate-50 border-slate-250/70' : 'border-transparent hover:bg-slate-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 mb-1">
                      <span>3. Machine Learning & Abstraksi Klasifikasi</span>
                      <span className="font-mono text-indigo-700">85% → 99%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
                      <div className="bg-slate-350 h-full rounded-l-full" style={{ width: '85%' }} />
                      <div className="bg-indigo-600 h-full rounded-r-full" style={{ width: '14%' }} />
                    </div>
                  </div>

                  {/* DIMENSION 4: Pedagogy Scaffolding */}
                  <div 
                    onClick={() => setActiveDetailDimension('sc')} 
                    className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                      activeDetailDimension === 'sc' ? 'bg-slate-50 border-slate-250/70' : 'border-transparent hover:bg-slate-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 mb-1">
                      <span>4. Scaffolding Vygotsky (Bantuan Logika)</span>
                      <span className="font-mono text-indigo-700">90% → 98%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
                      <div className="bg-slate-350 h-full rounded-l-full" style={{ width: '90%' }} />
                      <div className="bg-indigo-600 h-full rounded-r-full" style={{ width: '8%' }} />
                    </div>
                  </div>

                  {/* DIMENSION 5: Visual Media & Maze Board */}
                  <div 
                    onClick={() => setActiveDetailDimension('mv')} 
                    className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                      activeDetailDimension === 'mv' ? 'bg-slate-50 border-slate-250/70' : 'border-transparent hover:bg-slate-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 mb-1">
                      <span>5. Alat Peraga Realitis (Logic Maze Board)</span>
                      <span className="font-mono text-indigo-700">92% → 99%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
                      <div className="bg-slate-350 h-full rounded-l-full" style={{ width: '92%' }} />
                      <div className="bg-indigo-600 h-full rounded-r-full" style={{ width: '7%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Indicator color legend */}
              <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center gap-4 text-[9px] font-bold text-slate-400 font-mono">
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-slate-350 rounded-sm" /> Siklus I (Baseline)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-indigo-600 rounded-sm" /> Siklus III (Optimal)</span>
              </div>
            </div>

          </div>

          {/* DYNAMIC EXPANDABLE CRITERIA RADAR DETAIL (Ketentuan 3 & 4) */}
          <div className="bg-slate-50 p-4 md:p-5 rounded-2xl border border-slate-200/80">
            <div className="flex items-start gap-3 mb-3.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Target className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 font-display">Analisis Pedagogik & Keterbukaan Kelas Informatika</h4>
                <p className="text-[10px] text-slate-400">Pilah item di atas untuk membaca landasan ilmiah implementasi nyata di sekolah.</p>
              </div>
            </div>

            {activeDetailDimension === 'ct' && (
              <div className="space-y-2 animate-fade-in text-xs leading-relaxed text-slate-700">
                <p className="font-bold text-indigo-900">1. Integrasi Empat Pilar Computational Thinking (Siklus I s.d. III)</p>
                <p className="text-justify text-slate-650">
                  Melalui pendekatan bertahap, siswa dituntun membedah masalah kompleks menjadi sub-masalah kecil (**Dekomposisi**). Saat mempelajari struktur klasifikasi, mereka mengenali kemiripan pola data logis (**Pengenalan Pola**), membuang variabel sampah demi keakuratan pembatasan model (**Abstraksi**), dan menyusun instruksi gawai secara terstruktur (**Algoritma**). Integrasi pilar kognitif ini melahirkan peningkatan daya nalar tingkat tinggi (HOTS) siswa yang luar biasa dari Siklus I (91%) hingga puncak pencapaian di Siklus III (99%).
                </p>
              </div>
            )}

            {activeDetailDimension === 'mit' && (
              <div className="space-y-2 animate-fade-in text-xs leading-relaxed text-slate-700">
                <p className="font-bold text-indigo-900">2. Blok Pemrograman & Aplikasi MIT App Inventor</p>
                <p className="text-justify text-slate-650">
                  Praktik pemrograman terpandu di Siklus II mengadopsi platform *MIT App Inventor*. Fokus utamanya adalah merancang antarmuka koding block-based yang ramah untuk peserta didik awal, sekaligus meminimalisir sintaks error tradisional. Siswa tidak sekedar menyusun blok secara acak, melainkan melatih algoritma dan percabangan keputusan secara visual. Kinerja akademis Mayang meroket dari 89% ke 98% karena mampu menyederhanakan pemrograman event-driven secara menarik bagi siswa SMAN 1 Salatiga.
                </p>
              </div>
            )}

            {activeDetailDimension === 'ml' && (
              <div className="space-y-2 animate-fade-in text-xs leading-relaxed text-slate-700">
                <p className="font-bold text-indigo-900">3. Machine Learning & Abstraksi Klasifikasi Citra</p>
                <p className="text-justify text-slate-650">
                  Puncak materi terapan pada PPL Terbimbing di Siklus III membawa konsep *Machine Learning Playgrounds (Teachable Machine)*. Mayang meramu rencana ajar progresif agar siswa kelas SMAN 1 Salatiga berkolaborasi melatih data kognitif klasifikasi citra sampah organik vs anorganik. Siswa belajar secara konkrit mengenai bobot validitas sensor, sampling data, dan akurasi model latih. Melalui integrasi Machine Learning ramah anak, ketercapaian siswa berhasil menyentuh rata-rata amat tinggi (99%).
                </p>
              </div>
            )}

            {activeDetailDimension === 'sc' && (
              <div className="space-y-2 animate-fade-in text-xs leading-relaxed text-slate-700">
                <p className="font-bold text-indigo-900">4. Metode Scaffolding Vygotsky dalam Penanganan Kelas Terpadu</p>
                <p className="text-justify text-slate-650">
                  Sesuai teori sosiokultural Lev Vygotsky, pendidik mengintervensi zona perkembangan proksimal (ZPD/Zone of Proximal Development) siswa melalui *Scaffolding* bertahap. Mayang mengelompokkan siswa secara heterogen, menggandeng siswa berkemampuan tinggi untuk tutor sebaya, dan memberi bantuan parsial kode setengah jadi bagi siswa yang mengalami hambatan logika. Metode ini disusun runtut pada draf aksi nyata RPP, mengawal transisi pemahaman koder pemula secara aman dan percaya diri.
                </p>
              </div>
            )}

            {activeDetailDimension === 'mv' && (
              <div className="space-y-2 animate-fade-in text-xs leading-relaxed text-slate-700">
                <p className="font-bold text-indigo-900">5. Media Visual Inovatif & Alat Peraga Fisik "Logic Maze Board"</p>
                <p className="text-justify text-slate-650">
                  Untuk mereduksi hambatan dari abstraksi algoritma murni, Mayang mendirikan alat peraga fisik *Logic Maze Board* berbasis akrilik transparan pada Siklus ke-2. Siswa secara mandiri meletakkan hambatan fisik dan memindahkan kelereng berdasarkan alur penelusuran logika percabangan IF-ELSE. Media manipulatif konkrit ini terbukti memangkas separuh waktu pemecahan hambatan kognitif sintaks, membuktikan integrasi teknologi unplugged and plugged yang harmoni.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* TAB 4: INSTRUMEN UNDUHAN RUBRIK (Ketentuan 2) */
        <div className="space-y-6 flex-1 animate-fade-in">
          <div className="border-b border-slate-200/60 pb-3">
            <h3 className="text-sm font-bold text-slate-900 font-display">Instrumen Unduhan Kriteria Asesmen Resmi</h3>
            <p className="text-[11px] text-slate-500 font-normal">Grid berkas portofolio resmi dan rubrik kurikulum merdeka informatika untuk diunduh langsung asesi maupun asesor.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {downloadInstruments.map((inst) => (
              <div 
                key={inst.id} 
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-3xs flex flex-col justify-between hover:border-indigo-300 hover:shadow-2xs transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-block text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5">
                      {inst.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">{inst.format} • {inst.size}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 font-display leading-snug group-hover:text-indigo-700 transition-colors">
                    {inst.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 lines-clamp-2 leading-relaxed">
                    {inst.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-4">
                  <span className="text-[10px] font-semibold text-slate-405">Mapel: <strong className="text-slate-700">{inst.materi}</strong></span>
                  
                  <button
                    onClick={() => simulateDownload(inst.id, inst.title)}
                    disabled={downloadingId !== null}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-150 rounded-lg text-[11px] font-bold transition-all duration-200 cursor-pointer disabled:opacity-50"
                  >
                    {downloadingId === inst.id ? (
                      <span className="animate-pulse">Mengunduh...</span>
                    ) : (
                      <>
                        <span>Download</span>
                        <Download className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-indigo-50/40 rounded-xl border border-indigo-100 text-xs text-indigo-800 leading-relaxed max-w-2xl">
            <h5 className="font-bold flex items-center gap-1.5 mb-1 text-indigo-900">
              <UserCheck className="w-4 h-4 shrink-0" />
              Sertifikasi Portofolio Pendidikan Profesi Guru
            </h5>
            Seluruh penilaian dalam dokumen ini diverifikasi secara sah melalui akun portal LPTK Universitas Kristen Satya Wacana (UKSW). Hubungi administrasi PPG atau Guru Pamong terkait jika terdapat diskrepansi nilai.
          </div>
        </div>
      )}
    </div>
  );
}

