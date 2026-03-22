'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useInView } from 'framer-motion';

interface Metric {
  target: number;
  suffix: string;
  label: string;
}

const metrics: Metric[] = [
  { target: 132, suffix: '', label: '戰略節點' },
  { target: 80, suffix: '', label: '利害關係人' },
  { target: 100, suffix: '%', label: '規格文件化' },
  { target: 3, suffix: ' 層', label: '驗證機制' },
];

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1500;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [target]);

  useEffect(() => {
    if (inView) animate();
  }, [inView, animate]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

export function TrustMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {metrics.map((m) => (
        <div key={m.label} className="text-center py-4">
          <p className="text-2xl font-extrabold text-strategic-blue">
            <CountUp target={m.target} suffix={m.suffix} inView={isInView} />
          </p>
          <p className="text-xs text-mist-blue-gray font-mono mt-1">{m.label}</p>
        </div>
      ))}
    </div>
  );
}
