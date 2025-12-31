import providersDataJson from '@/providers-data.json';
import { ProvidersData, Provider, MainBenefit } from './types';

// Cast del JSON importado
export const providersData = providersDataJson as ProvidersData;

// Helper para obtener un proveedor específico
export function getProvider(slug: 'claro' | 'movistar' | 'etb'): Provider {
  return providersData.providers[slug];
}

// Helper para obtener todos los proveedores
export function getAllProviders(): Provider[] {
  return Object.values(providersData.providers);
}

// Helper para obtener slugs de proveedores (útil para generateStaticParams)
export function getProviderSlugs(): string[] {
  return Object.keys(providersData.providers);
}

// Helper para crear enlace de WhatsApp
export function getWhatsAppLink(provider: Provider, customMessage?: string): string {
  const message = customMessage || provider.whatsapp.message;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${provider.whatsapp.number}?text=${encodedMessage}`;
}

// Helper para obtener comparación de beneficios principales
export function getComparableBenefits() {
  const providers = getAllProviders();
  return providers.map(provider => ({
    provider,
    mainBenefits: provider.mainBenefits.slice(0, 3), // Top 3 beneficios
    topServices: provider.services.slice(0, 2), // Top 2 servicios
    coverage: provider.coverage,
    whyChoose: provider.whyChoose.slice(0, 3) // Top 3 razones
  }));
}

// Helper para obtener el beneficio principal de cada proveedor
export function getMainHighlight(provider: Provider): MainBenefit {
  return provider.mainBenefits[0];
}
