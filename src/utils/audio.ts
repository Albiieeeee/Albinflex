/**
 * Synthesizes Netflix-style cinematic audio effects and cyber chimes
 * using standard Web Audio API without needing external audio asset files.
 */

let audioCtx: AudioContext | null = null;
let isAudioMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundMuted(muted: boolean) {
  isAudioMuted = muted;
  try {
    localStorage.setItem('albin_portfolio_sound_muted', muted ? 'true' : 'false');
  } catch {
    // ignore
  }
}

export function getSoundMuted(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const val = localStorage.getItem('albin_portfolio_sound_muted');
    return val === 'true';
  } catch {
    return false;
  }
}

/**
 * Plays the iconic Netflix "Ta-dum" cinematic synthesized intro!
 */
export function playNetflixTudum() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Deep impact boom / bass drum
  const kickOsc = ctx.createOscillator();
  const kickGain = ctx.createGain();
  kickOsc.type = 'sine';
  kickOsc.frequency.setValueAtTime(130, now);
  kickOsc.frequency.exponentialRampToValueAtTime(32, now + 0.55);
  kickGain.gain.setValueAtTime(0.7, now);
  kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
  kickOsc.connect(kickGain);
  kickGain.connect(ctx.destination);
  kickOsc.start(now);
  kickOsc.stop(now + 0.85);

  // 2. Dual detuned cinematic low chord ("TA...")
  const notes1 = [55, 110, 164.81]; // A1, A2, E3
  notes1.forEach(freq => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.6);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.7);
  });

  // 3. The second impact hit ("...DUMMM") at +0.28s with rich shimmering overtone
  const hitTime = now + 0.28;
  const kick2Osc = ctx.createOscillator();
  const kick2Gain = ctx.createGain();
  kick2Osc.type = 'sine';
  kick2Osc.frequency.setValueAtTime(160, hitTime);
  kick2Osc.frequency.exponentialRampToValueAtTime(38, hitTime + 1.2);
  kick2Gain.gain.setValueAtTime(0.8, hitTime);
  kick2Gain.gain.exponentialRampToValueAtTime(0.001, hitTime + 1.5);
  kick2Osc.connect(kick2Gain);
  kick2Gain.connect(ctx.destination);
  kick2Osc.start(hitTime);
  kick2Osc.stop(hitTime + 1.6);

  // Shimmering brassy drone tail
  const notes2 = [73.42, 146.83, 220, 277.18, 440]; // D2, D3, A3, C#4, A4
  notes2.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(freq, hitTime);
    osc.detune.setValueAtTime(idx * 4 - 8, hitTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, hitTime);
    filter.frequency.exponentialRampToValueAtTime(400, hitTime + 1.6);

    gain.gain.setValueAtTime(0.12, hitTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, hitTime + 1.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(hitTime);
    osc.stop(hitTime + 1.85);
  });
}

/**
 * Subtle cyber-click sound for interactive elements
 */
export function playCyberClick() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}

/**
 * Terminal keystroke blip
 */
export function playTerminalBlip() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(650, now);
  gain.gain.setValueAtTime(0.02, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.03);
}
