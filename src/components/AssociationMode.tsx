import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Snail, Check, X, Flame, RotateCcw, Award } from 'lucide-react';
import { VocabItem } from '../types';
import { pickAnswerOptions, getToneInfo } from '../utils/quizLogic';
import { mandarinAudio } from '../utils/audio';

interface AssociationModeProps {
  pool: VocabItem[];
  onCorrectAnswer: (vocabId: string) => void;
  onMistakeAnswer: (vocabId: string) => void;
  currentStreak: number;
}

export const AssociationMode: React.FC<AssociationModeProps> = ({
  pool,
  onCorrectAnswer,
  onMistakeAnswer,
  currentStreak,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<VocabItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const target = pool[currentIndex] || pool[0];
  const toneInfo = target ? getToneInfo(target.tom) : null;

  // Setup options and auto-speak when target changes
  useEffect(() => {
    if (!target || pool.length < 4) return;
    const newOptions = pickAnswerOptions(target, pool, 4);
    setOptions(newOptions);
    setSelectedId(null);
    setIsAnswered(false);
    setIsCorrect(null);

    // Auto-speak target in high and clear standard Mandarin
    mandarinAudio.speak(target.hanzi, 1.0);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, target?.id, pool.length]);

  const handleCardClick = (option: VocabItem) => {
    if (isAnswered) return;

    setSelectedId(option.id);
    setIsAnswered(true);

    const correct = option.id === target.id;
    setIsCorrect(correct);

    if (correct) {
      mandarinAudio.playSuccessSound();
      onCorrectAnswer(target.id);
      setSessionScore(prev => prev + 1);
      setSessionCount(prev => prev + 1);

      // Advances automatically after 1 second
      timerRef.current = setTimeout(() => {
        handleNextCard();
      }, 1000);
    } else {
      mandarinAudio.playErrorSound();
      onMistakeAnswer(target.id);
      setSessionCount(prev => prev + 1);

      // Repeat speech in Mandarin
      timerRef.current = setTimeout(() => {
        mandarinAudio.speak(target.hanzi, 0.8);
      }, 300);
    }
  };

  const handleNextCard = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (pool.length <= 1) return;
    let nextIdx = Math.floor(Math.random() * pool.length);
    if (nextIdx === currentIndex) {
      nextIdx = (nextIdx + 1) % pool.length;
    }
    setCurrentIndex(nextIdx);
  };

  const handleReplayNormal = () => {
    if (target) {
      mandarinAudio.speak(target.hanzi, 1.0);
    }
  };

  const handleReplaySlow = () => {
    if (target) {
      mandarinAudio.speak(target.hanzi, 0.65);
    }
  };

  if (!target || pool.length < 4) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-[#B0B0B0]">
        <p className="text-sm">Selecione uma categoria com pelo menos 4 palavras para o modo Associação.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-2xl mx-auto px-3 py-1">
      {/* Top Header: Score & Streak */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#888888]">
            Associação • Som, Hanzi e Imagem
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Streak indicator */}
          <div className="flex items-center gap-1 text-xs font-bold text-[#FF9100] bg-[#FF9100]/10 px-2.5 py-1 rounded-full border border-[#FF9100]/30">
            <Flame size={14} className="fill-[#FF9100]" />
            <span>{currentStreak}</span>
          </div>

          {/* Session score */}
          <div className="flex items-center gap-1 text-xs font-mono font-bold text-white bg-[#111111] px-2.5 py-1 rounded-full border border-[#262626]">
            <span>{sessionScore}/{sessionCount}</span>
          </div>
        </div>
      </div>

      {/* Target Word Display (Hanzi + Pinyin + Audio Replay Buttons) */}
      <div className="bg-[#0A0A0A] border border-[#222222] rounded-2xl p-4 mb-3 flex flex-col items-center justify-center text-center shadow-lg relative">
        {/* Tone indicator pill */}
        {toneInfo && (
          <span
            className="absolute top-2.5 right-3 text-[10px] font-mono font-semibold px-2 py-0.5 rounded"
            style={{
              backgroundColor: `${toneInfo.color}15`,
              color: toneInfo.color,
              border: `1px solid ${toneInfo.color}44`,
            }}
          >
            {toneInfo.shortName}
          </span>
        )}

        {/* Big Hanzi */}
        <div className="font-hanzi text-6xl sm:text-7xl font-bold text-white tracking-wide my-1">
          {target.hanzi}
        </div>

        {/* Pinyin */}
        <div className="text-2xl font-bold text-[#B0B0B0] font-sans-sc">
          {target.pinyin}
        </div>

        {/* Immediate Audio Playback buttons */}
        <div className="flex items-center gap-2 mt-3">
          <button
            type="button"
            onClick={handleReplayNormal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#151515] border border-[#333333] hover:border-[#00E676] text-white text-xs font-semibold btn-amoled-touch"
            aria-label="Repetir áudio normal"
          >
            <Volume2 size={15} className="text-[#00E676]" />
            <span>Repetir (1.0x)</span>
          </button>

          <button
            type="button"
            onClick={handleReplaySlow}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151515] border border-[#333333] hover:border-[#00E5FF] text-[#B0B0B0] hover:text-white text-xs font-medium btn-amoled-touch"
            aria-label="Repetir áudio lento"
          >
            <Snail size={15} className="text-[#00E5FF]" />
            <span>Lento (0.65x)</span>
          </button>
        </div>
      </div>

      {/* 4 Large Visual Cards (associação visual) */}
      <div className="grid grid-cols-2 gap-3 flex-1 items-stretch my-1">
        {options.map((option, idx) => {
          const isThisSelected = selectedId === option.id;
          const isTarget = option.id === target.id;

          let cardStyle = 'bg-[#0B0B0B] border-[#222222] text-white hover:border-[#444444]';

          if (isAnswered) {
            if (isTarget) {
              // Correct option always highlighted green
              cardStyle = 'bg-[#00E676]/15 border-[#00E676] text-white shadow-[0_0_20px_rgba(0,230,118,0.3)] ring-2 ring-[#00E676]';
            } else if (isThisSelected && !isTarget) {
              // Wrong selected option highlighted red
              cardStyle = 'bg-[#FF5252]/15 border-[#FF5252] text-white shadow-[0_0_20px_rgba(255,82,82,0.3)] ring-2 ring-[#FF5252]';
            } else {
              cardStyle = 'bg-black border-[#181818] opacity-35';
            }
          }

          return (
            <button
              key={`${option.id}_${idx}`}
              type="button"
              onClick={() => handleCardClick(option)}
              disabled={isAnswered && isCorrect === true}
              className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border transition-all btn-amoled-touch min-h-[110px] sm:min-h-[140px] select-none ${cardStyle}`}
              aria-label={`Opção ${option.traducao}`}
            >
              {/* Option Number Tag */}
              <span className="absolute top-2 left-2 text-[10px] font-mono text-[#555555]">
                #{idx + 1}
              </span>

              {/* Status Icon Indicator */}
              {isAnswered && isTarget && (
                <div className="absolute top-2 right-2 bg-[#00E676] text-black rounded-full p-1">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
              {isAnswered && isThisSelected && !isTarget && (
                <div className="absolute top-2 right-2 bg-[#FF5252] text-white rounded-full p-1">
                  <X size={14} strokeWidth={3} />
                </div>
              )}

              {/* Big High-Resolution Emoji/Visual Symbol */}
              <div className="text-5xl sm:text-6xl mb-1 filter drop-shadow select-none">
                {option.icone}
              </div>

              {/* Meaning clue shown after answer or subtitled */}
              <span
                className={`text-xs sm:text-sm font-semibold tracking-wide text-center leading-tight transition-opacity ${
                  isAnswered ? 'opacity-100 text-white' : 'text-[#888888]'
                }`}
              >
                {option.traducao}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Manual Next Button if needed on mistake */}
      <div className="w-full pt-2 flex items-center justify-center">
        {isAnswered && !isCorrect ? (
          <button
            type="button"
            onClick={handleNextCard}
            className="w-full py-3 px-6 rounded-xl bg-white text-black font-bold text-sm btn-amoled-touch flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <span>Tentar Próxima Palavra</span>
            <RotateCcw size={16} />
          </button>
        ) : (
          <p className="text-[11px] text-[#666666] text-center font-mono py-1">
            Toque na imagem correspondente ao som e ideograma
          </p>
        )}
      </div>
    </div>
  );
};
