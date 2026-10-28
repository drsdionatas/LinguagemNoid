/**
 * Utilitário de Áudio para Chinês Mandarim (zh-CN)
 * Configurado estritamente com volume máximo (1.0), vozes zh-CN nativas,
 * velocidades Normal (1.0x) e Lenta (0.65x), e sintetizador Web Audio para feedback tátil sonoro.
 */

class MandarinAudioEngine {
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private audioCtx: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoice();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoice();
      }
    }
  }

  private loadVoice() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize high-quality zh-CN voices (Google 普通话, Tingting, Xiaoyan, etc.)
    const zhVoices = voices.filter(v => v.lang === 'zh-CN' || v.lang.startsWith('zh'));
    const preferred = zhVoices.find(v => 
      v.lang === 'zh-CN' && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Enhanced'))
    );
    this.selectedVoice = preferred || zhVoices.find(v => v.lang === 'zh-CN') || zhVoices[0] || null;
  }

  public speak(text: string, rate: number = 1.0, onEnd?: () => void) {
    if (typeof window === 'undefined') return;
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    try {
      this.synth.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.volume = 1.0; // Volume máximo
      utterance.rate = rate * 0.75;
      utterance.pitch = 1.0;

      if (!this.selectedVoice) {
        this.loadVoice();
      }
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      if (onEnd) {
        utterance.onend = () => onEnd();
        utterance.onerror = () => onEnd();
      }

      this.synth.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis error:', err);
      if (onEnd) onEnd();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // Web Audio feedback chimes for instant tactile response
  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public playSuccessSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    // Sucess chime: Major triad (E5 -> G#5 -> B5)
    [659.25, 830.61, 987.77].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.2, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  }

  public playErrorSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Error: gentle low double pulse
    [240, 180].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.25, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.2);
    });
  }

  /** Libera recursos de áudio quando o app vai para segundo plano (economia de bateria). */
  public pause() {
    this.stop();
    if (this.audioCtx && this.audioCtx.state === 'running') {
      this.audioCtx.suspend().catch(() => undefined);
    }
  }
}

export const mandarinAudio = new MandarinAudioEngine();
