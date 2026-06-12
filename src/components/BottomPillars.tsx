/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Network, 
  EyeOff, 
  Cpu, 
  GitMerge, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  HelpCircle,
  ToggleLeft,
  XCircle,
  Code
} from 'lucide-react';
import { pilarSistem } from '../data';

export default function BottomPillars() {
  const [activePilar, setActivePilar] = useState<string>('decomp');

  // Decomposition states
  const [decompStep, setDecompStep] = useState<number>(0);
  const decompProjectStages = [
    { name: "Sistem Pemindai RFID", desc: "Membaca ID kartu mahasiswa secara nirkabel dengan frekuensi 13.56MHz." },
    { name: "Basis Data Lokasi PostgreSQL", desc: "Menampung tabel Relasional Siswa, Jadwal Masuk, dan Log Kehadiran." },
    { name: "Server API Validasi", desc: "Menerima ID, memeriksa status kedaluwarsa siswa, dan menyimpan timestamp." },
    { name: "LCD & Buzzer Indikator", desc: "Merakit komponen output untuk bunyi beeper tanda presensi sukses." }
  ];

  // Abstraction states
  const [checkedFields, setCheckedFields] = useState<{ [key: string]: boolean }>({
    "Nama": true, "NIM": true, "MataKuliah": true
  });
  const fieldList = [
    { key: "NIM", label: "Nomor Induk Mahasiswa (NIM)", isCrucial: true },
    { key: "Nama", label: "Nama Lengkap Siswa", isCrucial: true },
    { key: "MataKuliah", label: "Mata Kuliah Informatika", isCrucial: true },
    { key: "Hobi", label: "Hobi & Minat Sampingan", isCrucial: false },
    { key: "MerekLaptop", label: "Merek Laptop Pribadi", isCrucial: false },
    { key: "WarnaKaosKaki", label: "Warna Kaos Kaki", isCrucial: false }
  ];

  // Pattern states
  const [patternType, setPatternType] = useState<'auth' | 'transaction'>('auth');
  const patternsInfo = {
    auth: {
      title: "Pola Autentikasi Pengguna",
      shared: ["Login E-Banking", "Klien Mobile Bioskop", "Sistem Ujian Sekolah (CBT)"],
      commonalities: "Input Akun → Validasi Kredensial → Cek Token Enkripsi → Set Sesi Aktif"
    },
    transaction: {
      title: "Pola Transaksi Finansial/Poin",
      shared: ["Web Belanja Online", "Mesin ATM Bank", "Kasir Koperasi Sekolah"],
      commonalities: "Cek Saldo Sedia → Pengurangan Item/Poin → Generate Struk/Bukti → Sinkronisasi Stok"
    }
  };

  // Algorithm states
  const [sortArray, setSortArray] = useState<number[]>([4, 2, 7, 1]);
  const [sortLogs, setSortLogs] = useState<string[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const runBubbleSortStep = () => {
    let arr = [...sortArray];
    let logs = [...sortLogs];
    let changed = false;

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        logs.push(`Menukar [${arr[i]}] dan [${arr[i+1]}] karena ${arr[i]} > ${arr[i+1]}.`);
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        changed = true;
        break;
      }
    }

    if (!changed) {
      logs.push("Array sudah berurutan sempurna! Algoritma selesai.");
      setIsSorted(true);
    }

    setSortArray(arr);
    setSortLogs(logs);
  };

  const resetSort = () => {
    setSortArray([4, 2, 7, 1]);
    setSortLogs([]);
    setIsSorted(false);
  };

  const handleToggleField = (key: string) => {
    setCheckedFields(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getPilarIcon = (id: string, sizeClass = "w-6 h-6") => {
    switch (id) {
      case 'decomp': return <Network className={sizeClass} />;
      case 'pattern': return <GitMerge className={sizeClass} />;
      case 'abstract': return <EyeOff className={sizeClass} />;
      case 'algo': return <Cpu className={sizeClass} />;
      default: return <Cpu className={sizeClass} />;
    }
  };

  // Evaluation of Abstraction fields
  const hasInessential = Object.keys(checkedFields).some(k => checkedFields[k] && !fieldList.find(f => f.key === k)?.isCrucial);
  const lacksCrucial = fieldList.some(f => f.isCrucial && !checkedFields[f.key]);
  const isAbstractionSuccess = !hasInessential && !lacksCrucial;

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 md:p-6 flex flex-col">
      {/* SECTION TITLE */}
      <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100 shrink-0">
        <div className="w-2.5 h-6 bg-emerald-500 rounded-xs" />
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Empat Pilar CT dalam Pembelajaran Informatika
          </h2>
          <p className="text-xs text-slate-500">
            Fondasi esensial penyelesaian masalah komputasional di kurikulum informatika sekolah
          </p>
        </div>
      </div>

      {/* 4 CIRCULAR INTERACTIVE PILLARS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {pilarSistem.map((pilar) => {
          const isActive = pilar.id === activePilar;
          return (
            <button
              key={pilar.id}
              onClick={() => setActivePilar(pilar.id)}
              className={`flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all duration-300 relative ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.02]'
                  : 'bg-slate-50 hover:bg-slate-100/60 text-slate-700 border-slate-100'
              }`}
            >
              {/* Circular Icon Container */}
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors duration-300 border ${
                isActive
                  ? 'bg-blue-500 border-white text-white shadow-inner pulse-accent'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}>
                {getPilarIcon(pilar.id, "w-6 h-6")}
              </div>

              <h3 className={`text-sm font-extrabold font-display ${isActive ? 'text-blue-400' : 'text-slate-900'}`}>
                {pilar.title}
              </h3>
              <p className={`text-[10px] leading-relaxed mt-1 line-clamp-2 ${isActive ? 'text-slate-350' : 'text-slate-500'}`}>
                {pilar.definition}
              </p>

              {/* Little active dot indicators */}
              {isActive && (
                <span className="absolute bottom-2 w-1.5 h-1.5 bg-blue-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* DETAILED ACTIVE LAB PLAYGROUND */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row gap-6">
        
        {/* Pillar text side */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {getPilarIcon(activePilar, "w-5 h-5 text-blue-400")}
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest font-mono">
                LAB SIMULASI PILAR
              </span>
            </div>

            <h4 className="text-lg font-bold text-white font-display mb-2">
              {pilarSistem.find(p => p.id === activePilar)?.title}
            </h4>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {pilarSistem.find(p => p.id === activePilar)?.definition}
            </p>

            <div className="bg-slate-850 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Aplikasi Studi Kasus Pendidik:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{pilarSistem.find(p => p.id === activePilar)?.detailedExample}"
              </p>
            </div>
          </div>

          <div className="mt-4 text-[10px] text-slate-500 font-mono">
            Interaktivitas Aktif • computationalthinking.ppg.id
          </div>
        </div>

        {/* Pillar Interactive Playground side */}
        <div className="md:w-1/2 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between min-h-[260px]">
          
          {/* DECOMPOSITION PLAYGROUND */}
          {activePilar === 'decomp' && (
            <div className="flex flex-col h-full justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  CONTOH DEKOMPOSISI: "Sistem Presensi RFID Sekolah"
                </span>
                <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                  Menyelesaikan sistem presensi besar dengan membaginya menjadi 4 sub-sistem mandiri:
                </p>

                <div className="space-y-2">
                  {decompProjectStages.map((stage, idx) => {
                    const isVisible = idx <= decompStep;
                    return (
                      <div 
                        key={idx} 
                        className={`p-2.5 rounded-lg border text-xs transition-all duration-300 ${
                          isVisible 
                            ? 'bg-slate-900 border-indigo-500/50 text-indigo-100' 
                            : 'bg-slate-950 border-slate-900/60 text-slate-600 opacity-40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold">Modul 0{idx+1}: {stage.name}</span>
                          {isVisible && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </div>
                        {isVisible && (
                          <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                            {stage.desc}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button 
                  onClick={() => setDecompStep(0)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
                <button 
                  onClick={() => setDecompStep(prev => Math.min(prev + 1, 3))}
                  disabled={decompStep === 3}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                >
                  <span>Decompos Next ({decompStep + 1}/4)</span>
                </button>
              </div>
            </div>
          )}

          {/* PATTERN RECOGNITION PLAYGROUND */}
          {activePilar === 'pattern' && (
            <div className="flex flex-col h-full justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  CONTOH PENGENALAN POLA: "Kemiripan Arsitektur"
                </span>
                <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                  Pilih tipe sirkuit fungsional untuk melihat bahwa sistem yang berbeda memiliki pola alur yang sama:
                </p>

                {/* Tab buttons */}
                <div className="flex gap-2 mb-3 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button 
                    onClick={() => setPatternType('auth')}
                    className={`flex-1 text-center py-1 rounded-md text-[10px] font-bold uppercase transition-colors shrink-0 ${
                      patternType === 'auth' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    Pola Autentikasi
                  </button>
                  <button 
                    onClick={() => setPatternType('transaction')}
                    className={`flex-1 text-center py-1 rounded-md text-[10px] font-bold uppercase transition-colors shrink-0 ${
                      patternType === 'transaction' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    Pola Transaksi Finansial
                  </button>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
                  <p className="text-xs font-bold text-white uppercase tracking-wider text-blue-400">
                    {patternsInfo[patternType].title}
                  </p>
                  
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400">Digunakan bersama oleh 3 sistem berbeda:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {patternsInfo[patternType].shared.map((s, idx) => (
                        <span key={idx} className="text-[9px] bg-slate-800 text-blue-300 font-semibold px-2 py-0.5 rounded border border-blue-500/10">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-slate-800 my-2" />
                  
                  <p className="text-[10px] text-slate-400">Kesamaan Struktur Pola Program:</p>
                  <p className="text-xs text-white leading-relaxed font-mono font-semibold">
                    {patternsInfo[patternType].commonalities}
                  </p>
                </div>
              </div>

              <div className="text-[10px] bg-blue-950/40 p-2.5 rounded-lg border border-blue-500/10 text-slate-400 leading-relaxed">
                <span className="font-bold text-blue-400 block mb-0.5">Implikasi Pengajaran:</span>
                Mendidik murid melihat kesamaan pola mempercepat mereka menulis kode/function yang reusable.
              </div>
            </div>
          )}

          {/* ABSTRACTION PLAYGROUND */}
          {activePilar === 'abstract' && (
            <div className="flex flex-col h-full justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  LAB ABSTRAKSI: "Saring Data Basis Siswa"
                </span>
                <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                  Pilih informasi yang <strong>harus disimpan</strong> untuk database profil akademik siswa, buang rincian sekunder:
                </p>

                {/* Fields Grid Toggle */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {fieldList.map((f) => {
                    const isChecked = !!checkedFields[f.key];
                    return (
                      <button
                        key={f.key}
                        onClick={() => handleToggleField(f.key)}
                        className={`text-left p-2 rounded-lg border text-[10px] font-semibold transition-all flex items-center justify-between ${
                          isChecked 
                            ? 'bg-blue-600/10 border-blue-500 text-blue-100' 
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}
                      >
                        <span className="truncate">{f.label}</span>
                        <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ${
                          isChecked ? 'bg-blue-600 border-transparent text-white' : 'border-slate-600'
                        }`}>
                          {isChecked && "✓"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status Abstractions evaluate */}
              <div className={`p-3 rounded-lg border transition-all ${
                isAbstractionSuccess 
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-100' 
                  : 'bg-amber-950/65 border-amber-500/30 text-amber-100'
              }`}>
                <div className="flex items-center gap-1.5 mb-1 text-xs font-bold font-display">
                  {isAbstractionSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Model Berhasil Termodelkan (Abstraksi Sempurna)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Abstraksi Kurang Tepat</span>
                    </>
                  )}
                </div>
                <p className="text-[10px] leading-relaxed opacity-90">
                  {isAbstractionSuccess 
                    ? "Hebat! Anda hanya menyimpan data-data akademis terpenting dan mengabaikan detail personal hobi serta kaos kaki siswa yang tak berkolerasi." 
                    : lacksCrucial 
                      ? "Peringatan: Data penting kognitif dasar (NIM, Nama, dsb) belum lengkap dicentang!" 
                      : "Peringatan: Anda masih memasukkan detail sekunder (Hobi/Warna Kaos Kaki) yang mengotori memori server!"}
                </p>
              </div>
            </div>
          )}

          {/* ALGORITHM PLAYGROUND */}
          {activePilar === 'algo' && (
            <div className="flex flex-col h-full justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  LAB ALGORITMA: "Urutkan Array Bubble Sort"
                </span>
                <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                  Lakukan simulasi algoritma pengurutan satu per satu baris langkah logis secara berulang:
                </p>

                {/* Visual Array Blocks */}
                <div className="flex justify-center gap-3.5 mb-3.5 mt-2">
                  {sortArray.map((num, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div 
                        className="w-10 rounded-t-lg bg-indigo-500 border-x border-t border-indigo-400/50 flex items-end justify-center transition-all duration-300 transform"
                        style={{ height: `${num * 12 + 25}px` }}
                      >
                        <span className="text-white text-xs font-black mb-1.5">{num}</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400">indks {i}</span>
                    </div>
                  ))}
                </div>

                {/* Log terminal */}
                <div className="bg-black/80 rounded-lg p-2 border border-slate-900 font-mono text-[9px] text-slate-300 h-[65px] overflow-y-auto">
                  <div className="text-emerald-400 select-none">// Log Langkah Penukaran:</div>
                  {sortLogs.map((log, idx) => (
                    <div key={idx}>{log}</div>
                  ))}
                  {sortLogs.length === 0 && <div className="text-slate-500">Klik 'Langkah Urut berikutnya' untuk mulai...</div>}
                </div>
              </div>

              <div className="flex justify-end gap-2 shrink-0">
                <button 
                  onClick={resetSort}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Mulai Ulang Array</span>
                </button>
                <button 
                  onClick={runBubbleSortStep}
                  disabled={isSorted}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-45 flex items-center gap-1 cursor-pointer"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Langkah Urut Berikutnya</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
