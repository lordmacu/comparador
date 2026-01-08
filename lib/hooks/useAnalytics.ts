'use client';

import { useCallback } from 'react';
import {
  trackWhatsAppClick,
  trackPhoneClick,
  trackFormSubmit,
  trackFormStart,
  trackPlanView,
  trackProviderView,
  trackCTAClick,
  trackExternalLink,
} from '@/lib/analytics';

/**
 * Custom hook for analytics tracking
 * Provides easy-to-use functions for tracking user interactions
 */
export function useAnalytics() {
  const trackWhatsApp = useCallback((provider: string, source: string) => {
    trackWhatsAppClick(provider, source);
  }, []);

  const trackPhone = useCallback((provider: string, source: string) => {
    trackPhoneClick(provider, source);
  }, []);

  const trackForm = useCallback((formName: string, provider?: string) => {
    trackFormSubmit(formName, provider);
  }, []);

  const trackFormInit = useCallback((formName: string) => {
    trackFormStart(formName);
  }, []);

  const trackPlan = useCallback((provider: string, planName: string, price: number) => {
    trackPlanView(provider, planName, price);
  }, []);

  const trackProvider = useCallback((provider: string) => {
    trackProviderView(provider);
  }, []);

  const trackCTA = useCallback((ctaText: string, location: string, provider?: string) => {
    trackCTAClick(ctaText, location, provider);
  }, []);

  const trackExternal = useCallback((url: string, linkText: string) => {
    trackExternalLink(url, linkText);
  }, []);

  return {
    trackWhatsApp,
    trackPhone,
    trackForm,
    trackFormInit,
    trackPlan,
    trackProvider,
    trackCTA,
    trackExternal,
  };
}
