import React, { useRef, useState, useEffect } from 'react';
import { Eraser, PenTool, Eye, EyeOff, RotateCcw } from 'lucide-react';

interface TianzigeGridProps {
  hanzi: string;
  pinyin?: string;
  gridType?: 'tian' | 'mi';
  showHanziGuide?: boolean;
  onToggleGuide?: () => void;
  interactiveWriting?: boolean;
  className?: string;
}

export const TianzigeGrid: React.FC<TianzigeGridProps> = ({
  hanzi,
  gridType = 'mi',
  showHanziGuide = true,
  onToggleGuide,
  interactiveWriting = false,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [activeWritingMode, setActiveWritingMode] = useState(interactiveWriting);
  const [internalGuideVisible, setInternalGuideVisible] = useState(showHanziGuide);

  useEffect(() => {
    setInternalGuideVisible(showHanziGuide);
  }, [showHanziGuide]);

  // Adjust canvas size to match container
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#00E676'; // S-Pen / touch stroke in AMOLED vibrant green
      ctx.lineWidth = 4;
    }
  };

  useEffect(() => {
    if (activeWritingMode) {
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      return () => window.removeEventListener('resize', resizeCanvas);
    }
  }, [activeWritingMode, hanzi]);

  // Clear canvas whenever hanzi changes
  useEffect(() => {
    clearCanvas();
  }, [hanzi]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
    }
  };

  // Drawing event handlers for touch and stylus (S-Pen)
  const getCoordinates = (e: React.PointerEvent | React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ('clientX' in e) {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!activeWritingMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    const { x, y } = getCoordinates(e);
    
    // S-Pen / stylus pressure support
    const pressure = e.pressure && e.pressure > 0 ? e.pressure : 0.5;
    ctx.lineWidth = Math.max(2, Math.min(8, pressure * 8));

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !activeWritingMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (e.cancelable) {
      e.preventDefault();
    }

    const { x, y } = getCoordinates(e);

    // Adjust stroke width based on S-Pen pressure dynamically
    if (e.pressure && e.pressure > 0) {
      ctx.lineWidth = Math.max(2, Math.min(8, e.pressure * 8));
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className={`flex flex-col items-center justify-center relative select-none ${className}`}>
      {/* Tianzige Practice Box */}
      <div
        ref={containerRef}
        className="relative w-[min(65vw,220px)] h-[min(65vw,220px)] sm:w-[250px] sm:h-[250px] md:w-[280px] md:h-[280px] landscape:w-[145px] landscape:h-[145px] border-2 border-[#333333] bg-black rounded-xl overflow-hidden shadow-2xl flex items-center justify-center transition-all"
        style={{ aspectRatio: '1 / 1' }}
      >
        {/* SVG Grid Overlay (Tianzige / Mizige) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Border Accent (internal inset) */}
          <rect
            x="4"
            y="4"
            width="calc(100% - 8px)"
            height="calc(100% - 8px)"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1"
          />

          {/* Diagonals (米字格 Mizige) */}
          {gridType === 'mi' && (
            <>
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="#262626"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <line
                x1="100%"
                y1="0"
                x2="0"
                y2="100%"
                stroke="#262626"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
            </>
          )}

          {/* Vertical Center Line */}
          <line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            stroke="#262626"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />

          {/* Horizontal Center Line */}
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="#262626"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
        </svg>

        {/* Giant Hanzi Ideogram with character count and orientation awareness */}
        <div
          className={`font-hanzi select-none leading-none tracking-normal text-center whitespace-nowrap flex items-center justify-center transition-opacity duration-150 z-10 px-1 ${
            internalGuideVisible ? 'opacity-100 text-white' : 'opacity-10 text-[#555555]'
          }`}
          style={{
            fontSize:
              hanzi.length === 1
                ? 'clamp(4.2rem, min(18vw, 24vh), 7rem)'
                : hanzi.length === 2
                ? 'clamp(2.4rem, min(10vw, 15vh), 4.2rem)'
                : 'clamp(1.7rem, min(7vw, 11vh), 2.8rem)',
            textShadow: '0 0 1px rgba(255,255,255,0.4)',
            letterSpacing: hanzi.length > 1 ? '-0.04em' : 'normal',
          }}
          aria-label={`Caractere Hanzi ${hanzi}`}
        >
          {hanzi}
        </div>

        {/* Interactive Tracing Canvas (for S-Pen / touch finger) */}
        {activeWritingMode && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-20 touch-none cursor-crosshair"
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerCancel={stopDrawing}
          />
        )}

        {/* Status watermark inside grid */}
        <div className="absolute top-1.5 left-2 text-[9px] uppercase tracking-wider text-[#666666] font-mono font-medium pointer-events-none flex items-center gap-1">
          <span className="font-hanzi text-xs text-[#888888]">{gridType === 'mi' ? '米' : '田'}</span>
          <span>{gridType === 'mi' ? 'Mizige' : 'Tianzige'}</span>
        </div>
      </div>

      {/* Writing Tools Bar (Right under Tianzige for immediate thumb reach) */}
      <div className="mt-2.5 flex items-center justify-center gap-2 max-w-full px-2">
        <button
          type="button"
          onClick={() => {
            setActiveWritingMode(!activeWritingMode);
            if (!activeWritingMode) {
              setTimeout(resizeCanvas, 50);
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors btn-amoled-touch ${
            activeWritingMode
              ? 'bg-[#00E676] text-black border-[#00E676] font-semibold'
              : 'bg-black text-[#B0B0B0] border-[#262626] hover:text-white hover:border-[#444444]'
          }`}
          aria-label={activeWritingMode ? 'Desativar escrita S-Pen' : 'Ativar escrita S-Pen / Dedo'}
        >
          <PenTool size={13} />
          <span>{activeWritingMode ? 'Escrita S-Pen Ativa' : 'Traçar na Tela'}</span>
        </button>

        {activeWritingMode && (
          <button
            type="button"
            onClick={clearCanvas}
            disabled={!hasDrawn}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs border transition-colors btn-amoled-touch ${
              hasDrawn
                ? 'bg-black text-[#FF5252] border-[#333333] hover:bg-[#111111]'
                : 'bg-black text-[#444444] border-[#1F1F1F] cursor-not-allowed'
            }`}
            aria-label="Limpar traço"
          >
            <RotateCcw size={13} />
            <span>Limpar</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            const next = !internalGuideVisible;
            setInternalGuideVisible(next);
            if (onToggleGuide) onToggleGuide();
          }}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-black text-[#B0B0B0] border border-[#262626] hover:text-white hover:border-[#444444] btn-amoled-touch"
          aria-label={internalGuideVisible ? 'Ocultar guia de traço' : 'Mostrar guia de traço'}
          title="Oculte para praticar de memória"
        >
          {internalGuideVisible ? <EyeOff size={13} /> : <Eye size={13} />}
          <span>{internalGuideVisible ? 'Guia ON' : 'Guia OFF'}</span>
        </button>
      </div>
    </div>
  );
};
