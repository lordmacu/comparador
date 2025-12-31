import { Service, Provider } from '@/lib/types';
import WhatsAppButton from './WhatsAppButton';

interface ServiceCardProps {
  service: Service;
  provider: Provider;
}

export default function ServiceCard({ service, provider }: ServiceCardProps) {
  return (
    <article className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
      <h3 className="text-2xl font-bold mb-3 text-gray-900">
        {service.name}
      </h3>

      <p className="text-gray-700 mb-4 leading-relaxed">
        {service.description}
      </p>

      {/* Velocidades disponibles */}
      {service.speeds && service.speeds.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-semibold text-gray-600 mb-2">Velocidades disponibles:</div>
          <div className="flex flex-wrap gap-2">
            {service.speeds.map((speed, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {speed}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Opciones disponibles */}
      {service.options && service.options.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-semibold text-gray-600 mb-2">Opciones:</div>
          <ul className="space-y-1">
            {service.options.map((option, idx) => (
              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Características */}
      {service.features && service.features.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-semibold text-gray-600 mb-2">Incluye:</div>
          <ul className="space-y-1">
            {service.features.map((feature, idx) => (
              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Ideal para */}
      {service.ideal && (
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <div className="text-xs font-semibold text-blue-900 mb-1">💡 Ideal para:</div>
          <div className="text-sm text-blue-700">{service.ideal}</div>
        </div>
      )}

      {/* CTA */}
      <WhatsAppButton
        provider={provider}
        customMessage={`Hola, quiero más información sobre ${service.name}`}
        size="sm"
        className="w-full"
      />
    </article>
  );
}
