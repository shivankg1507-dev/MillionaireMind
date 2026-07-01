import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private audioCtx: AudioContext | null = null;
  private suspenseGain: GainNode | null = null;
  private heartbeatInterval: any;

  constructor() {
    try {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }

  private initCtx() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playLockSound() {
    this.initCtx();
    if (!this.audioCtx) return;

    // A sharp, high-tension metallic "snap"
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, this.audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.1);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.1);
  }

  playCorrectSound() {
    this.initCtx();
    if (!this.audioCtx) return;

    // An uplifting major chord (C Major: C5, E5, G5)
    const frequencies = [523.25, 659.25, 783.99];

    frequencies.forEach((freq, i) => {
      const osc = this.audioCtx!.createOscillator();
      const gainNode = this.audioCtx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx!.currentTime);

      // Slight delay for each note to create a nice roll effect
      const startTime = this.audioCtx!.currentTime + (i * 0.05);

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 1.5);

      osc.connect(gainNode);
      gainNode.connect(this.audioCtx!.destination);

      osc.start(startTime);
      osc.stop(startTime + 1.5);
    });
  }

  playWrongSound() {
    this.initCtx();
    if (!this.audioCtx) return;

    // A deep, dramatic, descending hollow boom (classic fail sound)
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    // Sine waves for a hollow, deep bass drop instead of harsh sawtooth
    osc1.type = 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(150, this.audioCtx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(40, this.audioCtx.currentTime + 1.5);

    osc2.frequency.setValueAtTime(155, this.audioCtx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(42, this.audioCtx.currentTime + 1.5);

    gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.6, this.audioCtx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 2);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(this.audioCtx.currentTime + 2);
    osc2.stop(this.audioCtx.currentTime + 2);
  }

  playNewQuestionSound() {
    this.initCtx();
    if (!this.audioCtx) return;

    // A dramatic "dun-dun" or chime for new question (classic KBC style)
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.audioCtx.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, this.audioCtx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 1.5);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 1.5);
  }

  private playHeartbeat() {
    if (!this.audioCtx || !this.suspenseGain) return;

    // First beat (lub)
    this.createBeat(this.audioCtx.currentTime, 0.1);
    // Second beat (dub)
    this.createBeat(this.audioCtx.currentTime + 0.3, 0.15);
  }

  private createBeat(time: number, duration: number) {
    const osc = this.audioCtx!.createOscillator();
    const gain = this.audioCtx!.createGain();

    osc.type = 'sine';
    // Very low frequency for a thump
    osc.frequency.setValueAtTime(50, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + duration);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.5, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

    osc.connect(gain);
    gain.connect(this.suspenseGain!);

    osc.start(time);
    osc.stop(time + duration);
  }

  startSuspense() {
    this.initCtx();
    if (!this.audioCtx) return;
    if (this.suspenseGain) return;

    this.suspenseGain = this.audioCtx.createGain();
    this.suspenseGain.gain.value = 1.0;
    this.suspenseGain.connect(this.audioCtx.destination);

    // Start heartbeat loop (every 1.5 seconds)
    this.playHeartbeat();
    this.heartbeatInterval = setInterval(() => {
      this.playHeartbeat();
    }, 1500);
  }

  stopSuspense() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    if (this.suspenseGain && this.audioCtx) {
      // Fade out instead of abrupt stop
      this.suspenseGain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.5);
      setTimeout(() => {
        if (this.suspenseGain) {
          this.suspenseGain.disconnect();
          this.suspenseGain = null;
        }
      }, 500);
    }
  }

  playSahiJawab() {
    // This will look for an MP3 file in your assets folder
    const audio = new Audio('assets/sounds/sahijawab.mp3');
    audio.play().catch(e => {
      console.warn('Could not play human voice. Please make sure you added the MP3 file!', e);
    });
  }

  playClapping(volume: number = 1.0) {
    // Play a real clapping MP3 file
    const audio = new Audio('assets/sounds/clap.mp3');
    audio.volume = volume;
    audio.play().catch(e => console.log('Audio play failed', e));
  }

  play7CroreWin() {
    const audio = new Audio('assets/sounds/win.mp3');
    audio.volume = 1.0;
    audio.play().catch(e => console.log('Audio play failed', e));
  }

  private ringInterval: any;
  private ringOsc1: OscillatorNode | null = null;
  private ringOsc2: OscillatorNode | null = null;
  private ringGain: GainNode | null = null;

  playPhoneRing() {
    this.initCtx();
    if (!this.audioCtx) return;
    
    // Realistic Double-Ring (European/Indian style) every 3 seconds
    this.startSingleRing();
    this.ringInterval = setInterval(() => {
      this.startSingleRing();
    }, 3000);
  }
  
  private startSingleRing() {
    if (!this.audioCtx) return;
    
    this.ringOsc1 = this.audioCtx.createOscillator();
    this.ringOsc2 = this.audioCtx.createOscillator();
    this.ringGain = this.audioCtx.createGain();
    
    // European/Indian standard ring frequencies
    this.ringOsc1.frequency.value = 400;
    this.ringOsc2.frequency.value = 425;
    
    this.ringOsc1.connect(this.ringGain);
    this.ringOsc2.connect(this.ringGain);
    this.ringGain.connect(this.audioCtx.destination);
    
    // Envelop for the realistic double-ring (brring-brring)
    const now = this.audioCtx.currentTime;
    
    // First ring pulse (0s to 0.4s)
    this.ringGain.gain.setValueAtTime(0, now);
    this.ringGain.gain.linearRampToValueAtTime(0.3, now + 0.05);
    this.ringGain.gain.setValueAtTime(0.3, now + 0.35);
    this.ringGain.gain.linearRampToValueAtTime(0, now + 0.4);
    
    // Second ring pulse (0.6s to 1.0s)
    this.ringGain.gain.setValueAtTime(0, now + 0.6);
    this.ringGain.gain.linearRampToValueAtTime(0.3, now + 0.65);
    this.ringGain.gain.setValueAtTime(0.3, now + 0.95);
    this.ringGain.gain.linearRampToValueAtTime(0, now + 1.0);
    
    this.ringOsc1.start(now);
    this.ringOsc2.start(now);
    
    this.ringOsc1.stop(now + 1.1);
    this.ringOsc2.stop(now + 1.1);
  }

  stopPhoneRing() {
    if (this.ringInterval) {
      clearInterval(this.ringInterval);
      this.ringInterval = null;
    }
    if (this.ringGain && this.audioCtx) {
      this.ringGain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.1);
    }
  }
}
