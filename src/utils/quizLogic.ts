import { VocabItem, UserStats } from '../types';

export interface ToneInfo {
  number: number;
  name: string;
  shortName: string;
  symbol: string;
  contour: string; // Ex: 55, 35, 214, 51
  color: string;
  description: string;
  iconPitch: string; // SVG path or representation
}

export function getToneInfo(tom: number): ToneInfo {
  switch (tom) {
    case 1:
      return {
        number: 1,
        name: '1º Tom (Alto & Constante)',
        shortName: '1º Tom (mā)',
        symbol: 'mā',
        contour: '5-5',
        color: '#00E676', // verde vibrante
        description: 'Tom alto, plano e sustentado como nota musical.',
        iconPitch: 'M 4 8 L 28 8',
      };
    case 2:
      return {
        number: 2,
        name: '2º Tom (Ascendente)',
        shortName: '2º Tom (má)',
        symbol: 'má',
        contour: '3-5',
        color: '#00E5FF', // ciano
        description: 'Tom que sobe do tom médio ao alto, como uma dúvida.',
        iconPitch: 'M 4 24 L 28 8',
      };
    case 3:
      return {
        number: 3,
        name: '3º Tom (Descendente-Ascendente)',
        shortName: '3º Tom (mǎ)',
        symbol: 'mǎ',
        contour: '2-1-4',
        color: '#FFD600', // amarelo âmbar
        description: 'Tom desce fundo na garganta e sobe em seguida.',
        iconPitch: 'M 4 12 L 16 26 L 28 8',
      };
    case 4:
      return {
        number: 4,
        name: '4º Tom (Descendente Decidido)',
        shortName: '4º Tom (mà)',
        symbol: 'mà',
        contour: '5-1',
        color: '#FF5252', // vermelho alerta
        description: 'Tom cai com força e rapidez, como um comando firme.',
        iconPitch: 'M 4 8 L 28 26',
      };
    default:
      return {
        number: 0,
        name: 'Tom Neutro (Leve & Curto)',
        shortName: 'Neutro (ma)',
        symbol: 'ma',
        contour: '3',
        color: '#B0B0B0', // cinza amoled
        description: 'Pronúncia suave, ágil e sem acento tonal.',
        iconPitch: 'M 14 16 A 2 2 0 1 1 18 16',
      };
  }
}

export function shuffleArray<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Seleciona 4 opções de resposta garantindo que o alvo esteja incluído
 * e 3 distratores distintos sejam escolhidos.
 */
export function pickAnswerOptions(target: VocabItem, pool: VocabItem[], count: number = 4): VocabItem[] {
  const validPool = pool.filter(item => item.id !== target.id);
  const shuffledDistractors = shuffleArray(validPool);
  const selectedDistractors = shuffledDistractors.slice(0, Math.min(count - 1, validPool.length));
  return shuffleArray([target, ...selectedDistractors]);
}

export type QuizQuestionType = 'audio_to_hanzi' | 'hanzi_to_pt';

export interface QuizQuestion {
  id: string;
  target: VocabItem;
  options: VocabItem[];
  type: QuizQuestionType;
}

export function createQuizQuestion(
  target: VocabItem,
  pool: VocabItem[],
  type?: QuizQuestionType
): QuizQuestion {
  const resolvedType = type || (Math.random() > 0.5 ? 'audio_to_hanzi' : 'hanzi_to_pt');
  const options = pickAnswerOptions(target, pool, 4);
  return {
    id: `${target.id}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    target,
    options,
    type: resolvedType
  };
}

export function updateStatsOnAnswer(
  prev: UserStats,
  isCorrect: boolean,
  vocabId: string
): UserStats {
  const nextStreak = isCorrect ? prev.currentStreak + 1 : 0;
  const nextBestStreak = Math.max(prev.bestStreak, nextStreak);
  
  const learnedIds = isCorrect
    ? Array.from(new Set([...prev.learnedIds, vocabId]))
    : prev.learnedIds;

  const mistakeIds = isCorrect
    ? prev.mistakeIds.filter(id => id !== vocabId) // remove se acertou
    : Array.from(new Set([...prev.mistakeIds, vocabId])); // adiciona se errou

  return {
    learnedIds,
    favoriteIds: prev.favoriteIds,
    mistakeIds,
    currentStreak: nextStreak,
    bestStreak: nextBestStreak,
    totalAnswered: prev.totalAnswered + 1,
    totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
  };
}

export const INITIAL_USER_STATS: UserStats = {
  learnedIds: [],
  favoriteIds: [],
  mistakeIds: [],
  currentStreak: 0,
  bestStreak: 0,
  totalAnswered: 0,
  totalCorrect: 0,
};
