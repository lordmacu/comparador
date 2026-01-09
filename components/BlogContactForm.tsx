'use client';

import { useState, FormEvent } from 'react';
import { Phone, Send, CheckCircle } from 'lucide-react';

export default function BlogContactForm() {
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
          provider: 'blog-contact',
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
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
        <CheckCircle className="text-green-600 w-12 h-12 mb-3 mx-auto" />
        <h3 className="text-lg font-bold text-green-800 mb-2">
          ¡Solicitud Recibida!
        </h3>
        <p className="text-sm text-green-700 mb-2">
          Gracias por tu interés
        </p>
        <p className="text-xs text-green-600">
          Un asesor te contactará pronto para ayudarte a encontrar el mejor plan
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-6 shadow-lg space-y-4">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">
          ¿Necesitas Internet en Casa?
        </h3>
        <p className="text-blue-100 text-sm">
          Déjanos tu número y te llamamos para asesorarte gratis
        </p>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
          Número de Celular *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-white rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none placeholder-gray-400"
          placeholder="3001234567"
          pattern="[0-9]{10}"
        />
        <p className="text-xs text-blue-200 mt-1">
          10 dígitos sin espacios
        </p>
      </div>

      {submitStatus === 'error' && (
        <div className="bg-red-100 border-2 border-red-300 rounded-lg p-3 text-sm text-red-700">
          Error al enviar. Intenta de nuevo o contáctanos por WhatsApp.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full py-3 px-6 rounded-lg font-bold text-lg
          transition-all duration-300 inline-flex items-center justify-center gap-2
          ${isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg'
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
            Solicitar Llamada
          </>
        )}
      </button>

      <p className="text-xs text-blue-200 text-center leading-relaxed">
        Al enviar aceptas ser contactado. Tus datos están protegidos.
      </p>
    </form>
  );
}
