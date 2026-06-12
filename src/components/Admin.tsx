/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SlidersHorizontal, 
  FileText, 
  Image as ImageIcon, 
  User, 
  Plus, 
  Trash2, 
  Pencil, 
  Check, 
  Save, 
  Undo, 
  BookOpen, 
  UserCheck, 
  Tag, 
  Calendar, 
  AlertCircle,
  FileCode,
  Sparkles,
  Award,
  BookOpenCheck,
  ChevronRight,
  UploadCloud,
  X,
  RefreshCw
} from 'lucide-react';
import { PerangkatAjar, FotoGallery, Milestone } from '../types';

interface AdminProps {
  // RPP & Modul arrays
  perangkatList: PerangkatAjar[];
  setPerangkatList: React.Dispatch<React.SetStateAction<PerangkatAjar[]>>;
  
  // Teaching documentation arrays
  galeriSiswa: FotoGallery[];
  setGaleriSiswa: React.Dispatch<React.SetStateAction<FotoGallery[]>>;

  // General Student info
  studentInfo: any;
  setStudentInfo: (info: any) => void;
  resetAllToDefault: () => void;
  
  // Milestones & Penilaian
  milestones: Milestone[];
  setMilestones: React.Dispatch<React.SetStateAction<Milestone[]>>;

  lampiran7?: any;
  setLampiran7?: (val: any) => void;
  lampiran8?: any;
  setLampiran8?: (val: any) => void;
}

const compressImage = (base64Str: string, maxWidth = 800, maxHeight = 800, quality = 0.7): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};

const safeSetLocalStorage = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error(`Failed to set localStorage with key ${key}:`, e);
    if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.code === 22)) {
      alert('Pemberitahuan: Penyimpanan lokal browser Anda penuh. Beberapa perubahan data mungkin hanya tersimpan sementara waktu di memori.');
    }
    return false;
  }
};

export default function Admin({
  perangkatList,
  setPerangkatList,
  galeriSiswa,
  setGaleriSiswa,
  studentInfo,
  setStudentInfo,
  resetAllToDefault,
  milestones,
  setMilestones,
  lampiran7,
  setLampiran7,
  lampiran8,
  setLampiran8
}: AdminProps) {
  // Navigation tabs inside Admin Panel
  const [activeSubTab, setActiveSubTab] = useState<'rpp' | 'dokumentasi' | 'penilaian' | 'biodata'>('rpp');
  const [selectedAssessmentCycle, setSelectedAssessmentCycle] = useState<1 | 2 | 3>(1);
  const [selectedAssessmentType, setSelectedAssessmentType] = useState<'l7' | 'l8'>('l7');
  
  // Notification states
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  const handleUpdateScoreVal = (idx: number, newVal: number) => {
    if (selectedAssessmentType === 'l7') {
      if (!lampiran7) return;
      const copy = JSON.parse(JSON.stringify(lampiran7));
      copy[selectedAssessmentCycle].scores[idx].val = newVal;
      setLampiran7?.(copy);
    } else {
      if (!lampiran8) return;
      const copy = JSON.parse(JSON.stringify(lampiran8));
      copy[selectedAssessmentCycle].scores[idx].val = newVal;
      setLampiran8?.(copy);
    }
  };

  const handleUpdateScoreDesc = (idx: number, newDesc: string) => {
    if (selectedAssessmentType === 'l7') {
      if (!lampiran7) return;
      const copy = JSON.parse(JSON.stringify(lampiran7));
      copy[selectedAssessmentCycle].scores[idx].desc = newDesc;
      setLampiran7?.(copy);
    } else {
      if (!lampiran8) return;
      const copy = JSON.parse(JSON.stringify(lampiran8));
      copy[selectedAssessmentCycle].scores[idx].desc = newDesc;
      setLampiran8?.(copy);
    }
  };

  const handleUpdateFeedbackGP = (newFeedback: string) => {
    if (selectedAssessmentType === 'l7') {
      if (!lampiran7) return;
      const copy = JSON.parse(JSON.stringify(lampiran7));
      copy[selectedAssessmentCycle].feedbackGP = newFeedback;
      setLampiran7?.(copy);
    } else {
      if (!lampiran8) return;
      const copy = JSON.parse(JSON.stringify(lampiran8));
      copy[selectedAssessmentCycle].feedbackGP = newFeedback;
      setLampiran8?.(copy);
    }
  };

  const handleUpdateFeedbackDPL = (newFeedback: string) => {
    if (selectedAssessmentType === 'l7') {
      if (!lampiran7) return;
      const copy = JSON.parse(JSON.stringify(lampiran7));
      copy[selectedAssessmentCycle].feedbackDPL = newFeedback;
      setLampiran7?.(copy);
    } else {
      if (!lampiran8) return;
      const copy = JSON.parse(JSON.stringify(lampiran8));
      copy[selectedAssessmentCycle].feedbackDPL = newFeedback;
      setLampiran8?.(copy);
    }
  };

  // --- RPP / Modul Ajar Edit States ---
  const [editingRppId, setEditingRppId] = useState<string | null>(null);
  const [rppForm, setRppForm] = useState<Partial<PerangkatAjar>>({});
  const [isAddingNewRpp, setIsAddingNewRpp] = useState<boolean>(false);

  // File Upload Refs and State for Perangkat Ajar
  const rppFileInputRef = useRef<HTMLInputElement>(null);
  const lkpdFileInputRef = useRef<HTMLInputElement>(null);
  const canvaFileInputRef = useRef<HTMLInputElement>(null);
  const pdfFileInputRef = useRef<HTMLInputElement>(null);
  const [activeDragSlot, setActiveDragSlot] = useState<string | null>(null);

  const extractFileName = (content: string | undefined): string | null => {
    if (!content) return null;
    if (content.startsWith('[FILE_ATTACHMENT;name=')) {
      const match = content.match(/\[FILE_ATTACHMENT;name=([^;]+)/);
      return match ? match[1] : null;
    }
    return null;
  };

  const extractFileSize = (content: string | undefined): string | null => {
    if (!content) return null;
    if (content.startsWith('[FILE_ATTACHMENT;name=')) {
      const match = content.match(/size=(\d+)/);
      if (match) {
        const bytes = parseInt(match[1]);
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
      }
    }
    return null;
  };

  const handleRppFileUpload = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
    slot: 'rppContent' | 'lkpdContent' | 'canvaContent' | 'pdfContent'
  ) => {
    let files: FileList | null = null;
    if ('files' in e.target && e.target.files) {
      files = e.target.files;
    } else if (e.nativeEvent && 'dataTransfer' in e.nativeEvent && e.nativeEvent.dataTransfer) {
      e.preventDefault();
      files = e.nativeEvent.dataTransfer.files;
    }

    if (files && files.length > 0) {
      const file = files[0];
      
      // Limit file size to 2.5 MB to avoid localStorage overflow
      if (file.size > 2.5 * 1024 * 1024) {
        alert(`Batas maksimal berkas adalah 2.5 MB. Ukuran berkas "${file.name}" adalah ${(file.size / (1024 * 1024)).toFixed(2)} MB. Silakan kompres atau unggah berkas yang lebih kecil.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          const fileData = event.target.result;
          const formattedContent = `[FILE_ATTACHMENT;name=${file.name};size=${file.size}]${fileData}`;
          setRppForm(prev => ({
            ...prev,
            [slot]: formattedContent
          }));
          triggerNotification(`Berkas "${file.name}" berhasil diunggah.`);
        }
      };
      reader.onerror = () => {
        alert('Gagal membaca berkas. Silakan coba berkas lain.');
      };
      reader.readAsDataURL(file);
    }
    setActiveDragSlot(null);
  };

  // --- Dokumentasi Mengajar Edit States ---
  const [editingFotoId, setEditingFotoId] = useState<string | null>(null);
  const [fotoForm, setFotoForm] = useState<Partial<FotoGallery>>({});
  const [isAddingNewFoto, setIsAddingNewFoto] = useState<boolean>(false);
  const [fotoFilePreview, setFotoFilePreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Milestones / Penilaian Edit States ---
  const [editingMilestoneNumber, setEditingMilestoneNumber] = useState<number | null>(null);
  const [milestoneForm, setMilestoneForm] = useState<Partial<Milestone>>({});
  const [isAddingNewMilestone, setIsAddingNewMilestone] = useState<boolean>(false);

  // --- Biodata Form Status ---
  const [bioForm, setBioForm] = useState({ ...studentInfo });

  const triggerNotification = (message: string) => {
    setSaveNotification(message);
    setTimeout(() => {
      setSaveNotification(null);
    }, 3000);
  };

  // --- Milestones Actions ---
  const handleEditMilestoneStart = (m: Milestone) => {
    setEditingMilestoneNumber(m.number);
    setMilestoneForm({ ...m });
    setIsAddingNewMilestone(false);
  };

  const handleAddNewMilestoneStart = () => {
    setIsAddingNewMilestone(true);
    setEditingMilestoneNumber(null);
    setMilestoneForm({
      number: milestones.length + 1,
      title: 'Milestone Baru: Topik Pembelajaran',
      shortDescription: 'Capaian utama pembelajaran CT yang interaktif.',
      fullNarrative: 'Uraian narasi teoretis lengkap mengenai pencapaian belajar serta hubungannya dengan materi terkait.',
      challengeTitle: 'Judul Kuis',
      challengeInteractive: {
        question: 'Tuliskan pertanyaan kuis pilihan ganda di sini.',
        options: [
          'Pilihan Jawaban A',
          'Pilihan Jawaban B (Benar)',
          'Pilihan Jawaban C',
          'Pilihan Jawaban D'
        ],
        correctAnswerIdx: 1,
        explanation: 'Jelaskan mengapa pilihan jawaban B adalah jawaban yang paling benar.'
      }
    });
  };

  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneForm.title || !milestoneForm.shortDescription) {
      alert('Judul dan Deskripsi Singkat wajib diisi.');
      return;
    }

    if (isAddingNewMilestone) {
      const newList = [...milestones, milestoneForm as Milestone];
      newList.sort((a, b) => a.number - b.number);
      setMilestones(newList);
      safeSetLocalStorage('ppg_milestones', JSON.stringify(newList));
      triggerNotification('Milestone & Kuis Penilaian Baru berhasil ditambahkan!');
    } else {
      const newList = milestones.map(item => item.number === editingMilestoneNumber ? (milestoneForm as Milestone) : item);
      newList.sort((a, b) => a.number - b.number);
      setMilestones(newList);
      safeSetLocalStorage('ppg_milestones', JSON.stringify(newList));
      triggerNotification('Milestone & Kuis Penilaian berhasil diperbarui!');
    }

    setEditingMilestoneNumber(null);
    setIsAddingNewMilestone(false);
    setMilestoneForm({});
  };

  const handleDeleteMilestone = (num: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus Milestone & Kuis Penilaian ini? Peta jalan dan sistem kuis akan disesuaikan otomatis.')) {
      const newList = milestones.filter(item => item.number !== num);
      // Re-number remaining milestones so they are continuous
      const renumberedList = newList.map((item, index) => ({
        ...item,
        number: index + 1
      }));
      setMilestones(renumberedList);
      safeSetLocalStorage('ppg_milestones', JSON.stringify(renumberedList));
      triggerNotification('Milestone dihapus & Nomor urut diperbarui otomatis.');

      if (editingMilestoneNumber === num) {
        setEditingMilestoneNumber(null);
        setMilestoneForm({});
      }
    }
  };

  // --- RPP Actions ---
  const handleEditRppStart = (rpp: PerangkatAjar) => {
    setEditingRppId(rpp.id);
    setRppForm({ ...rpp });
    setIsAddingNewRpp(false);
  };

  const handleAddNewRppStart = () => {
    setIsAddingNewRpp(true);
    setEditingRppId(null);
    setRppForm({
      id: `rpp-custom-${Date.now()}`,
      siklus: perangkatList.length + 1,
      title: 'Modul Ajar Siklus Baru: Judul Perangkat',
      description: 'Deskripsi singkat inovasi modul ajar berorientasi Computational Thinking.',
      materi: 'Materi Pembelajaran Utama (misal: Struktur Data, Algoritma)',
      target: 'Siswa Kelas XI SMAN 1 Salatiga',
      rppContent: `## Rencana pelaksanaan pembelajaran (RPP) - Angkatan Baru\n- **Sekolah**: SMA Negeri 1 Salatiga\n- **Materi**: Materi Utama\n- **Alokasi Waktu**: 2 JP @ 45 Menit\n\n### Langkah Kegiatan:\n1. Pendahuluan\n2. Kegiatan Inti\n3. Penutup`,
      lkpdContent: `## Lembar Kerja Peserta Didik (LKPD)\n**Materi**: Praktikum Mandiri Berbasis CT\n\n### Tugas:\nSelesaikan rancangan pilar dekomposisi masalah.`,
      canvaContent: `[LINK CANVA PRESENTASI DI SINI]`,
      pdfContent: `Dokumen Resmi Modul Ajar Terverifikasi LPTK UKSW.`
    });
  };

  const handleSaveRpp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rppForm.title || !rppForm.description) {
      alert('Judul dan Deskripsi wajib diisi.');
      return;
    }

    if (isAddingNewRpp) {
      const newList = [...perangkatList, rppForm as PerangkatAjar];
      setPerangkatList(newList);
      safeSetLocalStorage('ppg_perangkat_list', JSON.stringify(newList));
      triggerNotification('Modul Ajar RPP Baru berhasil ditambahkan!');
    } else {
      const newList = perangkatList.map(item => item.id === editingRppId ? (rppForm as PerangkatAjar) : item);
      setPerangkatList(newList);
      safeSetLocalStorage('ppg_perangkat_list', JSON.stringify(newList));
      triggerNotification('Modul Ajar RPP berhasil diperbarui!');
    }
    
    setEditingRppId(null);
    setIsAddingNewRpp(false);
    setRppForm({});
  };

  const handleDeleteRpp = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus Arisp RPP Modul Ajar ini? Tindakan ini tidak dapat dibatalkan.')) {
      const newList = perangkatList.filter(item => item.id !== id);
      setPerangkatList(newList);
      safeSetLocalStorage('ppg_perangkat_list', JSON.stringify(newList));
      triggerNotification('Modul Ajar RPP berhasil dihapus.');
      
      if (editingRppId === id) {
        setEditingRppId(null);
        setRppForm({});
      }
    }
  };

  // --- Dokumentasi / Foto Actions ---
  const handleEditFotoStart = (foto: FotoGallery) => {
    setEditingFotoId(foto.id);
    setFotoForm({ ...foto });
    setFotoFilePreview(foto.imageUrl);
    setIsAddingNewFoto(false);
  };

  const handleAddNewFotoStart = () => {
    setIsAddingNewFoto(true);
    setEditingFotoId(null);
    setFotoFilePreview(null);
    setFotoForm({
      id: `foto-custom-${Date.now()}`,
      title: 'Aktivitas Baru di SMAN 1 Salatiga',
      category: 'Pembelajaran Kelas',
      description: 'Deskripsi lengkap kronologi aksi nyata siswa dan bimbingan guru.',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      feedback: 'Umpan Balik Instruktur / Pamong SMAN 1 Salatiga: "Metode berjalan baik, respon siswa interaktif."',
      stats: { likes: 0, views: 1 },
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          if (typeof event.target?.result === 'string') {
            try {
              const compressed = await compressImage(event.target.result);
              setFotoFilePreview(compressed);
              setFotoForm(prev => ({ ...prev, imageUrl: compressed }));
            } catch (err) {
              setFotoFilePreview(event.target.result);
              setFotoForm(prev => ({ ...prev, imageUrl: event.target?.result as string }));
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          if (typeof event.target?.result === 'string') {
            try {
              const compressed = await compressImage(event.target.result);
              setFotoFilePreview(compressed);
              setFotoForm(prev => ({ ...prev, imageUrl: compressed }));
            } catch (err) {
              setFotoFilePreview(event.target.result);
              setFotoForm(prev => ({ ...prev, imageUrl: event.target?.result as string }));
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSaveFoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fotoForm.imageUrl) {
      alert('Tolong unggah foto atau masukkan URL gambar terlebih dahulu.');
      return;
    }

    // Auto-populate optional metadata fields if they are empty
    const completedForm: FotoGallery = {
      id: fotoForm.id || `foto-${Date.now()}`,
      title: fotoForm.title || `Dokumentasi Kegiatan`,
      category: fotoForm.category || 'Pembelajaran Kelas',
      description: fotoForm.description || 'Aktivitas pembelajaran aksi nyata siswa.',
      date: fotoForm.date || 'Mei 2026',
      feedback: fotoForm.feedback || '',
      imageUrl: fotoForm.imageUrl,
      stats: fotoForm.stats || { likes: 12, views: 65 },
    };

    if (isAddingNewFoto) {
      const newList = [completedForm, ...galeriSiswa];
      setGaleriSiswa(newList);
      safeSetLocalStorage('ppg_galeri_siswa', JSON.stringify(newList));
      triggerNotification('Dokumentasi mengajar baru ditambahkan!');
    } else {
      const newList = galeriSiswa.map(item => item.id === editingFotoId ? completedForm : item);
      setGaleriSiswa(newList);
      safeSetLocalStorage('ppg_galeri_siswa', JSON.stringify(newList));
      triggerNotification('Dokumentasi mengajar berhasil diperbarui!');
    }

    setEditingFotoId(null);
    setIsAddingNewFoto(false);
    setFotoForm({});
    setFotoFilePreview(null);
  };

  const handleDeleteFoto = (id: string) => {
    if (window.confirm('Apakah Anda benar-benar ingin menghapus dokumentasi mengajar aksi nyata ini?')) {
      const newList = galeriSiswa.filter(item => item.id !== id);
      setGaleriSiswa(newList);
      safeSetLocalStorage('ppg_galeri_siswa', JSON.stringify(newList));
      triggerNotification('Dokumentasi mengajar dihapus.');
      
      if (editingFotoId === id) {
        setEditingFotoId(null);
        setFotoForm({});
        setFotoFilePreview(null);
      }
    }
  };

  // --- General Biodata Action ---
  const handleSaveBiodata = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentInfo(bioForm);
    safeSetLocalStorage('ppg_student_info', JSON.stringify(bioForm));
    triggerNotification('Biodata & Info Umum berhasil diperbarui!');
  };

  const handleResetConfirm = () => {
    if (window.confirm('Tindakan ini akan memulihkan RPP default (Siklus 1-3), seluruh dokumentasi bawaan, serta menyetel ulang nama Guru Mayang Arta Mahesi. Apakah Anda setuju?')) {
      resetAllToDefault();
      setBioForm({
        fullName: 'Mayang Arta Mahesi, S.Kom.',
        nim: '95202541N',
        lptk: 'Universitas Kristen Satya Wacana (UKSW)',
        school: 'SMA Negeri 1 Salatiga',
        email: 'mayangarta09@gmail.com',
        programStudi: 'Informatika'
      });
      setEditingRppId(null);
      setIsAddingNewRpp(false);
      setEditingFotoId(null);
      setIsAddingNewFoto(false);
      setEditingMilestoneNumber(null);
      setIsAddingNewMilestone(false);
      triggerNotification('Semua data dipulihkan ke versi default akademik.');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* GLOWING HEADER PANEL */}
      <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/20 text-xs font-bold text-blue-400 font-mono tracking-wider uppercase">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>DASHBOARD ADMINISTRASI</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black font-display tracking-tight">
              Pusat Kendali <span className="bg-gradient-to-r from-blue-450 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Data Input</span>
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Kelola seluruh konten, berkas arsip modul RPP, galeri foto dokumentasi real-time, serta biografi akademik yang terintegrasi di portofolio ini.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetConfirm}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700/80 hover:text-rose-400 border border-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
              title="Reset data ke bawaan mula-mula"
            >
              <Undo className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
          </div>
        </div>
      </div>

      {/* FLOATING SAVE ALERT */}
      <AnimatePresence>
        {saveNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 border border-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 font-semibold text-xs"
          >
            <Check className="w-4 h-4 bg-emerald-500 rounded-full p-0.5" />
            <span>{saveNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DASHBOARD GRID NAVIGATION & FORMS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* SIDEBAR TABS SELECTION */}
        <div className="lg:col-span-3 space-y-3">
          <p className="text-[10px] font-black tracking-widest uppercase text-slate-400 font-mono">PILIH MENU INPUT DATA</p>
          
          <div className="bg-white rounded-2xl border border-slate-200/85 p-3 space-y-1.5 shadow-3xs">
            <button
              onClick={() => {
                setActiveSubTab('rpp');
                setEditingRppId(null);
                setIsAddingNewRpp(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-between group cursor-pointer ${
                activeSubTab === 'rpp'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className={`w-4 h-4 ${activeSubTab === 'rpp' ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} />
                <span>Kelola RPP, LKPD & Canva</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => {
                setActiveSubTab('dokumentasi');
                setEditingFotoId(null);
                setIsAddingNewFoto(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-between group cursor-pointer ${
                activeSubTab === 'dokumentasi'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ImageIcon className={`w-4 h-4 ${activeSubTab === 'dokumentasi' ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} />
                <span>Dokumentasi Mengajar</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => {
                setActiveSubTab('penilaian');
                setEditingMilestoneNumber(null);
                setIsAddingNewMilestone(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-between group cursor-pointer ${
                activeSubTab === 'penilaian'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Award className={`w-4 h-4 ${activeSubTab === 'penilaian' ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} />
                <span>Peta & Kuis Penilaian</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => {
                setActiveSubTab('biodata');
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-between group cursor-pointer ${
                activeSubTab === 'biodata'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className={`w-4 h-4 ${activeSubTab === 'biodata' ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} />
                <span>Biodata & Profil</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-[11px] leading-relaxed text-slate-500">
            <span className="font-extrabold text-slate-700 block mb-1">✓ Storage Key Terkait</span>
            Setiap modifikasi data akan disimpan pada <code className="bg-neutral-200 px-1 rounded text-red-650 font-mono">localStorage</code> secara persisten. Anda dapat langsung membuka tab <span className="font-bold text-slate-800">Beranda</span> atau <span className="font-bold text-slate-800">Artefak</span> untuk melihat dampaknya.
          </div>
        </div>

        {/* WORKSPACE AREA FOR FORMS & LISTS */}
        <div className="lg:col-span-9 bg-white rounded-3xl border border-slate-200/85 p-6 shadow-sm min-h-[500px]">
          
          {/* TAB 1: ARSIP RPP & MODUL AJAR */}
          {activeSubTab === 'rpp' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-950 font-display">Kelola Modul RPP, LKPD Siswa, & Media Canva</h2>
                  <p className="text-[11px] text-slate-500">Edit atau tambahkan dokumen Perangkat Ajar ("Modul RPP", "LKPD Siswa", "Media Canva", dll.) untuk halaman Artefak.</p>
                </div>
                {!editingRppId && !isAddingNewRpp && (
                  <button
                    onClick={handleAddNewRppStart}
                    className="px-3.5 py-2 bg-blue-650 hover:bg-blue-750 text-white font-black text-[10px] rounded-xl flex items-center gap-1.5 cursor-pointer uppercase tracking-wider transition-all shadow-3xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Artefak Baru</span>
                  </button>
                )}
              </div>

              {/* Edit or Add Form View */}
              {(editingRppId || isAddingNewRpp) ? (
                <form onSubmit={handleSaveRpp} className="space-y-5">
                  <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl border border-slate-200/60">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-widest font-mono">
                      {isAddingNewRpp ? '🚀 MEMBUAT DRAF RPP BARU' : '✏️ MEMPERBARUI MODUL ARSIP RPP'}
                    </span>
                    <button
                      type="button"
                      onClick={() => { setEditingRppId(null); setIsAddingNewRpp(false); }}
                      className="p-1 text-slate-400 hover:text-slate-650 rounded-lg bg-white border border-slate-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-10">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Judul Modul Ajar</label>
                      <input
                        type="text"
                        value={rppForm.title || ''}
                        onChange={(e) => setRppForm({ ...rppForm, title: e.target.value })}
                        placeholder="Judul Modul"
                        className="w-full text-xs font-semibold text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Nomor Siklus</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={rppForm.siklus || 1}
                        onChange={(e) => setRppForm({ ...rppForm, siklus: parseInt(e.target.value) || 1 })}
                        className="w-full text-xs font-black text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Sasaran Pengajaran (Target)</label>
                    <input
                      type="text"
                      value={rppForm.target || ''}
                      onChange={(e) => setRppForm({ ...rppForm, target: e.target.value })}
                      placeholder="Contoh: Siswa Kelas X SMAN 1 Salatiga • Pembelajaran Terbimbing"
                      className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Materi Pembelajaran</label>
                      <input
                        type="text"
                        value={rppForm.materi || ''}
                        onChange={(e) => setRppForm({ ...rppForm, materi: e.target.value })}
                        placeholder="Contoh: Algoritma, Jaringan Komputer, Scratch"
                        className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Ringkasan Deskripsi</label>
                      <input
                        type="text"
                        value={rppForm.description || ''}
                        onChange={(e) => setRppForm({ ...rppForm, description: e.target.value })}
                        placeholder="Deskripsi singkat modul ajar"
                        className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                    
                    {/* Modul RPP Field */}
                    <div className="space-y-2 border border-slate-200/50 p-4 rounded-xl bg-slate-50 relative group">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">1. Dokumen Modul RPP</label>
                          <span className="text-[10px] text-slate-400">Tulis teks Markdown RPP atau langsung unggah file PDF/Docx</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => rppFileInputRef.current?.click()}
                          className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] rounded-lg flex items-center gap-1 cursor-pointer transition-all uppercase"
                        >
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Pilih Berkas</span>
                        </button>
                      </div>

                      {/* Drag & Drop Area container */}
                      <div
                        onDragOver={(e) => { e.preventDefault(); setActiveDragSlot('rppContent'); }}
                        onDragLeave={() => setActiveDragSlot(null)}
                        onDrop={(e) => { e.preventDefault(); handleRppFileUpload(e, 'rppContent'); }}
                        className={`border-2 border-dashed rounded-xl p-3 text-center transition-all flex flex-col items-center justify-center min-h-[80px] ${
                          activeDragSlot === 'rppContent'
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-slate-200 bg-white hover:border-slate-350'
                        }`}
                        onClick={() => {
                          if (!extractFileName(rppForm.rppContent)) {
                            rppFileInputRef.current?.click();
                          }
                        }}
                      >
                        {extractFileName(rppForm.rppContent) ? (
                          <div className="w-full flex items-center justify-between bg-emerald-50 border border-emerald-150 p-2.5 rounded-lg text-[11px] text-emerald-800 font-mono">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">📄</span>
                              <div className="text-left overflow-hidden">
                                <p className="font-extrabold truncate">{extractFileName(rppForm.rppContent)}</p>
                                <p className="text-[9.5px] text-emerald-650 font-bold">{extractFileSize(rppForm.rppContent)}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setRppForm(prev => ({ ...prev, rppContent: '## Rencana Pelaksanaan Pembelajaran (RPP)\nTopik: Informatika Kurikulum Merdeka' }));
                              }}
                              className="text-red-500 hover:text-red-700 text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-white border border-red-200 rounded hover:bg-red-50"
                            >
                              Ganti Teks
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-[10px] text-slate-500 font-semibold">Seret file RPP Anda di sini atau <span className="text-indigo-650 font-bold underline">Cari berkas</span></p>
                            <p className="text-[8.5px] text-slate-400">Mendukung PDF, DOCX, TXT (Maks 2.5MB)</p>
                          </div>
                        )}
                        <input
                          ref={rppFileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx,.txt,.md"
                          className="hidden"
                          onChange={(e) => handleRppFileUpload(e, 'rppContent')}
                        />
                      </div>

                      <textarea
                        rows={4}
                        value={rppForm.rppContent || ''}
                        onChange={(e) => setRppForm({ ...rppForm, rppContent: e.target.value })}
                        className="w-full text-[11px] font-mono text-slate-700 p-2 rounded-lg border border-slate-200 bg-white"
                        placeholder="## Rencana Pelaksanaan Pembelajaran..."
                      />
                    </div>

                    {/* LKPD Siswa Field */}
                    <div className="space-y-2 border border-slate-200/50 p-4 rounded-xl bg-slate-50 relative group">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">2. Lembar LKPD Siswa</label>
                          <span className="text-[10px] text-slate-400">Teks Kerja Siswa atau langsung unggah dokumen evaluasi kelas</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => lkpdFileInputRef.current?.click()}
                          className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] rounded-lg flex items-center gap-1 cursor-pointer transition-all uppercase"
                        >
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Pilih Berkas</span>
                        </button>
                      </div>

                      {/* Drag & Drop Area container */}
                      <div
                        onDragOver={(e) => { e.preventDefault(); setActiveDragSlot('lkpdContent'); }}
                        onDragLeave={() => setActiveDragSlot(null)}
                        onDrop={(e) => { e.preventDefault(); handleRppFileUpload(e, 'lkpdContent'); }}
                        className={`border-2 border-dashed rounded-xl p-3 text-center transition-all flex flex-col items-center justify-center min-h-[80px] ${
                          activeDragSlot === 'lkpdContent'
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-slate-200 bg-white hover:border-slate-350'
                        }`}
                        onClick={() => {
                          if (!extractFileName(rppForm.lkpdContent)) {
                            lkpdFileInputRef.current?.click();
                          }
                        }}
                      >
                        {extractFileName(rppForm.lkpdContent) ? (
                          <div className="w-full flex items-center justify-between bg-emerald-50 border border-emerald-150 p-2.5 rounded-lg text-[11px] text-emerald-800 font-mono">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">📄</span>
                              <div className="text-left overflow-hidden">
                                <p className="font-extrabold truncate">{extractFileName(rppForm.lkpdContent)}</p>
                                <p className="text-[9.5px] text-emerald-650 font-bold">{extractFileSize(rppForm.lkpdContent)}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setRppForm(prev => ({ ...prev, lkpdContent: '## Lembar Kerja Peserta Didik (LKPD)\nTugas Praktikal Mandiri' }));
                              }}
                              className="text-red-500 hover:text-red-700 text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-white border border-red-200 rounded hover:bg-red-50"
                            >
                              Ganti Teks
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-[10px] text-slate-500 font-semibold">Seret file LKPD Anda di sini atau <span className="text-indigo-650 font-bold underline">Cari berkas</span></p>
                            <p className="text-[8.5px] text-slate-400">Mendukung PDF, DOCX, TXT (Maks 2.5MB)</p>
                          </div>
                        )}
                        <input
                          ref={lkpdFileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx,.txt,.md"
                          className="hidden"
                          onChange={(e) => handleRppFileUpload(e, 'lkpdContent')}
                        />
                      </div>

                      <textarea
                        rows={4}
                        value={rppForm.lkpdContent || ''}
                        onChange={(e) => setRppForm({ ...rppForm, lkpdContent: e.target.value })}
                        className="w-full text-[11px] font-mono text-slate-700 p-2 rounded-lg border border-slate-200 bg-white"
                        placeholder="## Lembar Kerja Peserta Didik..."
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Media Canva Field */}
                    <div className="space-y-2 border border-slate-200/50 p-4 rounded-xl bg-slate-50 relative group">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">3. Media Canva / Slide Pembelajaran</label>
                          <span className="text-[10px] text-slate-400">Unggah slide presentasi materi atau sertakan tautan link Canva</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => canvaFileInputRef.current?.click()}
                          className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] rounded-lg flex items-center gap-1 cursor-pointer transition-all uppercase"
                        >
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Pilih Berkas</span>
                        </button>
                      </div>

                      {/* Drag & Drop Area container */}
                      <div
                        onDragOver={(e) => { e.preventDefault(); setActiveDragSlot('canvaContent'); }}
                        onDragLeave={() => setActiveDragSlot(null)}
                        onDrop={(e) => { e.preventDefault(); handleRppFileUpload(e, 'canvaContent'); }}
                        className={`border-2 border-dashed rounded-xl p-3 text-center transition-all flex flex-col items-center justify-center min-h-[80px] ${
                          activeDragSlot === 'canvaContent'
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-slate-200 bg-white hover:border-slate-350'
                        }`}
                        onClick={() => {
                          if (!extractFileName(rppForm.canvaContent)) {
                            canvaFileInputRef.current?.click();
                          }
                        }}
                      >
                        {extractFileName(rppForm.canvaContent) ? (
                          <div className="w-full flex items-center justify-between bg-emerald-50 border border-emerald-150 p-2.5 rounded-lg text-[11px] text-emerald-800 font-mono">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">📊</span>
                              <div className="text-left overflow-hidden">
                                <p className="font-extrabold truncate">{extractFileName(rppForm.canvaContent)}</p>
                                <p className="text-[9.5px] text-emerald-650 font-bold">{extractFileSize(rppForm.canvaContent)}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setRppForm(prev => ({ ...prev, canvaContent: '[LINK CANVA PRESENTASI DI SINI]' }));
                              }}
                              className="text-red-500 hover:text-red-700 text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-white border border-red-200 rounded hover:bg-red-50"
                            >
                              Ganti Teks
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-[10px] text-slate-500 font-semibold">Seret file slide/Canva di sini atau <span className="text-indigo-650 font-bold underline">Cari berkas</span></p>
                            <p className="text-[8.5px] text-slate-400">PDF, PPTX, Doc atau tautan Canva</p>
                          </div>
                        )}
                        <input
                          ref={canvaFileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                          className="hidden"
                          onChange={(e) => handleRppFileUpload(e, 'canvaContent')}
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={rppForm.canvaContent || ''}
                        onChange={(e) => setRppForm({ ...rppForm, canvaContent: e.target.value })}
                        className="w-full text-[11px] font-mono text-slate-700 p-2 rounded-lg border border-slate-200 bg-white"
                        placeholder="[Tautan Link Canva atau deskripsi slide]"
                      />
                    </div>

                    {/* LKPD Siswa & Rubrik Field */}
                    <div className="space-y-2 border border-slate-200/50 p-4 rounded-xl bg-slate-50 relative group">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <label className="text-xs font-black uppercase text-slate-700 tracking-wider block">4. LKPD Siswa & Rubrik (PDF/Forms)</label>
                          <span className="text-[10px] text-slate-400">Unggah tautan Google Forms, LKPD Siswa, atau instrumen rubrik evaluasi</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => pdfFileInputRef.current?.click()}
                          className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[10px] rounded-lg flex items-center gap-1 cursor-pointer transition-all uppercase"
                        >
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Pilih Berkas</span>
                        </button>
                      </div>

                      {/* Drag & Drop Area container */}
                      <div
                        onDragOver={(e) => { e.preventDefault(); setActiveDragSlot('pdfContent'); }}
                        onDragLeave={() => setActiveDragSlot(null)}
                        onDrop={(e) => { e.preventDefault(); handleRppFileUpload(e, 'pdfContent'); }}
                        className={`border-2 border-dashed rounded-xl p-3 text-center transition-all flex flex-col items-center justify-center min-h-[80px] ${
                          activeDragSlot === 'pdfContent'
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-slate-200 bg-white hover:border-slate-350'
                        }`}
                        onClick={() => {
                          if (!extractFileName(rppForm.pdfContent)) {
                            pdfFileInputRef.current?.click();
                          }
                        }}
                      >
                        {extractFileName(rppForm.pdfContent) ? (
                          <div className="w-full flex items-center justify-between bg-emerald-50 border border-emerald-150 p-2.5 rounded-lg text-[11px] text-emerald-800 font-mono">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <span className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">📄</span>
                              <div className="text-left overflow-hidden">
                                <p className="font-extrabold truncate">{extractFileName(rppForm.pdfContent)}</p>
                                <p className="text-[9.5px] text-emerald-650 font-bold">{extractFileSize(rppForm.pdfContent)}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setRppForm(prev => ({ ...prev, pdfContent: 'Dokumen Resmi Modul Ajar Terverifikasi LPTK UKSW.' }));
                              }}
                              className="text-red-500 hover:text-red-700 text-[10px] font-black uppercase tracking-wider px-2 py-1 bg-white border border-red-200 rounded hover:bg-red-50"
                            >
                              Ganti Teks
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-[10px] text-slate-500 font-semibold">Seret file LKPD/Rubrik di sini atau <span className="text-indigo-650 font-bold underline">Cari berkas</span></p>
                            <p className="text-[8.5px] text-slate-400">Tautan Formulir interaktif atau File Penilaian Siswa</p>
                          </div>
                        )}
                        <input
                          ref={pdfFileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => handleRppFileUpload(e, 'pdfContent')}
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={rppForm.pdfContent || ''}
                        onChange={(e) => setRppForm({ ...rppForm, pdfContent: e.target.value })}
                        className="w-full text-[11px] font-mono text-slate-700 p-2 rounded-lg border border-slate-200 bg-white"
                        placeholder="Dokumen Resmi Modul Ajar Terverifikasi LPTK UKSW."
                      />
                    </div>

                  </div>     </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-150">
                    <button
                      type="button"
                      onClick={() => { setEditingRppId(null); setIsAddingNewRpp(false); }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isAddingNewRpp ? 'Simpan RPP Baru' : 'Perbarui Perubahan'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* RPP list and quick controls */
                <div className="space-y-6">
                  {/* QUICK UPLOAD PANEL */}
                  <div className="bg-gradient-to-br from-indigo-50/50 to-blue-50/10 border border-slate-200/80 p-5 rounded-2xl shadow-3xs space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-indigo-150 text-indigo-700 rounded-lg shrink-0">
                        <UploadCloud className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">Unggah Cepat Berkas Pembelajaran lewat Admin</h3>
                        <p className="text-[10px] text-slate-500 font-semibold">Pilih siklus & jenis dokumen untuk langsung mengunggah file pelengkap artefak.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1">1. Pilih Siklus Sasaran</label>
                        <select 
                          id="quick-upload-siklus"
                          className="w-full text-xs font-extrabold text-slate-700 bg-white border border-slate-200 rounded-xl p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        >
                          {perangkatList.map((item) => (
                            <option key={item.id} value={item.id}>Siklus {item.siklus} - {item.title}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1">2. Pilih Jenis Dokumen</label>
                        <select 
                          id="quick-upload-slot"
                          className="w-full text-xs font-extrabold text-slate-700 bg-white border border-slate-200 rounded-xl p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        >
                          <option value="rppContent">Modul RPP (Format Dokumen/Teks)</option>
                          <option value="lkpdContent">LKPD Siswa (Format Lembar Kerja)</option>
                          <option value="canvaContent">Media Canva (Presentasi/Slide)</option>
                          <option value="pdfContent">LKPD Siswa & Rubrik (PDF/Forms)</option>
                        </select>
                      </div>

                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => document.getElementById('quick-upload-file-input')?.click()}
                          className="w-full bg-indigo-650 hover:bg-indigo-700 text-white font-black text-[10.5px] uppercase tracking-wider py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs transition-all active:scale-95 duration-200"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Pilih & Unggah File</span>
                        </button>
                      </div>
                    </div>

                    <input 
                      type="file"
                      id="quick-upload-file-input"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.md,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        // Limit size to prevent localStorage overflow
                        if (file.size > 2.5 * 1024 * 1024) {
                          alert(`Batas maksimal berkas upload adalah 2.5 MB. File Anda sebesar ${(file.size / (1024*1024)).toFixed(2)} MB.`);
                          return;
                        }

                        const selectedRppId = (document.getElementById('quick-upload-siklus') as HTMLSelectElement)?.value;
                        const slot = (document.getElementById('quick-upload-slot') as HTMLSelectElement)?.value as 'rppContent' | 'lkpdContent' | 'canvaContent' | 'pdfContent';

                        if (!selectedRppId || !slot) return;

                        const reader = new FileReader();
                        reader.onload = (event) => {
                          if (typeof event.target?.result === 'string') {
                            const fileData = event.target.result;
                            const formattedContent = `[FILE_ATTACHMENT;name=${file.name};size=${file.size}]${fileData}`;
                            
                            const newList = perangkatList.map(item => {
                              if (item.id === selectedRppId) {
                                return {
                                  ...item,
                                  [slot]: formattedContent
                                };
                              }
                              return item;
                            });

                            setPerangkatList(newList);
                            safeSetLocalStorage('ppg_perangkat_list', JSON.stringify(newList));
                            triggerNotification(`Arsip "${file.name}" terupload aman ke LPTK Siklus.`);
                          }
                        };
                        reader.readAsDataURL(file);
                        e.target.value = ''; // Reset input
                      }}
                    />
                  </div>

                  <div className="space-y-4">
                    {perangkatList.map((item) => (
                    <div 
                      key={item.id}
                      className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-slate-300 hover:bg-white transition-all duration-200"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-indigo-50 border border-indigo-100 text-[8px] font-mono font-black text-indigo-700 px-2 py-0.5 rounded-md uppercase">
                            Siklus {item.siklus}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">ID: {item.id}</span>
                        </div>
                        <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[10px] text-slate-500 max-w-xl line-clamp-1">{item.description}</p>
                        <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-600 mt-1">
                          <span>Materi: <span className="font-normal text-slate-500">{item.materi}</span></span>
                          <span className="text-slate-300">•</span>
                          <span>Target: <span className="font-normal text-slate-500 truncate">{item.target}</span></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 self-end sm:self-center">
                        <button
                          onClick={() => handleEditRppStart(item)}
                          className="p-2 bg-white text-slate-600 hover:text-blue-600 border border-slate-200 hover:border-blue-200 rounded-xl transition-all cursor-pointer"
                          title="Edit Modul"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteRpp(item.id)}
                          className="p-2 bg-white text-slate-400 hover:text-rose-600 border border-slate-200 hover:border-rose-200 rounded-xl transition-all cursor-pointer"
                          title="Hapus Modul"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {perangkatList.length === 0 && (
                    <div className="text-center py-12 bg-slate-50 border border-dashed rounded-3xl">
                      <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-650">Tidak ada arsip modular RPP terdaftar.</p>
                      <p className="text-[10px] text-slate-400">Gunakan tombol di atas untuk merakit RPP digital perdana.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            </div>
          )}

          {/* TAB 2: DOKUMENTASI MENGAJAR ACTIONS */}
          {activeSubTab === 'dokumentasi' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-950 font-display">Daftar Dokumentasi Aksi Nyata</h2>
                  <p className="text-[11px] text-slate-500">Unggah foto penataran kelas, catat ulasan guru pamong, dan kelola rincian tanggal.</p>
                </div>
                {!editingFotoId && !isAddingNewFoto && (
                  <button
                    onClick={handleAddNewFotoStart}
                    className="px-3.5 py-2 bg-blue-650 hover:bg-blue-750 text-white font-black text-[10px] rounded-xl flex items-center gap-1.5 cursor-pointer uppercase tracking-wider transition-all shadow-3xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload Dokumentasi</span>
                  </button>
                )}
              </div>

              {/* Edit/Add Foto Section */}
              {(editingFotoId || isAddingNewFoto) ? (
                <form onSubmit={handleSaveFoto} className="space-y-5">
                  <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl border border-slate-200/60">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-widest font-mono">
                      {isAddingNewFoto ? '📸 TAMBAH ARSIP DOKUMENTASI BARU' : '✏️ MEMPERBARUI BERKAS FOTO DOKUMENTASI'}
                    </span>
                    <button
                      type="button"
                      onClick={() => { setEditingFotoId(null); setIsAddingNewFoto(false); setFotoFilePreview(null); }}
                      className="p-1 text-slate-400 hover:text-slate-650 rounded-lg bg-white border border-slate-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Drag and Drop Upload block */}
                    <div className="md:col-span-5 space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Foto Dokumentasi Kegiatan</label>
                      
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-4 text-center transition-all flex flex-col items-center justify-center min-h-[160px] cursor-pointer ${
                          isDragOver 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-50/50'
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {fotoFilePreview ? (
                          <div className="space-y-2 w-full relative group">
                            <img 
                              src={fotoFilePreview} 
                              alt="Review" 
                              className="max-h-36 mx-auto object-cover rounded-lg border shadow-3xs" 
                            />
                            <p className="text-[8.5px] font-mono font-bold text-slate-400">Klik / Seret foto lain untuk mengganti</p>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                            <p className="text-[11px] font-bold text-slate-650">Seret foto di sini atau klik untuk cari</p>
                            <p className="text-[9px] text-slate-400">Format JPG, PNG, GIF</p>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Atau gunakan URL Gambar Eksternal</label>
                        <input
                          type="text"
                          value={fotoForm.imageUrl || ''}
                          onChange={(e) => {
                            setFotoForm({ ...fotoForm, imageUrl: e.target.value });
                            setFotoFilePreview(e.target.value);
                          }}
                          placeholder="https://images.unsplash.com/photo-..."
                          className="w-full text-xs text-slate-800 p-2 rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    {/* Metadata editor */}
                    <div className="md:col-span-7 space-y-4">
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Judul Aktivitas Pengajaran (Opsional)</label>
                        <input
                          type="text"
                          value={fotoForm.title || ''}
                          onChange={(e) => setFotoForm({ ...fotoForm, title: e.target.value })}
                          placeholder="Judul Berkas Dokumentasi (Defaut: Dokumentasi Kegiatan)"
                          className="w-full text-xs font-semibold text-slate-800 p-2.5 rounded-xl border border-slate-200"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Kategori Kegiatan (Opsional)</label>
                          <select
                            value={fotoForm.category || 'Pembelajaran Kelas'}
                            onChange={(e) => setFotoForm({ ...fotoForm, category: e.target.value as any })}
                            className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200 bg-white"
                          >
                            <option value="Pembelajaran Kelas">Pembelajaran Kelas</option>
                            <option value="Praktik Laboratorium">Praktik Laboratorium</option>
                            <option value="Presentasi Materi">Presentasi Materi</option>
                            <option value="Diskusi Kelompok">Diskusi Kelompok</option>
                            <option value="Evaluasi & Refleksi">Evaluasi & Refleksi</option>
                            <option value="Bimbingan Siswa">Bimbingan Siswa</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Tanggal Aksi (Opsional)</label>
                          <input
                            type="text"
                            value={fotoForm.date || ''}
                            onChange={(e) => setFotoForm({ ...fotoForm, date: e.target.value })}
                            placeholder="Contoh: 18 Maret 2026"
                            className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Uraian Naratif / Deskripsi Aksi (Opsional)</label>
                        <textarea
                          rows={3}
                          value={fotoForm.description || ''}
                          onChange={(e) => setFotoForm({ ...fotoForm, description: e.target.value })}
                          placeholder="Ceritakan pelaksanaan berpikir komputasionalnya."
                          className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Ulasan & Catatan Masukan Instruktur/Pamong (Opsional)</label>
                        <input
                          type="text"
                          value={fotoForm.feedback || ''}
                          onChange={(e) => setFotoForm({ ...fotoForm, feedback: e.target.value })}
                          placeholder="Ulasan kritis pamong..."
                          className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-150">
                    <button
                      type="button"
                      onClick={() => { setEditingFotoId(null); setIsAddingNewFoto(false); setFotoFilePreview(null); }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isAddingNewFoto ? 'Simpan Dokumentasi' : 'Perbarui Perubahan'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Dokumentasi list */
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {galeriSiswa.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-100 rounded-2xl border border-slate-200/80 shadow-3xs overflow-hidden group hover:shadow-md hover:border-indigo-400 hover:bg-slate-50 transition-all duration-300 relative aspect-[16/10] flex items-center justify-center p-3"
                    >
                      <img 
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80'} 
                        alt={item.title || 'Foto Galeri'}
                        className="max-w-full max-h-full object-contain group-hover:scale-104 transition-transform duration-350 pointer-events-none"
                        referrerPolicy="no-referrer"
                      />

                      {/* Smooth Hover overlay with elegant action controls */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditFotoStart(item)}
                          className="px-3.5 py-1.5 bg-white text-indigo-700 font-black text-[9px] uppercase tracking-wider rounded-xl hover:bg-indigo-50 shadow-md transform translate-y-1.5 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                        >
                          Edit Foto
                        </button>
                        <button
                          onClick={() => handleDeleteFoto(item.id)}
                          className="px-3.5 py-1.5 bg-rose-600 text-white font-black text-[9px] uppercase tracking-wider rounded-xl hover:bg-rose-700 shadow-md transform translate-y-1.5 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                        >
                          Hapus Foto
                        </button>
                      </div>
                    </div>
                  ))}

                  {galeriSiswa.length === 0 && (
                    <div className="col-span-2 md:col-span-3 text-center py-12 bg-slate-50 border border-dashed rounded-3xl">
                      <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-650">Tidak ada galeri foto dokumentasi diunggah.</p>
                      <p className="text-[10px] text-slate-400">Gunakan tombol di atas untuk menambah portofolio baru.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB: PETA & KUIS PENILAIAN */}
          {activeSubTab === 'penilaian' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-950 font-display">Manajemen Milestone & Kuis Penilaian</h2>
                  <p className="text-[11px] text-slate-500">Kelola rute materi kognitif, evaluasi diri pendidik, dan kuis pilihan ganda.</p>
                </div>
                {!editingMilestoneNumber && !isAddingNewMilestone && (
                  <button
                    onClick={handleAddNewMilestoneStart}
                    className="px-3.5 py-2 bg-blue-650 hover:bg-blue-750 text-white font-black text-[10px] rounded-xl flex items-center gap-1.5 cursor-pointer uppercase tracking-wider transition-all shadow-3xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Milestone Baru</span>
                  </button>
                )}
              </div>

              {/* Edit or Add Form View */}
              {(editingMilestoneNumber !== null || isAddingNewMilestone) ? (
                <form onSubmit={handleSaveMilestone} className="space-y-5">
                  <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl border border-slate-200/60">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-widest font-mono">
                      {isAddingNewMilestone ? '🚀 MEMBUAT MILESTONE BARU' : `✏️ EDIT MILESTONE ${editingMilestoneNumber}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => { setEditingMilestoneNumber(null); setIsAddingNewMilestone(false); }}
                      className="p-1 text-slate-400 hover:text-slate-650 rounded-lg bg-white border border-slate-200 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">No. Urut</label>
                      <input
                        type="number"
                        min={1}
                        value={milestoneForm.number ?? ''}
                        onChange={(e) => setMilestoneForm({ ...milestoneForm, number: parseInt(e.target.value) || 1 })}
                        className="w-full text-xs font-bold text-slate-800 p-2.5 rounded-xl border border-slate-200"
                        required
                        disabled={!isAddingNewMilestone}
                        title="Nomor urut milestone"
                      />
                    </div>
                    <div className="sm:col-span-10">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Judul Milestone Penilaian</label>
                      <input
                        type="text"
                        value={milestoneForm.title || ''}
                        onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                        placeholder="Contoh: Pendalaman Berpikir Komputasional SMA"
                        className="w-full text-xs font-bold text-slate-800 p-2.5 rounded-xl border border-slate-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Capaian Utama (Deskripsi Singkat)</label>
                    <input
                      type="text"
                      value={milestoneForm.shortDescription || ''}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, shortDescription: e.target.value })}
                      placeholder="Ringkasan kompetensi akhir yang terukur"
                      className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Narasi Lengkap & Refleksi Studi</label>
                    <textarea
                      rows={4}
                      value={milestoneForm.fullNarrative || ''}
                      onChange={(e) => setMilestoneForm({ ...milestoneForm, fullNarrative: e.target.value })}
                      placeholder="Tuliskan ulasan teoretis, analisis materi Informatika Kelas XI Kurikulum Merdeka."
                      className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200"
                      required
                    />
                  </div>

                  {/* MCQ Challenge Panel */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Konfigurasi Soal Kuis Pilihan Ganda</h3>
                    
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Judul Pertanyaan / Tema Asesmen</label>
                      <input
                        type="text"
                        value={milestoneForm.challengeTitle || ''}
                        onChange={(e) => setMilestoneForm({ ...milestoneForm, challengeTitle: e.target.value })}
                        placeholder="Contoh: Analisis Teoretis Pembelajaran"
                        className="w-full text-xs text-slate-800 p-2.5 bg-white rounded-xl border border-slate-200"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Pertanyaan Soal Kuis</label>
                      <textarea
                        rows={2}
                        value={milestoneForm.challengeInteractive?.question || ''}
                        onChange={(e) => setMilestoneForm({
                          ...milestoneForm,
                          challengeInteractive: {
                            question: e.target.value,
                            options: milestoneForm.challengeInteractive?.options || ['', '', '', ''],
                            correctAnswerIdx: milestoneForm.challengeInteractive?.correctAnswerIdx || 0,
                            explanation: milestoneForm.challengeInteractive?.explanation || ''
                          }
                        })}
                        placeholder="Tuliskan butir soal pilihan ganda di sini..."
                        className="w-full text-xs text-slate-800 p-2.5 bg-white rounded-xl border border-slate-200"
                      />
                    </div>

                    {/* Options inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {([0, 1, 2, 3] as const).map((optIdx) => (
                        <div key={optIdx}>
                          <label className="text-[9px] font-bold text-slate-500 block mb-1">
                            Pilihan {String.fromCharCode(65 + optIdx)}
                          </label>
                          <input
                            type="text"
                            value={milestoneForm.challengeInteractive?.options?.[optIdx] || ''}
                            onChange={(e) => {
                              const currOpts = [...(milestoneForm.challengeInteractive?.options || ['', '', '', ''])];
                              currOpts[optIdx] = e.target.value;
                              setMilestoneForm({
                                ...milestoneForm,
                                challengeInteractive: {
                                  question: milestoneForm.challengeInteractive?.question || '',
                                  options: currOpts,
                                  correctAnswerIdx: milestoneForm.challengeInteractive?.correctAnswerIdx || 0,
                                  explanation: milestoneForm.challengeInteractive?.explanation || ''
                                }
                              });
                            }}
                            placeholder={`Ketikan opsi ${String.fromCharCode(65 + optIdx)}`}
                            className="w-full text-xs text-slate-800 p-2 bg-white rounded-xl border border-slate-200"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Opsi Kunci Jawaban Benar</label>
                        <select
                          value={milestoneForm.challengeInteractive?.correctAnswerIdx !== undefined ? milestoneForm.challengeInteractive.correctAnswerIdx : 0}
                          onChange={(e) => setMilestoneForm({
                            ...milestoneForm,
                            challengeInteractive: {
                              question: milestoneForm.challengeInteractive?.question || '',
                              options: milestoneForm.challengeInteractive?.options || ['', '', '', ''],
                              correctAnswerIdx: parseInt(e.target.value) || 0,
                              explanation: milestoneForm.challengeInteractive?.explanation || ''
                            }
                          })}
                          className="w-full text-xs text-slate-800 p-2.5 bg-white rounded-xl border border-slate-200"
                        >
                          <option value={0}>Pilihan A</option>
                          <option value={1}>Pilihan B</option>
                          <option value={2}>Pilihan C</option>
                          <option value={3}>Pilihan D</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Penjelasan Jawaban (Kunci Analisis)</label>
                        <input
                          type="text"
                          value={milestoneForm.challengeInteractive?.explanation || ''}
                          onChange={(e) => setMilestoneForm({
                            ...milestoneForm,
                            challengeInteractive: {
                              question: milestoneForm.challengeInteractive?.question || '',
                              options: milestoneForm.challengeInteractive?.options || ['', '', '', ''],
                              correctAnswerIdx: milestoneForm.challengeInteractive?.correctAnswerIdx !== undefined ? milestoneForm.challengeInteractive.correctAnswerIdx : 0,
                              explanation: e.target.value
                            }
                          })}
                          placeholder="Mengapa opsi ini benar?"
                          className="w-full text-xs text-slate-800 p-2.5 bg-white rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-150">
                    <button
                      type="button"
                      onClick={() => { setEditingMilestoneNumber(null); setIsAddingNewMilestone(false); }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isAddingNewMilestone ? 'Simpan Milestone' : 'Perbarui Milestone'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Milestones List */
                <div className="space-y-4">
                  {milestones.map((item) => (
                    <div
                      key={item.number}
                      className="p-4 bg-slate-50/70 border border-slate-200/85 hover:border-slate-350 hover:bg-white rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="w-9 h-9 shrink-0 bg-blue-50 border border-blue-100 text-blue-700 font-mono font-black text-sm rounded-xl flex items-center justify-center">
                          {item.number}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs font-extrabold text-slate-900 truncate">
                            {item.title}
                          </h3>
                          <p className="text-[10px] text-slate-400 font-bold font-mono uppercase mt-0.5">
                            Pertanyaan: {item.challengeTitle || 'Belum diatur'}
                          </p>
                          <p className="text-[10px] text-slate-500 line-clamp-1 mt-1 font-medium leading-relaxed">
                            {item.shortDescription}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                        <button
                          onClick={() => handleEditMilestoneStart(item)}
                          className="px-2.5 py-1.5 text-[9px] font-black bg-white text-slate-700 hover:text-blue-700 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                        >
                          Ubah
                        </button>
                        <button
                          onClick={() => handleDeleteMilestone(item.number)}
                          className="px-2.5 py-1.5 text-[9px] font-black bg-white text-slate-400 hover:text-rose-600 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}

                  {milestones.length === 0 && (
                    <div className="text-center py-12 bg-slate-50 border border-dashed rounded-3xl">
                      <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-650">Tidak ada milestones kuis penilaian.</p>
                      <p className="text-[10px] text-slate-400">Gunakan tombol 'Milestone Baru' di atas untuk menambah.</p>
                    </div>
                  )}
                </div>
              )}

              {/* SPECIAL SECTION: EDIT GURU PAMONG & DPL ASSESSMENTS (Lampiran 7 & Lampiran 8) */}
              <div className="mt-8 border-t border-slate-100 pt-8 space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 p-4 rounded-2xl border border-blue-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-xs font-black text-indigo-900 font-display flex items-center gap-1.5 uppercase tracking-wide">
                      <Award className="w-4.5 h-4.5 text-indigo-600 animate-pulse" />
                      Penilaian Siklus Guru Pamong & DPL (Lampiran 7 & 8)
                    </h3>
                    <p className="text-[10px] text-slate-600 mt-0.5">
                      Ubah nilai kognitif, indikator deskripsi, dan umpan balik langsung per Siklus dari Guru Pamong & Dosen Pembimbing.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {/* Cycle Selection Controls */}
                    <div className="flex bg-white border border-slate-200 rounded-xl p-0.5 shadow-2xs">
                      {([1, 2, 3] as const).map((cyc) => (
                        <button
                          key={cyc}
                          type="button"
                          onClick={() => setSelectedAssessmentCycle(cyc)}
                          className={`px-3 py-1 text-[10px] font-black rounded-lg cursor-pointer transition-all ${
                            selectedAssessmentCycle === cyc
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Siklus {cyc}
                        </button>
                      ))}
                    </div>

                    {/* Instrument Type Selection */}
                    <div className="flex bg-white border border-slate-200 rounded-xl p-0.5 shadow-2xs">
                      {(['l7', 'l8'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedAssessmentType(type)}
                          className={`px-3 py-1 text-[10px] font-black rounded-lg cursor-pointer transition-all ${
                            selectedAssessmentType === type
                              ? 'bg-indigo-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {type === 'l7' ? 'Lampu 7 (Modul)' : 'Lampu 8 (Aksi)'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/85 rounded-2xl p-5 shadow-3xs space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
                      Siklus {selectedAssessmentCycle} — {selectedAssessmentType === 'l7' ? 'Instrumen Penyusunan Perangkat' : 'Instrumen Praktik Mengajar'}
                    </span>
                    <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-150">
                      Auto-Save Aktif
                    </span>
                  </div>

                  {/* Dynamic Score Inputs */}
                  <div className="space-y-4">
                    {((selectedAssessmentType === 'l7' ? lampiran7 : lampiran8)?.[selectedAssessmentCycle]?.scores || []).map((scoreItem: any, idx: number) => (
                      <div key={idx} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/60 grid grid-cols-1 md:grid-cols-12 gap-4 items-center animate-fade-in">
                        <div className="md:col-span-6 space-y-1">
                          <label className="text-[11px] font-bold text-slate-800 leading-tight block">
                            {idx + 1}. {scoreItem.item}
                          </label>
                          <textarea
                            rows={1}
                            value={scoreItem.desc}
                            onChange={(e) => handleUpdateScoreDesc(idx, e.target.value)}
                            placeholder="Tulis justifikasi deskripsi nilai..."
                            className="w-full text-[11px] text-slate-600 bg-white border border-slate-200 p-2 rounded-lg"
                          />
                        </div>

                        <div className="md:col-span-6 flex items-center gap-3">
                          <div className="flex-1">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={scoreItem.val}
                              onChange={(e) => handleUpdateScoreVal(idx, parseInt(e.target.value) || 0)}
                              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-1">
                              <span>0</span>
                              <span>50</span>
                              <span>100</span>
                            </div>
                          </div>
                          
                          <div className="w-16">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={scoreItem.val}
                              onChange={(e) => handleUpdateScoreVal(idx, parseInt(e.target.value) || 0)}
                              className="w-full text-center text-xs font-black text-blue-700 bg-white border border-slate-200 p-2 rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Feedback inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                        Umpan Balik Guru Pamong (GP)
                      </label>
                      <textarea
                        rows={3}
                        value={(selectedAssessmentType === 'l7' ? lampiran7 : lampiran8)?.[selectedAssessmentCycle]?.feedbackGP || ''}
                        onChange={(e) => handleUpdateFeedbackGP(e.target.value)}
                        placeholder="Umpan balik tertulis resmi dari Guru Pamong..."
                        className="w-full text-xs text-slate-800 p-3 rounded-xl border border-slate-200 leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                        Umpan Balik Dosen Pembimbing Lapangan (DPL)
                      </label>
                      <textarea
                        rows={3}
                        value={(selectedAssessmentType === 'l7' ? lampiran7 : lampiran8)?.[selectedAssessmentCycle]?.feedbackDPL || ''}
                        onChange={(e) => handleUpdateFeedbackDPL(e.target.value)}
                        placeholder="Umpan balik tertulis resmi dari Dosen Pembimbing..."
                        className="w-full text-xs text-slate-800 p-3 rounded-xl border border-slate-200 leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BIODATA & PROFIL UTAMA */}
          {activeSubTab === 'biodata' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-black text-slate-950 font-display">Biodata & Profil Mahasiswa PPG</h2>
                <p className="text-[11px] text-slate-500">Sesuaikan informasi profil utama yang ditampilkan pada halaman beranda dan header laporan.</p>
              </div>

              <form onSubmit={handleSaveBiodata} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Nama Lengkap & Gelar Akademik</label>
                    <input
                      type="text"
                      value={bioForm.fullName}
                      onChange={(e) => setBioForm({ ...bioForm, fullName: e.target.value })}
                      placeholder="Mayang Arta Mahesi, S.Kom."
                      className="w-full text-xs font-bold text-slate-800 p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Nomor Induk Mahasiswa (NIM)</label>
                    <input
                      type="text"
                      value={bioForm.nim}
                      onChange={(e) => setBioForm({ ...bioForm, nim: e.target.value })}
                      placeholder="95202541N"
                      className="w-full text-xs font-semibold text-slate-800 p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">LPTK Penyelenggara</label>
                    <input
                      type="text"
                      value={bioForm.lptk}
                      onChange={(e) => setBioForm({ ...bioForm, lptk: e.target.value })}
                      placeholder="Universitas Kristen Satya Wacana (UKSW)"
                      className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Program Studi / Bidang</label>
                    <input
                      type="text"
                      value={bioForm.programStudi}
                      onChange={(e) => setBioForm({ ...bioForm, programStudi: e.target.value })}
                      placeholder="Informatika"
                      className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Situs Sekolah Mitra PPL</label>
                    <input
                      type="text"
                      value={bioForm.school}
                      onChange={(e) => setBioForm({ ...bioForm, school: e.target.value })}
                      placeholder="SMA Negeri 1 Salatiga"
                      className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Alamat Kontak Email</label>
                    <input
                      type="email"
                      value={bioForm.email}
                      onChange={(e) => setBioForm({ ...bioForm, email: e.target.value })}
                      placeholder="mayangarta09@gmail.com"
                      className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-4">
                  <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest font-display">A. Misi Guru Profesional</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Misi 1: Literasi CT</span>
                      <input
                        type="text"
                        value={bioForm.misi1Title || ''}
                        onChange={(e) => setBioForm({ ...bioForm, misi1Title: e.target.value })}
                        placeholder="Judul Misi 1"
                        className="w-full text-xs font-bold text-slate-800 p-2 rounded-lg border border-slate-250 bg-white"
                      />
                      <textarea
                        rows={2}
                        value={bioForm.misi1Desc || ''}
                        onChange={(e) => setBioForm({ ...bioForm, misi1Desc: e.target.value })}
                        placeholder="Visi Utama Misi"
                        className="w-full text-xs text-slate-850 p-2 rounded-lg border border-slate-250 bg-white"
                      />
                      <input
                        type="text"
                        value={bioForm.misi1Execution || ''}
                        onChange={(e) => setBioForm({ ...bioForm, misi1Execution: e.target.value })}
                        placeholder="Rencana Aksi Konkret"
                        className="w-full text-xs text-slate-800 p-2 rounded-lg border border-slate-250 bg-white"
                      />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Misi 2: Pendidik Inklusif</span>
                      <input
                        type="text"
                        value={bioForm.misi2Title || ''}
                        onChange={(e) => setBioForm({ ...bioForm, misi2Title: e.target.value })}
                        placeholder="Judul Misi 2"
                        className="w-full text-xs font-bold text-slate-800 p-2 rounded-lg border border-slate-250 bg-white"
                      />
                      <textarea
                        rows={2}
                        value={bioForm.misi2Desc || ''}
                        onChange={(e) => setBioForm({ ...bioForm, misi2Desc: e.target.value })}
                        placeholder="Visi Utama Misi"
                        className="w-full text-xs text-slate-850 p-2 rounded-lg border border-slate-250 bg-white"
                      />
                      <input
                        type="text"
                        value={bioForm.misi2Execution || ''}
                        onChange={(e) => setBioForm({ ...bioForm, misi2Execution: e.target.value })}
                        placeholder="Rencana Aksi Konkret"
                        className="w-full text-xs text-slate-800 p-2 rounded-lg border border-slate-250 bg-white"
                      />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Misi 3: Life-long Learner</span>
                      <input
                        type="text"
                        value={bioForm.misi3Title || ''}
                        onChange={(e) => setBioForm({ ...bioForm, misi3Title: e.target.value })}
                        placeholder="Judul Misi 3"
                        className="w-full text-xs font-bold text-slate-800 p-2 rounded-lg border border-slate-250 bg-white"
                      />
                      <textarea
                        rows={2}
                        value={bioForm.misi3Desc || ''}
                        onChange={(e) => setBioForm({ ...bioForm, misi3Desc: e.target.value })}
                        placeholder="Visi Utama Misi"
                        className="w-full text-xs text-slate-855 p-2 rounded-lg border border-slate-250 bg-white"
                      />
                      <input
                        type="text"
                        value={bioForm.misi3Execution || ''}
                        onChange={(e) => setBioForm({ ...bioForm, misi3Execution: e.target.value })}
                        placeholder="Rencana Aksi Konkret"
                        className="w-full text-xs text-slate-800 p-2 rounded-lg border border-slate-250 bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-4">
                  <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest font-display">B. Target Empat Standar Kompetensi</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Target Pedagogik</label>
                      <textarea
                        rows={3}
                        value={bioForm.pedagogikTarget || ''}
                        onChange={(e) => setBioForm({ ...bioForm, pedagogikTarget: e.target.value })}
                        className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Target Kepribadian</label>
                      <textarea
                        rows={3}
                        value={bioForm.kepribadianTarget || ''}
                        onChange={(e) => setBioForm({ ...bioForm, kepribadianTarget: e.target.value })}
                        className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Target Sosial</label>
                      <textarea
                        rows={3}
                        value={bioForm.sosialTarget || ''}
                        onChange={(e) => setBioForm({ ...bioForm, sosialTarget: e.target.value })}
                        className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Target Profesional</label>
                      <textarea
                        rows={3}
                        value={bioForm.profesionalTarget || ''}
                        onChange={(e) => setBioForm({ ...bioForm, profesionalTarget: e.target.value })}
                        className="w-full text-xs text-slate-800 p-2.5 rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-4 bg-amber-50/20 p-4 rounded-2xl border border-dashed border-slate-250">
                  <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest font-display">C. Ruang Refleksi UAS & Filosofi Mengajar</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">
                        1. Refleksi Akhir PPL Terbimbing (Orientasi, Asistensi, Praktik Terbimbing)
                      </label>
                      <textarea
                        rows={7}
                        value={bioForm.uasReflection || ''}
                        onChange={(e) => setBioForm({ ...bioForm, uasReflection: e.target.value })}
                        className="w-full text-xs text-slate-800 p-3 bg-white rounded-xl border border-slate-200 leading-relaxed text-justify"
                        placeholder="Tuliskan refleksi mendalam proses belajar dari tahapan orientasi, asistensi mengajar, hingga rangkaian siklus..."
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider block mb-1">
                        2. Filosofi Mengajar (Inspirasi Ki Hadjar Dewantara, Esensi Guru Profesional)
                      </label>
                      <textarea
                        rows={7}
                        value={bioForm.uasPhilosophy || ''}
                        onChange={(e) => setBioForm({ ...bioForm, uasPhilosophy: e.target.value })}
                        className="w-full text-xs text-slate-800 p-3 bg-white rounded-xl border border-slate-200 leading-relaxed text-justify"
                        placeholder="Tuliskan filosofi mengajar berbasis pemikiran Ki Hadjar Dewantara (KHD) dan nilai yang diyakini dalam menuntun kodrat..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-150">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Perbarui Info Profil Utama</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
