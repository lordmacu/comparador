import { MainBenefit } from '@/lib/types';
import * as Icons from 'lucide-react';

interface BenefitCardProps {
  benefit: MainBenefit;
  accentColor?: string;
}

export default function BenefitCard({ benefit, accentColor = '#3B82F6' }: BenefitCardProps) {
  // Obtener el componente de icono dinámicamente
  const IconComponent = (Icons as any)[benefit.icon] || Icons.Circle;

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
      <div className="flex justify-center mb-4">
        <div className="p-4 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
          <IconComponent
            size={40}
            style={{ color: accentColor }}
            strokeWidth={2.5}
          />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 text-center">
        {benefit.title}
      </h3>
      <p className="text-gray-600 text-center leading-relaxed">
        {benefit.description}
      </p>
    </div>
  );
}
