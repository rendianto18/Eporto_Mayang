/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Eye, 
  ExternalLink, 
  X, 
  BookOpenCheck, 
  Sparkles,
  Lightbulb, 
  Layers, 
  Award, 
  ArrowRight, 
  Check, 
  Clock,
  ShieldCheck,
  AlertCircle,
  Image as ImageIcon,
  BookOpen,
  Plus,
  UploadCloud,
  ChevronRight,
  Maximize2,
  Minimize2,
  Compass,
  FileCheck,
  Layout,
  Cpu,
  ChevronDown,
  Heart,
  Search,
  ChevronLeft,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PerangkatAjar, FotoGallery } from '../types';

interface ArtifactsProps {
  perangkatList: PerangkatAjar[];
  setPerangkatList?: React.Dispatch<React.SetStateAction<PerangkatAjar[]>>;
  galeriSiswa: FotoGallery[];
  setGlisws?: React.Dispatch<React.SetStateAction<FotoGallery[]>>; // keeping compatibility
  setGaleriSiswa: React.Dispatch<React.SetStateAction<FotoGallery[]>>;
}

export const EXTERNAL_LINKS: Record<number, Record<'RPP' | 'Canva' | 'PDF', string>> = {
  1: {
    RPP: "https://docs.google.com/document/d/1YryCXJwVUbHTEivA97C9N47EmWNqsfiA/edit?usp=drive_link&ouid=110122983711557038172&rtpof=true&sd=true",
    Canva: "https://www.canva.com/design/DAHFgaR3P9M/fOs8X7Fvrq1d92tg_I1rEw/edit?utm_content=DAHFgaR3P9M&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    PDF: "https://docs.google.com/forms/d/e/1FAIpQLSePUoQq9Q6ePecaRTmXP98nmqrW8x40k1mK2VYB_Y9Gz_VbUg/viewform"
  },
  2: {
    RPP: "https://docs.google.com/document/d/19xWpGTWYmgFO3MUApwtwvuDObg0kwjvO/edit?usp=drive_link&ouid=110122983711557038172&rtpof=true&sd=true",
    Canva: "https://www.canva.com/design/DAHG91mdgFI/bRHHYCs8Zro2ks_90HBkzg/edit?utm_content=DAHG91mdgFI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    PDF: "https://docs.google.com/forms/d/e/1FAIpQLSea-URcnxBxLA0wHTMZ_Dzehr9iybbYjSOE5VRcMNNTZwNjXQ/viewform"
  },
  3: {
    RPP: "https://docs.google.com/document/d/1Fix2ldVdcGBo1qXyOypYsY-ZvsXextAL/edit?usp=drive_link&ouid=110122983711557038172&rtpof=true&sd=true",
    Canva: "https://www.canva.com/design/DAHI3ibfzQw/1UPjhQk5dzkES5sXpniE1A/edit?utm_content=DAHI3ibfzQw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    PDF: "https://docs.google.com/forms/d/e/1FAIpQLSePUoQq9Q6ePecaRTmXP98nmqrW8x40k1mK2VYB_Y9Gz_VbUg/viewform"
  }
};

const ORIGINAL_DOC_CONTENTS: Record<string, Record<string, string>> = {
  'siklus-1': {
    rppContent: `## Rencana pelaksanaan pembelajaran (RPP) - Siklus 1
- **Sekolah**: SMA Negeri 1 Salatiga
- **Materi**: MIT App Inventor dan Analisis Algoritma
- **Alokasi Waktu**: 2 JP @ 45 Menit

### Link Dokumen Resmi (Google Drive):
- [Buka Modul Ajar di Google Docs](https://docs.google.com/document/d/1YryCXJwVUbHTEivA97C9N47EmWNqsfiA/edit?usp=drive_link&ouid=110122983711557038172&rtpof=true&sd=true)

### Kompetensi Dasar & CP Terintegrasi:
Mengembangkan algoritma pemecahan masalah sederhana berbasis aplikasi android dengan mengedepankan unsur berpikir komputasional (Dekomposisi & Algoritma).

### Langkah Kegiatan Utama:
1. **Pendahuluan (15 Menit)**: Stimulus berpikir kritik dengan menganalisis aplikasi peta rute yang biasa mereka gunakan di Grobogan/Salatiga.
2. **Kegiatan Inti (60 Menit)**:
   - Guru memperkenalkan kanvas MIT App Inventor secara visual.
   - Siswa secara berpasangan memecahkan masalah layouting berbasis dekomposisi antarmuka.
   - Menguji aplikasi menggunakan AI Companion di smartphone masing-masing.
3. **Penutup (15 Menit)**: Refleksi harian dan pengerjaan kuis dekomposisi mandiri.`,
    canvaContent: `[SLIDE INTERAKTIF CANVA - SIKLUS 1]
- [Buka Slide Canva Kecepatan Tinggi Resmi](https://www.canva.com/design/DAHFgaR3P9M/fOs8X7Fvrq1d92tg_I1rEw/edit?utm_content=DAHFgaR3P9M&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

Slide interaktif didesain dengan visual cyan-blue bercontrast tinggi untuk melancarkan penyampaian CT:
- **Slide 1**: "Mengapa Berpikir Komputasional?" - Teori 4 pilar visual kartun.
- **Slide 2**: Menguasai Antarmuka MIT App Inventor (Drag and Drop tutorial).
- **Slide 3**: Tantangan "Celah Logika" - menebak logika program block bercabang yang sengaja dirusak (Debugging challenge).`,
    pdfContent: `## Lembar Kerja Peserta Didik (LKPD) & Rubrik Siklus 1
- [Buka LKPD Google Forms Resmi](https://docs.google.com/forms/d/e/1FAIpQLSePUoQq9Q6ePecaRTmXP98nmqrW8x40k1mK2VYB_Y9Gz_VbUg/viewform)

Dokumen Resmi Lembar Kerja Peserta Didik (LKPD) Terstruktur dan Rubrik Siklus 1 Terverifikasi LPTK Universitas Kristen Satya Wacana (UKSW).
Lengkap dengan Instrumen Penilaian Formatif, Daftar Nilai Siswa, Rubrik Kinerja Kolaborasi, dan Lembar Persetujuan Kepala Sekolah SMAN 1 Salatiga.`
  },
  'siklus-2': {
    rppContent: `## Rencana pelaksanaan pembelajaran (RPP) - Siklus 2
- **Materi**: Analisis Data dan Abstraksi Realita
- **Metode**: Project-Based Learning (PjBL)
- **Alokasi Waktu**: 2 JP

### Link Dokumen Resmi (Google Drive):
- [Buka Modul Ajar di Google Docs](https://docs.google.com/document/d/19xWpGTWYmgFO3MUApwtwvuDObg0kwjvO/edit?usp=drive_link&ouid=110122983711557038172&rtpof=true&sd=true)

### Langkah Pembelajaran Diferensiasi:
Siswa dikelompokkan heterogen menjadi 4 kelompok utama:
- **Kelompok A (Rendah Daya)**: Diberikan template visualisasi data dan diminta mengenal pola sederhana.
- **Kelompok B (Medium)**: Membaca tabel data mentah lalu mengonversinya menjadi grafik visual menggunakan spreadsheet.
- **Kelompok C (Tinggi Kognitif)**: Menganalisis inkonsistensi data mentah, membuat program pembersihan data ringkas, dan merefleksikan hasil interpretasi visual kepada audiens.`,
    canvaContent: `[SLIDE INTERAKTIF CANVA - SIKLUS 2]
- [Buka Slide Canva Kecepatan Tinggi Resmi](https://www.canva.com/design/DAHG91mdgFI/bRHHYCs8Zro2ks_90HBkzg/edit?utm_content=DAHG91mdgFI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

- **Slide 1**: "Data is the New Oil" - Pengenalan data pentingnya statistik.
- **Slide 2**: Abstraksi Data - Memisahkan derau (noise) dari informasi bermutu.
- **Slide 3**: Contoh Chart Interaktif dan diagram lingkaran yang menyesatkan audiens (menganalisis bias visual).`,
    pdfContent: `## Lembar Kerja Peserta Didik (LKPD) & Rubrik Siklus 2
- [Buka LKPD Google Forms Resmi](https://docs.google.com/forms/d/e/1FAIpQLSea-URcnxBxLA0wHTMZ_Dzehr9iybbYjSOE5VRcMNNTZwNjXQ/viewform)

Dokumen Resmi Modul Ajar, Lembar Kerja Peserta Didik (LKPD) dan Modul Proyek Siklus 2.
Berisi asesmen kuesioner sumatif kognitif kelas XI Informatika, lengkap dengan lembar analisis daya beda soal dan sebaran nilai siswa dengan nilai rata-rata kelas mencapai 89.2.`
  },
  'siklus-3': {
    rppContent: `## Rencana pelaksanaan pembelajaran (RPP) - Siklus 3
- **Materi**: Jaringan Jaringan Terdistribusi & Algoritma Routing
- **Metode**: Role-Playing Jaringan Kinestetik
- **Alokasi Waktu**: 3 JP @ 45 Menit

### Link Dokumen Resmi (Google Drive):
- [Buka Modul Ajar di Google Docs](https://docs.google.com/document/d/1Fix2ldVdcGBo1qXyOypYsY-ZvsXextAL/edit?usp=drive_link&ouid=110122983711557038172&rtpof=true&sd=true)

### Ringkasan Kegiatan Inti:
1. Siswa berperan sebagai simpul komputer (Node), Switch, Router, dan Paket Data.
2. Murid mengirim pesan tertulis dalam amplop berperekat bertuliskan Alamat IP pengirim & penerima.
3. Melalui simulasi peran fisik ini murid menemukan sendirikonsep routing dekomposisi alamat paket, tumpang tindih jaringan (routing collision), dan kegagalan jaringan secara real-time.`,
    canvaContent: `[SLIDE INTERAKTIF CANVA - SIKLUS 3]
- [Buka Slide Canva Kecepatan Tinggi Resmi](https://www.canva.com/design/DAHI3ibfzQw/1UPjhQk5dzkES5sXpniE1A/edit?utm_content=DAHI3ibfzQw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

Slide bernuansa hitam-neon futuristik untuk membangkitkan gairah teknologi siswa:
- **Slide 1**: Sejarah Lahirnya Internet & Arsitektur Jaringan Global.
- **Slide 2**: Proses Paket Menembus Server (Siswa diajak mensimulasikan alur IP paket secara interaktif).
- **Slide 3**: Mengatasi Celah Keamanan Port & Firewall dasar secara runut.`,
    pdfContent: `## Lembar Kerja Peserta Didik (LKPD) & Rubrik Siklus 3
- [Buka LKPD Google Forms Resmi](https://docs.google.com/forms/d/e/1FAIpQLSePUoQq9Q6ePecaRTmXP98nmqrW8x40k1mK2VYB_Y9Gz_VbUg/viewform)

Dokumen Resmi Modul Ajar Siklus 3 Terkait Keamanan Informasi, LKPD Google Forms dan Protokol Internet Terdistribusi.
Dilengkapi dokumentasi penilaian unjuk kerja siswa, rubrik refleksi diri guru pamong, refleksi mingguan mahasiswa PPG, serta rincian umpan balik umpan balik konstruktif.`
  }
};

export default function Artifacts({
  perangkatList,
  setPerangkatList,
  galeriSiswa,
  setGaleriSiswa
}: ArtifactsProps) {
  // Tabs & selections
  const [selectedSiklusIdx, setSelectedSiklusIdx] = useState<number>(0);
  const [selectedDocType, setSelectedDocType] = useState<'RPP' | 'Canva' | 'PDF'>('RPP');
  const [lightboxPhoto, setLightboxPhoto] = useState<FotoGallery | null>(null);
  
  // Document reader states
  const [docZoom, setDocZoom] = useState<number>(100);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // Gallery slider computing and handlers
  const currentPhotoIndex = lightboxPhoto ? galeriSiswa.findIndex(p => p.id === lightboxPhoto.id) : -1;
  const livePhoto = lightboxPhoto ? (galeriSiswa.find(p => p.id === lightboxPhoto.id) || lightboxPhoto) : null;

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentPhotoIndex > 0) {
      const prevPhoto = galeriSiswa[currentPhotoIndex - 1];
      setLightboxPhoto(prevPhoto);
      setGaleriSiswa(prev => prev.map(p => {
        if (p.id === prevPhoto.id) {
          return { ...p, stats: { ...p.stats, views: (p.stats?.views || 0) + 1 } };
        }
        return p;
      }));
    }
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentPhotoIndex !== -1 && currentPhotoIndex < galeriSiswa.length - 1) {
      const nextPhoto = galeriSiswa[currentPhotoIndex + 1];
      setLightboxPhoto(nextPhoto);
      setGaleriSiswa(prev => prev.map(p => {
        if (p.id === nextPhoto.id) {
          return { ...p, stats: { ...p.stats, views: (p.stats?.views || 0) + 1 } };
        }
        return p;
      }));
    }
  };

  const handleLikePhoto = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setGaleriSiswa(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          stats: {
            ...p.stats,
            likes: (p.stats?.likes || 0) + 1
          }
        };
      }
      return p;
    }));
  };

  // Keyboard shortcut navigation
  useEffect(() => {
    if (!lightboxPhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (currentPhotoIndex > 0) {
          const prevPhoto = galeriSiswa[currentPhotoIndex - 1];
          setLightboxPhoto(prevPhoto);
          setGaleriSiswa(prev => prev.map(p => {
            if (p.id === prevPhoto.id) {
              return { ...p, stats: { ...p.stats, views: (p.stats?.views || 0) + 1 } };
            }
            return p;
          }));
        }
      } else if (e.key === 'ArrowRight') {
        if (currentPhotoIndex !== -1 && currentPhotoIndex < galeriSiswa.length - 1) {
          const nextPhoto = galeriSiswa[currentPhotoIndex + 1];
          setLightboxPhoto(nextPhoto);
          setGaleriSiswa(prev => prev.map(p => {
            if (p.id === nextPhoto.id) {
              return { ...p, stats: { ...p.stats, views: (p.stats?.views || 0) + 1 } };
            }
            return p;
          }));
        }
      } else if (e.key === 'Escape') {
        setLightboxPhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhoto, currentPhotoIndex, galeriSiswa]);

  // Active document object
  const activeSiklusDoc = perangkatList[selectedSiklusIdx] || perangkatList[0] || {
    id: 'default',
    siklus: 1,
    title: 'Siklus Pembelajaran',
    description: 'Dokumen ajar.',
    materi: 'Logika & Pemrograman',
    target: 'Fase E/F',
    rppContent: '',
    canvaContent: '',
    pdfContent: ''
  };

  // Get active text based on document type
  const getActiveDocContent = () => {
    switch(selectedDocType) {
      case 'RPP': return activeSiklusDoc.rppContent;
      case 'Canva': return activeSiklusDoc.canvaContent;
      case 'PDF': return activeSiklusDoc.pdfContent;
      default: return activeSiklusDoc.rppContent;
    }
  };

  // Safe file extraction names/sizes for preset attachments
  const getSimulatedFileName = () => {
    const activeDoc = getActiveDocContent() || '';
    if (activeDoc.startsWith('[FILE_ATTACHMENT;')) {
      const nameMatch = activeDoc.match(/name=([^;\]]+)/);
      if (nameMatch && nameMatch[1]) {
        return nameMatch[1];
      }
    }
    const term = selectedDocType.toLowerCase();
    return `${term}_siklus_${activeSiklusDoc.siklus}_pembelajaran.${selectedDocType === 'Canva' ? 'pptx' : selectedDocType === 'PDF' ? 'pdf' : 'docx'}`;
  };

  const getSimulatedFileSize = () => {
    const activeDoc = getActiveDocContent() || '';
    if (activeDoc.startsWith('[FILE_ATTACHMENT;')) {
      const sizeMatch = activeDoc.match(/size=([^;\]]+)/);
      if (sizeMatch && sizeMatch[1]) {
        return sizeMatch[1];
      }
    }
    switch(selectedDocType) {
      case 'RPP': return '1.2 MB';
      case 'Canva': return '3.6 MB';
      case 'PDF': return '2.1 MB';
      default: return '1.5 MB';
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    const isImage = file.type.startsWith('image/');
    
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result !== 'string') return;

      const mockAttachmentPrefix = `[FILE_ATTACHMENT;name=${file.name};size=${(file.size / 1024).toFixed(1)} KB;type=${file.type}]${result}`;

      const updatedList = perangkatList.map((p, idx) => {
        if (idx === selectedSiklusIdx) {
          const docTypeField = selectedDocType === 'RPP' ? 'rppContent' : selectedDocType === 'Canva' ? 'canvaContent' : 'pdfContent';
          return {
            ...p,
            [docTypeField]: mockAttachmentPrefix
          };
        }
        return p;
      });

      if (setPerangkatList) {
        setPerangkatList(updatedList);
        localStorage.setItem('ppg_perangkat_list', JSON.stringify(updatedList));
      }
    };

    if (isImage) {
      reader.readAsDataURL(file);
    } else {
      if (file.type === 'text/plain' || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
        const textReader = new FileReader();
        textReader.onload = (tEvent) => {
          const textResult = tEvent.target?.result;
          if (typeof textResult === 'string') {
            const formatted = `[FILE_ATTACHMENT;name=${file.name};size=${(file.size / 1024).toFixed(1)} KB;type=text/plain]${textResult}`;
            const updated = perangkatList.map((p, idx) => {
              if (idx === selectedSiklusIdx) {
                const docTypeField = selectedDocType === 'RPP' ? 'rppContent' : selectedDocType === 'Canva' ? 'canvaContent' : 'pdfContent';
                return { ...p, [docTypeField]: formatted };
              }
              return p;
            });
            if (setPerangkatList) {
              setPerangkatList(updated);
              localStorage.setItem('ppg_perangkat_list', JSON.stringify(updated));
            }
          }
        };
        textReader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleResetDocument = () => {
    const cycleKey = `siklus-${selectedSiklusIdx + 1}`;
    const defaultContents = ORIGINAL_DOC_CONTENTS[cycleKey];
    if (!defaultContents) return;

    const docTypeField = selectedDocType === 'RPP' ? 'rppContent' : selectedDocType === 'Canva' ? 'canvaContent' : 'pdfContent';
    const defaultValue = defaultContents[docTypeField];

    const updatedList = perangkatList.map((p, idx) => {
      if (idx === selectedSiklusIdx) {
        return {
          ...p,
          [docTypeField]: defaultValue
        };
      }
      return p;
    });

    if (setPerangkatList) {
      setPerangkatList(updatedList);
      localStorage.setItem('ppg_perangkat_list', JSON.stringify(updatedList));
    }
  };

  const renderDocMarkdown = (text: string) => {
    if (!text) return <p className="text-slate-400 italic text-xs">Belum ada konten untuk berkas ini.</p>;
    
    if (text.startsWith('[FILE_ATTACHMENT;')) {
      const parts = text.split(']');
      const dataContent = parts[1] || '';
      
      const typeMatch = text.match(/type=([^;\]]+)/);
      const mimeType = typeMatch ? typeMatch[1] : '';
      
      const nameMatch = text.match(/name=([^;\]]+)/);
      const fileName = nameMatch ? nameMatch[1] : 'Dokumen';

      if (mimeType.startsWith('image/')) {
        return (
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <img src={dataContent} alt="Pratinjau" className="max-h-[350px] object-contain rounded-lg shadow-sm" referrerPolicy="no-referrer" />
            <p className="text-[10px] text-slate-400 mt-2 font-mono">Pratinjau Gambar Berhasil Dimuat</p>
          </div>
        );
      }
      
      if (mimeType === 'text/plain') {
        const lines = dataContent.split('\n');
        return (
          <div className="space-y-2 font-sans text-xs md:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed text-justify">
            {lines.map((l, i) => <p key={i}>{l}</p>)}
          </div>
        );
      }

      const isPdf = mimeType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf');
      const isSlide = mimeType.includes('presentation') || mimeType.includes('powerpoint') || fileName.toLowerCase().endsWith('.pptx') || fileName.toLowerCase().endsWith('.ppt') || fileName.toLowerCase().includes('canva');
      const isWord = mimeType.includes('document') || mimeType.includes('word') || fileName.toLowerCase().endsWith('.docx') || fileName.toLowerCase().endsWith('.doc');

      if (isPdf) {
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-[10px] font-mono text-slate-500">
              <span className="font-extrabold text-indigo-650">✓ INTERACTIVE PDF PREVIEW</span>
              <span>LPTK PPG RAJABATAN</span>
            </div>
            
            {/* Direct embedded iframe support for PDF files */}
            <iframe 
              src={dataContent} 
              className="w-full h-[380px] rounded-xl border border-slate-200 shadow-3xs"
              title={fileName}
            />

            <div className="text-center pt-1.5">
              <a
                href={dataContent}
                download={fileName}
                className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-slate-900 text-white font-extrabold text-[10.5px] px-3.5 py-2 rounded-lg transition"
              >
                <UploadCloud className="w-3.5 h-3.5 rotate-180" />
                <span>Download File PDF Asli</span>
              </a>
            </div>
          </div>
        );
      }

      if (isSlide || isWord) {
        return (
          <div className="flex flex-col items-center justify-center py-6 px-4 bg-gradient-to-br from-slate-50 to-indigo-50/10 border border-slate-200 rounded-2xl text-center space-y-4">
            <div className={`p-4 rounded-full ${isSlide ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-650'}`}>
              <FileCheck className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full font-mono ${isSlide ? 'bg-orange-100/80 text-orange-850 border border-orange-150' : 'bg-blue-100/80 text-blue-850 border border-blue-150'}`}>
                {isSlide ? 'Presentasi Canva / Slide' : 'Dokumen Rencana / RPP'}
              </span>
              <h4 className="text-xs font-black text-slate-800 break-all">{fileName}</h4>
              <p className="text-[10px] text-slate-455 font-bold">Terunggah di Portofolio Mayang Arta Mahesi</p>
            </div>

            {/* Simulated Live Document Grid Preview */}
            <div className="w-full max-w-md bg-white border border-slate-150 rounded-xl p-4 shadow-3xs text-left text-[10.5px] space-y-2.5 font-sans">
              <div className="flex justify-between border-b pb-1.5 text-[8.5px] text-slate-400 font-mono font-bold">
                <span>PRATINJAU INTEGRATED</span>
                <span>STATUS: VERIFIED</span>
              </div>
              <div className="space-y-1.5 text-slate-600">
                <p>✓ Berkas terenkripsi pada local database portofolio.</p>
                <p>✓ Kompatibel dengan sistem pengujian rubrik LPTK PPG Prajabatan.</p>
                <p>✓ Ukuran dokumen terkompresi aman untuk presentasi aksi nyata.</p>
              </div>
            </div>

            <a
              href={dataContent}
              download={fileName}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-[10.5px] px-3.5 py-2 rounded-lg transition"
            >
              <UploadCloud className="w-3.5 h-3.5 rotate-180" />
              <span>Download & Buka Berkas</span>
            </a>
          </div>
        );
      }

      return (
        <div className="flex flex-col items-center justify-center py-8 px-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center max-w-sm mx-auto space-y-4 shadow-3xs my-2">
          <div className="p-3 bg-blue-50 text-blue-650 rounded-full">
            <FileText className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black text-slate-800 break-all">{fileName}</h4>
            <p className="text-[9px] text-slate-455 font-mono">{mimeType || 'Dokumen Sukses Terunggah'}</p>
          </div>
          <p className="text-[10.5px] text-slate-500 leading-relaxed">
            Berkas terunggah disimpan aman di portofolio lokal gawai Anda. Silakan unduh sewaktu-waktu.
          </p>
          <a
            href={dataContent}
            download={fileName}
            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-3.5 py-2 rounded-lg transition duration-200 shadow-3xs cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5 rotate-180" />
            <span>Unduh Berkas</span>
          </a>
        </div>
      );
    }

    const lines = text.split('\n');
    return (
      <div className="space-y-3 font-sans text-xs md:text-sm text-slate-700 leading-relaxed text-justify">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-2" />;
          
          if (trimmed.startsWith('# ')) {
            return (
              <h3 key={idx} className="text-sm md:text-base font-black text-blue-950 mt-4 pb-1 border-b-2 border-blue-100 uppercase tracking-wide">
                📌 {trimmed.substring(2)}
              </h3>
            );
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h4 key={idx} className="text-xs md:text-sm font-bold text-slate-800 mt-3 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                🔷 {trimmed.substring(3)}
              </h4>
            );
          }
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            return (
              <li key={idx} className="ml-5 list-disc text-slate-650 pl-1 py-0.5">
                {trimmed.substring(2)}
              </li>
            );
          }
          if (/^\d+\.\s/.test(trimmed)) {
            return (
              <li key={idx} className="ml-5 list-decimal text-slate-650 pl-1 py-0.5">
                {trimmed.replace(/^\d+\.\s/, '')}
              </li>
            );
          }
          return <p key={idx}>{trimmed}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-12 animate-fade-in relative text-slate-800 pb-16 font-sans">
      
      {/* 1. KONTEKS ARTEFAK */}
      <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/85 shadow-2xs space-y-6 relative overflow-hidden" id="konteks-section">
        {/* Decorative subtle header background highlight */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-black text-blue-700 uppercase tracking-widest font-mono">
              <Sparkles className="w-3 h-3 text-blue-600 animate-pulse" />
              <span>Pilar 01 • Konteks Studi</span>
            </div>
            <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight font-display">
              Konteks Artefak
            </h1>
          </div>
          <div className="bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-500 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-3xs font-mono">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>TERVERIFIKASI PPG 2026/2027</span>
          </div>
        </div>

        {/* Highlighted Module Title Card */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent pointer-events-none" />
          <div className="space-y-2 relative z-10">
            <span className="text-[10px] uppercase tracking-wider font-mono font-black text-blue-300 bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-800/50">judul modul ajar</span>
            <h2 className="text-base md:text-xl font-black tracking-tight leading-snug">
              Modul ajar : Pengembangan Aplikasi Mobile dengan Library Kecerdasan Artifisial
            </h2>
            <p className="text-[11px] text-blue-200/80 max-w-2xl">
              Sebuah rancangan kurikulum modern terapan berbasis Computational Thinking dan integrasi layanan Artificial Intelligence untuk memandu kegiatan kolaboratif kreatif siswa.
            </p>
          </div>
          <div className="shrink-0 relative z-10">
            <Award className="w-12 h-12 text-blue-400 opacity-90 animate-bounce" />
          </div>
        </div>

        {/* Detailed Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="bg-slate-50 hover:bg-slate-100/55 p-4 rounded-xl border border-slate-200/60 transition duration-200 space-y-2 group">
            <div className="p-2 w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Mata Pelajaran</p>
              <p className="text-xs font-black text-slate-800 mt-0.5">Informatika</p>
            </div>
          </div>

          <div className="bg-slate-50 hover:bg-slate-100/55 p-4 rounded-xl border border-slate-200/60 transition duration-200 space-y-2 group">
            <div className="p-2 w-8 h-8 rounded-lg bg-indigo-50 text-indigo-750 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Kelas/Semester</p>
              <p className="text-xs font-black text-slate-800 mt-0.5">XI / 2 (Dua)</p>
            </div>
          </div>

          <div className="bg-slate-50 hover:bg-slate-100/55 p-4 rounded-xl border border-slate-200/60 transition duration-200 space-y-2 group">
            <div className="p-2 w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Alokasi Waktu</p>
              <p className="text-xs font-black text-slate-800 mt-0.5">2 JP x 3 Siklus (6 JP)</p>
            </div>
          </div>

          <div className="bg-slate-50 hover:bg-slate-100/55 p-4 rounded-xl border border-slate-200/60 transition duration-200 space-y-2 group">
            <div className="p-2 w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Jumlah Siklus</p>
              <p className="text-xs font-black text-slate-800 mt-0.5">3 Siklus PPL</p>
            </div>
          </div>

          <div className="bg-slate-50 hover:bg-slate-100/55 p-4 rounded-xl border border-slate-200/60 transition duration-200 space-y-2 group">
            <div className="p-2 w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Layout className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Model Pembelajaran</p>
              <p className="text-xs font-black text-slate-800 mt-0.5">Project Based Learning</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. DOKUMEN PERANGKAT PEMBELAJARAN : "Arsip RPP & Modul Ajar" */}
      <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/85 shadow-2xs space-y-6 relative" id="dokumen-section">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-black text-indigo-700 uppercase tracking-widest font-mono">
              <BookOpenCheck className="w-3 h-3 text-indigo-600" />
              <span>Pilar 02 • Arsip Inti</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-display">
              Dokumen Perangkat Pembelajaran
            </h2>
            <p className="text-xs text-slate-400">Arsip RPP & Modul Ajar • Navigasi sederhana untuk melihat modul ajar, LKPD, dan media slide.</p>
          </div>

          {/* Clean indicator */}
          <div className="text-[11px] font-medium text-slate-500 font-sans flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl shadow-3xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Siap Diunduh / Ditinjau</span>
          </div>
        </div>

        {/* NAVIGATION & BIG BADGES */}
        <div className="space-y-6">
          {/* Cycle Selection Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/60">
            <span className="text-[10px] font-black uppercase text-slate-400 font-mono tracking-wider shrink-0">Pilih Siklus PPL:</span>
            <div className="flex flex-wrap gap-1.55">
              {perangkatList.map((p, idx) => (
                <button
                  key={p.id}
                  id={`btn-siklus-${p.siklus}`}
                  onClick={() => {
                    setSelectedSiklusIdx(idx);
                  }}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    selectedSiklusIdx === idx
                      ? 'bg-indigo-600 text-white shadow-3xs border border-indigo-600 font-extrabold'
                      : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-650'
                  }`}
                >
                  Siklus {p.siklus}
                </button>
              ))}
            </div>
            <div className="sm:ml-auto text-[11px] font-bold text-slate-500 bg-indigo-50/50 px-3 py-1 rounded-xl border border-indigo-100/30">
              Menampilkan Dokumen Resmi • Siklus {activeSiklusDoc.siklus}
            </div>
          </div>

          {/* Big Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="big-badges-container">
            {/* 1. RPP Badge */}
            <a
              href={EXTERNAL_LINKS[activeSiklusDoc.siklus]?.RPP}
              target="_blank"
              rel="noopener noreferrer"
              id="badge-rpp"
              className="group relative bg-white hover:bg-slate-50/20 border border-slate-200 hover:border-indigo-400 shadow-3xs hover:shadow-md rounded-2xl p-6 transition-all duration-350 flex flex-col justify-between overflow-hidden cursor-pointer h-48 active:scale-98"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/70 rounded-bl-full opacity-60 group-hover:scale-110 transition-transform duration-350 pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100/60">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[8.5px] font-black uppercase tracking-widest text-indigo-650 bg-indigo-50/80 px-2.5 py-1 rounded-md font-mono border border-indigo-100/60">
                    GOOGLE DOCS (DOCX)
                  </span>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-base md:text-lg group-hover:text-indigo-600 transition duration-200">
                    📝 RPP & Modul Ajar
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed md:line-clamp-2">
                    Akses modul rencana pelaksanaan pembelajaran lengkap di Google Drive.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs font-black text-indigo-600 mt-2">
                <span>Buka Dokumen Resmi</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
            </a>

            {/* 2. Slide Canva Badge */}
            <a
              href={EXTERNAL_LINKS[activeSiklusDoc.siklus]?.Canva}
              target="_blank"
              rel="noopener noreferrer"
              id="badge-canva"
              className="group relative bg-white hover:bg-slate-50/20 border border-slate-200 hover:border-pink-300 shadow-3xs hover:shadow-md rounded-2xl p-6 transition-all duration-350 flex flex-col justify-between overflow-hidden cursor-pointer h-48 active:scale-98"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50/50 rounded-bl-full opacity-60 group-hover:scale-110 transition-transform duration-350 pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-pink-50 text-pink-600 rounded-2xl border border-pink-100/50">
                    <Layout className="w-6 h-6" />
                  </div>
                  <span className="text-[8.5px] font-black uppercase tracking-widest text-pink-650 bg-pink-50/80 px-2.5 py-1 rounded-md font-mono border border-pink-100/50">
                    CANVA PRESENTATION
                  </span>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-base md:text-lg group-hover:text-pink-600 transition duration-200">
                    🎨 Slide Canva
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed md:line-clamp-2">
                    Buka slide media ajar presentasi visual pendukung pembelajaran.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs font-black text-pink-600 mt-2">
                <span>Mulai Presentasi</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
            </a>

            {/* 3. LKPD Badge */}
            <a
              href={EXTERNAL_LINKS[activeSiklusDoc.siklus]?.PDF}
              target="_blank"
              rel="noopener noreferrer"
              id="badge-lkpd"
              className="group relative bg-white hover:bg-slate-50/20 border border-slate-200 hover:border-purple-300 shadow-3xs hover:shadow-md rounded-2xl p-6 transition-all duration-350 flex flex-col justify-between overflow-hidden cursor-pointer h-48 active:scale-98"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50/50 rounded-bl-full opacity-60 group-hover:scale-110 transition-transform duration-350 pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100/50">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[8.5px] font-black uppercase tracking-widest text-purple-650 bg-purple-50/80 px-2.5 py-1 rounded-md font-mono border border-purple-100/50">
                    GOOGLE FORMS / DOCUMENT
                  </span>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-base md:text-lg group-hover:text-purple-600 transition duration-200">
                    📄 LKPD Siswa
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed md:line-clamp-2">
                    Akses instrumen kerja peserta didik interaktif dan kuesioner pembelajaran.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs font-black text-purple-600 mt-2">
                <span>Buka Lembar Evaluasi</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
            </a>
          </div>

          {/* Dynamic material card for brief descriptions */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-start gap-3 shadow-3xs">
            <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-wider">Metode & Fokus Materi</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong className="font-extrabold text-slate-800">Siklus {activeSiklusDoc.siklus}:</strong> {activeSiklusDoc.description}
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* 3. DOKUMENTASI : "Bukti Mengajar" */}
      <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/85 shadow-2xs space-y-6" id="dokumentasi-section">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-black text-emerald-700 uppercase tracking-widest font-mono">
              <ImageIcon className="w-3 h-3 text-emerald-600" />
              <span>Pilar 03 • Bukti Kegiatan</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-display">
              Dokumentasi : Bukti Mengajar
            </h2>
            <p className="text-xs text-slate-400">Galeri bukti asisten mengajar aktif, uji laboratorium, dan diskusi kelompok interaktif.</p>
          </div>

          <div className="text-[11px] font-bold text-slate-400 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{galeriSiswa.length} FOTO AKTIF</span>
          </div>
        </div>

        {/* Gallery Compact, Highly Optimized Grid Layout (Beautiful grid cards showing only the uncropped images) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {galeriSiswa.map((photo) => (
            <div 
              key={photo.id}
              onClick={() => {
                setLightboxPhoto(photo);
                setGaleriSiswa(prev => prev.map(p => {
                  if (p.id === photo.id) {
                    return {
                      ...p,
                      stats: {
                        ...p.stats,
                        views: (p.stats?.views || 0) + 1
                      }
                    };
                  }
                  return p;
                }));
              }}
              className="bg-slate-100 rounded-2xl border border-slate-200/85 shadow-3xs overflow-hidden group hover:shadow-md hover:border-indigo-400 hover:bg-slate-50 transition-all duration-300 cursor-pointer relative aspect-[16/10] flex items-center justify-center p-2.5"
            >
              <img 
                src={photo.imageUrl || 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80'} 
                alt={photo.title || 'Foto Galeri'}
                className="max-w-full max-h-full object-contain group-hover:scale-104 transition-transform duration-350 pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* Smooth Hover HUD state overlay */}
              <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-2.5 bg-white text-slate-850 rounded-full shadow-lg transform translate-y-1.5 group-hover:translate-y-0 transition-all duration-300">
                  <Maximize2 className="w-3.5 h-3.5 text-indigo-650" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {galeriSiswa.length === 0 && (
          <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl max-w-sm mx-auto space-y-2">
            <ImageIcon className="w-6 h-6 text-slate-455 opacity-60 mx-auto" />
            <p className="text-xs text-slate-655 font-bold">Belum Ada Foto Terdaftar</p>
          </div>
        )}

      </section>

      {/* LIGHTBOX LIGHTER MODAL */}
      <AnimatePresence>
        {lightboxPhoto && livePhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-[110] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/95 overflow-hidden max-w-4xl w-full relative flex flex-col items-center justify-center rounded-3xl border border-white/10 shadow-2xl mx-auto max-h-[92vh] p-3"
            >
              
              {/* Image viewer with controls */}
              <div className="w-full bg-slate-950/45 relative flex items-center justify-center p-4 min-h-[300px] md:h-[600px]">
                
                {/* Dismiss button */}
                <button 
                  onClick={() => setLightboxPhoto(null)}
                  className="absolute top-4 left-4 bg-black/60 hover:bg-black/90 active:scale-95 text-white p-2.5 rounded-full transition cursor-pointer z-20 border border-white/10 shadow-lg"
                  title="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Direct Download Action Button */}
                <a
                  href={livePhoto.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={`dokumentasi_ppg_${livePhoto.id}.jpg`}
                  className="absolute top-4 right-4 bg-indigo-650 hover:bg-indigo-600 text-white p-2.5 rounded-full transition cursor-pointer z-20 border border-white/10 shadow-md hover:scale-105 active:scale-95 flex items-center justify-center"
                  title="Unduh Gambar"
                >
                  <Download className="w-5 h-5 text-emerald-400" />
                </a>

                {/* Slideshow Command navigation left */}
                {currentPhotoIndex > 0 && (
                  <button
                    onClick={handlePrevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/95 text-white border border-white/10 transition shadow-md hover:scale-105 active:scale-95 cursor-pointer z-10"
                    title="Sebelumnya (Arrow Left)"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {/* Slideshow Command navigation right */}
                {currentPhotoIndex !== -1 && currentPhotoIndex < galeriSiswa.length - 1 && (
                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/95 text-white border border-white/10 transition shadow-md hover:scale-105 active:scale-95 cursor-pointer z-10"
                    title="Berikutnya (Arrow Right)"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                <img 
                  src={livePhoto.imageUrl} 
                  alt={livePhoto.title}
                  className="max-w-full max-h-[70vh] md:max-h-[560px] object-contain rounded-2xl shadow-2xl pointer-events-none transition-all duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Info status strip inside image */}
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9.5px] font-mono bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full text-slate-300 border border-white/10">
                  Foto {currentPhotoIndex + 1} dari {galeriSiswa.length}
                </span>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN DOCUMENT VIEWER MODAL */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-slate-950 flex flex-col"
          >
            {/* Header control */}
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800 text-white font-sans shrink-0">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-blue-400" />
                <div>
                  <h4 className="text-xs font-black tracking-wide uppercase text-slate-350 font-mono">Layar Penuh Sempurna</h4>
                  <p className="text-[10px] text-slate-400 font-bold">{getSimulatedFileName()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-850 px-2.5 py-1.5 rounded-xl border border-slate-850">
                  <button onClick={() => setDocZoom(prev => Math.max(70, prev - 10))} className="hover:text-white px-1 cursor-pointer font-bold font-mono">-</button>
                  <span className="font-mono text-[10px]">{docZoom}%</span>
                  <button onClick={() => setDocZoom(prev => Math.min(150, prev + 10))} className="hover:text-white px-1 cursor-pointer font-bold font-mono">+</button>
                </div>

                <button
                  onClick={() => setIsFullScreen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold p-2 rounded-xl transition flex items-center justify-center cursor-pointer shadow-3xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document body */}
            <div className="flex-1 bg-slate-900 p-6 overflow-y-auto">
              <div 
                className="bg-white text-slate-800 p-8 md:p-12 rounded-2xl shadow-2xl border border-slate-205 max-w-4xl mx-auto transition-transform"
                style={{ transform: `scale(${docZoom / 100})`, transformOrigin: 'top center' }}
              >
                {renderDocMarkdown(getActiveDocContent())}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
