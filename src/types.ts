/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CapaianPembelajaran {
  id: number;
  iconName: string;
  text: string;
  category: 'Teori' | 'Praktis' | 'Kurikulum' | 'Projek' | 'Problem Solving';
}

export interface Milestone {
  number: number;
  title: string;
  shortDescription: string;
  fullNarrative: string;
  challengeTitle: string;
  challengeInteractive?: {
    question: string;
    options: string[];
    correctAnswerIdx: number;
    explanation: string;
  };
}

export interface PillarCT {
  id: string;
  title: string;
  definition: string;
  detailedExample: string;
  interactiveDemoType: 'decomposition' | 'pattern' | 'abstraction' | 'algorithm';
}

export interface Artifact {
  id: string;
  title: string;
  category: 'rpp' | 'media' | 'kerja-siswa' | 'penilaian-gp' | 'penilaian-dpl' | 'video-ppl' | 'laporan-refleksi' | 'tugas-ppg';
  description: string;
  grade?: string;
  linkText: string;
  analysis?: {
    context: string;
    purpose: string;
    pros: string;
    cons: string;
    pedagogyTheory: string;
    aspects: {
      constraints: string;
      pedagogicalConcept: string;
      successFactors: string;
      adaptability: string;
    };
  };
}

export interface PerangkatAjar {
  id: string;
  siklus: number;
  title: string;
  description: string;
  materi: string;
  target: string;
  rppContent: string;
  lkpdContent: string;
  canvaContent: string;
  pdfContent: string;
}

export interface FotoGallery {
  id: string;
  title: string;
  category: 'Pembelajaran Kelas' | 'Praktik Laboratorium' | 'Presentasi Materi' | 'Diskusi Kelompok' | 'Evaluasi & Refleksi' | 'Bimbingan Siswa';
  description: string;
  date: string;
  feedback: string;
  stats: { likes: number; views: number };
  imageUrl: string;
}

export interface AssessmentScore {
  item: string;
  val: number;
  desc: string;
}

export interface LampiranData {
  scores: AssessmentScore[];
  feedbackGP: string;
  feedbackDPL: string;
}

export interface LampiranDataMap {
  1: LampiranData;
  2: LampiranData;
  3: LampiranData;
}


