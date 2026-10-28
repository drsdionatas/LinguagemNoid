import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Star,
  CheckCircle,
  Eye,
  EyeOff,
  Grid,
  Bookmark,
  Sparkles,
} from 'lucide-react';
import { VocabItem } from '../types';
import { TianzigeGrid } from './TianzigeGrid';
import { AudioControls } from './AudioControls';
import { mandarinAudio } from '../utils/audio';

interface StudyModeProps {
  vocabList: VocabItem[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isLearned: boolean;
  onToggleLearned: (id: string) => void;
  autoPlay: boolean;
  onToggleAutoPlay: () => void;
}

export const StudyMode: React.FC<StudyModeProps> = ({
  vocabList,
  currentIndex,
  onIndexChange,
  isFavorite,
  onToggleFavorite,
  isLearned,
  onToggleLearned,
  autoPlay,
  onToggleAutoPlay,
}) => {
  const [hidePinyinAndTranslation, setHidePinyinAndTranslation] = useState(false);
  const [gridType, setGridType] = useState<'tian' | 'mi'>('mi');

  const currentItem = vocabList[currentIndex] || vocabList[0];

  // Auto-play pronunciation when item changes if enabled
  useEffect(() => {
    if (autoPlay && currentItem) {
      mandarinAudio.speak(currentItem.hanzi, 1.0);
    }
  }, [currentItem?.id, autoPlay]);

  const handlePrev = () => {
    if (vocabList.length === 0) return;
    const nextIdx = (currentIndex - 1 + vocabList.length) % vocabList.length;
    onIndexChange(nextIdx);
  };

  const handleNext = () => {
    if (vocabList.length === 0) return;
    const nextIdx = (currentIndex + 1) % vocabList.length;
    onIndexChange(nextIdx);
  };

  const handleShuffle = () => {
    if (vocabList.length <= 1) return;
    let randomIdx = Math.floor(Math.random() * vocabList.length);
    if (randomIdx === currentIndex) {
      randomIdx = (randomIdx + 1) % vocabList.length;
    }
    onIndexChange(randomIdx);
  };

  if (!currentItem) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-[#B0B0B0]">
        <p className="text-sm">Nenhuma palavra encontrada nesta categoria.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-4xl mx-auto overflow-hidden min-h-0">
      {/* ========================================================
          RESPONSIVE CONTENT:
          - In Landscape: 2 columns (50% left Tianzige, 50% right Details)
          - In Portrait: Vertical stack optimized for mobile
         ======================================================== */}
      <div className="flex-1 flex flex-col landscape:flex-row landscape:items-center landscape:justify-center landscape:gap-4 landscape:overflow-hidden min-h-0 overflow-y-auto pb-4 landscape:pb-0">
        
        {/* LEFT COLUMN (Landscape) / TOP (Portrait): Tianzige Calligraphy Box */}
        <div className="flex flex-col items-center justify-center pt-1 pb-1 landscape:w-1/2 landscape:h-full landscape:overflow-y-auto landscape:justify-center">
          {/* Header Bar above Tianzige */}
          <div className="w-full max-w-[320px] sm:max-w-[360px] flex items-center justify-between px-1 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] whitespace-nowrap truncate mr-2">
              {currentItem.categoriaNome} • {currentIndex + 1}/{vocabList.length}
            </span>

            <div className="flex items-center gap-1.5">
              {/* Grid Toggle: Tianzige vs Mizige */}
              <button
                type="button"
                onClick={() => setGridType(gridType === 'mi' ? 'tian' : 'mi')}
                className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-[#111111] border border-[#262626] text-[#B0B0B0] hover:text-white btn-amoled-touch"
                title="Alternar entre 田字格 e 米字格"
              >
                <Grid size={11} />
                <span>{gridType === 'mi' ? '米字格' : '田字格'}</span>
              </button>

              {/* Hide Pinyin / Translation for Reading Test */}
              <button
                type="button"
                onClick={() => setHidePinyinAndTranslation(!hidePinyinAndTranslation)}
                className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded border transition-colors btn-amoled-touch ${
                  hidePinyinAndTranslation
                    ? 'bg-[#FFD600]/20 text-[#FFD600] border-[#FFD600]/50'
                    : 'bg-[#111111] text-[#B0B0B0] border-[#262626]'
                }`}
                title="Ocultar Pinyin e Tradução para testar leitura pura do Hanzi"
              >
                {hidePinyinAndTranslation ? <EyeOff size={11} /> : <Eye size={11} />}
                <span>{hidePinyinAndTranslation ? 'Leitura Pura' : 'Normal'}</span>
              </button>
            </div>
          </div>

          {/* Authentic Tianzige / Mizige Practice Box */}
          <TianzigeGrid
            hanzi={currentItem.hanzi}
            pinyin={currentItem.pinyin}
            gridType={gridType}
          />
        </div>

        {/* RIGHT COLUMN (Landscape) / MIDDLE & BOTTOM (Portrait): Details & Audio */}
        <div className="flex-1 flex flex-col justify-start px-2 pb-1 landscape:w-1/2 landscape:h-full landscape:overflow-y-auto landscape:space-y-2">
          
          {/* Center Card: Pinyin, Translation, Icon & Usage */}
          <div className="bg-[#0A0A0A] border border-[#222222] rounded-2xl p-3 my-1 shadow-lg relative overflow-hidden">
            {/* Visual association icon & category badge */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-3xl filter drop-shadow" role="img" aria-label={currentItem.traducao}>
                  {currentItem.icone}
                </span>
                <div>
                  {/* Pinyin with tone marks */}
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-2xl font-bold tracking-wide transition-all ${
                        hidePinyinAndTranslation
                          ? 'blur-sm select-none opacity-20'
                          : 'text-white'
                      }`}
                    >
                      {currentItem.pinyin}
                    </span>
                  </div>
                  {/* Portuguese Translation */}
                  <p
                    className={`text-base font-semibold leading-snug transition-all ${
                      hidePinyinAndTranslation
                        ? 'blur-sm select-none opacity-20'
                        : 'text-[#00E676]'
                    }`}
                  >
                    {currentItem.traducao}
                  </p>
                </div>
              </div>

              {/* Action Quick Badges (Favorite & Learned) */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onToggleFavorite(currentItem.id)}
                  className={`p-2 rounded-xl border transition-colors btn-amoled-touch ${
                    isFavorite
                      ? 'bg-[#FFD600]/20 text-[#FFD600] border-[#FFD600]/60'
                      : 'bg-black text-[#666666] border-[#222222] hover:text-white'
                  }`}
                  aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  <Star size={16} fill={isFavorite ? '#FFD600' : 'none'} />
                </button>

                <button
                  type="button"
                  onClick={() => onToggleLearned(currentItem.id)}
                  className={`p-2 rounded-xl border transition-colors btn-amoled-touch ${
                    isLearned
                      ? 'bg-[#00E676]/20 text-[#00E676] border-[#00E676]/60'
                      : 'bg-black text-[#666666] border-[#222222] hover:text-white'
                  }`}
                  aria-label={isLearned ? 'Desmarcar como aprendida' : 'Marcar como aprendida'}
                >
                  <CheckCircle size={16} />
                </button>
              </div>
            </div>

            {/* Hidden reveal tap area if user hid translation */}
            {hidePinyinAndTranslation && (
              <button
                type="button"
                onClick={() => setHidePinyinAndTranslation(false)}
                className="w-full mt-2 py-1.5 px-3 bg-[#111111] hover:bg-[#181818] border border-dashed border-[#444444] rounded-lg text-xs text-[#FFD600] text-center"
              >
                👁️ Toque para revelar Pinyin e Significado
              </button>
            )}

            {/* Context & Example sentence for real-world usage */}
            {!hidePinyinAndTranslation && currentItem.exemplo_curto && (
              <div className="mt-2 pt-2 border-t border-[#1A1A1A] text-left">
                <div className="flex items-center gap-1 text-[11px] text-[#888888] font-medium mb-1">
                  <Sparkles size={11} className="text-[#00E676]" />
                  <span>Exemplo Cotidiano</span>
                </div>
                <p className="font-hanzi text-sm text-white font-medium leading-relaxed">
                  {currentItem.exemplo_curto.hanzi}
                </p>
                <p className="text-xs text-[#B0B0B0] font-pinyin leading-normal">
                  {currentItem.exemplo_curto.pinyin}
                </p>
                <p className="text-xs text-[#00E676] mt-0.5 font-medium leading-tight">
                  {currentItem.exemplo_curto.traducao}
                </p>
              </div>
            )}

            {/* Radical & Etymology dica if available */}
            {!hidePinyinAndTranslation && (currentItem.radical || currentItem.dica) && (
              <div className="mt-2 text-[10px] text-[#777777] bg-black/60 p-2 rounded-lg border border-[#1A1A1A] leading-relaxed">
                {currentItem.radical && <span className="text-[#B0B0B0] font-medium">Radical: {currentItem.radical} • </span>}
                {currentItem.dica && <span>{currentItem.dica}</span>}
              </div>
            )}
          </div>

          {/* Audio Controls (Voz Normal 1.0x & Voz Lenta 0.65x + Tone Contour) */}
          <AudioControls
            hanzi={currentItem.hanzi}
            tom={currentItem.tom}
            autoPlay={autoPlay}
            onToggleAutoPlay={onToggleAutoPlay}
          />
        </div>
      </div>

      {/* ========================================================
          BOTTOM THUMB-REACHABLE NAVIGATION BAR (mobile)
         ======================================================== */}
      <div className="w-full pt-1 pb-1 px-3 bg-black/95 border-t border-[#1A1A1A] flex items-center justify-between gap-3 shrink-0">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#111111] border border-[#262626] text-white hover:bg-[#1A1A1A] hover:border-[#444444] text-sm font-semibold btn-amoled-touch"
          aria-label="Palavra anterior"
        >
          <ChevronLeft size={20} />
          <span>Anterior</span>
        </button>

        {/* Shuffle Random Button */}
        <button
          type="button"
          onClick={handleShuffle}
          className="p-3 rounded-xl bg-[#111111] border border-[#262626] text-[#B0B0B0] hover:text-white hover:border-[#444444] btn-amoled-touch"
          aria-label="Aleatório (Misturar palavras)"
          title="Palavra aleatória"
        >
          <Shuffle size={18} />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-black hover:bg-[#E0E0E0] text-sm font-bold btn-amoled-touch shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          aria-label="Próxima palavra"
        >
          <span>Próxima</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
