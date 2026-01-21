'use client';

import { Phone } from 'lucide-react';
import type { FAQ } from '@/lib/types';

interface FAQSectionProps {
  faqs: FAQ[];
  accentColor: string;
}

export default function FAQSection({ faqs, accentColor }: FAQSectionProps) {
  const handleCallClick = () => {
    window.location.href = 'tel:3154645370';
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12 text-gray-900">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow group"
              >
                <summary
                  className="font-bold text-lg cursor-pointer transition-colors"
                  style={{ color: '#1f2937' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#1f2937'}
                >
                  {faq.question}
                </summary>
                <div className="mt-4">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {faq.answer}
                  </p>

                  {/* Call to Action */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">
                      ¿Necesitas más información? Te llamamos gratis:
                    </p>
                    <button
                      onClick={handleCallClick}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:opacity-90 text-sm"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Phone size={18} />
                      Llamar ahora al 315 464 5370
                    </button>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
