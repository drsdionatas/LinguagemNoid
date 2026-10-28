import React, { useState } from 'react';
import { Volume2, Snail, Check, VolumeX } from 'lucide-react';
import { mandarinAudio } from '../utils/audio';
import { getToneInfo } from '../utils/quizLogic';

interface AudioControlsProps {
  hanzi: string;
  tom: number;
  autoPlay: boolean;
  onToggleAutoPlay: () => void;
  className?: string;
  compact?: boolean;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  hanzi,
  tom,
  autoPlay,
  onToggleAutoPlay,
  className = '',
  compact = false,
}) => {
  const [isPlayingNormal, setIsPlayingNormal] = useState(false);
  const [isPlayingSlow, setIsPlayingSlow] = useState(false);

  const toneInfo = getToneInfo(tom);

  const handlePlayNormal = () => {
    setIsPlayingNormal(true);
    mandarinAudio.speak(hanzi, 1.0, () => {
      setIsPlayingNormal(false);
    });
  };

  const handlePlaySlow = () => {
    setIsPlayingSlow(true);
    mandarinAudio.speak(hanzi, 0.65, () => {
      setIsPlayingSlow(false);
    });
  };

  return (
    <div className={`w-full flex flex-col gap-2.5 ${className}`}>
      {/* Tone Visualizer Pill */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#0F0F0F] rounded-xl border border-[#222222]">
        <div className="flex items-center gap-2">
          {/* Tone Contour SVG Curve */}
          <div
            className="w-7 h-6 rounded flex items-center justify-center bg-black border border-[#262626]"
            title={`Contorno de pitch: ${toneInfo.contour}`}
          >
            <svg width="24" height="20" viewBox="0 0 32 32" className="overflow-visible">
              <path
                d={toneInfo.iconPitch}
                fill="none"
                stroke={toneInfo.color}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white tracking-wide">
                {toneInfo.shortName}
              </span>
              <span
                className="text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold"
                style={{
                  backgroundColor: `${toneInfo.color}22`,
                  color: toneInfo.color,
                  border: `1px solid ${toneInfo.color}55`,
                }}
              >
                Tom {toneInfo.number === 0 ? '0' : toneInfo.number} ({toneInfo.contour})
              </span>
            </div>
            <p className="text-[10px] text-[#A0A0A0] leading-none mt-0.5">
              {toneInfo.description}
            </p>
          </div>
        </div>

        {/* Auto-Play Switcher */}
        <button
          type="button"
          onClick={onToggleAutoPlay}
          className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border transition-colors btn-amoled-touch ${
            autoPlay
              ? 'bg-[#152518] text-[#00E676] border-[#00E676]/40'
              : 'bg-black text-[#777777] border-[#262626] hover:text-[#B0B0B0]'
          }`}
          aria-label={autoPlay ? 'Auto-play ativado' : 'Auto-play desativado'}
        >
          {autoPlay ? <Volume2 size={12} /> : <VolumeX size={12} />}
          <span>Auto {autoPlay ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Two Direct Audio Buttons: Normal 1.0x & Slow 0.65x */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Normal Voice (1.0x) */}
        <button
          type="button"
          onClick={handlePlayNormal}
          className={`relative flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border text-sm font-semibold transition-all btn-amoled-touch ${
            isPlayingNormal
              ? 'bg-[#00E676] text-black border-[#00E676] shadow-[0_0_15px_rgba(0,230,118,0.4)]'
              : 'bg-[#111111] text-white border-[#2A2A2A] hover:border-[#00E676]/60 hover:bg-[#181818]'
          }`}
          aria-label={`Pronúncia normal de ${hanzi}`}
        >
          <Volume2 size={18} className={isPlayingNormal ? 'animate-pulse text-black' : 'text-[#00E676]'} />
          <div className="flex flex-col text-left leading-tight">
            <span className="text-sm font-bold">Voz Normal</span>
            <span className={`text-[10px] font-normal ${isPlayingNormal ? 'text-black/80' : 'text-[#888888]'}`}>
              1.0x • Alta e Clara
            </span>
          </div>
        </button>

        {/* Slow Voice (0.65x) */}
        <button
          type="button"
          onClick={handlePlaySlow}
          className={`relative flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border text-sm font-semibold transition-all btn-amoled-touch ${
            isPlayingSlow
              ? 'bg-[#00E5FF] text-black border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.4)]'
              : 'bg-[#111111] text-white border-[#2A2A2A] hover:border-[#00E5FF]/60 hover:bg-[#181818]'
          }`}
          aria-label={`Pronúncia lenta de ${hanzi} para identificar o tom`}
        >
          <Snail size={18} className={isPlayingSlow ? 'animate-pulse text-black' : 'text-[#00E5FF]'} />
          <div className="flex flex-col text-left leading-tight">
            <span className="text-sm font-bold">Voz Lenta</span>
            <span className={`text-[10px] font-normal ${isPlayingSlow ? 'text-black/80' : 'text-[#888888]'}`}>
              0.65x • Entonação
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
