import { useRef } from 'react';
import { useNeuralCanvas } from './useNeuralCanvas';

/**
 * NeuralCanvas — Dynamic, living canvas background for the right wing.
 * Replaces the static SVG NeuralField.
 */
export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useNeuralCanvas(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
