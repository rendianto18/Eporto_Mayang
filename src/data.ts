/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CapaianPembelajaran, Milestone, PillarCT, Artifact } from './types';

export const capaianDaftar: CapaianPembelajaran[] = [
  {
    id: 1,
    iconName: 'GraduationCap',
    text: 'Menjelaskan konsep dasar CT secara tepat dan sistematis.',
    category: 'Teori'
  },
  {
    id: 2,
    iconName: 'CheckCircle2',
    text: 'Menerapkan CT untuk menyelesaikan masalah sehari-hari secara logis.',
    category: 'Praktis'
  },
  {
    id: 3,
    iconName: 'Sparkles',
    text: 'Menggunakan CT dalam penyelesaian persoalan literasi dan numerasi.',
    category: 'Problem Solving'
  },
  {
    id: 4,
    iconName: 'BookOpen',
    text: 'Menganalisis implementasi CT dalam kurikulum secara kritis.',
    category: 'Kurikulum'
  },
  {
    id: 5,
    iconName: 'Layers',
    text: 'Merancang projek berbasis CT yang kreatif dan bermakna.',
    category: 'Projek'
  },
  {
    id: 6,
    iconName: 'Compass',
    text: 'Mengintegrasikan CT dalam pembelajaran Informatika secara aplikatif.',
    category: 'Praktis'
  }
];

export const perjalananBelajar: Milestone[] = [
  {
    number: 1,
    title: 'Pendalaman Pemahaman CT',
    shortDescription: 'Memahami CT sebagai pendekatan berpikir dalam menyelesaikan masalah secara logis, sistematis, dan efisien.',
    fullNarrative: 'Tahap awal berfokus pada de-skilling kesalahpahaman bahwa CT hanya untuk pemrograman komputer. Kami mempelajari bahwa Computational Thinking adalah sebuah cara berpikir (cognitive process) yang sangat relevan untuk memformulasikan solusi terstruktur bagi manusia maupun mesin.',
    challengeTitle: 'Konseptual Teoretis',
    challengeInteractive: {
      question: 'Manakah pernyataan yang paling tepat mengenai pengertian mendasar Computational Thinking?',
      options: [
        'Metode menulis sintaks program Python atau C++ dengan cepat.',
        'Proses berpikir memformulasikan masalah dan solusinya secara terstruktur agar dapat diselesaikan secara efektif.',
        'Kemampuan merakit komponen fisik komputer dan jaringan internet.',
        'Menggunakan program AI untuk menyelesaikan pekerjaan administrasi sekolah.'
      ],
      correctAnswerIdx: 1,
      explanation: 'Computational Thinking adalah kerangka mental/berpikir untuk menstrukturkan masalah dan mencari penyelesaian efisien, tidak selalu berkaitan dengan menulis kode/instalasi komputer.'
    }
  },
  {
    number: 2,
    title: 'CT dalam Persoalan Sehari-hari',
    shortDescription: 'Menerapkan CT untuk menganalisis aktivitas sehari-hari melalui langkah-langkah yang terstruktur.',
    fullNarrative: 'Kami berlatih melihat rutinitas harian seperti manajemen waktu pengerjaan tugas, rute perjalanan kuliah PPG terdekat, hingga mencuci pakaian secara sistematis demi efisiensi optimal.',
    challengeTitle: 'Analisis Kehidupan Riil',
    challengeInteractive: {
      question: 'Memilah tugas kuliah berdasarkan deadline terdekat dan tingkat kesulitan utama mencerminkan pilar...',
      options: [
        'Algoritma murni saja',
        'Abstraksi dan Dekomposisi',
        'Infrastruktur hardware',
        'Insting spontan'
      ],
      correctAnswerIdx: 1,
      explanation: 'Dekomposisi memecah sekumpulan tugas, dan Abstraksi memfilter tugas berdasarkan kriteria penting (deadline dan bobot) sambil mengabaikan info yang tidak mendesak.'
    }
  },
  {
    number: 3,
    title: 'CT dalam Literasi dan Numerasi',
    shortDescription: 'Menggunakan strategi CT untuk mengidentifikasi pola, menganalisis data, dan menyelesaikan persoalan berbasis literasi / numerasi.',
    fullNarrative: 'Pada tahap ini, modul difokuskan pada pemecahan soal standar internasional PISA/AKM. Kami menemukenali pola dari paragraf padat dan memodelkan grafik numerasi dengan dekomposisi data.',
    challengeTitle: 'PISA & AKM Assessment',
    challengeInteractive: {
      question: 'Dalam menyelesaikan soal logika seputar penentuan jadwal kereta yang saling bersinggungan, pilar apa yang paling dominan digunakan untuk memetakan kesamaan jadwal?',
      options: [
        'Dekomposisi manual baris demi baris',
        'Pengenalan Pola (Pattern Recognition)',
        'Pemrograman visual Scratch',
        'Perhitungan kalkulator langsung'
      ],
      correctAnswerIdx: 1,
      explanation: 'Pengenalan Pola membantu mengidentifikasi interval waktu berkala (kelipatan persekutuan terkecil) yang mengatur kedatangan kereta secara berulang.'
    }
  },
  {
    number: 4,
    title: 'CT dalam Kurikulum',
    shortDescription: 'Memahami posisi dan peran CT dalam kurikulum (Kurikulum Merdeka) secara kritis.',
    fullNarrative: 'Kami menelaah di mana letak CT di setiap fase perkembangan murid (Fase A hingga Fase F). Dalam Kurikulum Merdeka, CT tidak lagi digabung sembunyi-sembunyi, melainkan menjadi pilar dasar mapel Informatika atau bagian dari project P5.',
    challengeTitle: 'Struktur Kurikulum Merdeka',
    challengeInteractive: {
      question: 'Pada Fase E (kelas X SMA) dan Fase F (kelas XI-XII), di manakah letak capaian pembelajaran yang mencakup kemampuan Berpikir Komputasional?',
      options: [
        'Hanya diintegrasikan pada mata pelajaran matematika saja.',
        'Menjadi salah satu elemen wajib (elemen BK) dalam mata pelajaran Informatika.',
        'Hanya diajarkan di luar sekolah (ekstrakurikuler).',
        'Dihapuskan seluruhnya untuk diganti dengan coding praktis.'
      ],
      correctAnswerIdx: 1,
      explanation: 'Dalam CP Informatika Kurikulum Merdeka, Berpikir Komputasional (BK) merupakan elemen krusial pertama dari 8 elemen Informatika.'
    }
  },
  {
    number: 5,
    title: 'CT dan Projek',
    shortDescription: 'Mengintegrasikan CT dalam perancangan projek untuk menghasilkan solusi yang kreatif dan bermakna.',
    fullNarrative: 'Aspek pengerjaan berfokus pada rancangan projek STEM (Science, Technology, Engineering, Mathematics). Menggunakan micro-controller atau simulasi visual terencana dengan pembagian peran yang terukur.',
    challengeTitle: 'Desain Projek Siswa',
    challengeInteractive: {
      question: 'Sebelum mengajak siswa merancang prototipe tempat sampah otomatis, langkah dekomposisi apa yang paling tepat?',
      options: [
        'Langsung membeli sensor ultrasonik tanpa membuat sketsa.',
        'Membagi projek menjadi sub-sistem: mekanik wadah, sirkuit sensor, pemrograman Arduino, dan desain kemasan luar.',
        'Menyerah dan membuat tugas presentasi teori saja.',
        'Meminta AI menulis seluruh kode kontrol di hari pertama.'
      ],
      correctAnswerIdx: 1,
      explanation: 'Membagi projek menjadi sub-sistem adalah teladan murni pilar Dekomposisi agar tim siswa dapat fokus pada modul yang dapat dikelola secara paralel.'
    }
  },
  {
    number: 6,
    title: 'Integrasi CT dalam Informatika',
    shortDescription: 'Mengembangkan aktivitas pembelajaran Informatika yang melatih kemampuan berpikir komputasional peserta didik.',
    fullNarrative: 'Puncak perjalanan: menyusun modul ajar interaktif (RPP) yang mengintegrasikan unplugged activity (permainan fisik) maupun plugged activity (pemrograman Scratch/Blockly).',
    challengeTitle: 'Praktik Pembelajaran Riil',
    challengeInteractive: {
      question: 'Mengajarkan konsep perulangan (loop) tanpa menggunakan komputer dapat dilakukan dengan...',
      options: [
        'Membiarkan murid membaca buku tebal semalaman.',
        'Permainan gerak badan (misal: "langkah maju 3 kali, tepuk tangan 2 kali, ulangi 4 kali").',
        'Menyuruh anak menyalin kode biner.',
        'Menghafalkan sejarah nama penemu algoritma.'
      ],
      correctAnswerIdx: 1,
      explanation: 'Ini disebut pembelajaran Computational Thinking unplugged. Siswa menyadari bahwa perulangan adalah pola aksi berulang yang terdefinisi secara dinamis di kehidupan nyata.'
    }
  }
];

export const pilarSistem: PillarCT[] = [
  {
    id: 'decomp',
    title: 'Dekomposisi',
    definition: 'Menguraikan proyek atau masalah Informatika menjadi beberapa tahapan yang lebih sederhana dan mudah dikelola.',
    detailedExample: 'Ketika dihadapkan pada tugas membuat web pencarian sekolah, kita memecahnya jadi: (1) Perancangan UI, (2) Pembuatan database sekolah, (3) Pemrograman mesin pencarian, (4) Pengujian akurasi.',
    interactiveDemoType: 'decomposition'
  },
  {
    id: 'pattern',
    title: 'Pengenalan Pola',
    definition: 'Mengidentifikasi pola data, perilaku masukan, struktur program, dan kesamaan solusi dari berbagai permasalahan.',
    detailedExample: 'Melihat bahwa semua fitur pendaftaran di website memiliki prosedur input-validasi-simpan yang serupa, sehingga dapat dibuat satu templat fungsi reuseable untuk menghemat waktu.',
    interactiveDemoType: 'pattern'
  },
  {
    id: 'abstract',
    title: 'Abstraksi',
    definition: 'Memfokuskan analisis pada informasi penting yang krusial untuk rancangan solusi dan mengabaikan informasi sekunder.',
    detailedExample: 'Saat Mendesain model basis data siswa, kita mengutamakan atribut NIM, Nama, dan Kelas, serta menyepelekan info hobi sampingan atau warna kaos kaki karena tidak relevan bagi sistem nilai.',
    interactiveDemoType: 'abstraction'
  },
  {
    id: 'algo',
    title: 'Algoritma',
    definition: 'Menyusun langkah-langkah logis, terurut, dan tuntas sebagai landasan dasar pengembangan sistem atau pemecahan masalah.',
    detailedExample: 'Menyusun pseudocode pendaftaran: JIKA nilai > 75 MAKA lulus, jika tidak MAKA remedial. Langkah ini dieksekusi langkah demi langkah tanpa ambigu.',
    interactiveDemoType: 'algorithm'
  }
];

export const portfolioArtifacts: Artifact[] = [
  {
    id: 'art-rpp',
    category: 'rpp',
    title: 'Modul Ajar Informatika Berorientasi CT - Berpikir Komputasional SMA Kelas X',
    description: 'Rencana Pelaksanaan Pembelajaran (RPP) mandiri materi Algoritma Pemrograman Visual menggunakan Scratch dengan pendekatan Computational Thinking.',
    grade: 'A+ (98/100)',
    linkText: 'Modul_Ajar_Informatika_CT_FaseE.pdf',
    analysis: {
      context: 'Disusun untuk pembelajaran terbimbing siklus 1 di SMA Negeri 1 Salatiga kelas X Fase E yang berfokus pada pengenalan algoritma pemrograman visual.',
      purpose: 'Membantu siswa memahami esensi logika perulangan (looping) dan percabangan (conditional) tanpa beban penulisan sintaksis teks.',
      pros: 'Siswa terlibat aktif dalam demonstrasi "unplugged" gerakan melangkah sebelum masuk ke laboratorium komputer, mempermudah internalisasi pilar algoritma.',
      cons: 'Beberapa siswa dengan kecepatan belajar kognitif rendah membutuhkan bimbingan individual berlebih saat mentranslasikan gerakan fisik ke kode Scratch.',
      pedagogyTheory: 'Menerapkan teori konstruksionisme Seymour Papert bahwa siswa belajar dengan sangat efektif ketika terlibat dalam pembuatan objek eksternal (pemrograman visual).',
      aspects: {
        constraints: 'Kendala utama adalah keterbatasan durasi waktu (2 JP) untuk mengakomodasi fase penjelajahan bebas siswa di awal perkenalan Scratch, serta beberapa unit komputer lab yang lambat melakukan loading browser.',
        pedagogicalConcept: 'Mengadopsi konsep scaffolding dari Vygotsky. Guru menyediakan sasis program berupa "templet setengah jadi" bagi siswa yang kesulitan, lalu perlahan melepas bantuan tersebut.',
        successFactors: 'Penyediaan LKS terstruktur dengan tantangan bertingkat (leveling challenges) dan penerapan "unplugged warming up" di dalam kelas sebelum praktikum di laboratorium komputer.',
        adaptability: 'Jika situasi kelas tidak memiliki lab komputer yang memadai, modul ajar ini dapat sepenuhnya diregenerasikan menjadi aktivitas unplugged menggunakan kartu logika fisik bergambar instruksi "Scratch-Like Cardboard" untuk sirkuit labirin lantai.'
      }
    }
  },
  {
    id: 'art-media',
    category: 'media',
    title: 'Media Pembelajaran Alat Peraga "Logic Maze Board" & Flowchart Fisik',
    description: 'Papan labirin akrilik interaktif dilengkapi magnet instruksi langkah pilar algoritma dan media digital visual pendukung Scratch.',
    grade: 'A (97/100)',
    linkText: 'Media_Pembelajaran_Logic_Maze.png',
    analysis: {
      context: 'Didesain sebagai media bridging kognitif dari aktivitas unplugged ke plugged pemrograman simulasi Bebras materi rute terpendek.',
      purpose: 'Menjembatani abstraksi tinggi struktur kontrol pengambilan keputusan (nested IF-ELSE) ke bentuk manipulatif taktil fisik.',
      pros: 'Sangat efektif menyerap atensi siswa kinestetik dan visual secara simultan dalam kelompok kerja kecil.',
      cons: 'Memerlukan usaha pembuatan material fisik yang cukup presisi dan biaya logistik alat yang tidak murah jika diduplikasi massal.',
      pedagogyTheory: 'Teori perkembangan kognitif Jean Piaget, khususnya masa operasional konkret menuju operasional formal di mana manipulasi fisik memperkuat pemahaman abstrak.',
      aspects: {
        constraints: 'Ukuran papan magnetik awal yang dibuat masih terlalu kecil untuk didemonstrasikan di depan kelas berkapasitas 36 siswa, sehingga sulit dilihat oleh siswa di baris belakang.',
        pedagogicalConcept: 'Prinsip Dual Coding Theory (Allan Paivio) bahwa informasi yang direpresentasikan baik secara verbal (penjelasan verbal) maupun visual (labirin fungsional fisik) menghasilkan retensi ingatan jangka panjang yang lebih tinggi.',
        successFactors: 'Warna magnet instruksi diserupakan persis dengan warna blok Scratch (kuning untuk kontrol, biru untuk gerak) yang menstabilkan memori kognitif visual transisi.',
        adaptability: 'Untuk situasi kelas terdistribusi/daring, alat peraga fisik ini dapat ditranslasikan menjadi simulasi slide interaktif berbasis Canva / Figma atau papan kolaboratif Google Jamboard/Miro.'
      }
    }
  },
  {
    id: 'art-kerja-siswa',
    category: 'kerja-siswa',
    title: 'Portofolio Hasil Karya Siswa: Program Game Mini "Pac-Man Unplugged"',
    description: 'Dokumen kompilasi proyek pemrograman game Scratch dan lembar kerja dekomposisi buatan siswa kelas X-5 SMAN 1 Salatiga.',
    grade: 'A+ (96/100)',
    linkText: 'Karya_Siswa_Scratch_Game_Pacman.pdf',
    analysis: {
      context: 'Diambil dari asesmen sumatif praktikum terbimbing siklus 2, di mana siswa bekerja berpasangan (pair programming).',
      purpose: 'Menilai kemampuan siswa menerapkan 4 pilar CT (Dekomposisi rintangan, Pengenalan pola gerak musuh, Abstraksi skor game, Algoritma kontrol gerak).',
      pros: 'Tampak orisinalitas tinggi dalam kreasi sprite dan dekorasi latar belakang yang bernilai kearifan lokal.',
      cons: 'Pembagian peran dalam pair programming terkadang kurang imbang, ada tim dengan satu siswa sangat dominan menguasai pengerjaan.',
      pedagogyTheory: 'Teori Konstruktivisme Sosial Vygotsky melalui metode Peer Collaboration, di mana interaksi antar teman sejawat bertindak sebagai motor penggerak zona perkembangan proksimal (ZPD).',
      aspects: {
        constraints: 'Beberapa kelompok mengalami crash browser sehingga file kerja kehilangan progres perubahan. Di sisi lain, siswa yang kurang mahir merasa terintimidasi oleh kecepatan koding rekannya.',
        pedagogicalConcept: 'Penerapan "Cooperative Learning" tipe pair programming. Guru secara proaktif merestrukturisasi aturan kerja agar setiap siswa wajib bertanggung jawab atas fungsi tertentu (misal: S1 membuat kontrol sprite, S2 mengurus sistem skor).',
        successFactors: 'Adanya rubrik penilaian sumatif yang eksplisit dan jelas yang dibagikan sejak awal sesi, serta bimbingan terarah keliling meja (roving guidance) dari guru.',
        adaptability: 'Bagi sekolah dengan kemampuan komputer minim, proyek game ini dapat digantikan dengan tantangan merancang "Board Game" manual berbasis kertas karton tebal dengan skema aturan dadu algoritmik.'
      }
    }
  },
  {
    id: 'art-nilai-gp',
    category: 'penilaian-gp',
    title: 'Lembar instrumen Penilaian Guru Pamong (PPG Siklus 1, 2, 3)',
    description: 'Kumpulan scan berkas autentik umpan balik formatif dan evaluasi numerik Lampiran 7 & 8 dari Guru Pamong SMAN 1 Salatiga.',
    grade: 'Istimewa (99/100)',
    linkText: 'Lampiran7_8_Penilaian_GuruPamong.pdf',
    analysis: {
      context: 'Hasil rekaman penilaian klinis berkala selama pelaksanaan PPL Terbimbing dwi-pekan di sekolah mitra.',
      purpose: 'Menyediakan umpan balik reflektif yang objektif dari sudut pandang praktisi lapangan senior terkait kesiapan pedagogik mahasiswa.',
      pros: 'Umpan balik tertulis sangat spesifik per menit pengajaran, memberikan rincian kritis mengenai intonasi suara dan manajemen kelas.',
      cons: 'Proses koordinasi pembubuhan tanda tangan fisik basah membutuhkan penyesuaian jadwal luar biasa di tengah kesibukan sekolah.',
      pedagogyTheory: 'Kajian refleksi reflektif Donald Schön (Reflective Practitioner), yang memisahkan aktivitas refleksi sewaktu aksi sedang berjalan (reflection-in-action) dan refleksi setelah aksi selesai (reflection-on-action).',
      aspects: {
        constraints: 'Penilaian klinis siklus awal menunjukkan kelemahan dalam estimasi durasi penutup pembelajaran (seringkali terburu-buru mengakhiri kelas tanpa sintesis yang matang).',
        pedagogicalConcept: 'Umpan balik formatif diagnostik konseptual. Guru pamong memandu analisis kelas dengan dialog socratic (tanya-jawab kritis) alih-alih sekadar memberikan kritik searah.',
        successFactors: 'Keadilan dan konsistensi guru pamong dalam mengamati seluruh durasi jam mengajar terstruktur secara penuh (tidak hanya sekilas di awal atau akhir jam).',
        adaptability: 'Jika guru pamong berhalangan hadir fisik secara penuh, observasi didukung dengan penyediaan link rekaman kamera statis 360 derajat di sudut kelas agar pamong dapat menilai via asinkron.'
      }
    }
  },
  {
    id: 'art-nilai-dpl',
    category: 'penilaian-dpl',
    title: 'Asesmen Fortofolio & Kunjungan Lapangan Dosen Pembimbing Lapangan (DPL)',
    description: 'Lembar verifikasi kelayakan akademik penyusunan dokumen ajar dan supervisi klinis dari dosen pascasarjana UKSW Salatiga.',
    grade: 'Unggul (98/100)',
    linkText: 'Instrumen_Supervisi_DPL_UKSW.pdf',
    analysis: {
      context: 'Penilaian akademik dwi-pekanan terintegrasi dengan kunjungan supervisi berkala dari pihak perguruan tinggi penyelenggara LPTK.',
      purpose: 'Menyelaraskan kesesuaian teori pedagogi kampus (Computational Thinking kurikulum merdeka) dengan implementasi praktis di lapangan.',
      pros: 'Memberikan landasan literatur akademis yang kuat untuk menjelaskan perilaku kognitif siswa dalam penyerapan materi informatika.',
      cons: 'Dosen tidak dapat memantau interaksi harian non-formal di sekolah yang sebenarnya juga krusial bagi kepribadian guru.',
      pedagogyTheory: 'Model Supervisi Klinis Demokratif berfokus pada pendampingan humanis menuju restrukturisasi pemahaman metodologis.',
      aspects: {
        constraints: 'Tantangan menyatukan perspektif akademik dosen (yang menginginkan integrasi CT teoretis mendalam) dengan kepraktisan lapangan sekolah guru pamong (yang mengedepankan ketertiban administratif).',
        pedagogicalConcept: 'Menggunakan model Action Research (Kemmis & McTaggart) yang terdiri dari perencanaan, tindakan, observasi, dan refleksi dinamis berkelanjutan.',
        successFactors: 'Komunikasi segitiga (tripartit) yang setara dan transparan antara Mahasiswa PPG, Guru Pamong di sekolah, dan Dosen Pembimbing UKSW.',
        adaptability: 'Dalam kondisi darurat tanpa keterjangkauan transportasi dosen, bimbingan dialihkan menggunakan rekaman vlog reflektif via media telekonferensi Zoom secara live dan evaluasi portofolio interaktif cloud.'
      }
    }
  },
  {
    id: 'art-video',
    category: 'video-ppl',
    title: 'Video Pembelajaran Terbimbing Praktik Mengajar Siklus II - Kelas X-7',
    description: 'Video dokumentasi lengkap pengajaran Informatika berpendekatan CT yang diunggah secara resmi di Platform YouTube Laporan PPG.',
    grade: 'Sangat Baik (96/100)',
    linkText: 'Video_Praktik_PPL_Siklus2_Mayang.mp4',
    analysis: {
      context: 'Rekaman audiovisual orisinal dari proses implementasi RPP Siklus II di bawah supervisi klinis pamong.',
      purpose: 'Melihat secara nyata interaksi verbal, bahasa tubuh, pembawaan, penyampaian, dan manajemen ruang kelas.',
      pros: 'Menampilkan detail-detail krusial seperti metode tanya jawab umpan balik, transisi antar sesi, dan ekspresi kegembiraan belajar anak.',
      cons: 'Kualitas mikrofon perekaman awal kurang bertenaga sehingga suara interaksi tanya jawab siswa di seberang ruangan terdengar samar.',
      pedagogyTheory: 'Studi Observasional Pembelajaran Bandura (Social Learning Theory) yang menganalisis modifikasi perilaku pengkondisian ruangan berbasis peniruan instruksi terstruktur.',
      aspects: {
        constraints: 'Adanya kecanggungan awal dari beberapa siswa yang menyadari kehadiran kamera (camera-shyness), memengaruhi kealamian debat tanya jawab pada menit-menit pertama.',
        pedagogicalConcept: 'Menerapkan pembelajaran Berpusat pada Murid (Student-Centered Learning) di mana guru bertindak sebagai fasilitator pemantik dan siswa dominan mengeksplorasi masalah di komputernya.',
        successFactors: 'Penempatan kamera statis di sudut belakang yang tidak mengganggu mobilitas belajar, serta penggunaan mikrofon eksternal ganda (clip-on lavalier) di tubuh pendidik.',
        adaptability: 'Dalam kondisi di mana perekaman video dilarang oleh hak privasi siswa, video dapat disuguhkan dalam format rekaman "Micro-Teaching" mandiri tanpa tampilan wajah siswa, meluas ke simulasi instruksi guru.'
      }
    }
  },
  {
    id: 'art-laporan-refleksi',
    category: 'laporan-refleksi',
    title: 'Laporan Refleksi Siklus Belajar 1, 2, dan 3 Komprehensif',
    description: 'Dokumen monograf akademik yang memuat sintesis logbook, temuan klinis, solusi, serta evaluasi dwi-pekanan selama masa terbimbing.',
    grade: 'A+ (97/100)',
    linkText: 'Laporan_Refleksi_Siklus_1_2_3.pdf',
    analysis: {
      context: 'Disusun di akhir masa PPL Terbimbing sebagai bentuk pertanggungjawaban ilmiah pra-studi PPL Mandiri.',
      purpose: 'Menyusun benang merah pertumbuhan kompetensi mengajar dengan menganalisis kegagalan serta keberhasilan di tiap fase siklus.',
      pros: 'Menyajikan data komparatif yang riil berupa peningkatan rata-rata nilai kuis penalaran CT siswa dari Siklus I ke Siklus III.',
      cons: 'Membutuhkan proses kontemplasi yang intensif di sela-sela padatnya tugas kuliah akademis PPG.',
      pedagogyTheory: 'Teori Konstruktivisme Sosial Dewey (Progressive Education) yang menyoroti pentingnya pengalaman langsung (experiential learning) yang direfleksikan secara aktif.',
      aspects: {
        constraints: 'Buku catatan harian observasi di lapangan terkadang tercecer atau kurang lengkap pencatatannya, sehingga mempersulit rekonstruksi detail kronologi kelas.',
        pedagogicalConcept: 'Refleksi komparatif diakronis. Membandingkan performa kelas secara kuantitatif maupun kualitatif guna memilah taktik mana yang layak dipertahankan.',
        successFactors: 'Kedisiplinan mendokumentasikan temuan kelas langsung sesaat setelah jam sekolah usai (sebelum ingatan menjadi bias atau pudar).',
        adaptability: 'Dapat diringkas menjadi esai refleksi poster infografis satu halaman saku (A4) yang mudah dipahami rekan sejawat pendidik.'
      }
    }
  }
];

