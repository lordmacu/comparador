import type { Metadata } from 'next';
import ContratarClient from './ContratarClient';

export const metadata: Metadata = {
  title: 'Contratar Internet Fibra Óptica | Planes desde $42.000 en Colombia',
  description: 'Contrata internet fibra óptica para tu hogar. Compara planes de Claro, Movistar y ETB. Validación de cobertura y asesoría inmediata.',
  alternates: {
    canonical: 'https://comparadorinternet.co/contratar',
  },
  openGraph: {
    title: 'Contratar Internet Fibra Óptica | Mejores Planes Colombia',
    description: 'Encuentra y contrata el mejor internet para tu hogar. Asesoría personalizada y validación de cobertura inmediata.',
    url: 'https://comparadorinternet.co/contratar',
    type: 'website',
  },
};

export default function ContratarPage() {
  return <ContratarClient />;
}
