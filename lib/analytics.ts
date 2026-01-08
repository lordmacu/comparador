/**
 * Analytics and Event Tracking
 * Google Analytics 4, Facebook Pixel, Custom Events
 */

// Google Analytics 4 Events
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

// Check if we're in production and tracking IDs are configured
export const isAnalyticsEnabled = () => {
  return process.env.NODE_ENV === 'production' && GA_TRACKING_ID !== 'G-XXXXXXXXXX';
};

export const isFacebookPixelEnabled = () => {
  return process.env.NODE_ENV === 'production' && FB_PIXEL_ID !== '';
};

// Google Analytics 4 - Page View
export const pageview = (url: string) => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Event Types
export type EventNames = 
  | 'whatsapp_click'
  | 'phone_click'
  | 'form_submit'
  | 'form_start'
  | 'plan_view'
  | 'provider_view'
  | 'comparison_view'
  | 'cta_click'
  | 'download_brochure'
  | 'scroll_depth'
  | 'time_on_page'
  | 'external_link_click';

interface EventParams {
  category?: string;
  label?: string;
  value?: number;
  provider?: string;
  plan?: string;
  price?: number;
  location?: string;
  [key: string]: string | number | undefined;
}

// Google Analytics 4 - Event Tracking
export const event = (name: EventNames, params?: EventParams) => {
  if (!isAnalyticsEnabled()) {
    console.log('📊 [Analytics Event]:', name, params);
    return;
  }

  window.gtag('event', name, {
    ...params,
    timestamp: new Date().toISOString(),
  });
};

// Facebook Pixel - Page View
export const fbPageview = () => {
  if (!isFacebookPixelEnabled()) return;
  
  window.fbq('track', 'PageView');
};

// Facebook Pixel - Events
export const fbEvent = (name: string, params?: Record<string, any>) => {
  if (!isFacebookPixelEnabled()) return;
  
  window.fbq('track', name, params);
};

// Conversion Events
export const trackWhatsAppClick = (provider: string, source: string) => {
  event('whatsapp_click', {
    category: 'conversion',
    label: `${provider}_${source}`,
    provider,
    location: source,
  });

  fbEvent('Contact', {
    content_name: provider,
    content_category: 'whatsapp',
  });
};

export const trackPhoneClick = (provider: string, source: string) => {
  event('phone_click', {
    category: 'conversion',
    label: `${provider}_${source}`,
    provider,
    location: source,
  });

  fbEvent('Contact', {
    content_name: provider,
    content_category: 'phone',
  });
};

export const trackFormSubmit = (formName: string, provider?: string) => {
  event('form_submit', {
    category: 'conversion',
    label: formName,
    provider,
  });

  fbEvent('Lead', {
    content_name: formName,
    content_category: 'form',
  });
};

export const trackFormStart = (formName: string) => {
  event('form_start', {
    category: 'engagement',
    label: formName,
  });

  fbEvent('InitiateCheckout', {
    content_name: formName,
  });
};

export const trackPlanView = (provider: string, planName: string, price: number) => {
  event('plan_view', {
    category: 'engagement',
    label: `${provider}_${planName}`,
    provider,
    plan: planName,
    price,
  });

  fbEvent('ViewContent', {
    content_name: `${provider} - ${planName}`,
    content_type: 'plan',
    value: price,
    currency: 'COP',
  });
};

export const trackProviderView = (provider: string) => {
  event('provider_view', {
    category: 'engagement',
    label: provider,
    provider,
  });
};

export const trackCTAClick = (ctaText: string, location: string, provider?: string) => {
  event('cta_click', {
    category: 'engagement',
    label: `${ctaText}_${location}`,
    location,
    provider,
  });
};

export const trackExternalLink = (url: string, linkText: string) => {
  event('external_link_click', {
    category: 'engagement',
    label: linkText,
    url: url, // Cambiado de 'value' a 'url' para evitar conflicto de tipos
  });
};

// Scroll Depth Tracking
let scrollDepths = [25, 50, 75, 100];
let trackedDepths: number[] = [];

export const trackScrollDepth = () => {
  if (typeof window === 'undefined') return;

  const scrollPercentage = 
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

  scrollDepths.forEach(depth => {
    if (scrollPercentage >= depth && !trackedDepths.includes(depth)) {
      trackedDepths.push(depth);
      event('scroll_depth', {
        category: 'engagement',
        label: `${depth}%`,
        value: depth,
      });
    }
  });
};

// Time on Page Tracking
let timeOnPageInterval: NodeJS.Timeout | null = null;
let secondsOnPage = 0;

export const startTimeOnPage = () => {
  if (typeof window === 'undefined') return;
  
  secondsOnPage = 0;
  trackedDepths = []; // Reset scroll tracking

  if (timeOnPageInterval) {
    clearInterval(timeOnPageInterval);
  }

  timeOnPageInterval = setInterval(() => {
    secondsOnPage += 10;

    // Track milestones: 30s, 60s, 120s, 300s
    if ([30, 60, 120, 300].includes(secondsOnPage)) {
      event('time_on_page', {
        category: 'engagement',
        label: `${secondsOnPage}s`,
        value: secondsOnPage,
      });
    }
  }, 10000); // Every 10 seconds
};

export const stopTimeOnPage = () => {
  if (timeOnPageInterval) {
    clearInterval(timeOnPageInterval);
    timeOnPageInterval = null;
  }
};

// Initialize Analytics
export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return;

  // Scroll tracking
  let scrollTimeout: NodeJS.Timeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(trackScrollDepth, 100);
  });

  // Time on page
  startTimeOnPage();

  // Stop time tracking when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopTimeOnPage();
    } else {
      startTimeOnPage();
    }
  });
};

// TypeScript declarations for global window objects
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    fbq: (
      command: string,
      eventName: string,
      params?: Record<string, any>
    ) => void;
  }
}
