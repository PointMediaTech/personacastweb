import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// ── Mock IntersectionObserver (jsdom doesn't support it) ──

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  private callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element): void {
    // Immediately trigger as intersecting for test simplicity
    this.callback(
      [
        {
          isIntersecting: true,
          target,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRatio: 1,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: Date.now(),
        },
      ],
      this,
    );
  }

  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

// ── Mock matchMedia ──

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// ── Mock scrollTo ──

window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

// ── Mock requestAnimationFrame ──

vi.stubGlobal(
  'requestAnimationFrame',
  (cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 0) as unknown as number,
);
vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id));
