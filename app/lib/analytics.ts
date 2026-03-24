// Google Analytics 4 configuration
// Replace with your actual Measurement ID after creating a GA4 property

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

/** Track a page view */
export function pageView(url: string): void {
  if (!GA_MEASUREMENT_ID) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

/** Track a custom event */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number,
): void {
  if (!GA_MEASUREMENT_ID) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
}

// Predefined conversion events for PersonaCast
export const EVENTS = {
  DEMO_REQUEST: { action: 'demo_request', category: 'conversion' },
  CTA_CLICK: { action: 'cta_click', category: 'engagement' },
  PRICING_VIEW: { action: 'pricing_view', category: 'engagement' },
  WHITEPAPER_DOWNLOAD: { action: 'whitepaper_download', category: 'conversion' },
  FAQ_EXPAND: { action: 'faq_expand', category: 'engagement' },
  BILLING_TOGGLE: { action: 'billing_toggle', category: 'engagement' },
} as const;

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
