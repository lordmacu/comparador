import type { Metadata } from 'next';
import ContratarClient from './ContratarClient';

export const metadata: Metadata = {
  title: 'Contratar Internet Fibra Óptica | Planes Desde ,000 en Colombia',
  description: 'Contrata internet fibra óptica para tu hogar. Compara planes de Claro, Movistar, Tigo, ETB y más. Instalación rápida y cobertura en todo el país.',
  alternates: {
    canonical: 'https://internetcolombia.com.co/contratar',
  },
  openGraph: {
    title: 'Contratar Internet Fibra Óptica | Mejores Planes Colombia',
    description: 'Encuentra y contrata el mejor internet para tu hogar. Asesoría personalizada y validación de cobertura inmediata.',
    url: 'https://internetcolombia.com.co/contratar',
    type: 'website',
  },
};

export default function ContratarPage() {
  return <ContratarClient />;
}
