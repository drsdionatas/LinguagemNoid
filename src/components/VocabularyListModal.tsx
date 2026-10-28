import React, { useState } from 'react';
import { Search, X, Volume2, Star, CheckCircle, Sparkles } from 'lucide-react';
import { VocabItem, CategoryKey } from '../types';
import { CATEGORIES } from '../data/vocabulary';
import { mandarinAudio } from '../utils/audio';

const normalizeText = (text: string) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

interface VocabularyListModalProps {
  isOpen: boolean;
  onClose: () => void;
  vocabList: VocabItem[];
  favoriteIds: string[];
  learnedIds: string[];
  onSelectWord: (word: VocabItem) => void;
  onToggleFavorite: (id: string) => void;
  onToggleLearned: (id: string) => void;
}

export const VocabularyListModal: React.FC<VocabularyListModalProps> = ({
  isOpen,
  onClose,
  vocabList,
  favoriteIds,
  learnedIds,
  onSelectWord,
  onToggleFavorite,
  onToggleLearned,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<CategoryKey>('todas');
  const [filterType, setFilterType] = useState<'all' | 'favorites' | 'learned'>('all');

  if (!isOpen) return null;

  const filtered = vocabList.filter(item => {
    // Category filter
    if (filterCategory !== 'todas' && item.categoria !== filterCategory) {
      return false;
    }
    // Type filter
    if (filterType === 'favorites' && !favoriteIds.includes(item.id)) {
      return false;
    }
    if (filterType === 'learned' && !learnedIds.includes(item.id)) {
      return false;
    }
    // Search query
    if (searchTerm.trim() !== '') {
      const raw = searchTerm.trim();
      const term = normalizeText(raw);
      return (
        item.hanzi.includes(raw) ||
        normalizeText(item.pinyin).replace(/\s+/g, '').includes(term.replace(/\s+/g, '')) ||
        normalizeText(item.traducao).includes(term)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col justify-end sm:justify-center sm:items-center p-0 sm:p-4 fade-in duration-200">
      <div className="w-full sm:max-w-2xl h-[92vh] sm:h-[85vh] bg-[#0A0A0A] border-t sm:border border-[#262626] sm:rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-[#1E1E1E] flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>Banco de Vocabulário</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#1A1A1A] text-[#00E676] font-mono">
                {vocabList.length} palavras
              </span>
            </h2>
            <p className="text-xs text-[#888888]">
              {learnedIds.length} aprendidas • {favoriteIds.length} favoritas
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-[#141414] border border-[#2E2E2E] text-[#B0B0B0] hover:text-white btn-amoled-touch"
            aria-label="Fechar lista"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-3 border-b border-[#1A1A1A] space-y-2 bg-black">
          {/* Search Input */}
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666666]" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar por Hanzi, Pinyin ou Português..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121212] border border-[#2A2A2A] text-white placeholder-[#666666] text-xs focus:outline-none focus:border-[#00E676]"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888888]"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Type Selector (Todos / Favoritos / Aprendidas) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap btn-amoled-touch ${
                filterType === 'all'
                  ? 'bg-white text-black border-white'
                  : 'bg-[#111111] text-[#888888] border-[#222222]'
              }`}
            >
              Todos ({vocabList.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('favorites')}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap flex items-center gap-1 btn-amoled-touch ${
                filterType === 'favorites'
                  ? 'bg-[#FFD600] text-black border-[#FFD600]'
                  : 'bg-[#111111] text-[#888888] border-[#222222]'
              }`}
            >
              <Star size={12} fill={filterType === 'favorites' ? 'black' : 'none'} />
              <span>Favoritos ({favoriteIds.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterType('learned')}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap flex items-center gap-1 btn-amoled-touch ${
                filterType === 'learned'
                  ? 'bg-[#00E676] text-black border-[#00E676]'
                  : 'bg-[#111111] text-[#888888] border-[#222222]'
              }`}
            >
              <CheckCircle size={12} />
              <span>Aprendidas ({learnedIds.length})</span>
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setFilterCategory(cat.key as CategoryKey)}
                className={`text-[11px] px-2.5 py-1 rounded-md border whitespace-nowrap btn-amoled-touch ${
                  filterCategory === cat.key
                    ? 'bg-[#222222] text-[#00E676] border-[#00E676]/60 font-semibold'
                    : 'bg-[#0E0E0E] text-[#777777] border-[#1C1C1C]'
                }`}
              >
                <span>{cat.icone} {cat.nome}</span>
              </button>
            ))}
          </div>
        </div>

        {/* List of Words */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[#666666] text-xs">
              Nenhuma palavra encontrada com esses filtros.
            </div>
          ) : (
            filtered.map(item => {
              const isFav = favoriteIds.includes(item.id);
              const isLrn = learnedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="p-3 bg-[#0D0D0D] border border-[#1E1E1E] rounded-xl flex items-center justify-between hover:border-[#333333] transition-colors"
                >
                  {/* Left: Tap to study this word */}
                  <div
                    onClick={() => {
                      onSelectWord(item);
                      onClose();
                    }}
                    className="flex items-center gap-3 flex-1 cursor-pointer"
                  >
                    <span className="text-2xl filter drop-shadow">{item.icone}</span>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-hanzi text-xl font-bold text-white">
                          {item.hanzi}
                        </span>
                        <span className="text-xs font-semibold text-[#888888]">
                          {item.pinyin}
                        </span>
                      </div>
                      <p className="text-xs text-[#00E676] font-medium leading-tight">
                        {item.traducao}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions: Audio, Fav, Learned */}
                  <div className="flex items-center gap-1.5 ml-2">
                    <button
                      type="button"
                      onClick={() => mandarinAudio.speak(item.hanzi, 1.0)}
                      className="p-2 rounded-lg bg-[#141414] border border-[#262626] text-[#00E676] hover:bg-[#1C1C1C] btn-amoled-touch"
                      title="Ouvir pronúncia"
                    >
                      <Volume2 size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleFavorite(item.id)}
                      className={`p-2 rounded-lg border btn-amoled-touch ${
                        isFav
                          ? 'bg-[#FFD600]/20 text-[#FFD600] border-[#FFD600]/60'
                          : 'bg-[#141414] text-[#555555] border-[#262626]'
                      }`}
                      title="Favoritar"
                    >
                      <Star size={15} fill={isFav ? '#FFD600' : 'none'} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleLearned(item.id)}
                      className={`p-2 rounded-lg border btn-amoled-touch ${
                        isLrn
                          ? 'bg-[#00E676]/20 text-[#00E676] border-[#00E676]/60'
                          : 'bg-[#141414] text-[#555555] border-[#262626]'
                      }`}
                      title="Marcar como aprendida"
                    >
                      <CheckCircle size={15} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
