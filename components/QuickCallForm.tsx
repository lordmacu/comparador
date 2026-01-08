'use client';

import { useState, FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

interface QuickCallFormProps {
  buttonColor?: string;
  provider?: string; // claro, movistar, etb
}

export default function QuickCallForm({ buttonColor = '#2563eb', provider }: QuickCallFormProps) {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const pathname = usePathname();
  const { trackForm, trackFormInit } = useAnalytics();

  const handleInputFocus = () => {
    const detectedProvider = provider || pathname?.split('/')[1] || 'unknown';
    trackFormInit(`quick_call_${detectedProvider}`);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Determinar el proveedor desde la URL si no se especificó
      const detectedProvider = provider || pathname?.split('/')[1] || undefined;

      // Enviar solicitud a la API
      const response = await fetch('/api/call-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          provider: detectedProvider,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar solicitud');
      }

      console.log('✅ Solicitud enviada:', data);

      // Track conversion exitosa
      trackForm(`quick_call_${detectedProvider}`, detectedProvider || 'unknown');

      setSubmitStatus('success');
      setPhone('');

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('❌ Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        ¡Te llamaremos pronto!
      </div>
    );
  }

  if (submitStatus === 'error') {
    return (
      <div className="flex items-center gap-2 text-red-600 text-sm font-semibold">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        Error al enviar. Intenta de nuevo.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:inline-flex md:flex-row items-center gap-3 bg-white rounded-xl p-5 shadow-xl">
      <div className="relative w-full md:w-auto">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onFocus={handleInputFocus}
          placeholder="Tu celular"
          pattern="[0-9]{10}"
          required
          className="w-full md:w-52 px-5 py-4 text-base text-gray-900 border-2 border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto px-7 py-4 text-base font-bold rounded-lg transition-all text-white hover:opacity-90"
        style={{
          backgroundColor: isSubmitting ? '#9ca3af' : buttonColor,
          cursor: isSubmitting ? 'not-allowed' : 'pointer'
        }}
      >
        {isSubmitting ? '...' : 'Llámame'}
      </button>
    </form>
  );
}
