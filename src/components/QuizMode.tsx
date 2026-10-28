import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Snail,
  Check,
  X,
  Flame,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Trophy,
} from 'lucide-react';
import { VocabItem } from '../types';
import { createQuizQuestion, QuizQuestion, getToneInfo } from '../utils/quizLogic';
import { mandarinAudio } from '../utils/audio';

interface QuizModeProps {
  allVocab: VocabItem[];
  mistakeIds: string[];
  currentStreak: number;
  onCorrectAnswer: (vocabId: string) => void;
  onMistakeAnswer: (vocabId: string) => void;
  onClearMistakes: () => void;
}

export const QuizMode: React.FC<QuizModeProps> = ({
  allVocab,
  mistakeIds,
  currentStreak,
  onCorrectAnswer,
  onMistakeAnswer,
  onClearMistakes,
}) => {
  const [onlyMistakes, setOnlyMistakes] = useState(false);
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);

  // Active pool: either mistake words or full vocabulary
  const activePool = onlyMistakes
    ? allVocab.filter(item => mistakeIds.includes(item.id))
    : allVocab;

  const nextQuestion = () => {
    if (activePool.length < 4) {
      // Need at least 4 items, borrow distractors from allVocab if activePool has fewer
      if (activePool.length === 0) {
        setQuestion(null);
        return;
      }
      const randomTarget = activePool[Math.floor(Math.random() * activePool.length)];
      const q = createQuizQuestion(randomTarget, allVocab);
      setQuestion(q);
    } else {
      const randomTarget = activePool[Math.floor(Math.random() * activePool.length)];
      const q = createQuizQuestion(randomTarget, activePool);
      setQuestion(q);
    }

    setSelectedId(null);
    setIsAnswered(false);
    setIsCorrect(null);
  };

  useEffect(() => {
    nextQuestion();
  }, [onlyMistakes, allVocab]);

  // When question is audio-to-hanzi, auto-play speech
  useEffect(() => {
    if (question && question.type === 'audio_to_hanzi') {
      mandarinAudio.speak(question.target.hanzi, 1.0);
    }
  }, [question?.id]);

  const handleSelectOption = (option: VocabItem) => {
    if (isAnswered || !question) return;

    setSelectedId(option.id);
    setIsAnswered(true);

    const correct = option.id === question.target.id;
    setIsCorrect(correct);

    if (correct) {
      mandarinAudio.playSuccessSound();
      onCorrectAnswer(question.target.id);
      setQuizScore(prev => prev + 1);
      setQuizTotal(prev => prev + 1);
    } else {
      mandarinAudio.playErrorSound();
      onMistakeAnswer(question.target.id);
      setQuizTotal(prev => prev + 1);
      // Play audio of target to reinforce correct pronunciation
      setTimeout(() => {
        mandarinAudio.speak(question.target.hanzi, 0.8);
      }, 300);
    }
  };

  const playQuestionAudio = (rate = 1.0) => {
    if (question) {
      mandarinAudio.speak(question.target.hanzi, rate);
    }
  };

  if (onlyMistakes && mistakeIds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-white max-w-md mx-auto my-auto">
        <div className="w-16 h-16 rounded-full bg-[#00E676]/20 border border-[#00E676] flex items-center justify-center mb-4">
          <Trophy size={32} className="text-[#00E676]" />
        </div>
        <h3 className="text-xl font-bold mb-1">Nenhum erro pendente!</h3>
        <p className="text-sm text-[#B0B0B0] mb-5">
          Você revisou todas as palavras que errou anteriormente com sucesso.
        </p>
        <button
          type="button"
          onClick={() => setOnlyMistakes(false)}
          className="py-3 px-6 rounded-xl bg-white text-black font-bold text-sm btn-amoled-touch"
        >
          Voltar ao Treino Completo
        </button>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-[#B0B0B0]">
        <p className="text-sm">Carregando perguntas...</p>
      </div>
    );
  }

  const toneInfo = getToneInfo(question.target.tom);

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-2xl mx-auto px-3 py-1">
      {/* Top Header Controls: Filter "Revisar Erros", Score, Streak */}
      <div className="flex items-center justify-between mb-2">
        {/* Toggle Revisar Apenas Erradas */}
        <button
          type="button"
          onClick={() => setOnlyMistakes(!onlyMistakes)}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all btn-amoled-touch ${
            onlyMistakes
              ? 'bg-[#FF5252]/20 text-[#FF5252] border-[#FF5252]/60 font-semibold'
              : 'bg-[#111111] text-[#B0B0B0] border-[#262626] hover:text-white'
          }`}
          aria-label={onlyMistakes ? 'Treino geral' : 'Revisar apenas erradas'}
        >
          <AlertCircle size={14} className={onlyMistakes ? 'text-[#FF5252]' : 'text-[#888888]'} />
          <span>Erros ({mistakeIds.length})</span>
        </button>

        {/* Score & Streak */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-bold text-[#FF9100] bg-[#FF9100]/10 px-2.5 py-1 rounded-full border border-[#FF9100]/30">
            <Flame size={14} className="fill-[#FF9100]" />
            <span>{currentStreak}</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-mono font-bold text-white bg-[#111111] px-2.5 py-1 rounded-full border border-[#262626]">
            <span>{quizScore}/{quizTotal}</span>
          </div>
        </div>
      </div>

      {/* Question Card Box */}
      <div className="bg-[#0A0A0A] border border-[#222222] rounded-2xl p-4 mb-3 flex flex-col items-center justify-center text-center shadow-lg relative min-h-[170px]">
        {/* Question Type Tag */}
        <div className="absolute top-2.5 left-3 text-[10px] font-mono text-[#777777] uppercase tracking-wider flex items-center gap-1">
          <HelpCircle size={11} />
          <span>
            {question.type === 'audio_to_hanzi' ? 'Ouça e selecione o Hanzi' : 'Identifique o Significado'}
          </span>
        </div>

        {/* Dynamic Question Presentation */}
        {question.type === 'audio_to_hanzi' ? (
          <div className="flex flex-col items-center justify-center my-2">
            <button
              type="button"
              onClick={() => playQuestionAudio(1.0)}
              className="w-20 h-20 rounded-full bg-[#111111] border-2 border-[#00E676] hover:bg-[#1A1A1A] text-[#00E676] flex items-center justify-center shadow-[0_0_20px_rgba(0,230,118,0.25)] btn-amoled-touch mb-2"
              aria-label="Tocar áudio em mandarim"
            >
              <Volume2 size={36} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#B0B0B0]">Toque para ouvir novamente:</span>
              <button
                type="button"
                onClick={() => playQuestionAudio(0.65)}
                className="text-xs text-[#00E5FF] underline font-medium hover:text-white flex items-center gap-1"
              >
                <Snail size={12} />
                <span>Lento (0.65x)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Hanzi to PT: Giant Hanzi on screen */
          <div className="flex flex-col items-center justify-center my-1">
            <div className="font-hanzi text-6xl sm:text-7xl font-bold text-white tracking-wide">
              {question.target.hanzi}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-bold text-[#888888] font-sans-sc">
                {question.target.pinyin}
              </span>
              <button
                type="button"
                onClick={() => playQuestionAudio(1.0)}
                className="p-1 rounded-full text-[#00E676] hover:bg-[#1A1A1A]"
                title="Ouvir som"
              >
                <Volume2 size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Revealed info after user answers */}
        {isAnswered && (
          <div className="mt-2 text-xs font-semibold text-[#B0B0B0] flex items-center gap-2">
            <span className="text-xl">{question.target.icone}</span>
            <span className="text-white font-bold">{question.target.hanzi}</span>
            <span>({question.target.pinyin})</span>
            <span className="text-[#00E676]">➔ {question.target.traducao}</span>
          </div>
        )}
      </div>

      {/* 4 Quiz Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 mb-2">
        {question.options.map((option, idx) => {
          const isThisSelected = selectedId === option.id;
          const isTarget = option.id === question.target.id;

          let btnStyle = 'bg-[#0B0B0B] border-[#222222] text-white hover:border-[#444444]';

          if (isAnswered) {
            if (isTarget) {
              btnStyle = 'bg-[#00E676]/20 border-[#00E676] text-white shadow-[0_0_15px_rgba(0,230,118,0.3)] ring-2 ring-[#00E676]';
            } else if (isThisSelected && !isTarget) {
              btnStyle = 'bg-[#FF5252]/20 border-[#FF5252] text-white shadow-[0_0_15px_rgba(255,82,82,0.3)] ring-2 ring-[#FF5252]';
            } else {
              btnStyle = 'bg-black border-[#181818] opacity-35';
            }
          }

          return (
            <button
              key={`${option.id}_${idx}`}
              type="button"
              onClick={() => handleSelectOption(option)}
              disabled={isAnswered}
              className={`relative flex items-center justify-between p-3.5 rounded-xl border text-left transition-all btn-amoled-touch ${btnStyle}`}
              aria-label={`Opção ${idx + 1}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-[#181818] border border-[#2E2E2E] text-xs font-mono flex items-center justify-center text-[#888888]">
                  {String.fromCharCode(65 + idx)}
                </span>

                {question.type === 'audio_to_hanzi' ? (
                  /* Shows Hanzi + Pinyin in choices */
                  <div>
                    <span className="font-hanzi text-2xl font-bold text-white mr-2">
                      {option.hanzi}
                    </span>
                    <span className="text-xs text-[#888888] font-sans-sc">
                      {option.pinyin}
                    </span>
                  </div>
                ) : (
                  /* Shows Portuguese translation in choices */
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{option.icone}</span>
                    <span className="text-sm font-semibold text-white">
                      {option.traducao}
                    </span>
                  </div>
                )}
              </div>

              {/* Status indicator icon */}
              {isAnswered && isTarget && (
                <div className="bg-[#00E676] text-black rounded-full p-1">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
              {isAnswered && isThisSelected && !isTarget && (
                <div className="bg-[#FF5252] text-white rounded-full p-1">
                  <X size={14} strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Button to advance */}
      <div className="w-full pt-2 flex items-center justify-center">
        {isAnswered ? (
          <button
            type="button"
            onClick={nextQuestion}
            className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-bold text-sm btn-amoled-touch flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <span>Próxima Pergunta</span>
            <RotateCcw size={16} />
          </button>
        ) : (
          <p className="text-[11px] text-[#666666] text-center font-mono py-1">
            Selecione uma das 4 opções acima
          </p>
        )}
      </div>
    </div>
  );
};
