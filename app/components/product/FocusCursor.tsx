'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/app/lib/animations';

/**
 * Custom "focus circle" cursor that follows the mouse.
 * On text elements, it expands and shows an invert blend mode.
 * Only active on desktop (no touch).
 */
export function FocusCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isOverText, setIsOverText] = useState(false);
  const reduced = useReducedMotion();
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);

  useEffect(() => {
    if (reduced) return;

    // Only on non-touch devices
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const update = () => {
      if (cursor) {
        cursor.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(update);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tag = target.tagName;
      const isText = tag === 'H1' || tag === 'H2' || tag === 'H3' || tag === 'P' || tag === 'SPAN' || tag === 'A' || tag === 'BUTTON';
      setIsOverText(isText);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleOver);
    rafRef.current = requestAnimationFrame(update);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
      style={{
        width: isOverText ? '48px' : '20px',
        height: isOverText ? '48px' : '20px',
        borderRadius: '50%',
        border: isOverText ? '1.5px solid rgba(118,158,219,0.6)' : '1.5px solid rgba(118,158,219,0.3)',
        backgroundColor: isOverText ? 'rgba(118,158,219,0.06)' : 'transparent',
        mixBlendMode: isOverText ? 'difference' : 'normal',
        transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background-color 0.25s ease',
      }}
    />
  );
}
