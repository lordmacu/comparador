import { Calendar, Clock } from 'lucide-react';

interface LastUpdatedProps {
  date: string; // Formato: "2026-01-12"
  nextReview?: string; // Formato: "2026-02-12"
  message?: string;
  className?: string;
}

export default function LastUpdated({
  date,
  nextReview,
  message = "Verificamos precios y promociones mensualmente",
  className = ''
}: LastUpdatedProps) {
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
  };

  return (
    <div
      className={`bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-600 mb-6 ${className}`}
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Última actualización:</strong>{' '}
              <time dateTime={date} itemProp="dateModified">
                {formatDate(date)}
              </time>
            </p>

            {nextReview && (
              <p className="text-sm text-gray-700 mt-1">
                <strong className="text-gray-900">Próxima revisión:</strong>{' '}
                <time dateTime={nextReview}>
                  {formatDate(nextReview)}
                </time>
              </p>
            )}
          </div>
        </div>

        {message && (
          <div className="flex items-start gap-2">
            <Clock className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600 italic">
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
