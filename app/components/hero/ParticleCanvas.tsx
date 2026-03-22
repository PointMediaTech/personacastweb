'use client';
import { useRef } from 'react';
import { useParticleSystem } from './useParticleSystem';

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleSystem(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
