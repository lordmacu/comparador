import { Metadata } from 'next';
import { ChevronRight, Download, ExternalLink, Calculator, FileText, BookOpen, Video, Users, Building, HelpCircle, BarChart3, Link as LinkIcon } from 'lucide-react';
import QuickCallForm from '@/components/QuickCallForm';

export const metadata: Metadata = {
  title: 'Recursos y Herramientas Gratuitas para Internet en Colombia | Internet Colombia',
  description: 'Accede a herramientas gratuitas, guías descargables, calculadoras y recursos útiles para encontrar el mejor plan de internet en Colombia. Todo lo que necesitas en un solo lugar.',
  keywords: 'recursos internet colombia, herramientas gratuitas internet, calculadora velocidad internet, guías internet, comparador planes internet',
  openGraph: {
    title: 'Recursos y Herramientas Gratuitas para Internet en Colombia',
    description: 'Herramientas, guías y recursos gratuitos para encontrar el mejor internet en Colombia',
    url: 'https://comparadorinternet.co/recursos',
    type: 'website',
  },
  alternates: {
    canonical: 'https://comparadorinternet.co/recursos'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

interface ResourceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  type: 'internal' | 'external' | 'download';
  isPopular?: boolean;
}

function ResourceItem({ icon, title, description, href, type, isPopular }: ResourceItemProps) {
  const baseClasses = "group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300 relative overflow-hidden";
  const linkClasses = type === 'internal' ? "" : type === 'external' ? "text-blue-600 hover:text-blue-800" : "text-green-600 hover:text-green-800";

  return (
    <div className={baseClasses}>
      {isPopular && (
        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
          Popular
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            {type === 'external' && <ExternalLink size={16} className="text-gray-400" />}
            {type === 'download' && <Download size={16} className="text-gray-400" />}
            {type === 'internal' && <ChevronRight size={16} className="text-gray-400" />}
          </div>
          
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {description}
          </p>
          
          <a
            href={href}
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${linkClasses}`}
            {...(type === 'external' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {type === 'download' ? 'Descargar' : type === 'external' ? 'Ir al sitio' : 'Ver más'}
            {type === 'internal' && <ChevronRight size={14} />}
            {type === 'external' && <ExternalLink size={14} />}
            {type === 'download' && <Download size={14} />}
          </a>
        </div>
      </div>
    </div>
  );
}

interface ResourceCategoryProps {
  title: string;
  description: string;
  resources: ResourceItemProps[];
}

function ResourceCategory({ title, description, resources }: ResourceCategoryProps) {
  return (
    <div className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 text-lg">{description}</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <ResourceItem key={index} {...resource} />
        ))}
      </div>
    </div>
  );
}

const toolsAndCalculators: ResourceItemProps[] = [
  {
    icon: <Calculator className="text-blue-600" size={24} />,
    title: 'Calculadora de Velocidad',
    description: 'Determina qué velocidad de internet necesitas según tus hábitos de uso, dispositivos conectados y actividades online.',
    href: '/calculadora',
    type: 'internal',
    isPopular: true
  },
  {
    icon: <Calculator className="text-green-600" size={24} />,
    title: 'Herramientas Avanzadas',
    description: 'Accede a calculadoras especializadas, tests de latencia y herramientas de diagnóstico para optimizar tu conexión.',
    href: '/herramientas',
    type: 'internal'
  },
  {
    icon: <ExternalLink className="text-purple-600" size={24} />,
    title: 'Test de Velocidad',
    description: 'Mide la velocidad real de tu conexión actual con esta herramienta confiable y precisa de Speedtest.',
    href: 'https://www.speedtest.net/',
    type: 'external'
  }
];

const guidesAndContent: ResourceItemProps[] = [
  {
    icon: <BookOpen className="text-blue-600" size={24} />,
    title: 'Guía Completa de Internet',
    description: 'Todo lo que necesitas saber sobre internet en Colombia: proveedores, tecnologías, precios y consejos de expertos.',
    href: '/guia-completa',
    type: 'internal',
    isPopular: true
  },
  {
    icon: <Video className="text-red-600" size={24} />,
    title: 'Tutoriales en Video',
    description: 'Aprende con videos paso a paso sobre instalación, configuración y optimización de internet en casa.',
    href: '/videos',
    type: 'internal'
  },
  {
    icon: <HelpCircle className="text-yellow-600" size={24} />,
    title: 'Preguntas Frecuentes',
    description: 'Encuentra respuestas a las dudas más comunes sobre internet, instalación, velocidades y problemas técnicos.',
    href: '/faq',
    type: 'internal'
  }
];

const comparisonsAndPlans: ResourceItemProps[] = [
  {
    icon: <FileText className="text-blue-600" size={24} />,
    title: 'Planes de Internet',
    description: 'Compara todos los planes disponibles de ETB, Claro y Movistar con precios actualizados y características detalladas.',
    href: '/planes',
    type: 'internal',
    isPopular: true
  },
  {
    icon: <Building className="text-gray-600" size={24} />,
    title: 'Comparar Proveedores',
    description: 'Análisis detallado entre ETB vs Claro vs Movistar con ventajas, desventajas y recomendaciones por zona.',
    href: '/comparar/etb/claro',
    type: 'internal'
  },
  {
    icon: <Users className="text-green-600" size={24} />,
    title: 'Testimonios de Usuarios',
    description: 'Lee experiencias reales de usuarios con diferentes proveedores y planes de internet en Colombia.',
    href: '/testimonios',
    type: 'internal'
  }
];

const externalResources: ResourceItemProps[] = [
  {
    icon: <ExternalLink className="text-blue-600" size={24} />,
    title: 'CRC - Comisión de Regulación',
    description: 'Sitio oficial del regulador de telecomunicaciones en Colombia con información sobre derechos del usuario.',
    href: 'https://www.crcom.gov.co/',
    type: 'external'
  },
  {
    icon: <ExternalLink className="text-red-600" size={24} />,
    title: 'ETB Sitio Oficial',
    description: 'Portal oficial de ETB para consultar cobertura, planes y solicitar servicios directamente.',
    href: 'https://www.etb.com.co/',
    type: 'external'
  },
  {
    icon: <ExternalLink className="text-claro-primary" size={24} />,
    title: 'Claro Colombia',
    description: 'Sitio oficial de Claro Colombia para conocer planes, promociones y servicios de internet fijo.',
    href: 'https://www.claro.com.co/',
    type: 'external'
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Recursos y Herramientas Gratuitas para Internet en Colombia",
  "description": "Accede a herramientas gratuitas, guías descargables, calculadoras y recursos útiles para encontrar el mejor plan de internet en Colombia.",
  "url": "https://comparadorinternet.co/recursos",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Recursos de Internet Colombia",
    "description": "Lista de herramientas y recursos gratuitos para usuarios de internet",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "WebPage",
          "name": "Calculadora de Velocidad de Internet",
          "url": "https://comparadorinternet.co/calculadora"
        }
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "item": {
          "@type": "WebPage",
          "name": "Guía Completa de Internet en Colombia",
          "url": "https://comparadorinternet.co/guia-completa"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "WebPage", 
          "name": "Comparador de Planes de Internet",
          "url": "https://comparadorinternet.co/planes"
        }
      }
    ]
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://comparadorinternet.co/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Recursos",
        "item": "https://comparadorinternet.co/recursos"
      }
    ]
  }
};

export default function RecursosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Recursos y Herramientas
                <span className="block text-blue-200">Gratuitas para Internet</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Todo lo que necesitas para encontrar, comparar y optimizar tu conexión a internet en Colombia
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/calculadora"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
                >
                  <Calculator size={20} />
                  Calculadora de Velocidad
                </a>
                <a
                  href="/planes"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Ver Planes Disponibles
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <ResourceCategory
            title="Herramientas y Calculadoras"
            description="Determina exactamente qué necesitas y mide el rendimiento de tu conexión"
            resources={toolsAndCalculators}
          />
          
          <ResourceCategory
            title="Guías y Contenido Educativo"
            description="Aprende todo sobre internet en Colombia con nuestras guías completas"
            resources={guidesAndContent}
          />

          <ResourceCategory
            title="Comparaciones y Planes"
            description="Compara opciones y encuentra el plan perfecto para tus necesidades"
            resources={comparisonsAndPlans}
          />

          <ResourceCategory
            title="Enlaces Útiles Externos"
            description="Sitios oficiales y recursos adicionales para complementar tu búsqueda"
            resources={externalResources}
          />

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white mt-12">
            <h2 className="text-2xl font-bold mb-4">¿Necesitas Ayuda Personalizada?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Nuestros expertos están listos para ayudarte a encontrar el plan perfecto según tu ubicación, 
              presupuesto y necesidades específicas de internet.
            </p>
            
            <div className="max-w-md mx-auto">
              <QuickCallForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}