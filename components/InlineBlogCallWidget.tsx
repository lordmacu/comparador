'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Phone, ShieldCheck, Sparkles } from 'lucide-react';

interface InlineBlogCallWidgetProps {
  postSlug: string;
}

type SubmitStatus = 'idle' | 'success' | 'error';

export default function InlineBlogCallWidget({ postSlug }: InlineBlogCallWidgetProps) {
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const providerValue = useMemo(() => `blog-inline:${postSlug}`, [postSlug]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/call-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, provider: providerValue }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar solicitud');
      }

      setSubmitStatus('success');
      setPhone('');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('❌ Error al enviar solicitud de llamada:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      aria-label="Solicitud de llamada"
      className="not-prose my-10 overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 shadow-xl"
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide">
              <Sparkles className="h-4 w-4" />
              Asesoría gratis en Bogotá
            </div>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight">
              ¿Te ayudamos a elegir y contratar tu internet hoy?
            </h3>
            <p className="mt-2 max-w-xl text-white/90">
              Déjanos tu celular y te llamamos para confirmar cobertura por dirección y recomendarte el mejor plan con ETB, Movistar o Claro.
            </p>

            <ul className="mt-4 grid gap-2 text-sm text-white/95 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-none" />
                <span>Sin costo y sin compromiso</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-none" />
                <span>Instalación y promos según tu zona</span>
              </li>
            </ul>
          </div>

          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg">
            {submitStatus === 'success' ? (
              <div className="text-center">
                <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                  ✓
                </div>
                <p className="text-base font-bold text-gray-900">¡Listo! Te llamaremos pronto</p>
                <p className="mt-1 text-sm text-gray-600">Revisa que tu número esté correcto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <label htmlFor="inline-phone" className="block text-sm font-semibold text-gray-800">
                  Tu número de celular (10 dígitos)
                </label>
                <input
                  id="inline-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="3001234567"
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-base text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                {submitStatus === 'error' && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    Error al enviar. Intenta de nuevo o contáctanos por WhatsApp.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-extrabold transition-colors ${
                    isSubmitting ? 'bg-gray-300 text-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Phone className="h-5 w-5" />
                  {isSubmitting ? 'Enviando...' : 'Quiero que me llamen'}
                </button>

                <p className="text-center text-xs leading-relaxed text-gray-500">
                  Al enviar aceptas ser contactado. Tus datos están protegidos.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

