/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Home from './components/Home';
import Profil from './components/Profil';
import CenterPanel from './components/CenterPanel';
import Artifacts from './components/Artifacts';
import Analisis from './components/Analisis';
import ModelGuru from './components/ModelGuru';
import ReflectionAndFooter from './components/ReflectionAndFooter';
import Admin from './components/Admin';
import { PerangkatAjar, FotoGallery, Milestone, LampiranDataMap } from './types';
import { perjalananBelajar } from './data';
import { INITIAL_LAMPIRAN7_DATA, INITIAL_LAMPIRAN8_DATA } from './defaultPenilaian';

import { 
  Home as HomeIcon,
  User,
  Map,
  Layers,
  FileText,
  Printer,
  Sparkles,
  BookOpen,
  QrCode,
  Award,
  BookOpenCheck,
  SlidersHorizontal
} from 'lucide-react';

const DEFAULT_PERANGKAT_LIST: PerangkatAjar[] = [
  {
    id: 'siklus-1',
    siklus: 1,
    title: 'Modul Ajar Siklus 1: Pengenalan MIT App Inventor & Algoritma',
    description: 'Perangkat ajar komprehensif mengintegrasikan Computational Thinking (Dekomposisi & Alur Logika) untuk mengenali block-programming pada gawai cerdas.',
    materi: 'Algoritma Pemrograman, User Interface Design, & Struktur Keputusan',
    target: 'Siswa Kelas XI SMAN 1 Salatiga • Pembelajaran Terbimbing',
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
    lkpdContent: `## Lembar Kerja Peserta Didik (LKPD) - Angkatan 2026
**Materi Terpilih**: Antarmuka Android Pertama Saya & Pemecahan Pola Masalah

### Studi Kasus Lapangan:
Rancang rute jalan dari SMA Negeri 1 Salatiga menuju Alun-Alun Pancasila menggunakan minimal 3 komponen Buttons, 1 Gambar Canvas, dan 1 Trigger Bunyi.

### Langkah Eksplorasi:
1. Lakukan **Dekomposisi** kebutuhan aplikasi (Bagian visual, suara, dan data).
2. Tuliskan **Urutan Algoritma** kejadian ketika tombol ditekan.
3. Sambungkan block logika di lembar kerja MIT App Inventor.
4. Uji dan screenshot hasil visualisasi program Anda pada lembar pengerjaan di bawah.`,
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
  {
    id: 'siklus-2',
    siklus: 2,
    title: 'Modul Ajar Siklus 2: Pengolahan & Visualisasi Data Berpikir Kritis',
    description: 'Pembelajaran interaktif menyajikan pemodelan data statis dan pengenalan pola (pattern recognition) dalam kehidupan sehari-hari siswa.',
    materi: 'Analisis Data, Bagan Chart Dinamis, Abstraksi Variabel',
    target: 'Siswa Kelas XI SMAN 1 Salatiga • Pembelajaran Diferensiasi Proyek',
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
    lkpdContent: `## Lembar Kerja Peserta Didik (LKPD) - Siklus 2
**Kasus Eksklusif**: Polling Sampah Lingkungan SMAN 1 Salatiga

### Lembar Kegiatan:
1. Isi baris data kuisioner volume timbunan sampah plastik di kantin sekolah.
2. Terapkan teknik **Abstraksi** - saring data sampah yang tidak relevan dengan tujuan penelitian.
3. Gambar bagan representasi visual histogram data menggunakan instrumen Google Sheets atau gambar manual di LKPD.
4. Simpulkan solusi efisiensi konsumsi plastik di masa mendatang berbasis angka riil.`,
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
  {
    id: 'siklus-3',
    siklus: 3,
    title: 'Modul Ajar Siklus 3: Jaringan Komputer & Internet Kreatif',
    description: 'Eksplorasi modul ajar tingkat lanjut merakit model protokol jaringan secara kinestetik guna menguatkan memori kognitif siswa.',
    materi: 'Topologi Jaringan, Alamat IP, Paket Data, Troubleshooting Alur internet',
    target: 'Siswa Kelas XI SMAN 1 Salatiga • Praktik Kinestetik Berkelompok',
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
    lkpdContent: `## Lembar Kerja Peserta Didik (LKPD) - Siklus 3
**Peta Lab**: Rancang Bangun Topologi Bintang (Star Topology) Lab Informatika

### Instruksi Penuntun:
1. Tentukan minimal 5 client, 1 Hub central, dan 1 Server Utama.
2. Hitung alokasi Subnetting IP Masking kelas C paling efisien.
3. Uji alur data jika salah satu kabel Client 3 putus. Mengapa Client lainnya masih berjalan dengan baik? Tulis analisis logika CT Anda.`,
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
];

const DEFAULT_GALERI_SISWA: FotoGallery[] = [
  {
    id: 'bk-1',
    title: 'Pembelajaran Aktif di Kelas XI',
    category: 'Pembelajaran Kelas',
    description: 'Mayang membimbing langsung dekomposisi logika sebelum siswa menuangkannya pada pengodean MIT App Inventor. Pembiasaan berpikir runtut diawali dari papan tulis.',
    date: '18 Maret 2026',
    feedback: 'Umpan Balik Guru Pamong: "Penyampaian asertif, murid terdorong aktif menjawab pertanyaan pemantik dengan antusias."',
    stats: { likes: 42, views: 245 },
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lab-1',
    title: 'Uji Logika Aplikasi di Laboratorium',
    category: 'Praktik Laboratorium',
    description: 'Siswa antusias meluncurkan emulator dan memasang gawai masing-masing di Lab Komputer SMAN 1 Salatiga untuk melihat hasil pengodean blok mereka.',
    date: '25 Maret 2026',
    feedback: 'Saran DPT UKSW: "Bagus sekali penggunaan tutor sebaya karena menjaga siswa yang kurang cepat dapat mengejar ritme belajar kelas."',
    stats: { likes: 58, views: 312 },
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pres-1',
    title: 'Deseminasi Modul Pembelajaran CT & STEM',
    category: 'Presentasi Materi',
    description: 'Presentasi hasil pengembangan perangkat pembelajaran kolaborasi di hadapan dewan Guru SMAN 1 Salatiga, saling bertukar gagasan mengintegrasikan berpikir kritis.',
    date: '5 April 2026',
    feedback: 'Ulasan Guru Sejawat: "Ide topologi fisik merupakan adaptasi pembelajaran terbaik untuk sekolah yang minim sarana simulasi simulator digital."',
    stats: { likes: 31, views: 189 },
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'disk-1',
    title: 'Diskusi Kelompok Asosiasi Pola',
    category: 'Diskusi Kelompok',
    description: 'Kelompok siswa saling bertukar pikiran memecahkan algoritma sorting kompleks dalam LKPD menggunakan tumpukan kartu fisik guna menyaring data secara manual.',
    date: '12 April 2026',
    feedback: 'Catatan Refleksi Diri: "Murid bekerja sama sangat kompak. Pembagian peran heterogen terbukti menurunkan status stres siswa lemah algoritma."',
    stats: { likes: 49, views: 277 },
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'eval-1',
    title: 'Evaluasi Pembelajaran Akhir Siklus',
    category: 'Evaluasi & Refleksi',
    description: 'Siswa mengisi kuis pemahaman materi Berpikir Komputasional dan Jaringan Komputer secara tertib menggunakan platform digital interaktif.',
    date: '19 April 2026',
    feedback: 'Evaluasi Kepala Sekolah: "Pemanfaatan asesmen berbasis gawai meningkatkan akurasi data nilai siswa secara cepat dan transparan."',
    stats: { likes: 37, views: 215 },
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bimbing-1',
    title: 'Bimbingan Individu Proyek Siswa',
    category: 'Bimbingan Siswa',
    description: 'Sesi mentoring personal dengan siswa untuk membimbing struktur logika program mereka yang mengalami kendala teknis (debugging bimbingan).',
    date: '26 April 2026',
    feedback: 'Catatan Refleksi Diri: "Mentoring personal sangat efektif mengatasi kecemasan siswa dalam memahami error coding."',
    stats: { likes: 45, views: 233 },
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
  }
];

const DEFAULT_STUDENT_INFO = {
  fullName: 'Mayang Arta Mahesi, S.Kom.',
  nim: '95202541N',
  lptk: 'Universitas Kristen Satya Wacana (UKSW)',
  school: 'SMA Negeri 1 Salatiga',
  email: 'mayangarta09@gmail.com',
  programStudi: 'Informatika',
  
  // Model Guru yang dituju (Visi Misi)
  misi1Title: "Misi 1: Pionir Literasi Computational Thinking Nasional",
  misi1Desc: "Menjadi pelopor implementasi cara berpikir komputasi (dekomposisi, pola, abstraksi, algoritma) di lingkungan sekolah untuk rumpun pelajaran STEM guna mengakselerasi keterampilan problem solving abad ke-21.",
  misi1Execution: "Melakukan lokakarya mandiri (micro-teaching sharing) dengan teman sejawat, menyusun bahan ajar unplugged inovatif, dan menulis berkas best practices di komunitas MGMP.",
  
  misi2Title: "Misi 2: Pendidik Inklusif Berakar Pancasila",
  misi2Desc: "Merancang ruang belajar yang mengedepankan diferensiasi (differentiated learning) yang aman, nyaman, berpihak penuh pada kodrat murid, serta menuntut terbentuknya karakter Profil Pelajar Pancasila.",
  misi2Execution: "Melakukan asesmen diagnostik non-kognitif, merancang tantangan bertingkat untuk mengakomodasi anak lambat kognitif, serta mengintegrasikan muatan reflektif di penutupan.",
  
  misi3Title: "Misi 3: Pembelajar Sepanjang Hayat yang Reflektif (Life-long Learner)",
  misi3Desc: "Membudayakan evaluasi diri harian pasca-aksi (reflective teaching) dan adaptif mendalam terhadap tren inovasi teknologi cerdas, bukan sekadar menggunakan alat bantu melainkan memperkuat pedagogik.",
  misi3Execution: "Aktif menulis refleksi dwi-mingguan, meminta umpan balik terbuka dari siswa pasca-kelas, memanfaatkan data asesmen untuk merevisi taktik mengajar berikutnya.",
  
  pedagogikTarget: "Mampu menyusun RPP interaktif dan adaptif untuk 100% siswa dengan kecepatan belajar variatif.",
  kepribadianTarget: "Memiliki integritas tinggi, disiplin waktu masuk mengajar, dan ramah namun kokoh menjaga batas etika pendidik.",
  sosialTarget: "Membentuk sinergi pembelajaran segitiga (pamong-kampus-siswa) demi melahirkan ruang tumbuh yang asri.",
  profesionalTarget: "Kombinasi antara kemahiran logika algoritma Scratch, coding Python dasar, dan kesadaran penuh terkait keamanan siber (security and privacy).",

  // Refleksi terhadap model guru yang dituju, filosofi mengajar, dan refleksi akhir (UAS)
  refleksiUAS: "Melalui serangkaian kegiatan PPL Terbimbing di SMA Negeri 1 Salatiga, saya telah merefleksikan model guru profesional yang ingin saya tuju. Kekuatan utama saya terletak pada pengintegrasian empat pilar Computational Thinking (CT) pada rancangan modul pembelajaran informatika, kemampuan menyusun asesmen diagnostik yang ramah kognitif & inklusif, serta antusiasme yang tinggi dalam memotivasi siswa koding pemula melalui platform visual interaktif.\n\nNamun, kelemahan mendasar yang saya jumpai mencakup manajemen waktu ketika berfokus mendampingi kelompok berspesifikasi penanganan lambat kognitif di laboratorium komputer, serta pembagian rentang perhatian pendidik agar tidak terpusat pada siswa yang dominan aktif semata.\n\nRencana tindak lanjut saya sebagai upaya pengembangan diri mandiri adalah memperkaya referensi kuis asinkron berbasis game edukasi yang mandiri, melatih efisiensi petunjuk praktikum koding secara ringkas, dan merutinkan simulasi kelas mengajar kolaboratif sebelum turun ke PPL Mandiri berikutnya.",
  
  refleksiPPL: "Selama tahapan Praktik Pengalaman Lapangan (PPL) Terbimbing dari fase orientasi, observasi, asistensi mengajar, hingga praktik pembongkaran terbimbing mandiri selama tiga siklus, saya memperoleh begitu banyak pencerahan teoretis dan fungsional.\n\nHal yang saya pelajari sebagai peserta PPG calon guru adalah bahwa merancang draf RPP di atas kertas jauh berbeda dengan membawakan atmosfer belajar di dalam kelas sesungguhnya. Saya belajar membaca bahasa tubuh murid yang mulai jenuh, menilai kefektifan alat peraga secara taktis, dan menyinkronkan ritme penjelasan dengan durasi bel sekolah.\n\nPengalaman paling menantang yang saya hadapi tercatat pada Siklus I saat melangsungkan transisi ruang laboratorium komputer, di mana kematangan manajemen stasiun pengerjaan murid membutuhkan porsi kepemimpinan kelas yang asertif. Solusi yang saya lakukan adalah menerapkan sistem baris bimbingan bertahap dan merekayasa aturan pasangan belajar (pair programming) yang menyebar tanggung jawab kerja kolaboratif secara adil.\n\nUmpan balik konstruktif utama yang saya peroleh dari Dosen Pembimbing (DPL) dan Guru Pamong adalah menajamkan strategi Scaffolding di Zone of Proximal Development secara tertulis dan eksplisit pada draf RPP, serta mencanangkan ruang tanya jawab yang tidak bias pada satu sub-kelompok murid saja. Saran ini menjadi fondasi berharga bagi saya untuk melangkah optimis ke PPL Mandiri.",
  
  filosofiMengajar: "Filosofi mengajar saya berakar kokoh pada keyakinan bahwa pendidikan sejati adalah proses 'menuntun' seluruh potensi kodrat alam dan kodrat zaman yang melekat pada diri anak murid, selaras dengan gagasan pemikiran Ki Hadjar Dewantara. Seorang guru bukanlah pencetak replika kaku atau penguasa mutlak kebenaran, melainkan petani peradaban yang bertugas menyiram dan memupuk benih-benih kognitif siswa dengan ketulusan emosional yang tinggi. Dalam bidang keilmuan Informatika, saya meyakini bahwa belajar Berpikir Komputasional (Informatics & CT) tidak bertujuan mematangkan anak menjadi robot koder yang dingin, melainkan memerdekakan struktur penalaran kritis siswa dalam mengurai kerumitan hidup sehari-hari secara logis dan mandiri.\n\nSecara akademis, implementasi model pengajaran yang saya bawa bersandar pada teori Konstruktivisme Sosial Lev Vygotsky. Saya sangat percaya bahwa interaksi kolaboratif terbimbing di area Zone of Proximal Development (ZPD) mampu melejitkan pemahaman kognitif siswa secara masif melebihi porsi belajar individual kaku. Oleh karena itu, tindakan Scaffolding atau bantuan bertingkat dari pendidik diletakkan secara presisi pada masa krusial ketika anak menghadapi kebuntuan sintaksis pemrograman dasar. Pendekatan ini secara alami melatih kegigihan bertindak (grit) dan kebiasaan memecahkan masalah (problem solving posture) tanpa memadamkan kemerdekaan berekspresi kognitif mereka.\n\nSebagai calon guru profesional masa depan, komitmen saya adalah selalu memanusiakan hubungan pengajaran (humanizing education) di setiap pilar teknologi digital yang kami sentuh. Pendidik profesional harus terus mengevaluasi dirinya secara jujur pasca-praktik mengajar dan selalu terbuka menyerap umpan balik dari murid-muridnya. Keberhasilan pengajaran tidak dinilai dari gemerlap alat fasilitas multimedia yang serba cerdas, melainkan dari kedalaman rasa gembira, keberpihakan moral religius, kebebasan berpikir kreatif, serta matangnya solidaritas kemanusiaan anak-anak didik demi menyongsong Profil Pelajar Pancasila yang tangguh."
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [score, setScore] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [submittedSteps, setSubmittedSteps] = useState<{ [key: number]: boolean }>({});

  const [perangkatList, setPerangkatList] = useState<PerangkatAjar[]>(() => {
    try {
      const stored = localStorage.getItem('ppg_perangkat_list');
      return stored ? JSON.parse(stored) : DEFAULT_PERANGKAT_LIST;
    } catch {
      return DEFAULT_PERANGKAT_LIST;
    }
  });

  const [galeriSiswa, setGaleriSiswa] = useState<FotoGallery[]>(() => {
    try {
      const stored = localStorage.getItem('ppg_galeri_siswa');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= DEFAULT_GALERI_SISWA.length) {
          return parsed;
        }
      }
      return DEFAULT_GALERI_SISWA;
    } catch {
      return DEFAULT_GALERI_SISWA;
    }
  });

  const [studentInfo, setStudentInfo] = useState(() => {
    try {
      const stored = localStorage.getItem('ppg_student_info');
      return stored ? JSON.parse(stored) : DEFAULT_STUDENT_INFO;
    } catch {
      return DEFAULT_STUDENT_INFO;
    }
  });

  const [lampiran7, setLampiran7] = useState<LampiranDataMap>(() => {
    try {
      const stored = localStorage.getItem('ppg_lampiran7_data');
      return stored ? JSON.parse(stored) : INITIAL_LAMPIRAN7_DATA;
    } catch {
      return INITIAL_LAMPIRAN7_DATA;
    }
  });

  const [lampiran8, setLampiran8] = useState<LampiranDataMap>(() => {
    try {
      const stored = localStorage.getItem('ppg_lampiran8_data');
      return stored ? JSON.parse(stored) : INITIAL_LAMPIRAN8_DATA;
    } catch {
      return INITIAL_LAMPIRAN8_DATA;
    }
  });

  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    try {
      const stored = localStorage.getItem('ppg_milestones');
      return stored ? JSON.parse(stored) : perjalananBelajar;
    } catch {
      return perjalananBelajar;
    }
  });

  const resetAllToDefault = () => {
    setPerangkatList(DEFAULT_PERANGKAT_LIST);
    setGaleriSiswa(DEFAULT_GALERI_SISWA);
    setStudentInfo(DEFAULT_STUDENT_INFO);
    setLampiran7(INITIAL_LAMPIRAN7_DATA);
    setLampiran8(INITIAL_LAMPIRAN8_DATA);
    setMilestones(perjalananBelajar);
    try {
      localStorage.setItem('ppg_perangkat_list', JSON.stringify(DEFAULT_PERANGKAT_LIST));
      localStorage.setItem('ppg_galeri_siswa', JSON.stringify(DEFAULT_GALERI_SISWA));
      localStorage.setItem('ppg_student_info', JSON.stringify(DEFAULT_STUDENT_INFO));
      localStorage.setItem('ppg_lampiran7_data', JSON.stringify(INITIAL_LAMPIRAN7_DATA));
      localStorage.setItem('ppg_lampiran8_data', JSON.stringify(INITIAL_LAMPIRAN8_DATA));
      localStorage.setItem('ppg_milestones', JSON.stringify(perjalananBelajar));
    } catch (e) {
      console.error('Failed to reset localStorage to defaults:', e);
    }
  };

  const [profileImage, setProfileImage] = useState<string>(() => {
    try {
      return localStorage.getItem('ppg_profile_photo') || '';
    } catch (e) {
      return '';
    }
  });

  const handleUpdateProfileImage = (base64: string) => {
    setProfileImage(base64);
    try {
      if (base64) {
        localStorage.setItem('ppg_profile_photo', base64);
      } else {
        localStorage.removeItem('ppg_profile_photo');
      }
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  // State synchronization to localStorage for seamless CRUD integration
  useEffect(() => {
    try {
      localStorage.setItem('ppg_perangkat_list', JSON.stringify(perangkatList));
    } catch (e) {
      console.error('Failed to persist perangkatList:', e);
    }
  }, [perangkatList]);

  useEffect(() => {
    try {
      localStorage.setItem('ppg_galeri_siswa', JSON.stringify(galeriSiswa));
    } catch (e) {
      console.error('Failed to persist galeriSiswa:', e);
    }
  }, [galeriSiswa]);

  useEffect(() => {
    try {
      localStorage.setItem('ppg_student_info', JSON.stringify(studentInfo));
    } catch (e) {
      console.error('Failed to persist studentInfo:', e);
    }
  }, [studentInfo]);

  useEffect(() => {
    try {
      localStorage.setItem('ppg_milestones', JSON.stringify(milestones));
    } catch (e) {
      console.error('Failed to persist milestones:', e);
    }
  }, [milestones]);

  useEffect(() => {
    try {
      localStorage.setItem('ppg_lampiran7_data', JSON.stringify(lampiran7));
    } catch (e) {
      console.error('Failed to persist lampiran7:', e);
    }
  }, [lampiran7]);

  useEffect(() => {
    try {
      localStorage.setItem('ppg_lampiran8_data', JSON.stringify(lampiran8));
    } catch (e) {
      console.error('Failed to persist lampiran8:', e);
    }
  }, [lampiran8]);

  const tabsConfig = [
    { id: 'beranda', label: 'Beranda', icon: <HomeIcon className="w-4 h-4" /> },
    { id: 'profil', label: 'Profil', icon: <User className="w-4 h-4" /> },
    { id: 'artefak', label: 'Artefak', icon: <FileText className="w-4 h-4" /> },
    { id: 'analisis', label: 'Analisis', icon: <Layers className="w-4 h-4" /> },
    { id: 'penilaian', label: 'Penilaian', icon: <Award className="w-4 h-4" /> },
    { id: 'model-guru', label: 'Model Guru', icon: <BookOpenCheck className="w-4 h-4" /> },
    { id: 'admin', label: 'Admin', icon: <SlidersHorizontal className="w-4 h-4" /> },
    { id: 'uas', label: 'UAS', icon: <Printer className="w-4 h-4" /> }
  ];

  let content;
  if (activeTab === 'beranda') {
    content = (
      <Home 
        onNavigate={setActiveTab} 
        evaluationScore={score} 
        submittedSteps={submittedSteps}
        profileImage={profileImage}
        onImageUpload={handleUpdateProfileImage}
        studentInfo={studentInfo}
      />
    );
  } else if (activeTab === 'profil') {
    content = (
      <Profil 
        profileImage={profileImage}
        onImageUpload={handleUpdateProfileImage}
        studentInfo={studentInfo}
      />
    );
  } else if (activeTab === 'artefak') {
    content = (
      <div className="space-y-6 animate-fade-in" id="artefak-dan-refleksi-section">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/85 shadow-2xs">
          <h2 className="text-xl font-extrabold text-slate-900 font-display">Artefak Portofolio & Jurnal Esai Refleksi</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Kumpulan dokumen bukti kerja fisik LPTK PPG didukung dengan refleksi mendalam mengenai pengajaran dan peningkatan kapasitas guru masa depan.
          </p>
        </div>
        <div>
          <Artifacts 
            perangkatList={perangkatList}
            setPerangkatList={setPerangkatList}
            galeriSiswa={galeriSiswa}
            setGaleriSiswa={setGaleriSiswa}
          />
        </div>
        <ReflectionAndFooter />
      </div>
    );
  } else if (activeTab === 'analisis') {
    content = (
      <div className="space-y-6 animate-fade-in" id="analisis-section">
        <Analisis />
      </div>
    );
  } else if (activeTab === 'penilaian') {
    content = (
      <div className="space-y-6 animate-fade-in" id="perjalanan-belajar-section">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/85 shadow-3xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 font-display">Evaluasi Mandiri & Penilaian Milestone</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Tuntaskan kuis analitis pilihan ganda di setiap peta perjalanan belajar untuk menguji nalar akademis Anda dan mencatat evaluasi skor kumulatif.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2 text-right shrink-0">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Nilai Akumulasi Kuis</span>
            <span className="text-base font-black text-blue-800 font-mono">{score} / {milestones.length * 10} Poin</span>
          </div>
        </div>
        <CenterPanel 
          score={score}
          onScoreChange={setScore}
          selectedAnswers={selectedAnswers}
          onSelectedAnswersChange={setSelectedAnswers}
          submittedSteps={submittedSteps}
          onSubmittedStepsChange={setSubmittedSteps}
          milestones={milestones}
          lampiran7={lampiran7}
          lampiran8={lampiran8}
        />
      </div>
    );
  } else if (activeTab === 'model-guru') {
    content = (
      <div className="space-y-6 animate-fade-in" id="pilar-dan-perkembangan-section">
        <ModelGuru studentInfo={studentInfo} />
      </div>
    );
  } else if (activeTab === 'admin') {
    content = (
      <Admin 
        perangkatList={perangkatList}
        setPerangkatList={setPerangkatList}
        galeriSiswa={galeriSiswa}
        setGaleriSiswa={setGaleriSiswa}
        studentInfo={studentInfo}
        setStudentInfo={setStudentInfo}
        resetAllToDefault={resetAllToDefault}
        milestones={milestones}
        setMilestones={setMilestones}
        lampiran7={lampiran7}
        setLampiran7={setLampiran7}
        lampiran8={lampiran8}
        setLampiran8={setLampiran8}
      />
    );
  } else if (activeTab === 'uas') {
    content = (
      <div className="space-y-6">
        {/* Print Control Panel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-[900px] mx-auto">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">Tampilan Dokumen Portofolio Akademik (UAS)</h3>
            <p className="text-xs text-slate-500 mt-0.5">Dokumen ini diformat khusus untuk dicetak sebagai berkas fisik laporan UTS/UAS PPG.</p>
          </div>
          <button 
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>

        {/* ACADEMIC HANDOUT PORTFOLIO PRINT VIEW */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-300 p-8 md:p-14 max-w-[900px] mx-auto space-y-10 relative overflow-hidden animate-fade-in" id="academic-handout-print-container">
          
          {/* Watermark logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display pointer-events-none opacity-[0.02] text-[130px] font-black select-none text-blue-900 leading-none uppercase text-center">
            PPG INFORMATIKA<br />UNIVERSITY PORTFOLIO
          </div>

          {/* PRINT MODE ACADEMIC HEADER STYLE */}
          <div className="border-b-4 border-slate-900 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-[10px] font-bold text-blue-800 tracking-wider uppercase font-mono leading-none">
                Laporan Portofolio Ujian Akhir Semester • PPG Prajabatan
              </p>
              <h1 className="text-2xl font-black text-slate-950 font-display mt-2 tracking-tight">
                Portofolio Jejak Perjalanan Berpikir Komputasional
              </h1>
              <p className="text-slate-600 text-xs mt-1">
                Integrasi Disiplin CT pada Kurikulum Merdeka mapel Informatika Pendidik
              </p>
            </div>
            <div className="border-2 border-slate-300 rounded px-3 py-1.5 text-right font-mono text-[9px] text-slate-500 bg-slate-50 font-bold">
              <p>NIM: {studentInfo.nim}</p>
              <p className="mt-0.5">KELAS: PPG KOMPUTER</p>
            </div>
          </div>

          {/* STUDENT IDENTITY INFO TABLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 bg-slate-50 p-4 rounded-xl border">
            <div>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase">Nama Mahasiswa</p>
              <p className="text-xs font-bold text-slate-900 font-display">{studentInfo.fullName}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase">NIM / Prodi</p>
              <p className="text-xs font-semibold text-slate-800">{studentInfo.nim} / {studentInfo.programStudi}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase">Instansi LPTK</p>
              <p className="text-xs font-semibold text-slate-800">{studentInfo.lptk}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase">Mitra PPL</p>
              <p className="text-xs font-semibold text-slate-800 font-display">{studentInfo.school}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase">Status Kompetensi</p>
              <p className="text-xs font-bold text-emerald-700">LULUS KOMPETEN (97/100) ✓</p>
            </div>
          </div>

          {/* DOUBLE COLUMN PRINT BODY */}
          <div className="space-y-8 text-xs text-slate-850 leading-relaxed">
            
            {/* I. Model Guru Profesional yang Dituju */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display border-b pb-1">
                I. Model Guru Profesional yang Dituju & Visi-Misi Pembelajaran
              </h3>
              <p className="text-[11px] text-slate-550 italic">
                Rancangan jangka panjang pembentukan karakter pendidik tangguh bermuatan Computational Thinking:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border">
                  <p className="font-extrabold text-indigo-900 font-display text-[9px] uppercase">Misi Utama 1</p>
                  <p className="font-bold text-slate-800 mt-1">{studentInfo.misi1Title || 'Pionir Literasi CT'}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{studentInfo.misi1Desc}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border">
                  <p className="font-extrabold text-indigo-900 font-display text-[9px] uppercase">Misi Utama 2</p>
                  <p className="font-bold text-slate-800 mt-1">{studentInfo.misi2Title || 'Pendidik Inklusif Pancasila'}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{studentInfo.misi2Desc}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border">
                  <p className="font-extrabold text-indigo-900 font-display text-[9px] uppercase">Misi Utama 3</p>
                  <p className="font-bold text-slate-800 mt-1">{studentInfo.misi3Title || 'Pembelajar Adaptif Reflektif'}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{studentInfo.misi3Desc}</p>
                </div>
              </div>
            </div>

            {/* II. Refleksi Model Guru Profesional */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display border-b pb-1">
                II. Refleksi Model Guru Cita-Cita (Kekuatan, Kelemahan, & RTL)
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border space-y-2">
                {studentInfo.refleksiUAS ? studentInfo.refleksiUAS.split('\n\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="text-justify leading-relaxed text-[11px] text-slate-705">
                    {paragraph}
                  </p>
                )) : null}
              </div>
            </div>

            {/* III. Refleksi Akhir PPL Terbimbing */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display border-b pb-1">
                III. Refleksi Akhir Praktik Pengalaman Lapangan (PPL) Terbimbing
              </h3>
              <p className="text-[11px] text-slate-550 italic">
                Evaluasi komprehensif belajar dari tahap orientasi, observasi harian, asisten, serta praktik mengajar penuh:
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border space-y-2">
                {studentInfo.refleksiPPL ? studentInfo.refleksiPPL.split('\n\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="text-justify leading-relaxed text-[11px] text-slate-705">
                    {paragraph}
                  </p>
                )) : null}
              </div>
            </div>

            {/* IV. Filosofi Mengajar */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display border-b pb-1">
                IV. Pernyataan Filosofi Mengajar sebagai Ideologi Guru Profesional
              </h3>
              <p className="text-[11px] text-slate-550 italic">
                Keyakinan taktis dan kerangka teoretis kognitif (minimal 3 paragraf mengaitkan literatur konstruktivis):
              </p>
              <div className="bg-indigo-50/20 border border-indigo-100 p-5 rounded-2xl space-y-3 font-serif italic text-slate-750">
                {studentInfo.filosofiMengajar ? studentInfo.filosofiMengajar.split('\n\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="text-justify leading-relaxed text-[11px]">
                    "{paragraph}"
                  </p>
                )) : null}
              </div>
            </div>

            {/* Digital Verification Info */}
            <div className="bg-slate-50 p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <QrCode className="w-10 h-10 text-slate-900 shrink-0" />
                <div>
                  <span className="text-[9px] uppercase font-mono font-black text-slate-400 block">Digital Verification Hash</span>
                  <p className="text-[11px] font-bold text-slate-900">Arsip Otentik Digital</p>
                  <p className="text-[9px] text-slate-500">Scan QR ini mengarah ke tautan lembar aksi nyata, makalah kolaborasi, serta nilai PPG resmi.</p>
                </div>
              </div>
              <div className="text-[10px] font-mono font-bold text-slate-500 text-right bg-white px-3 py-1 rounded border border-dashed">
                CODE_COMPILATION: UAS_PPG_2026
              </div>
            </div>

          </div>

          {/* Academic sign area */}
          <div className="pt-8 border-t border-dashed flex justify-between items-end text-[10px] text-slate-400">
            <div>
              <p>Mata Kuliah: Computational Thinking</p>
              <p className="mt-0.5">Dosen Pengampu: Dr. H. Edy Suryanto, M.Pd.</p>
            </div>
            <div className="text-right">
              <p>Salatiga, 1 Juni 2026</p>
              <div className="h-10" />
              <p className="font-bold text-slate-800 underline">{studentInfo.fullName}</p>
              <p className="text-[8px] text-slate-400">NIM. {studentInfo.nim}</p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 antialiased font-sans flex flex-col grid-bg bubble-bg">
      {/* Upper Navigation bar with custom modern tabs layout */}
      <nav className="shrink-0 bg-slate-950 border-b border-slate-800/80 sticky top-0 z-50 px-4 py-2.5 shadow-lg shadow-slate-950/25 backdrop-blur-xl relative">
        {/* Animated sci-fi scanner line at the very top of header bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 shadow-[0_1px_8px_rgba(56,189,248,0.4)] opacity-95" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Brand header panel */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('beranda')}>
            <div className="relative">
              {/* Pulsing visual halo for the brand icon */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-sky-400 to-red-500 rounded-xl blur-md opacity-35 group-hover:opacity-65 transition duration-300 animate-pulse" />
              <div className="relative px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white flex items-center gap-2.5 shadow-md transition-transform duration-300 group-hover:scale-[1.03] active:scale-95 select-none font-sans">
                {/* PPG Logo Section */}
                <div className="flex flex-col items-center leading-none">
                  <span className="text-[15px] font-black tracking-tight text-sky-400">PPG</span>
                  <div className="flex text-[6px] font-black tracking-tight mt-0.5 leading-none">
                    <span className="text-red-500">Calon</span>
                    <span className="text-sky-400 ml-0.5">Guru</span>
                  </div>
                </div>
                {/* Elegant White-border divider line */}
                <div className="w-[1px] h-6 bg-slate-700/80" />
                {/* Secondary text context */}
                <div className="flex flex-col text-[7px] font-bold uppercase tracking-wider text-slate-300 text-left leading-tight justify-center">
                  <span>Pendidikan</span>
                  <span>Profesi Guru</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-black text-white tracking-wider uppercase font-display leading-none group-hover:text-blue-300 transition-colors">
                  E-PORTOFOLIO MAYANG ARTA MAHESI
                </p>
                <div 
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500 transition-colors cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setActiveTab('admin'); }}
                  title="Sistem Manajemen Administrasi (Tersembunyi)"
                />
              </div>
            </div>
          </div>

          {/* Separation Tabs - Futuristic Academic Menu Navigation */}
          <div className="flex bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80 max-w-full overflow-x-auto no-scrollbar whitespace-nowrap gap-1">
            {tabsConfig.filter(t => t.id !== 'admin').map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 text-[11px] font-black rounded-xl transition-all duration-300 cursor-pointer select-none active:scale-95 group overflow-hidden ${
                    isSelected
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white/90'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.45)] border border-blue-400/30 z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2 transition-transform duration-200 group-hover:scale-103">
                    <span className={`transition-colors duration-200 ${isSelected ? 'text-white' : 'text-slate-450 group-hover:text-blue-400'}`}>
                      {tab.icon}
                    </span>
                    <span className="tracking-wide">{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:py-8 flex flex-col justify-start overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex-1 flex flex-col justify-start"
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER credit lines */}
      <footer className="shrink-0 text-center py-6 text-[10px] md:text-xs text-slate-400/80 border-t border-slate-100 bg-white/40 backdrop-blur-md">
        <p className="font-semibold">
          Dibuat dengan presisi akademik tinggi untuk UAS PPG {studentInfo.programStudi} • PPG Calon Guru {studentInfo.programStudi} {studentInfo.lptk}
        </p>
        <p className="text-[9px] text-slate-450 mt-1 font-mono flex items-center justify-center gap-1">
          Layanan Portofolio Jejak Perjalanan CT • {studentInfo.lptk} © 2026-2027 • NIM. {studentInfo.nim}
          <button
            onClick={() => setActiveTab('admin')}
            className="w-3.5 h-3.5 ml-1 text-slate-300 hover:text-blue-500 hover:scale-110 active:scale-95 transition-all focus:outline-none cursor-pointer inline-flex items-center justify-center"
            title="Akses Sistem Administrasi"
          >
            ⚙️
          </button>
        </p>
      </footer>
    </div>
  );
}
