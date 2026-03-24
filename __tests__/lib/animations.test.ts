import { interpolate, cssTransition, EASE_CSS } from '@/app/lib/animations';

describe('interpolate', () => {
  it('maps value linearly from input range to output range', () => {
    expect(interpolate(0.5, 0, 1, 0, 100)).toBe(50);
  });

  it('maps boundary values correctly', () => {
    expect(interpolate(0, 0, 1, 0, 100)).toBe(0);
    expect(interpolate(1, 0, 1, 0, 100)).toBe(100);
  });

  it('clamps when t is below input range', () => {
    expect(interpolate(-1, 0, 1, 0, 100)).toBe(0);
  });

  it('clamps when t is above input range', () => {
    expect(interpolate(2, 0, 1, 0, 100)).toBe(100);
  });

  it('handles inverted output range (outMin > outMax)', () => {
    expect(interpolate(0.5, 0, 1, 100, 0)).toBe(50);
    expect(interpolate(0, 0, 1, 100, 0)).toBe(100);
    expect(interpolate(1, 0, 1, 100, 0)).toBe(0);
  });
});

describe('cssTransition', () => {
  it('builds a transition string for a single property', () => {
    const result = cssTransition(['opacity'], 0.3);
    expect(result).toBe(`opacity 0.3s ${EASE_CSS} 0s`);
  });

  it('builds a transition string for multiple properties', () => {
    const result = cssTransition(['opacity', 'transform'], 0.5);
    expect(result).toBe(
      `opacity 0.5s ${EASE_CSS} 0s, transform 0.5s ${EASE_CSS} 0s`,
    );
  });

  it('applies custom delay', () => {
    const result = cssTransition(['opacity'], 0.3, 0.1);
    expect(result).toBe(`opacity 0.3s ${EASE_CSS} 0.1s`);
  });

  it('applies custom easing', () => {
    const result = cssTransition(['opacity'], 0.3, 0, 'ease-in-out');
    expect(result).toBe('opacity 0.3s ease-in-out 0s');
  });
});

describe('EASE_CSS', () => {
  it('is a valid cubic-bezier string', () => {
    expect(EASE_CSS).toMatch(/^cubic-bezier\(\s*[\d.]+,\s*[\d.]+,\s*[\d.]+,\s*[\d.]+\s*\)$/);
  });
});
