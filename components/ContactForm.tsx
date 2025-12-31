'use client';

import { useState, FormEvent } from 'react';
import { Provider } from '@/lib/types';
import { Phone, Send } from 'lucide-react';

interface ContactFormProps {
  provider: Provider;
  title?: string;
}

export default function ContactForm({ provider, title }: ContactFormProps) {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/call-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          provider: provider.slug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar solicitud');
      }

      console.log('✅ Solicitud enviada:', data);

      setSubmitStatus('success');
      setPhone('');

      // Reset después de 4 segundos
      setTimeout(() => setSubmitStatus('idle'), 4000);
    } catch (error) {
      console.error('❌ Error al enviar formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-green-800 mb-3">
          ¡Solicitud Recibida!
        </h3>
        <p className="text-green-700 mb-2">
          Gracias por tu interés en {provider.name}
        </p>
        <p className="text-sm text-green-600">
          Un asesor te contactará pronto para brindarte información personalizada sobre planes y promociones
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8 space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {title || `Te Llamamos Gratis`}
        </h3>
        <p className="text-gray-600">
          Déjanos tu celular y un asesor de {provider.name} te contactará
        </p>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
          Número de Celular *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="Ej: 3001234567"
          pattern="[0-9]{10}"
        />
        <p className="text-xs text-gray-500 mt-2">
          Ingresa tu número a 10 dígitos
        </p>
      </div>

      {submitStatus === 'error' && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-sm text-red-700">
          Hubo un error al enviar. Por favor intenta de nuevo o contáctanos por WhatsApp.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full py-4 px-6 rounded-lg font-bold text-white text-lg
          transition-all duration-300 transform inline-flex items-center justify-center gap-2
          ${isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
          }
        `}
      >
        {isSubmitting ? (
          <>
            <Send size={20} className="animate-pulse" />
            Enviando...
          </>
        ) : (
          <>
            <Phone size={20} />
            Solicitar Llamada Gratis
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center leading-relaxed">
        Al enviar aceptas que un asesor de {provider.name} te contacte. Tus datos están protegidos y no serán compartidos con terceros.
      </p>
    </form>
  );
}
