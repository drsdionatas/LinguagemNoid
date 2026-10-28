export type CategoryKey = 'todas' | 'saudacoes' | 'rotina' | 'numeros_tempo' | 'locomocao' | 'verbos';

export interface ExemploCurto {
  hanzi: string;
  pinyin: string;
  traducao: string;
}

export interface VocabItem {
  id: string;
  categoria: Exclude<CategoryKey, 'todas'>;
  categoriaNome: string;
  hanzi: string;
  pinyin: string;
  tom: number;
  traducao: string;
  icone: string;
  exemplo_curto?: ExemploCurto;
  radical?: string;
  dica?: string;
}

export interface UserStats {
  learnedIds: string[];
  favoriteIds: string[];
  mistakeIds: string[];
  currentStreak: number;
  bestStreak: number;
  totalAnswered: number;
  totalCorrect: number;
}

export type AppMode = 'study' | 'match' | 'quiz';
