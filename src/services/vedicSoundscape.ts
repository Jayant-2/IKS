/**
 * Vedic Ambient Soundscape Generator using Web Audio API
 * Generates an ethereal, meditative Tanpura-style sacred acoustic drone
 * tuned to 432Hz harmonic resonance (Sa, Pa, Sub-Sa, and celestial harmonics).
 */

class VedicSoundscapeService {
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private lfos: OscillatorNode[] = [];
  private isPlaying: boolean = false;
  private listeners: Set<(playing: boolean) => void> = new Set();

  constructor() {
    // AudioContext will be initialized on first user interaction per browser policy
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  private initAudio() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public start() {
    if (this.isPlaying) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;

      // Master Gain for smooth crossfade
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0, now);
      this.masterGain.gain.linearRampToValueAtTime(0.18, now + 2.5); // Soft, gentle ambient volume

      // Master Biquad Lowpass filter for warm temple tone
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(880, now);
      filter.Q.setValueAtTime(2.2, now);

      // Reverb / spatial ambience simulation using delay & feedback
      const delay = this.audioCtx.createDelay();
      delay.delayTime.setValueAtTime(0.35, now);
      const feedback = this.audioCtx.createGain();
      feedback.gain.setValueAtTime(0.38, now);
      delay.connect(feedback);
      feedback.connect(delay);

      this.masterGain.connect(filter);
      filter.connect(this.audioCtx.destination);
      filter.connect(delay);
      delay.connect(filter);

      this.oscillators = [];
      this.lfos = [];

      // Harmonic Sacred Frequencies:
      // 108Hz (Deep Sub-Sa OM foundation)
      // 216Hz (Warm lower Sa)
      // 324Hz (Pa / Perfect Fifth harmonic)
      // 432Hz (Vedic Natural Fundamental Sa)
      // 648Hz (Upper Pa Shimmer)
      const droneLayers = [
        { freq: 108, gain: 0.35, type: 'sine' as OscillatorType, lfoFreq: 0.08 },
        { freq: 216, gain: 0.28, type: 'sine' as OscillatorType, lfoFreq: 0.12 },
        { freq: 324, gain: 0.20, type: 'triangle' as OscillatorType, lfoFreq: 0.15 },
        { freq: 432, gain: 0.30, type: 'sine' as OscillatorType, lfoFreq: 0.10 },
        { freq: 648, gain: 0.12, type: 'triangle' as OscillatorType, lfoFreq: 0.18 },
      ];

      droneLayers.forEach((layer) => {
        if (!this.audioCtx || !this.masterGain) return;

        const osc = this.audioCtx.createOscillator();
        osc.type = layer.type;
        osc.frequency.setValueAtTime(layer.freq, now);

        const oscGain = this.audioCtx.createGain();
        oscGain.gain.setValueAtTime(layer.gain, now);

        // LFO for rhythmic breathing pulse (Tanpura string pluck resonance)
        const lfo = this.audioCtx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(layer.lfoFreq, now);

        const lfoGain = this.audioCtx.createGain();
        lfoGain.gain.setValueAtTime(layer.gain * 0.45, now);

        lfo.connect(lfoGain.gain);
        osc.connect(oscGain);
        oscGain.connect(this.masterGain);

        osc.start(now);
        lfo.start(now);

        this.oscillators.push(osc);
        this.lfos.push(lfo);
      });

      // Soft sacred singing bowl bell transient
      const chimeOsc = this.audioCtx.createOscillator();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(432, now);
      chimeOsc.frequency.exponentialRampToValueAtTime(864, now + 1.2);

      const chimeGain = this.audioCtx.createGain();
      chimeGain.gain.setValueAtTime(0.08, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(filter);
      chimeOsc.start(now);
      chimeOsc.stop(now + 3.0);

      this.isPlaying = true;
      this.notify();
    } catch (err) {
      console.warn('Could not start Vedic soundscape:', err);
      this.isPlaying = false;
      this.notify();
    }
  }

  public stop() {
    if (!this.isPlaying || !this.masterGain || !this.audioCtx) {
      this.isPlaying = false;
      this.notify();
      return;
    }

    try {
      const now = this.audioCtx.currentTime;
      // Smooth fadeout over 1.2 seconds (no clicks)
      this.masterGain.gain.linearRampToValueAtTime(0, now + 1.2);

      setTimeout(() => {
        this.oscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (_) {}
        });
        this.lfos.forEach((lfo) => {
          try {
            lfo.stop();
            lfo.disconnect();
          } catch (_) {}
        });
        this.oscillators = [];
        this.lfos = [];
        this.isPlaying = false;
        this.notify();
      }, 1250);
    } catch (_) {
      this.isPlaying = false;
      this.notify();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }
}

export const vedicSoundscape = new VedicSoundscapeService();
