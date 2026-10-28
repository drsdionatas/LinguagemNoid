import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { BookOpen, Shapes, Brain, List, Flame } from 'lucide-react';
import { AppMode, CategoryKey, UserStats, VocabItem } from './types';
import { VOCABULARY_DATA, CATEGORIES } from './data/vocabulary';
import { INITIAL_USER_STATS, updateStatsOnAnswer } from './utils/quizLogic';
import { mandarinAudio } from './utils/audio';
import { StudyMode } from './components/StudyMode';

// Modos secundários só são baixados quando usados (abre mais rápido, usa menos memória)
const AssociationMode = lazy(() => import('./components/AssociationMode').then(m => ({ default: m.AssociationMode })));
const QuizMode = lazy(() => import('./components/QuizMode').then(m => ({ default: m.QuizMode })));
const VocabularyListModal = lazy(() =>
  import('./components/VocabularyListModal').then(m => ({ default: m.VocabularyListModal }))
);

const STATS_KEY = 'linguagemnoid:stats:v1';
const AUTOPLAY_KEY = 'linguagemnoid:autoplay:v1';

function loadStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (raw) return { ...INITIAL_USER_STATS, ...JSON.parse(raw) };
  } catch {
    /* ignora dados corrompidos */
  }
  return INITIAL_USER_STATS;
}

const MODES: { key: AppMode; label: string; Icon: typeof BookOpen }[] = [
  { key: 'study', label: 'Estudar', Icon: BookOpen },
  { key: 'match', label: 'Associar', Icon: Shapes },
  { key: 'quiz', label: 'Quiz', Icon: Brain },
];

const toggleId = (list: string[], id: string) =>
  list.includes(id) ? list.filter(x => x !== id) : [...list, id];

const Loading = () => (
  <div className="flex-1 flex items-center justify-center text-xs text-[#666666]">Carregando…</div>
);

export default function App() {
  const [mode, setMode] = useState<AppMode>('study');
  const [category, setCategory] = useState<CategoryKey>('todas');
  const [studyIndex, setStudyIndex] = useState(0);
  const [isListOpen, setIsListOpen] = useState(false);
  const [stats, setStats] = useState<UserStats>(loadStats);
  const [autoPlay, setAutoPlay] = useState<boolean>(() => localStorage.getItem(AUTOPLAY_KEY) === 'true');

  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem(AUTOPLAY_KEY, String(autoPlay));
  }, [autoPlay]);

  // Para voz e efeitos sonoros quando o app sai da tela (economia de bateria)
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) mandarinAudio.pause();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // useMemo evita recriar a lista a cada render (isso reiniciava as perguntas)
  const filteredVocab = useMemo<VocabItem[]>(
    () => (category === 'todas' ? VOCABULARY_DATA : VOCABULARY_DATA.filter(v => v.categoria === category)),
    [category]
  );

  const currentStudyItem = filteredVocab[studyIndex] ?? filteredVocab[0];

  const handleCorrect = useCallback((id: string) => {
    setStats(prev => updateStatsOnAnswer(prev, true, id));
  }, []);

  const handleMistake = useCallback((id: string) => {
    setStats(prev => updateStatsOnAnswer(prev, false, id));
  }, []);

  const handleToggleFavorite = useCallback((id: string) => {
    setStats(prev => ({ ...prev, favoriteIds: toggleId(prev.favoriteIds, id) }));
  }, []);

  const handleToggleLearned = useCallback((id: string) => {
    setStats(prev => ({ ...prev, learnedIds: toggleId(prev.learnedIds, id) }));
  }, []);

  const handleClearMistakes = useCallback(() => {
    setStats(prev => ({ ...prev, mistakeIds: [] }));
  }, []);

  const handleSelectCategory = (key: CategoryKey) => {
    setCategory(key);
    setStudyIndex(0);
  };

  const handleSelectMode = (key: AppMode) => {
    mandarinAudio.stop();
    setMode(key);
  };

  const handleSelectWord = (word: VocabItem) => {
    setCategory('todas');
    setMode('study');
    setStudyIndex(Math.max(0, VOCABULARY_DATA.findIndex(v => v.id === word.id)));
  };

  const accuracy = stats.totalAnswered > 0 ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) : 0;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-black text-white safe-area">
      <header className="sticky top-0 z-30 bg-black border-b border-[#1A1A1A] px-3 pt-2 pb-2 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-hanzi text-2xl text-[#00E676] leading-none" aria-hidden="true">语</span>
            <div className="min-w-0">
              <h1 className="text-base font-bold leading-tight tracking-tight truncate">
                Linguagem<span className="text-[#00E676]">Noid</span>
              </h1>
              <p className="text-[10px] text-[#888888] leading-tight">
                Mandarim • {stats.learnedIds.length}/{VOCABULARY_DATA.length} aprendidas • {accuracy}% acertos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-[#FFD600]" title="Sequência atual / recorde">
              <Flame size={14} /> {stats.currentStreak}
              <span className="text-[#666666]">/ {stats.bestStreak}</span>
            </span>
            <button
              onClick={() => setIsListOpen(true)}
              className="p-2.5 rounded-lg bg-[#111111] border border-[#262626] text-[#B0B0B0] hover:text-white btn-amoled-touch"
              aria-label="Abrir lista de palavras"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <nav className="grid grid-cols-3 gap-1.5" aria-label="Modos">
          {MODES.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => handleSelectMode(key)}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold border btn-amoled-touch ${
                mode === key
                  ? 'bg-[#00E676] text-black border-[#00E676]'
                  : 'bg-[#0B0B0B] text-[#B0B0B0] border-[#222222]'
              }`}
              aria-pressed={mode === key}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </nav>

        {mode !== 'quiz' && (
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => handleSelectCategory(cat.key as CategoryKey)}
                className={`text-[11px] px-2.5 py-1.5 rounded-md border whitespace-nowrap btn-amoled-touch ${
                  category === cat.key
                    ? 'bg-[#222222] text-[#00E676] border-[#00E676]/60 font-semibold'
                    : 'bg-[#0E0E0E] text-[#777777] border-[#1C1C1C]'
                }`}
              >
                {cat.icone} {cat.nome}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col px-2 py-2">
        <Suspense fallback={<Loading />}>
          {mode === 'study' && (
            <StudyMode
              vocabList={filteredVocab}
              currentIndex={studyIndex}
              onIndexChange={setStudyIndex}
              isFavorite={!!currentStudyItem && stats.favoriteIds.includes(currentStudyItem.id)}
              onToggleFavorite={handleToggleFavorite}
              isLearned={!!currentStudyItem && stats.learnedIds.includes(currentStudyItem.id)}
              onToggleLearned={handleToggleLearned}
              autoPlay={autoPlay}
              onToggleAutoPlay={() => setAutoPlay(a => !a)}
            />
          )}
          {mode === 'match' && (
            <AssociationMode
              pool={filteredVocab}
              onCorrectAnswer={handleCorrect}
              onMistakeAnswer={handleMistake}
              currentStreak={stats.currentStreak}
            />
          )}
          {mode === 'quiz' && (
            <QuizMode
              allVocab={VOCABULARY_DATA}
              mistakeIds={stats.mistakeIds}
              currentStreak={stats.currentStreak}
              onCorrectAnswer={handleCorrect}
              onMistakeAnswer={handleMistake}
              onClearMistakes={handleClearMistakes}
            />
          )}
        </Suspense>
      </main>

      {isListOpen && (
        <Suspense fallback={null}>
          <VocabularyListModal
            isOpen={isListOpen}
            onClose={() => setIsListOpen(false)}
            vocabList={VOCABULARY_DATA}
            favoriteIds={stats.favoriteIds}
            learnedIds={stats.learnedIds}
            onSelectWord={handleSelectWord}
            onToggleFavorite={handleToggleFavorite}
            onToggleLearned={handleToggleLearned}
          />
        </Suspense>
      )}
    </div>
  );
}
