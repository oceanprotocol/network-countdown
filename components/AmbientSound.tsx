'use client';

import { useEffect, useRef, useState } from 'react';

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const crackleGainRef = useRef<GainNode | null>(null);
  const crackleFilterRef = useRef<BiquadFilterNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const movementLevelRef = useRef(0);
  const lastMoveTimestampRef = useRef(0);
  const cracklePulseIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize audio context on mount
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    // Start enabled by default.
    startSound();

    return () => {
      // Cleanup on unmount
      stopSound();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!crackleGainRef.current || !crackleFilterRef.current || !audioContextRef.current) return;

      const ctx = audioContextRef.current;
      const now = ctx.currentTime;

      // Calculate mouse velocity
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      lastMoveTimestampRef.current = performance.now();

      // Map velocity to crackle intensity (0-40 pixels per frame is typical)
      const normalizedVelocity = Math.min(velocity / 40, 1);
      movementLevelRef.current = normalizedVelocity;

      // Map mouse X position to filter frequency (left to right = lower to brighter crackle)
      const normalizedX = e.clientX / window.innerWidth;
      const targetFreq = 2800 + (normalizedX * 4200); // Range: 2800Hz to 7000Hz

      crackleFilterRef.current.frequency.setTargetAtTime(targetFreq, now, 0.02);
    };

    window.addEventListener('mousemove', handleMouseMove);
    lastMoveTimestampRef.current = performance.now();
    cracklePulseIntervalRef.current = window.setInterval(() => {
      if (!audioContextRef.current || !crackleGainRef.current) return;

      const ctx = audioContextRef.current;
      const now = ctx.currentTime;
      const idleMs = performance.now() - lastMoveTimestampRef.current;

      // Hard rule: fully silent if mouse is stationary.
      if (idleMs > 90) {
        movementLevelRef.current = 0;
      }

      const movement = movementLevelRef.current;
      if (movement <= 0.001) {
        crackleGainRef.current.gain.setTargetAtTime(0, now, 0.01);
        return;
      }

      // Randomized short bursts for spark-like crackle instead of steady hiss.
      const burstGate = Math.random() < 0.38 ? 1 : 0;
      const microVariation = 0.7 + Math.random() * 0.6;
      const targetGain = burstGate * movement * 0.18 * microVariation;

      crackleGainRef.current.gain.setTargetAtTime(targetGain, now, 0.004);
    }, 22);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (cracklePulseIntervalRef.current !== null) {
        window.clearInterval(cracklePulseIntervalRef.current);
        cracklePulseIntervalRef.current = null;
      }
    };
  }, [isPlaying]);

  const startSound = () => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;

    // Resume context if suspended (required for autoplay policies)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Master gain for overall volume control
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(1, now);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // Create white noise buffer for electrical crackle
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    // Main electrical crackle (white noise filtered)
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const crackleHighPass = ctx.createBiquadFilter();
    crackleHighPass.type = 'highpass';
    crackleHighPass.frequency.setValueAtTime(2200, now);
    crackleHighPass.Q.setValueAtTime(0.7, now);

    const crackleFilter = ctx.createBiquadFilter();
    crackleFilter.type = 'bandpass';
    crackleFilter.frequency.setValueAtTime(4200, now);
    crackleFilter.Q.setValueAtTime(8, now); // Narrow, bright electric crackle

    const crackleGain = ctx.createGain();
    crackleGain.gain.setValueAtTime(0, now); // Fully silent until movement starts

    noiseSource.connect(crackleHighPass);
    crackleHighPass.connect(crackleFilter);
    crackleFilter.connect(crackleGain);
    crackleGain.connect(masterGain);
    noiseSource.start();

    // Store references for mouse interaction
    noiseSourceRef.current = noiseSource;
    crackleFilterRef.current = crackleFilter;
    crackleGainRef.current = crackleGain;

    setIsPlaying(true);
  };

  const stopSound = () => {
    if (cracklePulseIntervalRef.current !== null) {
      window.clearInterval(cracklePulseIntervalRef.current);
      cracklePulseIntervalRef.current = null;
    }

    if (noiseSourceRef.current) {
      try {
        noiseSourceRef.current.stop();
      } catch (e) {
        // Source may already be stopped
      }
    }
    
    noiseSourceRef.current = null;
    crackleGainRef.current = null;
    crackleFilterRef.current = null;
    masterGainRef.current = null;
    movementLevelRef.current = 0;
    
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="ambient-sound-toggle"
      aria-label={isPlaying ? 'Stop ambient sound' : 'Play ambient sound'}
      title={isPlaying ? 'Stop ambient sound' : 'Play ambient sound'}
    >
      {isPlaying ? '🔊' : '🔇'}
      <style jsx>{`
        .ambient-sound-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }
        
        .ambient-sound-toggle:hover {
          background: rgba(0, 0, 0, 0.7);
          transform: scale(1.1);
        }
        
        .ambient-sound-toggle:active {
          transform: scale(0.95);
        }
      `}</style>
    </button>
  );
}
